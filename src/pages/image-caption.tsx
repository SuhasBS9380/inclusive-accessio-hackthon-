
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { RefreshCw, Upload, Copy, CheckCircle2, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export default function ImageCaptionPage() {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [caption, setCaption] = useState("");
  const [altText, setAltText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [captionCopied, setCaptionCopied] = useState(false);
  const [altTextCopied, setAltTextCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (jpg, png, etc).",
        variant: "destructive",
      });
      return;
    }

    setImage(file);
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
    
    // Reset results
    setCaption("");
    setAltText("");
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    
    const file = e.dataTransfer.files[0];
    if (!file) return;
    
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (jpg, png, etc).",
        variant: "destructive",
      });
      return;
    }
    
    setImage(file);
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
    
    // Reset results
    setCaption("");
    setAltText("");
  };

  const generateCaption = () => {
    if (!image) {
      toast({
        title: "No image selected",
        description: "Please upload an image first.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      // Example captions based on the image name for demo
      const imageName = image.name.toLowerCase();
      let sampleCaption = "";
      let sampleAltText = "";
      
      if (imageName.includes("cat") || imageName.includes("pet")) {
        sampleCaption = "A close-up photograph of an orange tabby cat with green eyes, sitting on a wooden surface. The cat appears to be relaxed, with its paws tucked underneath its body. The background is slightly blurred, suggesting an indoor home environment with natural lighting coming from a nearby window.";
        sampleAltText = "Orange tabby cat with green eyes sitting on wooden surface";
      } else if (imageName.includes("landscape") || imageName.includes("nature")) {
        sampleCaption = "A stunning landscape photograph capturing a mountainous terrain during sunset. The sun casts a golden glow across the peaks, with purple and orange hues filling the sky. In the foreground, there's a small lake reflecting the colorful sky, surrounded by pine trees and rocky outcrops.";
        sampleAltText = "Mountain landscape at sunset with lake and pine trees";
      } else if (imageName.includes("food") || imageName.includes("meal")) {
        sampleCaption = "An overhead view of a freshly prepared meal on a ceramic plate. The dish consists of grilled salmon with a lemon garnish, steamed asparagus, and a side of wild rice. The plate is set on a wooden table with utensils visible to the side, suggesting a home-cooked dinner ready to be enjoyed.";
        sampleAltText = "Grilled salmon dish with asparagus and wild rice on ceramic plate";
      } else {
        sampleCaption = "This image shows a detailed visual that would benefit from accessibility description. It appears to contain important elements that would be valuable for screen reader users to understand. The composition suggests a professional quality photograph with attention to lighting and framing.";
        sampleAltText = "Visual content requiring accessibility description";
      }
      
      setCaption(sampleCaption);
      setAltText(sampleAltText);
      setIsProcessing(false);
      
      toast({
        title: "Caption generated",
        description: "Your image caption has been successfully generated.",
      });
    }, 2000);
  };

  const handleCopyCaption = () => {
    if (!caption) return;
    
    navigator.clipboard.writeText(caption);
    setCaptionCopied(true);
    
    toast({
      title: "Copied to clipboard",
      description: "The detailed caption has been copied to your clipboard.",
    });
    
    setTimeout(() => setCaptionCopied(false), 2000);
  };

  const handleCopyAltText = () => {
    if (!altText) return;
    
    navigator.clipboard.writeText(altText);
    setAltTextCopied(true);
    
    toast({
      title: "Copied to clipboard",
      description: "The alt text has been copied to your clipboard.",
    });
    
    setTimeout(() => setAltTextCopied(false), 2000);
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-medium mb-2">Image Caption Generator</h1>
        <p className="text-muted-foreground">
          Automatically generate detailed and accurate captions for images to improve web accessibility.
        </p>
      </div>

      <Tabs defaultValue="generate" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="generate">Generate Caption</TabsTrigger>
          <TabsTrigger value="about">About This Tool</TabsTrigger>
        </TabsList>
        
        <TabsContent value="generate" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Upload Image</CardTitle>
                <CardDescription>
                  Upload the image you want to caption
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div 
                  className={cn(
                    "border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center h-64",
                    imagePreview ? "border-muted" : "border-primary/20"
                  )}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  {imagePreview ? (
                    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full">
                      <ImageIcon className="h-10 w-10 mb-4 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground mb-2">
                        Drag and drop an image, or click to browse
                      </p>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Upload className="h-4 w-4 mr-2" /> 
                        Browse Files
                      </Button>
                    </div>
                  )}
                  <input 
                    ref={fileInputRef}
                    type="file" 
                    accept="image/*" 
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button 
                    onClick={generateCaption} 
                    disabled={isProcessing || !image}
                  >
                    {isProcessing ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Generate Caption"
                    )}
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setImage(null);
                      setImagePreview(null);
                      setCaption("");
                      setAltText("");
                      if (fileInputRef.current) {
                        fileInputRef.current.value = "";
                      }
                    }}
                  >
                    Reset
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Generated Content</CardTitle>
                <CardDescription>
                  {caption ? "Use these descriptions for your image" : "Generated captions will appear here"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {!caption && !isProcessing && (
                  <div className="min-h-[200px] flex items-center justify-center">
                    <p className="text-muted-foreground text-center">
                      Upload an image and click "Generate Caption" to see the results
                    </p>
                  </div>
                )}

                {isProcessing && (
                  <div className="min-h-[200px] flex flex-col items-center justify-center gap-4">
                    <RefreshCw className="h-8 w-8 animate-spin text-primary" />
                    <p className="text-muted-foreground">Analyzing image and generating captions...</p>
                  </div>
                )}

                {caption && !isProcessing && (
                  <>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-medium">Detailed Caption</h3>
                          <Badge variant="outline" className="text-xs">
                            For thorough description
                          </Badge>
                        </div>
                        <Button variant="ghost" size="icon" onClick={handleCopyCaption}>
                          {captionCopied ? <CheckCircle2 className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                      <Textarea 
                        readOnly 
                        value={caption} 
                        className="h-[100px] resize-none bg-muted/50"
                      />
                    </div>

                    <Separator />

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-medium">Alt Text</h3>
                          <Badge variant="outline" className="text-xs">
                            For HTML alt attribute
                          </Badge>
                        </div>
                        <Button variant="ghost" size="icon" onClick={handleCopyAltText}>
                          {altTextCopied ? <CheckCircle2 className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                      <Textarea 
                        readOnly 
                        value={altText} 
                        className="h-[60px] resize-none bg-muted/50"
                      />
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="about">
          <Card>
            <CardHeader>
              <CardTitle>About Image Caption Generator</CardTitle>
              <CardDescription>
                How this tool improves image accessibility
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                The Image Caption Generator uses AI to automatically create detailed descriptions and alt text for images,
                making visual content accessible to blind and visually impaired users who rely on screen readers.
              </p>
              
              <h3 className="text-lg font-medium mt-4">How it works:</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Upload an image by dragging and dropping or selecting a file</li>
                <li>Click "Generate Caption" to process your image</li>
                <li>Receive both a detailed caption and shorter alt text</li>
                <li>Copy the descriptions to use in your websites, documents, or social media</li>
              </ul>
              
              <h3 className="text-lg font-medium mt-4">Benefits:</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Makes visual content accessible to screen reader users</li>
                <li>Improves SEO by providing descriptive alt text</li>
                <li>Ensures compliance with accessibility standards like WCAG</li>
                <li>Saves time by automating the caption creation process</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
