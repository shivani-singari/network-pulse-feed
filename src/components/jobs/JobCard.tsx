
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, BookmarkPlus, BookmarkCheck } from "lucide-react";
import { Job } from "@/types/job";

interface JobCardProps {
  job: Job;
  onSave: (id: string) => void;
  onApply: (id: string) => void;
}

export const JobCard = ({ job, onSave, onApply }: JobCardProps) => {
  return (
    <Card key={job.id} className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{job.title}</CardTitle>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => onSave(job.id)}
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
        <Button onClick={() => onApply(job.id)}>Apply Now</Button>
      </CardFooter>
    </Card>
  );
};
