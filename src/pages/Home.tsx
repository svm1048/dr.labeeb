import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Users, 
  Award, 
  PlayCircle, 
  Clock, 
  Star,
  CheckCircle,
  ArrowRight,
  Zap,
  Globe,
  TrendingUp
} from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: BookOpen,
      title: "Expert-Led Courses",
      description: "Learn from industry professionals and certified instructors"
    },
    {
      icon: Award,
      title: "Professional Certificates",
      description: "Earn recognized certifications that boost your career"
    },
    {
      icon: Users,
      title: "Interactive Learning",
      description: "Engage with instructors and peers through live sessions"
    },
    {
      icon: Globe,
      title: "Global Access",
      description: "Learn anywhere, anytime with our mobile-friendly platform"
    }
  ];

  const stats = [
    { number: "10,000+", label: "Students Enrolled" },
    { number: "500+", label: "Expert Instructors" },
    { number: "1,200+", label: "Courses Available" },
    { number: "98%", label: "Success Rate" }
  ];

  const featuredCourses = [
    {
      title: "Project Management Professional (PMP)",
      description: "Complete certification preparation course",
      price: "$299",
      rating: 4.8,
      students: 1250,
      duration: "40 hours",
      level: "Intermediate"
    },
    {
      title: "Digital Marketing Mastery",
      description: "Comprehensive digital marketing strategies",
      price: "$199",
      rating: 4.9,
      students: 890,
      duration: "25 hours",
      level: "Beginner"
    },
    {
      title: "Data Science Fundamentals",
      description: "Python, statistics, and machine learning basics",
      price: "$349",
      rating: 4.7,
      students: 654,
      duration: "60 hours",
      level: "Advanced"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Marketing Manager",
      content: "The courses at Dr. Labeeb Academy transformed my career. The instructors are knowledgeable and the content is practical.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Software Engineer",
      content: "Excellent platform with high-quality content. I earned my certification and got promoted within 6 months.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "HR Director",
      content: "Our entire team completed corporate training here. The interactive format and expert guidance were outstanding.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="w-fit bg-primary/10 text-primary border-primary/20">
                  🎓 #1 Professional Learning Platform
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
                  Advance Your Career with{" "}
                  <span className="text-primary">Expert-Led</span> Courses
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Join thousands of professionals who have transformed their careers through our 
                  comprehensive certification programs and corporate training solutions.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-lg px-8" asChild>
                  <Link to="/courses">
                    <PlayCircle className="mr-2 h-5 w-5" />
                    Explore Courses
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8" asChild>
                  <Link to="/contact">
                    Request Free Demo
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>

              <div className="flex flex-wrap gap-8 pt-4">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-primary">{stat.number}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-video bg-gradient-to-br from-primary to-secondary rounded-2xl shadow-2xl flex items-center justify-center">
                <PlayCircle className="h-24 w-24 text-white/80 hover:text-white cursor-pointer transition-colors" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg border">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Live Classes Available</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline" className="mb-4">Features</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold">Why Choose Dr. Labeeb Academy?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our platform combines cutting-edge technology with expert instruction to deliver 
              unparalleled learning experiences.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline" className="mb-4">Popular Courses</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold">Featured Courses</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover our most popular professional certification and skill development courses.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <BookOpen className="h-12 w-12 text-primary" />
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start gap-2">
                    <CardTitle className="text-lg leading-tight">{course.title}</CardTitle>
                    <Badge variant="secondary">{course.level}</Badge>
                  </div>
                  <CardDescription>{course.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{course.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{course.students} students</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{course.duration}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">{course.price}</span>
                    <Button>Enroll Now</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" asChild>
              <Link to="/courses">
                View All Courses
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline" className="mb-4">Success Stories</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold">What Our Students Say</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Hear from professionals who have advanced their careers with our courses.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 leading-relaxed">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary">
        <div className="container text-center text-white">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Ready to Transform Your Career?
            </h2>
            <p className="text-xl opacity-90 leading-relaxed">
              Join thousands of professionals who have advanced their careers with our 
              expert-led courses and certification programs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-lg px-8" asChild>
                <Link to="/auth">
                  <Zap className="mr-2 h-5 w-5" />
                  Start Learning Today
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent border-white text-white hover:bg-white hover:text-primary" asChild>
                <Link to="/contact">
                  Schedule Consultation
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}