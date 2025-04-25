
import { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Briefcase, BookmarkPlus, BookmarkCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  skills: string[];
  postedDate: string;
  saved: boolean;
  disabilitySupport?: string[];
  category: string;
}

const Jobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filter, setFilter] = useState("all");
  const [disabilityType, setDisabilityType] = useState(() => 
    localStorage.getItem('preferredDisabilitySupport') || 'any'
  );
  const [jobCategory, setJobCategory] = useState(() => 
    localStorage.getItem('preferredJobCategory') || 'any'
  );
  const { toast } = useToast();

  useEffect(() => {
    // Load saved jobs from localStorage
    const savedJobIds = JSON.parse(localStorage.getItem('savedJobs') || '[]');
    
    // Simulated job data with disability support and categories
    const jobData: Job[] = [
      {
        id: "1",
        title: "Frontend Developer",
        company: "TechCorp",
        location: "San Francisco, CA",
        salary: "$90,000 - $120,000",
        type: "Full-time",
        skills: ["React", "TypeScript", "CSS"],
        postedDate: "2 days ago",
        saved: savedJobIds.includes("1"),
        disabilitySupport: ["Vision Impairment", "Mobility Support"],
        category: "Technology"
      },
      {
        id: "2",
        title: "UX Designer",
        company: "DesignHub",
        location: "Remote",
        salary: "$85,000 - $105,000",
        type: "Full-time",
        skills: ["Figma", "User Research", "Wireframing"],
        postedDate: "1 week ago",
        saved: savedJobIds.includes("2"),
        disabilitySupport: ["Hearing Support", "Flexible Schedule"],
        category: "Design"
      },
      {
        id: "3",
        title: "DevOps Engineer",
        company: "CloudSystem",
        location: "New York, NY",
        salary: "$110,000 - $140,000",
        type: "Full-time",
        skills: ["AWS", "Docker", "Kubernetes"],
        postedDate: "3 days ago",
        saved: savedJobIds.includes("3"),
        disabilitySupport: ["Mobility Support", "Flexible Schedule"],
        category: "Technology"
      },
      {
        id: "4",
        title: "Data Scientist",
        company: "DataInsight",
        location: "Boston, MA",
        salary: "$95,000 - $130,000",
        type: "Full-time",
        skills: ["Python", "Machine Learning", "SQL"],
        postedDate: "Just now",
        saved: savedJobIds.includes("4"),
        disabilitySupport: ["Cognitive Support", "Flexible Schedule"],
        category: "Data Science"
      },
      {
        id: "5",
        title: "Technical Writer",
        company: "DocuTech",
        location: "Remote",
        salary: "$70,000 - $90,000",
        type: "Contract",
        skills: ["Technical Documentation", "Markdown", "API Documentation"],
        postedDate: "5 days ago",
        saved: savedJobIds.includes("5"),
        disabilitySupport: ["Vision Impairment", "Remote Work"],
        category: "Content"
      },
      {
        id: "6",
        title: "Mobile Developer",
        company: "AppWorks",
        location: "Seattle, WA",
        salary: "$100,000 - $130,000",
        type: "Full-time",
        skills: ["React Native", "iOS", "Android"],
        postedDate: "1 day ago",
        saved: savedJobIds.includes("6"),
        disabilitySupport: ["Hearing Support", "Mobility Support"],
        category: "Technology"
      }
    ];
    
    setJobs(jobData);
  }, []);

  const toggleSavedJob = (jobId: string) => {
    setJobs(prev => 
      prev.map(job => 
        job.id === jobId ? { ...job, saved: !job.saved } : job
      )
    );
    
    // Update localStorage
    const savedJobIds = jobs
      .filter(job => job.id === jobId ? !job.saved : job.saved)
      .map(job => job.id);
    localStorage.setItem('savedJobs', JSON.stringify(savedJobIds));
    
    // Show notification
    const job = jobs.find(j => j.id === jobId);
    if (job) {
      if (!job.saved) {
        toast({
          title: "Job saved",
          description: `${job.title} at ${job.company} has been saved to your list.`
        });
      } else {
        toast({
          title: "Job removed",
          description: `${job.title} has been removed from your saved jobs.`
        });
      }
    }
  };

  const applyToJob = (jobId: string) => {
    const job = jobs.find(j => j.id === jobId);
    if (job) {
      toast({
        title: "Application submitted",
        description: `Your application for ${job.title} at ${job.company} has been submitted successfully.`
      });
    }
  };

  const handleDisabilityTypeChange = (value: string) => {
    setDisabilityType(value);
    localStorage.setItem('preferredDisabilitySupport', value);
    toast({
      title: "Preferences updated",
      description: "Your disability support preferences have been saved."
    });
  };

  const handleJobCategoryChange = (value: string) => {
    setJobCategory(value);
    localStorage.setItem('preferredJobCategory', value);
    toast({
      title: "Preferences updated",
      description: "Your job category preferences have been saved."
    });
  };

  const filteredJobs = jobs.filter(job => {
    if (filter === "saved" && !job.saved) return false;
    
    if (disabilityType !== 'any' && 
        (!job.disabilitySupport || !job.disabilitySupport.includes(disabilityType))) {
      return false;
    }
    
    if (jobCategory !== 'any' && job.category !== jobCategory) {
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
      
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <Card key={job.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{job.title}</CardTitle>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => toggleSavedJob(job.id)}
                  >
                    {job.saved ? 
                      <BookmarkCheck className="h-5 w-5 text-primary" /> : 
                      <BookmarkPlus className="h-5 w-5" />
                    }
                  </Button>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Briefcase className="h-4 w-4 mr-1" />
                  {job.company} • {job.location}
                </div>
              </CardHeader>
              <CardContent>
                <div className="mt-2">
                  <p className="font-medium">{job.salary}</p>
                  <p className="text-sm text-muted-foreground">{job.type}</p>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {job.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">{skill}</Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-4">
                <div className="text-sm text-muted-foreground">
                  Posted {job.postedDate}
                </div>
                <Button onClick={() => applyToJob(job.id)}>Apply Now</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
