
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";

interface Course {
  id: string;
  title: string;
  description: string;
  videoId: string;
  category: string;
  duration: string;
}

const ELearn = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  // Sample course data with YouTube video IDs
  const courses: Course[] = [
    {
      id: "1",
      title: "Mastering the Interview Process",
      description: "Learn effective strategies to prepare for and excel in job interviews.",
      videoId: "HG68Ymazo18",
      category: "interview",
      duration: "25 min"
    },
    {
      id: "2",
      title: "Resume Writing Essentials",
      description: "Create a compelling resume that highlights your skills and experience.",
      videoId: "u75hUSVguhI",
      category: "resume",
      duration: "18 min"
    },
    {
      id: "3",
      title: "Networking for Career Growth",
      description: "Build and leverage professional relationships for career advancement.",
      videoId: "oFBKGnPGiW8",
      category: "networking",
      duration: "22 min"
    },
    {
      id: "4",
      title: "LinkedIn Profile Optimization",
      description: "Optimize your LinkedIn profile to attract recruiters and opportunities.",
      videoId: "SG5Sb5WTV_g",
      category: "resume",
      duration: "15 min"
    },
    {
      id: "5",
      title: "Negotiating Job Offers",
      description: "Learn effective negotiation techniques for salary and benefits.",
      videoId: "PjzB92lxeRQ",
      category: "interview",
      duration: "20 min"
    },
    {
      id: "6",
      title: "Remote Work Success Strategies",
      description: "Develop skills and habits for effective remote work performance.",
      videoId: "61wsDmtQdEE",
      category: "skills",
      duration: "17 min"
    }
  ];

  // Filter courses based on active category
  const filteredCourses = activeCategory === "all" 
    ? courses 
    : courses.filter(course => course.category === activeCategory);
  
  // Track completed courses in localStorage
  const toggleCompletedCourse = (courseId: string) => {
    const completedCourses = JSON.parse(localStorage.getItem('completedCourses') || '[]');
    
    if (completedCourses.includes(courseId)) {
      localStorage.setItem(
        'completedCourses', 
        JSON.stringify(completedCourses.filter((id: string) => id !== courseId))
      );
    } else {
      completedCourses.push(courseId);
      localStorage.setItem('completedCourses', JSON.stringify(completedCourses));
    }
  };

  // Check if a course is completed
  const isCourseCompleted = (courseId: string) => {
    const completedCourses = JSON.parse(localStorage.getItem('completedCourses') || '[]');
    return completedCourses.includes(courseId);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center gap-3 mb-6">
        <BookOpen className="h-8 w-8" />
        <h1 className="text-3xl font-bold">E-Learning Center</h1>
      </div>
      
      <Tabs defaultValue="all" className="mb-6" onValueChange={setActiveCategory}>
        <TabsList>
          <TabsTrigger value="all">All Courses</TabsTrigger>
          <TabsTrigger value="interview">Interview Prep</TabsTrigger>
          <TabsTrigger value="resume">Resume Building</TabsTrigger>
          <TabsTrigger value="networking">Networking</TabsTrigger>
          <TabsTrigger value="skills">Skills Development</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <Card key={course.id} className={isCourseCompleted(course.id) ? "border-primary" : ""}>
            <CardHeader>
              <CardTitle className="text-xl">{course.title}</CardTitle>
              <CardDescription>{course.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video rounded-md overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${course.videoId}`}
                  title={course.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">{course.duration}</span>
              <Button 
                variant={isCourseCompleted(course.id) ? "outline" : "default"}
                onClick={() => toggleCompletedCourse(course.id)}
              >
                {isCourseCompleted(course.id) ? "Mark Incomplete" : "Mark Complete"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ELearn;
