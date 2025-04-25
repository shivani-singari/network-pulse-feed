
import { Button } from "@/components/ui/button";
import { JobCard } from "@/components/jobs/JobCard";
import { JobPreferences } from "@/components/jobs/JobPreferences";
import { useJobs } from "@/hooks/useJobs";
import { useState } from "react";

const Jobs = () => {
  const { jobs, filter, setFilter, toggleSavedJob, applyToJob } = useJobs();
  const [filterPreferences, setFilterPreferences] = useState({
    disability: 'any',
    category: 'any'
  });

  const handlePreferenceChange = (type: string, value: string) => {
    setFilterPreferences(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const filteredJobs = jobs.filter(job => {
    if (filter === "saved" && !job.saved) return false;
    
    if (filterPreferences.disability !== 'any' && 
        (!job.disabilitySupport || !job.disabilitySupport.includes(filterPreferences.disability))) {
      return false;
    }
    
    if (filterPreferences.category !== 'any' && job.category !== filterPreferences.category) {
      return false;
    }
    
    return true;
  });

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Job Opportunities</h1>
          <div className="flex gap-2">
            <Button 
              variant={filter === "all" ? "default" : "outline"} 
              onClick={() => setFilter("all")}
            >
              All Jobs
            </Button>
            <Button 
              variant={filter === "saved" ? "default" : "outline"} 
              onClick={() => setFilter("saved")}
            >
              Saved Jobs
            </Button>
          </div>
        </div>

        <JobPreferences onFilterChange={handlePreferenceChange} />
      
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <JobCard 
              key={job.id}
              job={job}
              onSave={toggleSavedJob}
              onApply={applyToJob}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
