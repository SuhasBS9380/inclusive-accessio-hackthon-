
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger 
} from "@/components/ui/sheet";
import ModeToggle from "../ui/mode-toggle";
import { UserProfile } from "../user-profile";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
      scrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-transparent"
    }`}>
      <div className="container-wide flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/app" className="flex items-center gap-2 text-xl font-semibold">
            <span className="flex items-center justify-center rounded-lg bg-primary h-8 w-8 text-primary-foreground font-semibold">
              I
            </span>
            <span className="hidden sm:inline-block">InclusiveAI</span>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/app/text-simplifier" className="text-sm font-medium hover:text-primary transition-colors">
            Text Simplifier
          </Link>
          <Link to="/app/image-caption" className="text-sm font-medium hover:text-primary transition-colors">
            Image Caption
          </Link>
          <Link to="/app/ai-assistant" className="text-sm font-medium hover:text-primary transition-colors">
            AI Assistant
          </Link>
          <Link to="/app/emotion-detector" className="text-sm font-medium hover:text-primary transition-colors">
            Emotion Detector
          </Link>
        </nav>
        
        <div className="flex items-center gap-4">
          <ModeToggle />
          <UserProfile />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col">
              <div className="flex flex-col space-y-4 mt-6">
                <Link to="/app" className="text-base font-medium p-2">
                  Home
                </Link>
                <Link to="/app/text-simplifier" className="text-base font-medium p-2">
                  Text Simplifier
                </Link>
                <Link to="/app/image-caption" className="text-base font-medium p-2">
                  Image Caption
                </Link>
                <Link to="/app/ai-assistant" className="text-base font-medium p-2">
                  AI Assistant
                </Link>
                <Link to="/app/emotion-detector" className="text-base font-medium p-2">
                  Emotion Detector
                </Link>
                <Link to="/app/dashboard" className="text-base font-medium p-2">
                  Dashboard
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
