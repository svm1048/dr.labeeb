import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Award, Star, BookOpen, Video } from "lucide-react";

const Courses = () => {
  const courses = [
    {
      id: "acca",
      title: "ACCA",
      subtitle: "Association of Chartered Certified Accountants",
      description: "Globally recognized professional accounting qualification with comprehensive coverage of financial reporting, audit, and business strategy.",
      duration: "2-3 Years",
      students: "2000+",
      rating: 4.9,
      level: "Professional",
      features: ["Live Classes", "Recorded Sessions", "Practice Tests", "Expert Support"],
      color: "primary"
    },
    {
      id: "cma",
      title: "CMA",
      subtitle: "Certified Management Accountant",
      description: "Premier certification for management accounting and financial management professionals focusing on strategic decision-making.",
      duration: "12-18 Months", 
      students: "1500+",
      rating: 4.8,
      level: "Advanced",
      features: ["Interactive Learning", "Case Studies", "Mock Exams", "Career Guidance"],
      color: "secondary"
    },
    {
      id: "cia",
      title: "CIA",
      subtitle: "Certified Internal Auditor",
      description: "The only globally accepted certification for internal auditors, demonstrating competency in risk management and governance.",
      duration: "6-12 Months",
      students: "1000+", 
      rating: 4.7,
      level: "Professional",
      features: ["Practical Training", "Real-world Projects", "Mentorship", "Job Placement"],
      color: "accent"
    },
    {
      id: "cfa",
      title: "CFA",
      subtitle: "Chartered Financial Analyst",
      description: "Gold standard for investment professionals covering portfolio management, financial analysis, and ethics.",
      duration: "2-4 Years",
      students: "800+",
      rating: 4.9,
      level: "Expert", 
      features: ["Comprehensive Curriculum", "Industry Experts", "Research Tools", "Networking"],
      color: "primary"
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case "primary":
        return "border-primary/20 bg-primary/5 hover:bg-primary/10";
      case "secondary":
        return "border-secondary/20 bg-secondary/5 hover:bg-secondary/10";
      case "accent":
        return "border-accent/20 bg-accent/5 hover:bg-accent/10";
      default:
        return "border-border bg-card hover:bg-muted/50";
    }
  };

  return (
    <section id="courses" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <BookOpen className="h-4 w-4" />
            <span>Professional Certifications</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Financial <span className="bg-gradient-accent bg-clip-text text-transparent">Certification</span> Courses
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Master globally recognized certifications with our expert-led interactive learning platform
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {courses.map((course) => (
            <Card key={course.id} className={`group transition-all duration-300 hover:shadow-colorful ${getColorClasses(course.color)}`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <CardTitle className="text-2xl">{course.title}</CardTitle>
                      <Badge variant="secondary">{course.level}</Badge>
                    </div>
                    <CardDescription className="font-medium text-base">
                      {course.subtitle}
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-1 text-sm">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{course.rating}</span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  {course.description}
                </p>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-secondary" />
                    <span>{course.students} Students</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-sm">Course Features:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {course.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-3 pt-4">
                  <Button className="flex-1 group">
                    <Video className="mr-2 h-4 w-4" />
                    Enroll Now
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            View All Courses
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Courses;