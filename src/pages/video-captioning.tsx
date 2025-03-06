import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { FileVideo, Upload, Type, Download, Play, Pause, SkipBack, Clock, Languages } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export default function VideoCaptioningPage() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [captions, setCaptions] = useState<string>("");
  const [language, setLanguage] = useState<string>("en");
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith("video/")) {
        setVideoFile(file);
        const videoUrl = URL.createObjectURL(file);
        setVideoPreview(videoUrl);
        setCaptions(""); // Reset captions when new video is uploaded
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload a video file.",
          variant: "destructive",
        });
      }
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const generateCaptions = async () => {
    if (!videoFile) {
      toast({
        title: "No video selected",
        description: "Please upload a video to generate captions.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      // Call the Supabase Edge Function for caption generation
      const { data, error } = await supabase.functions.invoke('generate-captions', {
        body: {
          videoUrl: videoPreview,
          language: language
        }
      });

      if (error) {
        throw error;
      }

      setCaptions(data.captions);
      toast({
        title: "Captions generated",
        description: "Video captions have been successfully generated.",
      });
    } catch (error) {
      console.error("Error generating captions:", error);
      toast({
        title: "Error",
        description: "Failed to generate captions. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleRestart = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      setCurrentTime(0);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const downloadCaptions = () => {
    if (!captions) {
      toast({
        title: "No captions",
        description: "Generate captions first before downloading.",
        variant: "destructive",
      });
      return;
    }

    const blob = new Blob([captions], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'captions.srt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Captions downloaded",
      description: "Captions have been downloaded as an SRT file.",
    });
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-medium mb-2">Video Captioning</h1>
        <p className="text-muted-foreground">
          Generate accurate captions for your videos to enhance accessibility.
        </p>
      </div>

      <Tabs defaultValue="caption" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="caption">Generate Captions</TabsTrigger>
          <TabsTrigger value="editor">Caption Editor</TabsTrigger>
          <TabsTrigger value="about">About This Tool</TabsTrigger>
        </TabsList>

        <TabsContent value="caption" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Upload Video</CardTitle>
                <CardDescription>
                  Upload a video file to generate captions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  className="hidden"
                />
                
                <div
                  className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={handleUploadClick}
                >
                  {videoPreview ? (
                    <div className="space-y-4">
                      <video
                        ref={videoRef}
                        src={videoPreview}
                        className="mx-auto max-h-[240px] rounded-md"
                        onTimeUpdate={handleTimeUpdate}
                        onEnded={() => setIsPlaying(false)}
                      />
                      <div className="flex items-center justify-center gap-2">
                        <Button variant="outline" size="icon" onClick={(e) => { e.stopPropagation(); handleRestart(); }}>
                          <SkipBack className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" onClick={(e) => { e.stopPropagation(); handlePlayPause(); }}>
                          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                        </Button>
                        <span className="text-sm text-muted-foreground ml-2">
                          <Clock className="h-4 w-4 inline mr-1" />
                          {formatTime(currentTime)}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <FileVideo className="mx-auto h-12 w-12 text-muted-foreground mb-2" />
                      <p className="text-muted-foreground mb-2">Drag and drop your video file here or click to browse</p>
                      <p className="text-xs text-muted-foreground">Supports MP4, WebM, and other common video formats</p>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <div>
                    <Label htmlFor="language">Caption Language</Label>
                    <Select
                      value={language}
                      onValueChange={setLanguage}
                    >
                      <SelectTrigger id="language" className="w-full">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="kn">ಕನ್ನಡ (Kannada)</SelectItem>
                        <SelectItem value="hi">हिन्दी (Hindi)</SelectItem>
                        <SelectItem value="es">Español</SelectItem>
                        <SelectItem value="fr">Français</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button 
                    onClick={generateCaptions} 
                    disabled={!videoFile || isProcessing}
                    className="w-full"
                  >
                    {isProcessing ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing Video...
                      </>
                    ) : (
                      <>
                        <Type className="mr-2 h-4 w-4" />
                        Generate Captions
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Generated Captions</CardTitle>
                <CardDescription>
                  Review and download the auto-generated captions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="min-h-[240px] border rounded-md p-4 overflow-y-auto">
                  {captions ? (
                    <pre className="whitespace-pre-wrap text-sm font-mono">{captions}</pre>
                  ) : (
                    <div className="h-full flex items-center justify-center">
                      <p className="text-muted-foreground text-center">
                        Captions will appear here after generation
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={downloadCaptions} disabled={!captions}>
                    <Download className="mr-2 h-4 w-4" />
                    Download SRT
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="editor" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Caption Editor</CardTitle>
              <CardDescription>
                Edit and refine your video captions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="caption-editor">Edit Captions</Label>
                  <Textarea
                    id="caption-editor"
                    className="font-mono min-h-[300px]"
                    placeholder="Paste or edit captions here..."
                    value={captions}
                    onChange={(e) => setCaptions(e.target.value)}
                  />
                </div>
                <div className="space-y-4">
                  <Label>Preview</Label>
                  {videoPreview ? (
                    <video
                      src={videoPreview}
                      controls
                      className="w-full rounded-md max-h-[200px]"
                    />
                  ) : (
                    <div className="border rounded-md p-4 h-[200px] flex items-center justify-center">
                      <p className="text-muted-foreground">No video loaded</p>
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <Label>Translation Options</Label>
                    <Select defaultValue="en">
                      <SelectTrigger>
                        <SelectValue placeholder="Translate to..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="kn">ಕನ್ನಡ (Kannada)</SelectItem>
                        <SelectItem value="hi">हिन्दी (Hindi)</SelectItem>
                        <SelectItem value="es">Español</SelectItem>
                        <SelectItem value="fr">Français</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Button className="w-full">
                      <Languages className="mr-2 h-4 w-4" />
                      Translate Captions
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="about">
          <Card>
            <CardHeader>
              <CardTitle>About Video Captioning</CardTitle>
              <CardDescription>
                How this tool improves accessibility through accurate video captions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Our Video Captioning tool uses advanced speech recognition technology to automatically 
                generate accurate captions for your videos. This makes your content more accessible 
                to people who are deaf or hard of hearing, and improves the viewing experience in 
                sound-sensitive environments.
              </p>
              
              <h3 className="text-lg font-medium mt-4">Why Video Captioning Matters:</h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Makes content accessible to people with hearing disabilities</li>
                <li>Helps viewers in noisy environments understand your content</li>
                <li>Improves comprehension for non-native speakers</li>
                <li>Boosts SEO as search engines can index caption text</li>
                <li>Supports multilingual audiences with translation options</li>
              </ul>
              
              <h3 className="text-lg font-medium mt-4">Supported Languages:</h3>
              <p>
                Our captioning tool supports multiple languages including English, ಕನ್ನಡ (Kannada), 
                हिन्दी (Hindi), Español, and Français, with more being added regularly.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
