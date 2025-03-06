
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Type, Shuffle, Copy, Check, RefreshCw } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

export default function TextResizerPage() {
  const [text, setText] = useState("");
  const [fontSize, setFontSize] = useState(16);
  const [lineHeight, setLineHeight] = useState(1.5);
  const [letterSpacing, setLetterSpacing] = useState(0);
  const [fontWeight, setFontWeight] = useState(400);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("resize");
  const { toast } = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast({
      title: "Copied",
      description: "Text copied to clipboard",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setFontSize(16);
    setLineHeight(1.5);
    setLetterSpacing(0);
    setFontWeight(400);
    toast({
      title: "Reset",
      description: "Text settings have been reset",
    });
  };

  const generateCSS = () => {
    return `font-size: ${fontSize}px;\nline-height: ${lineHeight};\nletter-spacing: ${letterSpacing}px;\nfont-weight: ${fontWeight};`;
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-medium mb-2">Text Resizer</h1>
        <p className="text-muted-foreground">
          Adjust text parameters for improved readability and accessibility.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="resize">Resize & Adjust</TabsTrigger>
          <TabsTrigger value="presets">Accessibility Presets</TabsTrigger>
          <TabsTrigger value="code">Generated Code</TabsTrigger>
        </TabsList>

        <TabsContent value="resize" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Text Input</CardTitle>
              <CardDescription>
                Enter or paste the text you want to resize and adjust.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Enter your text here..."
                rows={5}
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full resize-none"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Text Settings</CardTitle>
              <CardDescription>
                Adjust these parameters to improve readability for different accessibility needs.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-sm font-medium">Font Size</label>
                    <span className="text-sm">{fontSize}px</span>
                  </div>
                  <Slider 
                    value={[fontSize]} 
                    min={8} 
                    max={36}
                    step={1}
                    onValueChange={(value) => setFontSize(value[0])}
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-sm font-medium">Line Height</label>
                    <span className="text-sm">{lineHeight}</span>
                  </div>
                  <Slider 
                    value={[lineHeight * 10]} 
                    min={10} 
                    max={30}
                    step={1}
                    onValueChange={(value) => setLineHeight(value[0] / 10)}
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-sm font-medium">Letter Spacing</label>
                    <span className="text-sm">{letterSpacing}px</span>
                  </div>
                  <Slider 
                    value={[letterSpacing + 5]} 
                    min={0} 
                    max={10}
                    step={0.5}
                    onValueChange={(value) => setLetterSpacing(value[0] - 5)}
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-sm font-medium">Font Weight</label>
                    <span className="text-sm">{fontWeight}</span>
                  </div>
                  <Slider 
                    value={[fontWeight / 100]} 
                    min={1} 
                    max={9}
                    step={1}
                    onValueChange={(value) => setFontWeight(value[0] * 100)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Button variant="outline" onClick={handleReset}>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Reset
                  </Button>
                  <Button onClick={handleCopy} disabled={!text}>
                    {copied ? (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="mr-2 h-4 w-4" />
                        Copy Text
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
              <CardDescription>
                See how your text will look with the current settings.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div 
                className="border rounded-lg p-6 min-h-[150px]"
                style={{
                  fontSize: `${fontSize}px`,
                  lineHeight: lineHeight,
                  letterSpacing: `${letterSpacing}px`,
                  fontWeight: fontWeight
                }}
              >
                {text || "Preview text will appear here. The quick brown fox jumps over the lazy dog."}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="presets" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Accessibility Presets</CardTitle>
              <CardDescription>
                Choose from these presets designed for different accessibility needs.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { 
                    name: "Dyslexia Friendly", 
                    fontSize: 18, 
                    lineHeight: 2, 
                    letterSpacing: 0.5, 
                    fontWeight: 400 
                  },
                  { 
                    name: "Low Vision", 
                    fontSize: 24, 
                    lineHeight: 1.8, 
                    letterSpacing: 1, 
                    fontWeight: 500 
                  },
                  { 
                    name: "High Contrast", 
                    fontSize: 16, 
                    lineHeight: 1.6, 
                    letterSpacing: 0.2, 
                    fontWeight: 700 
                  },
                  { 
                    name: "Cognitive Disability", 
                    fontSize: 18, 
                    lineHeight: 1.8, 
                    letterSpacing: 0.3, 
                    fontWeight: 400 
                  },
                  { 
                    name: "Elderly Friendly", 
                    fontSize: 20, 
                    lineHeight: 1.7, 
                    letterSpacing: 0.5, 
                    fontWeight: 500 
                  },
                  { 
                    name: "ADHD Focus", 
                    fontSize: 16, 
                    lineHeight: 1.9, 
                    letterSpacing: 0.1, 
                    fontWeight: 600 
                  }
                ].map((preset, i) => (
                  <div 
                    key={i} 
                    className="border rounded-lg p-4 hover:border-primary hover:bg-primary/5 transition-colors cursor-pointer"
                    onClick={() => {
                      setFontSize(preset.fontSize);
                      setLineHeight(preset.lineHeight);
                      setLetterSpacing(preset.letterSpacing);
                      setFontWeight(preset.fontWeight);
                      toast({
                        title: "Preset Applied",
                        description: `${preset.name} settings have been applied`,
                      });
                    }}
                  >
                    <h3 className="font-medium mb-1">{preset.name}</h3>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <p>Font size: {preset.fontSize}px</p>
                      <p>Line height: {preset.lineHeight}</p>
                      <p>Letter spacing: {preset.letterSpacing}px</p>
                      <p>Font weight: {preset.fontWeight}</p>
                    </div>
                    <div 
                      className="mt-3 text-sm border-t pt-2"
                      style={{
                        fontSize: `${preset.fontSize}px`,
                        lineHeight: preset.lineHeight,
                        letterSpacing: `${preset.letterSpacing}px`,
                        fontWeight: preset.fontWeight
                      }}
                    >
                      Sample text
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="code" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Generated CSS</CardTitle>
              <CardDescription>
                Use this CSS code to apply these text settings to your website.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-muted rounded-md p-4 font-mono text-sm overflow-x-auto">
                  {generateCSS()}
                </div>
                <Button onClick={() => {
                  navigator.clipboard.writeText(generateCSS());
                  toast({
                    title: "CSS Copied",
                    description: "CSS code copied to clipboard",
                  });
                }}>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy CSS
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>HTML Example</CardTitle>
              <CardDescription>
                See how to implement these text styles in HTML.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-muted rounded-md p-4 font-mono text-sm overflow-x-auto">
                  {`<p style="
  font-size: ${fontSize}px;
  line-height: ${lineHeight};
  letter-spacing: ${letterSpacing}px;
  font-weight: ${fontWeight};
">
  ${text || "Your text here"}
</p>`}
                </div>
                <Button onClick={() => {
                  const html = `<p style="
  font-size: ${fontSize}px;
  line-height: ${lineHeight};
  letter-spacing: ${letterSpacing}px;
  font-weight: ${fontWeight};
">
  ${text || "Your text here"}
</p>`;
                  navigator.clipboard.writeText(html);
                  toast({
                    title: "HTML Copied",
                    description: "HTML code copied to clipboard",
                  });
                }}>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy HTML
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
