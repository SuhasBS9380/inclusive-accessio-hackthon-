
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Wand2, ImagePlus, Download, RefreshCcw, Loader2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

export default function TextToImagePage() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("generate");
  const { toast } = useToast();

  const handleGenerate = () => {
    if (!prompt.trim()) {
      toast({
        title: "Error",
        description: "Please enter a text description for the image",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => {
      setIsGenerating(false);
      // Sample image URL - replace with actual API call in production
      setGeneratedImage("https://images.unsplash.com/photo-1610337673044-720471f83677?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8");
      toast({
        title: "Success",
        description: "Image generated successfully",
      });
    }, 3000);
  };

  const handleDownload = () => {
    if (generatedImage) {
      const link = document.createElement("a");
      link.href = generatedImage;
      link.download = "generated-image.jpg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Download Started",
        description: "Your image is downloading",
      });
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-medium mb-2">Text to Image</h1>
        <p className="text-muted-foreground">
          Generate accessible images from textual descriptions.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="generate">Generate Image</TabsTrigger>
          <TabsTrigger value="library">Your Library</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="generate" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Create Image from Text</CardTitle>
              <CardDescription>
                Describe what you want to see, and our AI will generate an image for you.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="prompt" className="block text-sm font-medium mb-1">
                      Text Description
                    </label>
                    <Textarea
                      id="prompt"
                      placeholder="Describe the image you want to generate..."
                      rows={5}
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      className="resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Style Options
                    </label>
                    <select className="w-full h-10 px-3 py-2 rounded-md border">
                      <option>Realistic</option>
                      <option>Artistic</option>
                      <option>Abstract</option>
                      <option>Cartoon</option>
                      <option>3D Render</option>
                    </select>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-sm font-medium">
                        Detail Level
                      </label>
                      <span className="text-xs text-muted-foreground">70%</span>
                    </div>
                    <Slider defaultValue={[70]} max={100} step={1} />
                  </div>

                  <Button 
                    onClick={handleGenerate} 
                    disabled={isGenerating} 
                    className="w-full"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Wand2 className="mr-2 h-4 w-4" />
                        Generate Image
                      </>
                    )}
                  </Button>
                </div>

                <div className="border rounded-lg flex items-center justify-center p-4 min-h-[300px]">
                  {generatedImage ? (
                    <div className="space-y-4 w-full">
                      <img 
                        src={generatedImage} 
                        alt={prompt} 
                        className="rounded-md max-h-[280px] mx-auto"
                      />
                      <div className="flex justify-between">
                        <Button variant="outline" onClick={() => setGeneratedImage(null)}>
                          <RefreshCcw className="mr-2 h-4 w-4" />
                          New Image
                        </Button>
                        <Button onClick={handleDownload}>
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <ImagePlus className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                      <p className="text-muted-foreground">
                        Your generated image will appear here
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Accessibility Features</CardTitle>
              <CardDescription>
                Enhance your generated images with accessibility options.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="border rounded-md p-4">
                    <h3 className="font-medium mb-2">Auto Alt Text</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Automatically generate descriptive alt text for your images.
                    </p>
                    <Button variant="outline" className="w-full" disabled={!generatedImage}>
                      Generate Alt Text
                    </Button>
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <h3 className="font-medium mb-2">Color Contrast Check</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Ensure your image has sufficient contrast for visibility.
                    </p>
                    <Button variant="outline" className="w-full" disabled={!generatedImage}>
                      Check Contrast
                    </Button>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium mb-2">Image Description</h3>
                  <Textarea 
                    placeholder="Enter or edit the description for this image..." 
                    rows={3} 
                    disabled={!generatedImage}
                    defaultValue={prompt}
                    className="resize-none"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="library" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Generated Images</CardTitle>
              <CardDescription>
                Browse and manage images you've previously created.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <ImagePlus className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground mb-4">
                  You haven't generated any images yet
                </p>
                <Button variant="outline" onClick={() => setActiveTab("generate")}>
                  Create Your First Image
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Image Templates</CardTitle>
              <CardDescription>
                Pre-defined templates to help you get started quickly.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  "Profile Picture", 
                  "Social Media Post", 
                  "Banner Image", 
                  "Icon Set", 
                  "Illustration", 
                  "Diagram"
                ].map((template, i) => (
                  <div key={i} className="border rounded-lg p-4 hover:border-primary hover:bg-primary/5 transition-colors cursor-pointer">
                    <h3 className="font-medium">{template}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {template} template with accessibility features
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
