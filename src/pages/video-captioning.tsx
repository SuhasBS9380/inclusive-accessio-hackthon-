
import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Video, Upload, Languages, Check, Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/auth-context";

export default function VideoCaptioningPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("upload");
  const [language, setLanguage] = useState("en");
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [captions, setCaptions] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { user } = useAuth();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith('video/')) {
        setSelectedFile(file);
        const objectUrl = URL.createObjectURL(file);
        setVideoUrl(objectUrl);
        setActiveTab("preview");
        toast({
          title: "Video Selected",
          description: `File: ${file.name}`,
        });
      } else {
        toast({
          title: "Invalid File Type",
          description: "Please select a valid video file.",
          variant: "destructive",
        });
      }
    }
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const languageOptions = [
    { value: "en", label: "English" },
    { value: "hi", label: "Hindi" },
    { value: "kn", label: "Kannada" },
    { value: "es", label: "Spanish" },
    { value: "fr", label: "French" },
    { value: "de", label: "German" },
    { value: "ja", label: "Japanese" },
    { value: "zh", label: "Chinese" },
  ];

  const getLabelForLanguage = (code: string) => {
    return languageOptions.find(option => option.value === code)?.label || code;
  };

  const simulateProgress = () => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 5;
      setProgress(currentProgress);
      
      if (currentProgress >= 100) {
        clearInterval(interval);
        
        // Small delay to show 100% before completing
        setTimeout(() => {
          setIsGenerating(false);
          setActiveTab("captions");
          toast({
            title: "Captions Generated",
            description: `Captions for ${selectedFile?.name} have been generated.`,
          });
        }, 500);
      }
    }, 300);
  };

  const generateCaptions = async () => {
    if (!selectedFile || !user) {
      toast({
        title: "Error",
        description: "Please select a video file and ensure you're logged in.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    setProgress(0);
    setCaptions("");

    try {
      // Upload the video to Supabase Storage
      const fileName = `${user.id}/${Date.now()}-${selectedFile.name}`;
      const { error: uploadError } = await supabase.storage
        .from('videos')
        .upload(fileName, selectedFile);

      if (uploadError) {
        throw new Error(uploadError.message);
      }

      // Get the public URL
      const { data: urlData } = supabase.storage
        .from('videos')
        .getPublicUrl(fileName);

      // Call the edge function to generate captions
      simulateProgress(); // This simulates the progress while we're "generating" captions

      // Simulate API response (in a real app, this would come from the edge function)
      setTimeout(async () => {
        // Generate some example captions based on language
        let sampleCaptions = "";
        if (language === "en") {
          sampleCaptions = "This is a sample English caption.\nThe video shows important content.\nThank you for watching.";
        } else if (language === "hi") {
          sampleCaptions = "यह एक नमूना हिंदी कैप्शन है।\nवीडियो महत्वपूर्ण सामग्री दिखाता है।\nदेखने के लिए धन्यवाद।";
        } else if (language === "kn") {
          sampleCaptions = "ಇದು ಮಾದರಿ ಕನ್ನಡ ಶೀರ್ಷಿಕೆಯಾಗಿದೆ.\nವೀಡಿಯೊ ಮಹತ್ವದ ವಿಷಯವನ್ನು ತೋರಿಸುತ್ತದೆ.\nವೀಕ್ಷಿಸಿದ್ದಕ್ಕೆ ಧನ್ಯವಾದಗಳು.";
        } else {
          sampleCaptions = `This is a sample caption in ${getLabelForLanguage(language)}.\nThe video shows important content.\nThank you for watching.`;
        }
        
        setCaptions(sampleCaptions);
        
        // Save the captions to the database
        const { error: dbError } = await supabase
          .from('video_captions')
          .insert({
            user_id: user.id,
            video_name: selectedFile.name,
            language: language,
            caption_text: sampleCaptions
          });
          
        if (dbError) {
          console.error("Error saving captions:", dbError);
          toast({
            title: "Error Saving Captions",
            description: dbError.message,
            variant: "destructive",
          });
        }
      }, 5000);
    } catch (error) {
      console.error("Error:", error);
      setIsGenerating(false);
      toast({
        title: "Error Generating Captions",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    }
  };

  const handleDownload = () => {
    if (!captions) return;
    
    const blob = new Blob([captions], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `captions-${selectedFile?.name.split('.')[0] || 'video'}.srt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Captions Downloaded",
      description: "The caption file has been downloaded successfully.",
    });
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-medium mb-2">Video Captioning</h1>
        <p className="text-muted-foreground">
          Generate accessibility-focused captions for your videos in multiple languages.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full space-y-6">
        <TabsList className="mb-4">
          <TabsTrigger value="upload">Upload</TabsTrigger>
          <TabsTrigger value="preview" disabled={!videoUrl}>Preview</TabsTrigger>
          <TabsTrigger value="captions" disabled={!captions}>Captions</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upload Video</CardTitle>
              <CardDescription>
                Select a video file to generate captions. We support most video formats.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted/50 border-2 border-dashed border-muted-foreground/20 rounded-lg p-10 text-center">
                <Video className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
                <h3 className="font-medium mb-2">Drop your video here or browse</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  MP4, MOV, AVI, or WEBM files up to 500MB
                </p>
                <Input
                  ref={fileInputRef}
                  type="file"
                  accept="video/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <Button onClick={handleUploadClick}>
                  <Upload className="h-4 w-4 mr-2" />
                  Select Video
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Preview Video</CardTitle>
              <CardDescription>
                Review your video and select language for captioning.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="aspect-video bg-black rounded-lg overflow-hidden">
                  {videoUrl && (
                    <video
                      ref={videoRef}
                      src={videoUrl}
                      className="w-full h-full"
                      controls
                    ></video>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Caption Language</label>
                    <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        {languageOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button 
                    onClick={generateCaptions} 
                    disabled={isGenerating || !user}
                    className="h-10"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Generating Captions...
                      </>
                    ) : (
                      <>
                        <Languages className="h-4 w-4 mr-2" />
                        Generate Captions
                      </>
                    )}
                  </Button>
                </div>

                {isGenerating && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Processing video...</span>
                      <span>{progress}%</span>
                    </div>
                    <Progress value={progress} />
                    <p className="text-xs text-muted-foreground">
                      This may take a few minutes depending on the video length.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="captions" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Generated Captions</CardTitle>
                  <CardDescription>
                    Review and edit the generated captions as needed.
                  </CardDescription>
                </div>
                <Badge variant="outline" className="ml-2">
                  {getLabelForLanguage(language)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Textarea 
                  value={captions} 
                  onChange={(e) => setCaptions(e.target.value)}
                  className="font-mono min-h-[200px]"
                />
                
                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setActiveTab("preview")}>
                    Back to Video
                  </Button>
                  <Button onClick={handleDownload}>
                    <Check className="h-4 w-4 mr-2" />
                    Download Captions
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
