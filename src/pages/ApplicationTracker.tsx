
import { useState, useEffect } from "react";
import { FileText } from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

type Status = "applied" | "screening" | "interview" | "offer" | "rejected" | "accepted";

interface Application {
  id: string;
  company: string;
  position: string;
  dateApplied: string;
  status: Status;
  lastUpdated: string;
}

const ApplicationTracker = () => {
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    // Load applications from localStorage or use sample data
    const savedApplications = localStorage.getItem('jobApplications');
    
    if (savedApplications) {
      setApplications(JSON.parse(savedApplications));
    } else {
      // Sample applications data
      const sampleApplications: Application[] = [
        {
          id: "1",
          company: "TechCorp",
          position: "Frontend Developer",
          dateApplied: "2025-04-10",
          status: "interview",
          lastUpdated: "2025-04-18"
        },
        {
          id: "2",
          company: "DesignHub",
          position: "UX Designer",
          dateApplied: "2025-04-05",
          status: "screening",
          lastUpdated: "2025-04-12"
        },
        {
          id: "3",
          company: "CloudSystem",
          position: "DevOps Engineer",
          dateApplied: "2025-04-15",
          status: "applied",
          lastUpdated: "2025-04-15"
        },
        {
          id: "4",
          company: "DataInsight",
          position: "Data Scientist",
          dateApplied: "2025-03-28",
          status: "rejected",
          lastUpdated: "2025-04-14"
        },
        {
          id: "5",
          company: "GrowthMaster",
          position: "Product Manager",
          dateApplied: "2025-04-02",
          status: "offer",
          lastUpdated: "2025-04-20"
        }
      ];
      
      setApplications(sampleApplications);
      localStorage.setItem('jobApplications', JSON.stringify(sampleApplications));
    }
  }, []);

  const getStatusBadge = (status: Status) => {
    switch (status) {
      case "applied":
        return <Badge variant="outline">Applied</Badge>;
      case "screening":
        return <Badge variant="secondary">Screening</Badge>;
      case "interview":
        return <Badge variant="default">Interview</Badge>;
      case "offer":
        return <Badge className="bg-green-500">Offer</Badge>;
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      case "accepted":
        return <Badge className="bg-emerald-600">Accepted</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getStatusProgress = (status: Status) => {
    switch (status) {
      case "applied":
        return 20;
      case "screening":
        return 40;
      case "interview":
        return 60;
      case "offer":
        return 80;
      case "accepted":
        return 100;
      case "rejected":
        return 100;
      default:
        return 0;
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center gap-3 mb-6">
        <FileText className="h-8 w-8" />
        <h1 className="text-3xl font-bold">Application Tracker</h1>
      </div>

      <div className="bg-card rounded-lg shadow-sm overflow-hidden">
        <Table>
          <TableCaption>A list of your recent job applications</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Company</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Date Applied</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead>Last Updated</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.map((app) => (
              <TableRow key={app.id}>
                <TableCell className="font-medium">{app.company}</TableCell>
                <TableCell>{app.position}</TableCell>
                <TableCell>{new Date(app.dateApplied).toLocaleDateString()}</TableCell>
                <TableCell>{getStatusBadge(app.status)}</TableCell>
                <TableCell>
                  <Progress 
                    value={getStatusProgress(app.status)} 
                    className={`w-[80px] ${app.status === "rejected" ? "bg-destructive/30" : ""}`}
                  />
                </TableCell>
                <TableCell>{new Date(app.lastUpdated).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ApplicationTracker;
