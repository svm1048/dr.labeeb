import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Mail } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: "Home", href: "#home" },
    { name: "Courses", href: "#courses" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="hidden md:flex items-center justify-between py-2 border-b text-sm">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4 text-primary" />
              <span>+968 9200 2435</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-primary" />
              <span>info@drlabeebacademy.com</span>
            </div>
          </div>
          <div className="text-muted-foreground">
            Professional Certification & Management Consultancy
          </div>
        </div>

        {/* Main header */}
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-3">
            <img 
              src="/logo.jpg" 
              alt="Dr. Labeeb Academy" 
              className="h-12 w-12 object-contain"
            />
            <div>
              <h1 className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                Dr. Labeeb Academy
              </h1>
              <p className="text-xs text-muted-foreground">
                Labeeb Management Consultants
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                {item.name}
              </a>
            ))}
            <Button asChild variant="hero" size="sm">
              <a href="/login.html">Student Login</a>
            </Button>
          </nav>
          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-foreground hover:text-primary transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <Button asChild variant="hero" size="sm" className="self-start">
                <a href="/login.html">Student Login</a>
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
