
import { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
}

const Jobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filter, setFilter] = useState("all");
  const { toast } = useToast();

  useEffect(() => {
    // Load saved jobs from localStorage
    const savedJobIds = JSON.parse(localStorage.getItem('savedJobs') || '[]');
    
    // Simulated job data
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
        saved: savedJobIds.includes("1")
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
        saved: savedJobIds.includes("2")
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
        saved: savedJobIds.includes("3")
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
        saved: savedJobIds.includes("4")
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
        saved: savedJobIds.includes("5")
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
        saved: savedJobIds.includes("6")
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

  const filteredJobs = filter === "all" ? jobs : jobs.filter(job => job.saved);
  
  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
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
  );
};

export default Jobs;
