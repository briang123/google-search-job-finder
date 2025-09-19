interface SearchData {
  jobTitle: string;
  selectedSites: string[];
  locations: string[];
  remoteWork: boolean;
  timeline: string;
  region: string;
}

export function buildGoogleSearchUrl(data: SearchData): string {
  const { jobTitle, selectedSites, locations, remoteWork, timeline, region } = data;

  // Build the main search query
  let searchTerms = [jobTitle];
  
  // Add location terms
  if (remoteWork) {
    searchTerms.push('remote');
  }
  
  if (locations.length > 0) {
    searchTerms = searchTerms.concat(locations);
  }

  // If we have only one site, use as_sitesearch, otherwise use site operators in the query
  let searchUrl;
  if (selectedSites.length === 1) {
    // Use advanced search format for single site
    searchUrl = `https://www.google.com/search?as_q=${encodeURIComponent(searchTerms.join(' '))}`;
    searchUrl += `&as_sitesearch=${encodeURIComponent(selectedSites[0])}`;
  } else if (selectedSites.length > 1) {
    // Use site operators for multiple sites
    const siteQuery = selectedSites.map(site => `site:${site}`).join(' OR ');
    const fullQuery = `${searchTerms.join(' ')} (${siteQuery})`;
    searchUrl = `https://www.google.com/search?as_q=${encodeURIComponent(fullQuery)}`;
  } else {
    // No sites selected, just search terms
    searchUrl = `https://www.google.com/search?as_q=${encodeURIComponent(searchTerms.join(' '))}`;
  }
  
  // Add timeline filter if specified
  if (timeline) {
    // Handle both old format (h, d, w, m) and new custom format (h2, d5, w3, m6)
    let timelineParam = timeline;
    
    // If it's just a single letter, it's the old preset format
    if (timeline.length === 1 && ['h', 'd', 'w', 'm'].includes(timeline)) {
      timelineParam = timeline;
    }
    // If it's a custom format like h2, d5, w3, m6, use it directly
    else if (timeline.match(/^[hdwm]\d+$/)) {
      timelineParam = timeline;
    }
    
    searchUrl += `&tbs=qdr:${timelineParam}`;
  }
  
  // Add region filter if specified
  if (region && region !== "any") {
    searchUrl += `&cr=${region}`;
  }

  return searchUrl;
}
