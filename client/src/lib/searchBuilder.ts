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

  // Start with job title in quotes for exact phrase matching
  let query = `"${jobTitle}"`;
  
  // Add site operators for selected job sites
  if (selectedSites.length > 0) {
    const siteQuery = selectedSites.map(site => `site:${site}`).join(' OR ');
    query += ` (${siteQuery})`;
  }
  
  // Add location parameters
  if (remoteWork) {
    query += ' (remote OR "work from home" OR "work remotely")';
  }
  
  if (locations.length > 0) {
    const locationQuery = locations.map(loc => `"${loc}"`).join(' OR ');
    query += ` (${locationQuery})`;
  }

  // Build the base Google search URL
  let searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
  
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
