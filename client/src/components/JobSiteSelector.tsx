import { useState } from "react";
import { motion } from "framer-motion";
import { Globe, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { jobSites } from "@/lib/jobSites";

interface JobSiteSelectorProps {
  selectedSites: string[];
  onChange: (sites: string[]) => void;
}

export default function JobSiteSelector({ selectedSites, onChange }: JobSiteSelectorProps) {
  const handleSiteToggle = (site: string, checked: boolean) => {
    if (checked) {
      onChange([...selectedSites, site]);
    } else {
      onChange(selectedSites.filter(s => s !== site));
    }
  };

  const selectAll = () => {
    onChange(jobSites);
  };

  const clearAll = () => {
    onChange([]);
  };

  const removeSite = (site: string) => {
    onChange(selectedSites.filter(s => s !== site));
  };

  return (
    <motion.div 
      className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors duration-200"
      whileHover={{ borderColor: "hsl(var(--primary))" }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Globe className="text-primary mr-3" size={20} />
          <h3 className="text-lg font-semibold">Job Sites</h3>
        </div>
        <div className="flex space-x-2">
          <Button 
            type="button" 
            variant="outline" 
            size="sm"
            onClick={selectAll}
            data-testid="button-select-all"
          >
            Select All
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            size="sm"
            onClick={clearAll}
            data-testid="button-clear-all"
          >
            Clear All
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto p-2">
        {jobSites.map((site: string, index: number) => (
          <motion.label 
            key={site}
            className="flex items-center space-x-2 p-3 bg-muted rounded-lg hover:bg-accent transition-colors duration-200 cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Checkbox
              checked={selectedSites.includes(site)}
              onCheckedChange={(checked) => handleSiteToggle(site, checked as boolean)}
              data-testid={`checkbox-site-${index}`}
            />
            <span className="text-sm">{site}</span>
          </motion.label>
        ))}
      </div>
      
      <div className="mt-4 p-3 bg-muted rounded-lg">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Selected sites:</span>
          <span className="font-medium text-primary" data-testid="text-selected-count">
            {selectedSites.length}
          </span>
        </div>
        {selectedSites.length > 0 && (
          <motion.div 
            className="mt-2 flex flex-wrap gap-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {selectedSites.slice(0, 8).map((site) => (
              <motion.span 
                key={site}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary/20 text-primary"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                whileHover={{ scale: 1.05 }}
                data-testid={`tag-site-${site}`}
              >
                {site}
                <button 
                  type="button"
                  onClick={() => removeSite(site)} 
                  className="ml-1 hover:text-destructive"
                  data-testid={`button-remove-site-${site}`}
                >
                  <X size={12} />
                </button>
              </motion.span>
            ))}
            {selectedSites.length > 8 && (
              <span className="text-xs text-muted-foreground">
                +{selectedSites.length - 8} more
              </span>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
