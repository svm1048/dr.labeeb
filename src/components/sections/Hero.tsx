import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Award, Users, Globe } from "lucide-react";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background with triangular elements inspired by logo */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 right-10 w-32 h-32 bg-primary/10 transform rotate-45"></div>
        <div className="absolute bottom-20 left-10 w-24 h-24 bg-secondary/10 transform rotate-45"></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-accent/10 transform rotate-45"></div>
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                <Award className="h-4 w-4" />
                <span>Professional Certification Leader</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Expert-led{" "}
                <span className="bg-gradient-hero bg-clip-text text-transparent">
                  Interactive
                </span>{" "}
                e-Learning
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed">
                Master financial certifications with TIME, VALUE, and MONEY optimization. 
                Join thousands of professionals advancing their careers through our 
                comprehensive ACCA, CMA, CIA, and CFA programs.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" className="group">
                Explore Courses
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg" className="group" asChild>
                <a href="https://www.youtube.com/@labeeb1402" target="_blank" rel="noopener noreferrer">
                  <Play className="mr-2 h-4 w-4" />
                  Watch Demo
                </a>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">200+</div>
                <div className="text-sm text-muted-foreground">Students</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary">75%+</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">13+</div>
                <div className="text-sm text-muted-foreground">Countries</div>
              </div>
            </div>
          </div>

          {/* Visual Element inspired by the triangular logo */}
          <div className="relative">
            <div className="relative w-full max-w-md mx-auto">
              {/* Main triangle container */}
              <div className="relative h-96 w-96 mx-auto">
                {/* Top triangle - TIME */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[120px] border-r-[120px] border-b-[100px] border-l-transparent border-r-transparent border-b-primary">
                  <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-white font-bold text-lg">
                    TIME
                  </div>
                </div>
                
                {/* Bottom left triangle - VALUE */}
                <div className="absolute bottom-0 left-0 w-0 h-0 border-r-[120px] border-t-[100px] border-r-transparent border-t-secondary">
                  <div className="absolute -top-8 left-8 text-white font-bold text-lg">
                    VALUE
                  </div>
                </div>
                
                {/* Bottom right triangle - MONEY */}
                <div className="absolute bottom-0 right-0 w-0 h-0 border-l-[120px] border-t-[100px] border-l-transparent border-t-accent">
                  <div className="absolute -top-8 right-8 text-white font-bold text-lg">
                    MONEY
                  </div>
                </div>
                
                {/* Center content */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center bg-background rounded-lg p-6 shadow-elegant">
                  <div className="space-y-3">
                    <Globe className="h-8 w-8 text-primary mx-auto" />
                    <div className="font-bold text-lg">Global Access</div>
                    <div className="text-sm text-muted-foreground">
                      Professional Certification & Management Consultancy
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;