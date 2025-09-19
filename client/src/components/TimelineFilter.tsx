import { useState } from "react";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface TimelineFilterProps {
  selectedTimeline: string;
  onChange: (timeline: string) => void;
}

const presetOptions = [
  { value: 'h', label: 'Past Hour' },
  { value: 'd', label: 'Past 24 Hours' },
  { value: 'w', label: 'Past Week' },
  { value: 'm', label: 'Past Month' },
  { value: '', label: 'Anytime' }
];

const timeUnits = [
  { value: 'h', label: 'Hours', singular: 'Hour' },
  { value: 'd', label: 'Days', singular: 'Day' },
  { value: 'w', label: 'Weeks', singular: 'Week' },
  { value: 'm', label: 'Months', singular: 'Month' }
];

export default function TimelineFilter({ selectedTimeline, onChange }: TimelineFilterProps) {
  const [customNumber, setCustomNumber] = useState("1");
  const [customUnit, setCustomUnit] = useState("d");
  const [isCustom, setIsCustom] = useState(false);

  const handlePresetClick = (value: string) => {
    setIsCustom(false);
    onChange(value);
  };

  const handleCustomApply = () => {
    const number = parseInt(customNumber);
    if (number > 0 && customUnit) {
      const customValue = `${customUnit}${number}`;
      setIsCustom(true);
      onChange(customValue);
    }
  };

  const getCustomLabel = () => {
    const number = parseInt(customNumber);
    const unit = timeUnits.find(u => u.value === customUnit);
    if (number && unit) {
      return number === 1 ? `Past ${unit.singular}` : `Past ${number} ${unit.label}`;
    }
    return "Custom";
  };

  const isPresetSelected = (value: string) => {
    return selectedTimeline === value && !isCustom;
  };

  const isCustomSelected = () => {
    return isCustom && selectedTimeline.startsWith(customUnit) && 
           selectedTimeline === `${customUnit}${customNumber}`;
  };

  return (
    <motion.div 
      className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors duration-200"
    >
      <div className="flex items-center mb-4">
        <Clock className="text-primary mr-3" size={20} />
        <h3 className="text-lg font-semibold">Timeline</h3>
      </div>
      
      {/* Preset Options */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        {presetOptions.map((option) => (
          <motion.div key={option.value} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              type="button"
              variant={isPresetSelected(option.value) ? "default" : "outline"}
              size="sm"
              className="w-full"
              onClick={() => handlePresetClick(option.value)}
              data-testid={`button-timeline-${option.value || 'anytime'}`}
            >
              {option.label}
            </Button>
          </motion.div>
        ))}
      </div>

      {/* Custom Timeline Section */}
      <div className="border-t border-border pt-4">
        <Label className="text-sm font-medium mb-3 block">Custom Timeline</Label>
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div>
            <Input
              type="number"
              min="1"
              max="99"
              value={customNumber}
              onChange={(e) => setCustomNumber(e.target.value)}
              placeholder="Number"
              className="text-sm"
              data-testid="input-custom-number"
            />
          </div>
          <div>
            <Select value={customUnit} onValueChange={setCustomUnit}>
              <SelectTrigger data-testid="select-custom-unit">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {timeUnits.map((unit) => (
                  <SelectItem key={unit.value} value={unit.value}>
                    {unit.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleCustomApply}
            className="text-xs"
            data-testid="button-apply-custom"
          >
            Apply Custom
          </Button>
          <div className={`px-3 py-2 text-xs rounded border text-center ${
            isCustomSelected() 
              ? 'bg-primary text-primary-foreground border-primary' 
              : 'bg-muted text-muted-foreground border-border'
          }`}>
            {isCustomSelected() ? getCustomLabel() : "Not Applied"}
          </div>
        </div>
      </div>
    </motion.div>
  );
}