
import { NavLink } from "react-router-dom";
import { 
  MessageSquare, 
  Image, 
  Type, 
  Home,
  LayoutDashboard,
  ClipboardCheck,
  Paintbrush,
  ImagePlus,
  Video,
  TextCursorInput,
  Smile
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function Sidebar() {
  const links = [
    { to: "/", icon: Home, label: "Home" },
    { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/text-simplifier", icon: Type, label: "Text Simplifier" },
    { to: "/image-caption", icon: Image, label: "Image Caption" },
    { to: "/ai-assistant", icon: MessageSquare, label: "AI Assistant" },
    { to: "/emotion-detector", icon: Smile, label: "Emotion Detector" },
  ];

  const accessibilityTools = [
    { to: "/content-audit", icon: ClipboardCheck, label: "Content Audit" },
    { to: "/design-assistant", icon: Paintbrush, label: "Design Assistant" },
    { to: "/text-to-image", icon: ImagePlus, label: "Text-to-Image" },
    { to: "/video-captioning", icon: Video, label: "Video Captioning" },
    { to: "/text-resizer", icon: TextCursorInput, label: "Text Resizer" },
  ];

  return (
    <aside className="w-[280px] border-r bg-sidebar transition-all duration-300 hidden md:block">
      <div className="flex h-screen flex-col">
        <div className="flex h-16 items-center px-4 py-4">
          <SidebarTrigger />
        </div>
        <ScrollArea className="flex-1 px-4">
          <div className="space-y-4 py-4">
            <div className="py-2">
              {links.map((link) => (
                <NavLink 
                  key={link.to} 
                  to={link.to}
                  className={({ isActive }) => 
                    cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors my-1 hover:bg-sidebar-accent",
                      isActive 
                        ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" 
                        : "text-sidebar-foreground"
                    )
                  }
                >
                  <link.icon className="h-4 w-4" />
                  <span>{link.label}</span>
                </NavLink>
              ))}
            </div>
            <Separator />
            <div>
              <h3 className="text-xs font-medium text-muted-foreground pb-2 px-2">Accessibility Tools</h3>
              <div className="space-y-2 py-1">
                {accessibilityTools.map((tool) => (
                  <Button 
                    key={tool.to}
                    variant="outline" 
                    size="sm" 
                    className="w-full justify-start text-left text-sm font-normal"
                    asChild
                  >
                    <NavLink to={tool.to}>
                      <tool.icon className="h-4 w-4 mr-2" />
                      <span>{tool.label}</span>
                    </NavLink>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
        <div className="p-4">
          <Separator className="mb-4" />
          <div className="rounded-lg bg-sidebar-accent p-3">
            <h4 className="text-sm font-medium">Need help?</h4>
            <p className="text-xs text-muted-foreground mt-1 mb-2">
              Our AI Assistant can help you with accessibility guidance.
            </p>
            <Button size="sm" className="w-full" asChild>
              <NavLink to="/ai-assistant">Open Assistant</NavLink>
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
}
