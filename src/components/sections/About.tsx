import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, Award, Users, Globe, TrendingUp, CheckCircle } from "lucide-react";

const About = () => {
  const pillars = [
    {
      icon: Target,
      title: "TIME",
      description: "Optimized learning paths that respect your schedule and accelerate your progress",
      color: "primary"
    },
    {
      icon: TrendingUp,
      title: "VALUE",
      description: "Maximum return on investment with industry-relevant skills and certifications",
      color: "secondary"
    },
    {
      icon: Award,
      title: "MONEY",
      description: "Cost-effective programs that enhance earning potential and career growth",
      color: "accent"
    }
  ];

  const achievements = [
    { number: "15+", label: "Years of Excellence" },
    { number: "5000+", label: "Successful Students" },
    { number: "95%", label: "Pass Rate" },
    { number: "50+", label: "Countries Served" }
  ];

  const features = [
    "Expert-led Interactive e-Learning",
    "Professional Certification Programs", 
    "Global Access & Recognition",
    "Management & Counselling Services",
    "Corporate Training Solutions",
    "24/7 Learning Support"
  ];

  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Users className="h-4 w-4" />
            <span>About Dr. Labeeb Academy</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Transforming <span className="bg-gradient-primary bg-clip-text text-transparent">Professional</span> Education
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Labeeb Management Consultants SPC pioneers professional development through 
            innovative e-learning solutions, focusing on Time, Value, and Money optimization.
          </p>
        </div>

        {/* Three Pillars */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <Card key={index} className="text-center group hover:shadow-elegant transition-all duration-300">
                <CardContent className="pt-8">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-${pillar.color}/10`}>
                    <Icon className={`h-8 w-8 text-${pillar.color}`} />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{pillar.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {pillar.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge variant="outline" className="w-fit">
                <Globe className="mr-2 h-4 w-4" />
                Global Recognition
              </Badge>
              <h3 className="text-2xl font-bold">
                Leading Professional Development Platform
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Dr. Labeeb Academy, under Labeeb Management Consultants SPC, has been 
                at the forefront of professional education for over 15 years. We specialize 
                in delivering world-class financial certification programs and management 
                consultancy services to professionals worldwide.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              {achievements.map((achievement, index) => (
                <div key={index} className="text-center p-6 rounded-lg bg-gradient-primary text-primary-foreground">
                  <div className="text-3xl font-bold mb-2">{achievement.number}</div>
                  <div className="text-sm opacity-90">{achievement.label}</div>
                </div>
              ))}
            </div>
            
            <Card className="bg-muted/50">
              <CardContent className="p-6">
                <h4 className="font-semibold mb-3">Our Mission</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  To empower professionals globally with cutting-edge financial certifications 
                  and management expertise, ensuring optimal Time utilization, exceptional Value 
                  delivery, and sustainable Money growth for our students and corporate partners.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;