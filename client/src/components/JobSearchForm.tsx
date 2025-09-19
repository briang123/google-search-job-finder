import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Briefcase, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import JobSiteSelector from '@/components/JobSiteSelector';
import LocationSelector from '@/components/LocationSelector';
import TimelineFilter from '@/components/TimelineFilter';
import { buildGoogleSearchUrl } from '@/lib/searchBuilder';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const formSchema = z.object({
  jobTitle: z.string().min(1, 'Job title is required'),
  selectedSites: z.array(z.string()).min(1, 'Please select at least one job site'),
  locations: z.array(z.string()),
  remoteWork: z.boolean().default(false),
  timeline: z.string().default(''),
  region: z.string().default('countryUS'),
  exactMatch: z.boolean().default(false),
});

type FormData = z.infer<typeof formSchema>;

const regions = [
  { value: 'any', label: 'Any Region' },
  { value: 'countryUS', label: 'United States' },
  { value: 'countryCA', label: 'Canada' },
  { value: 'countryGB', label: 'United Kingdom' },
  { value: 'countryDE', label: 'Germany' },
  { value: 'countryFR', label: 'France' },
  { value: 'countryAU', label: 'Australia' },
  { value: 'countryIN', label: 'India' },
  { value: 'countrySG', label: 'Singapore' },
];

const jobSuggestions = [
  'Software Engineer',
  'Product Manager',
  'Data Scientist',
  'UX Designer',
  'Marketing Manager',
  'Sales Representative',
  'DevOps Engineer',
  'Business Analyst',
  'Project Manager',
  'Frontend Developer',
];

export default function JobSearchForm() {
  const { toast } = useToast();
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobTitle: '',
      selectedSites: [],
      locations: [],
      remoteWork: false,
      timeline: '',
      region: 'countryUS',
      exactMatch: false,
    },
  });

  const onSubmit = (data: FormData) => {
    try {
      console.log('Form data submitted:', data);
      console.log('Selected sites:', data.selectedSites);
      console.log('Selected sites length:', data.selectedSites.length);

      const searchUrl = buildGoogleSearchUrl(data);
      console.log('Generated search URL:', searchUrl);

      const newWindow = window.open(searchUrl, '_blank', 'noopener,noreferrer');
      if (newWindow) {
        newWindow.opener = null;
      }

      toast({
        title: 'Search opened',
        description: 'Google search results opened in a new tab',
      });
    } catch (error) {
      console.error('Search error:', error);
      toast({
        title: 'Error',
        description: 'Failed to build search query. Please check your inputs.',
        variant: 'destructive',
      });
    }
  };

  const handleJobTitleChange = (value: string) => {
    form.setValue('jobTitle', value);

    if (value.length > 0) {
      const filtered = jobSuggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(value.toLowerCase()),
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const selectSuggestion = (suggestion: string) => {
    form.setValue('jobTitle', suggestion);
    setShowSuggestions(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Job Title Section */}
        <motion.div
          className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors duration-200"
          whileHover={{ borderColor: 'hsl(var(--primary))' }}
        >
          <div className="flex items-center mb-4">
            <Briefcase className="text-primary mr-3" size={20} />
            <h3 className="text-lg font-semibold">Job Title / Role / Search Text</h3>
          </div>

          <FormField
            control={form.control}
            name="jobTitle"
            render={({ field }) => (
              <FormItem>
                <div className="relative">
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="e.g., Software Engineer, Marketing Manager, Data Scientist"
                      className="w-full p-4"
                      onChange={(e) => handleJobTitleChange(e.target.value)}
                      onFocus={() => field.value && setShowSuggestions(true)}
                      onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                      data-testid="input-job-title"
                    />
                  </FormControl>

                  {showSuggestions && filteredSuggestions.length > 0 && (
                    <motion.div
                      className="absolute top-full left-0 right-0 bg-popover border border-border rounded-b-lg shadow-lg z-10 max-h-40 overflow-y-auto"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      {filteredSuggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          type="button"
                          className="w-full text-left px-4 py-2 hover:bg-accent hover:text-accent-foreground transition-colors"
                          onClick={() => selectSuggestion(suggestion)}
                          data-testid={`suggestion-${index}`}
                        >
                          {suggestion}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </div>
              </FormItem>
            )}
          />

          {/* Exact Match Toggle */}
          <FormField
            control={form.control}
            name="exactMatch"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border border-border p-4 mt-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base font-medium">Exact Match</FormLabel>
                  <div className="text-sm text-muted-foreground">
                    Search for the exact job title phrase (wraps with quotes)
                  </div>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    data-testid="switch-exact-match"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </motion.div>

        {/* Job Sites Selection */}
        <FormField
          control={form.control}
          name="selectedSites"
          render={({ field }) => (
            <FormItem>
              <JobSiteSelector selectedSites={field.value} onChange={field.onChange} />
            </FormItem>
          )}
        />

        {/* Location Section */}
        <FormField
          control={form.control}
          name="locations"
          render={({ field }) => (
            <FormItem>
              <LocationSelector
                locations={field.value}
                onChange={field.onChange}
                remoteWork={form.watch('remoteWork')}
                onRemoteWorkChange={(checked: boolean) => form.setValue('remoteWork', checked)}
              />
            </FormItem>
          )}
        />

        {/* Filters Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Timeline Filter */}
          <FormField
            control={form.control}
            name="timeline"
            render={({ field }) => (
              <FormItem>
                <TimelineFilter selectedTimeline={field.value} onChange={field.onChange} />
              </FormItem>
            )}
          />

          {/* Region Filter */}
          <motion.div
            className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors duration-200"
            whileHover={{ borderColor: 'hsl(var(--primary))' }}
          >
            <div className="flex items-center mb-4">
              <Search className="text-primary mr-3" size={20} />
              <h3 className="text-lg font-semibold">Region</h3>
            </div>

            <FormField
              control={form.control}
              name="region"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger data-testid="select-region">
                        <SelectValue placeholder="Select Region" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {regions.map((region) => (
                        <SelectItem key={region.value} value={region.value}>
                          {region.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </motion.div>
        </div>

        {/* Search Button */}
        <div className="text-center pt-6">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              type="submit"
              className="bg-gradient-to-r from-primary to-amber-600 text-black px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl focus:ring-4 focus:ring-primary/50"
              data-testid="button-search"
            >
              <Search className="mr-2" size={20} />
              Search Jobs
            </Button>
          </motion.div>
        </div>
      </form>
    </Form>
  );
}
