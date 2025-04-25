import { useState, useEffect } from 'react';
import { Job } from '../types/job';
import { useToast } from './use-toast';

export const useJobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filter, setFilter] = useState("all");
  const { toast } = useToast();

  useEffect(() => {
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
    
    const savedJobIds = jobs
      .filter(job => job.id === jobId ? !job.saved : job.saved)
      .map(job => job.id);
    localStorage.setItem('savedJobs', JSON.stringify(savedJobIds));
    
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

  return {
    jobs,
    filter,
    setFilter,
    toggleSavedJob,
    applyToJob
  };
};
