
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VideoIcon, Upload, Edit, DownloadCloud, Loader2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export default function VideoCaptioningPage() {
  const [activeTab, setActiveTab] = useState("generate");
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [captionsGenerated, setCaptionsGenerated] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setIsUploading(true);
      
      // Simulate upload process
      setTimeout(() => {
        setIsUploading(false);
        toast({
          title: "Upload Complete",
          description: `${e.target.files![0].name} has been uploaded.`,
        });
      }, 2000);
    }
  };

  const handleGenerateCaptions = () => {
    if (!file) return;
    
    setIsProcessing(true);
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      setCaptionsGenerated(true);
      toast({
        title: "Captions Generated",
        description: "Your video captions are ready for review.",
      });
    }, 4000);
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-medium mb-2">Video Captioning</h1>
        <p className="text-muted-foreground">
          Automatically generate accurate captions and subtitles for your videos.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="generate">Generate Captions</TabsTrigger>
          <TabsTrigger value="library">Your Videos</TabsTrigger>
          <TabsTrigger value="settings">Caption Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="generate" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upload Video</CardTitle>
              <CardDescription>
                Upload a video file to generate captions or subtitles.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!file ? (
                <div 
                  className="border-2 border-dashed rounded-lg p-10 text-center cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => document.getElementById("video-upload")?.click()}
                >
                  <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-medium mb-1">Upload Video File</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Drag and drop your video file here, or click to browse
                  </p>
                  <Button variant="outline" size="sm">
                    Select Video
                  </Button>
                  <input 
                    type="file" 
                    id="video-upload" 
                    className="hidden" 
                    accept="video/*"
                    onChange={handleFileChange}
                  />
                  <p className="text-xs text-muted-foreground mt-4">
                    Supported formats: MP4, MOV, AVI, WebM (max 500MB)
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="h-20 w-32 bg-black rounded-md flex items-center justify-center">
                      <VideoIcon className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium">{file.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {(file.size / (1024 * 1024)).toFixed(2)} MB • {file.type}
                      </p>
                      {isUploading ? (
                        <div className="flex items-center mt-1 text-xs text-primary">
                          <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                          Uploading...
                        </div>
                      ) : (
                        <p className="text-xs text-green-600 mt-1">
                          Upload complete
                        </p>
                      )}
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="font-medium">Caption Options</h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Language
                        </label>
                        <select className="w-full h-10 px-3 py-2 rounded-md border">
                          <option>English</option>
                          <option>Spanish</option>
                          <option>French</option>
                          <option>German</option>
                          <option>Japanese</option>
                          <option>Chinese</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Caption Format
                        </label>
                        <select className="w-full h-10 px-3 py-2 rounded-md border">
                          <option>SRT Subtitles</option>
                          <option>VTT Web Subtitles</option>
                          <option>Plain Text Transcript</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 mt-2">
                      <input type="checkbox" id="timestamps" className="rounded" />
                      <label htmlFor="timestamps" className="text-sm">
                        Include timestamps
                      </label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="speaker" className="rounded" />
                      <label htmlFor="speaker" className="text-sm">
                        Identify different speakers
                      </label>
                    </div>
                    
                    <Button 
                      onClick={handleGenerateCaptions} 
                      disabled={isUploading || isProcessing}
                      className="w-full"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing Video...
                        </>
                      ) : (
                        <>
                          <VideoIcon className="mr-2 h-4 w-4" />
                          Generate Captions
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {captionsGenerated && (
            <Card>
              <CardHeader>
                <CardTitle>Generated Captions</CardTitle>
                <CardDescription>
                  Review and edit the automatically generated captions.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="max-h-[400px] overflow-y-auto border rounded-md p-4">
                    <div className="space-y-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="space-y-1">
                          <div className="text-xs text-muted-foreground">
                            {String(i + 1).padStart(2, '0')}:
                            {String(i * 15).padStart(2, '0')} - {String(i + 1).padStart(2, '0')}:
                            {String((i + 1) * 15).padStart(2, '0')}
                          </div>
                          <Textarea 
                            defaultValue={`This is an example of automatically generated captions for segment ${i + 1}. You can edit this text as needed.`} 
                            className="min-h-[60px]"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <Button variant="outline">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit All
                    </Button>
                    <Button>
                      <DownloadCloud className="mr-2 h-4 w-4" />
                      Download Captions
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="library" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Captioned Videos</CardTitle>
              <CardDescription>
                Browse and manage videos you've previously captioned.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <VideoIcon className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground mb-4">
                  You haven't captioned any videos yet
                </p>
                <Button variant="outline" onClick={() => setActiveTab("generate")}>
                  Caption Your First Video
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Caption Settings</CardTitle>
              <CardDescription>
                Configure default settings for your video captions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Default Options</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Default Language
                      </label>
                      <select className="w-full h-10 px-3 py-2 rounded-md border">
                        <option>English</option>
                        <option>Spanish</option>
                        <option>French</option>
                        <option>German</option>
                        <option>Japanese</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Caption Format
                      </label>
                      <select className="w-full h-10 px-3 py-2 rounded-md border">
                        <option>SRT Subtitles</option>
                        <option>VTT Web Subtitles</option>
                        <option>Plain Text Transcript</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="font-medium">Appearance Settings</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Text Color
                      </label>
                      <div className="flex">
                        <Input type="color" defaultValue="#FFFFFF" className="w-12 h-10 p-1" />
                        <Input defaultValue="#FFFFFF" className="flex-1 ml-2" />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Background
                      </label>
                      <div className="flex">
                        <Input type="color" defaultValue="#000000" className="w-12 h-10 p-1" />
                        <Input defaultValue="#000000" className="flex-1 ml-2" />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Opacity
                      </label>
                      <Input type="number" defaultValue="80" min="0" max="100" className="w-full" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Font Size
                      </label>
                      <select className="w-full h-10 px-3 py-2 rounded-md border">
                        <option>Small</option>
                        <option selected>Medium</option>
                        <option>Large</option>
                        <option>Extra Large</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Font Family
                      </label>
                      <select className="w-full h-10 px-3 py-2 rounded-md border">
                        <option>Arial</option>
                        <option>Verdana</option>
                        <option>Helvetica</option>
                        <option>Times New Roman</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <Button className="w-full">
                  Save Default Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
