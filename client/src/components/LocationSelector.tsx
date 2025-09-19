import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface LocationSelectorProps {
  locations: string[];
  onChange: (locations: string[]) => void;
  remoteWork: boolean;
  onRemoteWorkChange: (checked: boolean) => void;
}

export default function LocationSelector({ 
  locations, 
  onChange, 
  remoteWork, 
  onRemoteWorkChange 
}: LocationSelectorProps) {
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const addLocation = () => {
    if (city.trim() || state.trim()) {
      const locationText = [city.trim(), state.trim()].filter(Boolean).join(', ');
      if (!locations.includes(locationText)) {
        onChange([...locations, locationText]);
      }
      setCity("");
      setState("");
    }
  };

  const removeLocation = (location: string) => {
    onChange(locations.filter(loc => loc !== location));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addLocation();
    }
  };

  return (
    <motion.div 
      className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors duration-200"
      whileHover={{ borderColor: "hsl(var(--primary))" }}
    >
      <div className="flex items-center mb-4">
        <MapPin className="text-primary mr-3" size={20} />
        <h3 className="text-lg font-semibold">Locations</h3>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="remoteWork"
              checked={remoteWork}
              onCheckedChange={onRemoteWorkChange}
              data-testid="checkbox-remote-work"
            />
            <Label htmlFor="remoteWork" className="cursor-pointer">
              Remote Work
            </Label>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label className="block text-sm font-medium mb-2">City</Label>
            <Input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="San Francisco, New York, Austin..."
              data-testid="input-city"
            />
          </div>
          <div>
            <Label className="block text-sm font-medium mb-2">State/Province</Label>
            <Input
              value={state}
              onChange={(e) => setState(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="CA, NY, TX..."
              data-testid="input-state"
            />
          </div>
        </div>
        
        <div className="flex justify-center">
          <Button 
            type="button" 
            onClick={addLocation}
            variant="outline"
            size="sm"
            data-testid="button-add-location"
          >
            Add Location
          </Button>
        </div>
        
        {locations.length > 0 && (
          <motion.div 
            className="flex flex-wrap gap-2 mt-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {locations.map((location, index) => (
              <motion.span 
                key={location}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-accent text-accent-foreground"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                whileHover={{ scale: 1.05 }}
                data-testid={`tag-location-${index}`}
              >
                {location}
                <button 
                  type="button"
                  onClick={() => removeLocation(location)} 
                  className="ml-2 hover:text-destructive"
                  data-testid={`button-remove-location-${index}`}
                >
                  <X size={14} />
                </button>
              </motion.span>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
