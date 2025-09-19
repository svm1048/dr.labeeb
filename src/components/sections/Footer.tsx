import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Facebook, Instagram, Linkedin, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "Courses", href: "#courses" },
    { name: "About Us", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  const courses = [
    { name: "ACCA Certification", href: "#acca" },
    { name: "CMA Program", href: "#cma" },
    { name: "CIA Training", href: "#cia" },
    { name: "CFA Preparation", href: "#cfa" },
  ];

  const services = [
    { name: "Management Consultancy", href: "#consultancy" },
    { name: "Corporate Training", href: "#corporate" },
    { name: "Career Counselling", href: "#counselling" },
    { name: "Online Learning", href: "#online" },
  ];

  const socialLinks = [
    { icon: Instagram, href: "https://www.instagram.com/dr_labeeb_academy/", label: "Instagram" },
    { icon: Linkedin, href: "https://om.linkedin.com/in/dr-labeeb-zeeshan-62245a48", label: "LinkedIn" },
    { icon: Youtube, href: "https://www.youtube.com/@labeeb1402", label: "YouTube" },
  ];

  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <img 
                src="/logo.jpg" 
                alt="Dr. Labeeb Academy" 
                className="h-10 w-10 object-contain"
              />
              <div>
                <h3 className="font-bold text-lg bg-gradient-hero bg-clip-text text-transparent">
                  Dr. Labeeb Academy
                </h3>
                <p className="text-xs text-muted-foreground">
                  Labeeb Management Consultants
                </p>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground leading-relaxed">
              Empowering professionals globally with expert-led interactive e-learning, 
              professional certifications, and management consultancy services.
            </p>

            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="h-4 w-4 text-primary" />
                <span>+968 9200 2435</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="h-4 w-4 text-primary" />
                <span>info@drlabeebacademy.com</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Muscat, Oman</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="font-semibold">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>

            <h4 className="font-semibold pt-4">Certifications</h4>
            <ul className="space-y-3">
              {courses.map((course) => (
                <li key={course.name}>
                  <a 
                    href={course.href}
                    className="text-sm text-muted-foreground hover:text-secondary transition-colors"
                  >
                    {course.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h4 className="font-semibold">Our Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <a 
                    href={service.href}
                    className="text-sm text-muted-foreground hover:text-accent transition-colors"
                  >
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>

            <div className="pt-4">
              <h5 className="font-semibold mb-3">Connect with us</h5>
              <div className="flex space-x-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center"
                      aria-label={social.label}
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h4 className="font-semibold">Stay Updated</h4>
            <p className="text-sm text-muted-foreground">
              Subscribe to our newsletter for course updates, industry insights, and career tips.
            </p>
            
            <div className="space-y-3">
              <Input placeholder="Enter your email" />
              <Button className="w-full">Subscribe</Button>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-muted-foreground">
            © 2025 Dr. Labeeb Academy - Labeeb Management Consultants SPC. All rights reserved.
          </div>
          <div className="flex space-x-6 text-sm">
            <a href="#privacy" className="text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#terms" className="text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </a>
            <a href="#cookies" className="text-muted-foreground hover:text-foreground transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;