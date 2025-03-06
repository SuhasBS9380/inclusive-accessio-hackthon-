
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { RefreshCw, Copy, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function TextSimplifierPage() {
  const [inputText, setInputText] = useState("");
  const [simplifiedText, setSimplifiedText] = useState("");
  const [complexity, setComplexity] = useState([3]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleSimplify = () => {
    if (!inputText.trim()) {
      toast({
        title: "Empty Input",
        description: "Please enter some text to simplify.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      // Example simplification based on different complexity levels
      const level = complexity[0];
      let result = "";

      if (level <= 2) {
        // Very simple language
        result = `${inputText.split(/[.!?]/).slice(0, 3).join(". ")}. This content has been greatly simplified for maximum readability.`;
      } else if (level <= 4) {
        // Moderately simple
        result = `${inputText} This text has been simplified to be more accessible.`;
      } else {
        // Minimal changes, focus on clarity
        result = `${inputText} Minor clarifications have been made to improve readability while maintaining the original tone.`;
      }

      setSimplifiedText(result);
      setIsProcessing(false);
      
      toast({
        title: "Text Simplified",
        description: "Your text has been successfully simplified.",
      });
    }, 1500);
  };

  const handleCopy = () => {
    if (!simplifiedText) return;
    
    navigator.clipboard.writeText(simplifiedText);
    setCopied(true);
    
    toast({
      title: "Copied to clipboard",
      description: "The simplified text has been copied to your clipboard.",
    });
    
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setInputText("");
    setSimplifiedText("");
    setComplexity([3]);
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-medium mb-2">Text Simplifier</h1>
        <p className="text-muted-foreground">
          Transform complex text into easy-to-understand language, making it more accessible.
        </p>
      </div>

      <Tabs defaultValue="simplify" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="simplify">Simplify Text</TabsTrigger>
          <TabsTrigger value="about">About This Tool</TabsTrigger>
        </TabsList>
        
        <TabsContent value="simplify" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Original Text</CardTitle>
                <CardDescription>Enter the text you want to simplify</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea 
                  placeholder="Enter your text here..." 
                  className="min-h-[200px]"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                />

                <div className="mt-5 space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <Label htmlFor="complexity">Simplification Level</Label>
                      <span className="text-muted-foreground text-sm">
                        {complexity[0] <= 2 ? "Maximum" : complexity[0] <= 4 ? "Medium" : "Light"}
                      </span>
                    </div>
                    <Slider 
                      id="complexity"
                      min={1} 
                      max={5} 
                      step={1} 
                      value={complexity} 
                      onValueChange={setComplexity} 
                    />
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-muted-foreground">Simpler</span>
                      <span className="text-xs text-muted-foreground">More Original</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button onClick={handleSimplify} disabled={isProcessing || !inputText.trim()}>
                      {isProcessing ? (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                          Simplifying...
                        </>
                      ) : (
                        "Simplify Text"
                      )}
                    </Button>
                    <Button variant="outline" onClick={handleReset}>
                      Reset
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Simplified Text</CardTitle>
                <CardDescription>
                  {simplifiedText ? "Here's your simplified text" : "Your simplified text will appear here"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className={`min-h-[200px] rounded-md border bg-muted/50 p-4 relative ${simplifiedText ? "" : "flex items-center justify-center"}`}>
                  {simplifiedText ? (
                    <p className="whitespace-pre-line">{simplifiedText}</p>
                  ) : (
                    <p className="text-muted-foreground text-center">
                      Enter text and click "Simplify Text" to see the results here
                    </p>
                  )}
                </div>

                <div className="mt-5 flex justify-end">
                  {simplifiedText && (
                    <Button variant="outline" size="sm" onClick={handleCopy}>
                      {copied ? (
                        <>
                          <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="mr-2 h-4 w-4" />
                          Copy to Clipboard
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="about">
          <Card>
            <CardHeader>
              <CardTitle>About Text Simplifier</CardTitle>
              <CardDescription>
                How this tool makes content more accessible
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                The Text Simplifier uses AI to transform complex text into more accessible language, 
                making content understandable for people with cognitive disabilities, 
                language barriers, or those who prefer simpler content.
              </p>
              
              <h3 className="text-lg font-medium mt-4">How it works:</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Enter your text in the input field</li>
                <li>Adjust the simplification level slider</li>
                <li>Click "Simplify Text" to process your content</li>
                <li>Review the simplified version and copy if desired</li>
              </ul>
              
              <h3 className="text-lg font-medium mt-4">Benefits:</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Makes content more accessible to diverse audiences</li>
                <li>Improves comprehension for people with cognitive disabilities</li>
                <li>Helps non-native speakers understand content better</li>
                <li>Creates more inclusive digital experiences</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
