
export interface Job {
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
