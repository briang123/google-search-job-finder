import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TimelineFilterProps {
  selectedTimeline: string;
  onChange: (timeline: string) => void;
}

const timelineOptions = [
  { value: 'h', label: 'Past Hour' },
  { value: 'd', label: 'Past 24 Hours' },
  { value: 'w', label: 'Past Week' },
  { value: 'm', label: 'Past Month' },
  { value: '', label: 'Anytime' }
];

export default function TimelineFilter({ selectedTimeline, onChange }: TimelineFilterProps) {
  return (
    <motion.div 
      className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors duration-200"
      whileHover={{ borderColor: "hsl(var(--primary))" }}
    >
      <div className="flex items-center mb-4">
        <Clock className="text-primary mr-3" size={20} />
        <h3 className="text-lg font-semibold">Timeline</h3>
      </div>
      
      <div className="grid grid-cols-2 gap-2">
        {timelineOptions.map((option) => (
          <motion.div key={option.value} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              type="button"
              variant={selectedTimeline === option.value ? "default" : "outline"}
              size="sm"
              className="w-full"
              onClick={() => onChange(option.value)}
              data-testid={`button-timeline-${option.value || 'anytime'}`}
            >
              {option.label}
            </Button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
