
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface JobPreferencesProps {
  onFilterChange: (type: string, value: string) => void;
}

export const JobPreferences = ({ onFilterChange }: JobPreferencesProps) => {
  const [disabilityType, setDisabilityType] = useState(() => 
    localStorage.getItem('preferredDisabilitySupport') || 'any'
  );
  const [jobCategory, setJobCategory] = useState(() => 
    localStorage.getItem('preferredJobCategory') || 'any'
  );
  const { toast } = useToast();

  const handleDisabilityTypeChange = (value: string) => {
    setDisabilityType(value);
    localStorage.setItem('preferredDisabilitySupport', value);
    onFilterChange('disability', value);
    toast({
      title: "Preferences updated",
      description: "Your disability support preferences have been saved."
    });
  };

  const handleJobCategoryChange = (value: string) => {
    setJobCategory(value);
    localStorage.setItem('preferredJobCategory', value);
    onFilterChange('category', value);
    toast({
      title: "Preferences updated",
      description: "Your job category preferences have been saved."
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-card rounded-lg">
      <div className="space-y-4">
        <Label htmlFor="disability-support">Disability Support</Label>
        <Select value={disabilityType} onValueChange={handleDisabilityTypeChange}>
          <SelectTrigger id="disability-support">
            <SelectValue placeholder="Select disability support" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any Support</SelectItem>
            <SelectItem value="Vision Impairment">Vision Impairment</SelectItem>
            <SelectItem value="Hearing Support">Hearing Support</SelectItem>
            <SelectItem value="Mobility Support">Mobility Support</SelectItem>
            <SelectItem value="Flexible Schedule">Flexible Schedule</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        <Label htmlFor="job-category">Job Category</Label>
        <Select value={jobCategory} onValueChange={handleJobCategoryChange}>
          <SelectTrigger id="job-category">
            <SelectValue placeholder="Select job category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any Category</SelectItem>
            <SelectItem value="Technology">Technology</SelectItem>
            <SelectItem value="Design">Design</SelectItem>
            <SelectItem value="Marketing">Marketing</SelectItem>
            <SelectItem value="Finance">Finance</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
