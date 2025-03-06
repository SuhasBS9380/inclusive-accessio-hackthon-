
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  BarChart3, 
  Calendar,
  CheckCircle2, 
  ClipboardList, 
  Star,
  Trophy,
  Type, 
  Image as ImageIcon, 
  MessageSquare
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");

  // Simulate recent projects
  const recentProjects = [
    { 
      name: "Website Accessibility Audit", 
      date: "2 days ago", 
      score: 86,
      type: "Content Audit" 
    },
    { 
      name: "About Us Page Text", 
      date: "3 days ago", 
      score: 92,
      type: "Text Simplification" 
    },
    { 
      name: "Marketing Campaign Images", 
      date: "1 week ago", 
      score: 78,
      type: "Image Captioning" 
    }
  ];

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-medium mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Track your accessibility improvements and manage your projects.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="projects">My Projects</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Average Accessibility Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">85%</div>
                <p className="text-xs text-muted-foreground mt-1">+12% from last month</p>
                <Progress value={85} className="h-2 mt-3" />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Projects
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">12</div>
                <p className="text-xs text-muted-foreground mt-1">3 active projects</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Content Simplified
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">28</div>
                <p className="text-xs text-muted-foreground mt-1">5,432 words processed</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Images Captioned
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">47</div>
                <p className="text-xs text-muted-foreground mt-1">Last captioned 2 days ago</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Recent Projects</CardTitle>
                <CardDescription>
                  Your most recently modified accessibility projects
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentProjects.map((project, index) => (
                    <div key={index} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                      <div>
                        <div className="font-medium">{project.name}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline">{project.type}</Badge>
                          <span className="text-xs text-muted-foreground">{project.date}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-sm font-medium">
                          Score: {project.score}
                        </div>
                        <div className={`h-2 w-2 rounded-full ${
                          project.score >= 90 ? "bg-green-500" : 
                          project.score >= 70 ? "bg-amber-500" : "bg-red-500"
                        }`} />
                      </div>
                    </div>
                  ))}
                </div>
                
                <Button variant="outline" className="w-full mt-4" asChild>
                  <Link to="/projects">View All Projects</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Accessibility Tools</CardTitle>
                <CardDescription>
                  Quick access to essential tools
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start text-sm h-auto py-3" asChild>
                    <Link to="/text-simplifier">
                      <Type className="mr-2 h-4 w-4 text-primary" />
                      <div className="flex flex-col items-start">
                        <span>Text Simplifier</span>
                        <span className="text-xs text-muted-foreground">Simplify complex text</span>
                      </div>
                      <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground" />
                    </Link>
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start text-sm h-auto py-3" asChild>
                    <Link to="/image-caption">
                      <ImageIcon className="mr-2 h-4 w-4 text-primary" />
                      <div className="flex flex-col items-start">
                        <span>Image Caption</span>
                        <span className="text-xs text-muted-foreground">Generate image descriptions</span>
                      </div>
                      <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground" />
                    </Link>
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start text-sm h-auto py-3" asChild>
                    <Link to="/ai-assistant">
                      <MessageSquare className="mr-2 h-4 w-4 text-primary" />
                      <div className="flex flex-col items-start">
                        <span>AI Assistant</span>
                        <span className="text-xs text-muted-foreground">Get accessibility guidance</span>
                      </div>
                      <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="projects" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>My Projects</CardTitle>
                <Button size="sm">New Project</Button>
              </div>
              <CardDescription>
                Manage all your accessibility projects
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all">
                <TabsList className="grid w-full grid-cols-4 mb-4">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="text">Text</TabsTrigger>
                  <TabsTrigger value="image">Image</TabsTrigger>
                  <TabsTrigger value="audit">Audits</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all" className="space-y-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div 
                      key={i} 
                      className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center 
                          ${i % 3 === 0 ? "bg-primary/10" : i % 3 === 1 ? "bg-amber-500/10" : "bg-green-500/10"}`}
                        >
                          {i % 3 === 0 ? (
                            <Type className="h-5 w-5 text-primary" />
                          ) : i % 3 === 1 ? (
                            <ImageIcon className="h-5 w-5 text-amber-500" />
                          ) : (
                            <ClipboardList className="h-5 w-5 text-green-500" />
                          )}
                        </div>
                        <div>
                          <div className="font-medium">
                            {i % 3 === 0 ? "Product Description Text" : 
                             i % 3 === 1 ? "Blog Post Images" : 
                             "Homepage Accessibility Audit"}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-muted-foreground">
                              {i % 3 === 0 ? "Text Simplification" : 
                               i % 3 === 1 ? "Image Captioning" : 
                               "Content Audit"}
                            </span>
                            <span className="text-xs text-muted-foreground">•</span>
                            <span className="text-xs text-muted-foreground">
                              Last updated {i + 1} day{i !== 0 ? "s" : ""} ago
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </TabsContent>
                
                <TabsContent value="text" className="flex items-center justify-center py-8 text-muted-foreground">
                  Text projects will be displayed here
                </TabsContent>
                
                <TabsContent value="image" className="flex items-center justify-center py-8 text-muted-foreground">
                  Image projects will be displayed here
                </TabsContent>
                
                <TabsContent value="audit" className="flex items-center justify-center py-8 text-muted-foreground">
                  Audit projects will be displayed here
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <CardTitle>Achievements</CardTitle>
                <Badge variant="secondary">3/15 Completed</Badge>
              </div>
              <CardDescription>
                Track your progress and earn rewards for improving accessibility
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  {
                    title: "Getting Started",
                    description: "Complete your first accessibility project",
                    icon: <CheckCircle2 className="h-5 w-5 text-primary" />,
                    completed: true
                  },
                  {
                    title: "Text Master",
                    description: "Simplify 10 complex texts",
                    icon: <Type className="h-5 w-5 text-primary" />,
                    completed: true
                  },
                  {
                    title: "Image Wizard",
                    description: "Caption 15 images for accessibility",
                    icon: <ImageIcon className="h-5 w-5 text-muted-foreground" />,
                    completed: false,
                    progress: 60
                  },
                  {
                    title: "Consistency Champion",
                    description: "Use the platform for 7 consecutive days",
                    icon: <Calendar className="h-5 w-5 text-muted-foreground" />,
                    completed: false,
                    progress: 40
                  },
                  {
                    title: "Accessibility Advocate",
                    description: "Share 5 accessibility reports",
                    icon: <BarChart3 className="h-5 w-5 text-muted-foreground" />,
                    completed: false,
                    progress: 20
                  },
                  {
                    title: "Perfect Score",
                    description: "Achieve a 100% accessibility score",
                    icon: <Star className="h-5 w-5 text-primary" />,
                    completed: true
                  }
                ].map((achievement, i) => (
                  <div
                    key={i}
                    className={`rounded-lg border p-4 ${
                      achievement.completed 
                        ? "bg-primary/5 border-primary/20" 
                        : "bg-card"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="h-10 w-10 rounded-full flex items-center justify-center bg-background">
                        {achievement.icon}
                      </div>
                      {achievement.completed && (
                        <Badge variant="default" className="bg-primary">Completed</Badge>
                      )}
                    </div>
                    <h3 className="font-medium mt-2">{achievement.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {achievement.description}
                    </p>
                    {!achievement.completed && achievement.progress && (
                      <div className="mt-3">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span>{achievement.progress}% complete</span>
                        </div>
                        <Progress value={achievement.progress} className="h-1.5" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-amber-500" />
                Accessibility Champion Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Overall Progress</span>
                    <span className="text-sm">Level 2</span>
                  </div>
                  <Progress value={32} className="h-2" />
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-muted-foreground">1,250 XP</span>
                    <span className="text-xs text-muted-foreground">4,000 XP to Level 3</span>
                  </div>
                </div>
                
                <Separator />
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Text Accessibility</div>
                    <Progress value={75} className="h-1.5" />
                    <div className="text-xs text-muted-foreground">Advanced</div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Image Accessibility</div>
                    <Progress value={45} className="h-1.5" />
                    <div className="text-xs text-muted-foreground">Intermediate</div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Content Auditing</div>
                    <Progress value={20} className="h-1.5" />
                    <div className="text-xs text-muted-foreground">Beginner</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
