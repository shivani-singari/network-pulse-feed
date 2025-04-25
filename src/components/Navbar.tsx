
import { Bell, Home, MessageSquare, Network, Search, Users } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useTheme } from "@/hooks/useTheme";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const { toggleTheme } = useTheme();

  return (
    <nav className="sticky top-0 z-50 bg-background border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link to="/" className="text-xl font-bold">
              Network
            </Link>
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                className="pl-8"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <NavItem icon={Home} label="Home" />
            <NavItem icon={Network} label="Network" />
            <NavItem icon={Users} label="Jobs" />
            <NavItem icon={MessageSquare} label="Messaging" />
            <NavItem icon={Bell} label="Notifications" />
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="ml-2"
            >
              <span className="sr-only">Toggle theme</span>
              🌓
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavItem = ({ icon: Icon, label }: { icon: any; label: string }) => (
  <Button variant="ghost" className="flex flex-col items-center gap-1 h-auto py-2">
    <Icon className="h-5 w-5" />
    <span className="text-xs">{label}</span>
  </Button>
);
