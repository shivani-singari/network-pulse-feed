
import { useState, useEffect } from "react";
import { 
  Bell, 
  BookOpen, 
  Briefcase, 
  FileText, 
  Home, 
  MessageSquare, 
  Moon, 
  Network, 
  Search, 
  Sun, 
  User, 
  Users 
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useTheme } from "@/hooks/useTheme";
import { Link, useLocation } from "react-router-dom";

export const Navbar = () => {
  const { toggleTheme, currentTheme } = useTheme();
  const location = useLocation();
  const [mounted, setMounted] = useState(false);
  
  // After mounting, we can safely access localStorage and render theme-specific components
  useEffect(() => {
    setMounted(true);
  }, []);
  
  return (
    <nav className="sticky top-0 z-50 bg-background border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link to="/" className="text-xl font-bold">
              JobPortal
            </Link>
            <div className="relative w-64 hidden md:block">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                className="pl-8"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-2 md:gap-4">
            <NavItem 
              icon={Home} 
              label="Home" 
              to="/"
              active={location.pathname === '/'}
            />
            <NavItem 
              icon={Briefcase} 
              label="Jobs" 
              to="/jobs"
              active={location.pathname === '/jobs'} 
            />
            <NavItem 
              icon={BookOpen} 
              label="E-Learn" 
              to="/elearn"
              active={location.pathname === '/elearn'}
            />
            <NavItem 
              icon={FileText} 
              label="Applications" 
              to="/applications"
              active={location.pathname === '/applications'}
            />
            <NavItem 
              icon={User} 
              label="Profile" 
              to="/profile"
              active={location.pathname === '/profile'}
            />
            <NavItem 
              icon={MessageSquare} 
              label="Contact" 
              to="/contact"
              active={location.pathname === '/contact'}
            />
            
            {mounted ? (
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                title={`Current theme: ${currentTheme}`}
                className="ml-2"
              >
                <span className="sr-only">Toggle theme</span>
                {currentTheme === 'light' && <Sun className="h-5 w-5" />}
                {currentTheme === 'dark' && <Moon className="h-5 w-5" />}
                {currentTheme === 'high-contrast' && <span className="text-xl">HC</span>}
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavItem = ({ 
  icon: Icon, 
  label, 
  to,
  active = false 
}: { 
  icon: any; 
  label: string;
  to: string;
  active?: boolean;
}) => (
  <Button 
    variant={active ? "default" : "ghost"} 
    className="flex flex-col items-center gap-1 h-auto py-2"
    asChild
  >
    <Link to={to}>
      <Icon className="h-5 w-5" />
      <span className="text-xs hidden md:inline">{label}</span>
    </Link>
  </Button>
);
