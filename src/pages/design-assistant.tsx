import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Paintbrush, EyeOff, Check, Type, Palette, LayoutGrid, Image } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function DesignAssistantPage() {
  const [activeTab, setActiveTab] = useState("color");
  const { toast } = useToast();
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const handleCheckContrast = () => {
    toast({
      title: "Contrast Check Complete",
      description: "Your color combination meets WCAG AA standards.",
    });
  };

  const handleGeneratePalette = () => {
    toast({
      title: "Palette Generated",
      description: "Accessible color palette has been created.",
    });
  };

  const languages = [
    { value: "en", label: "English" },
    { value: "hi", label: "Hindi" },
    { value: "kn", label: "Kannada" },
    { value: "es", label: "Spanish" },
    { value: "fr", label: "French" }
  ];

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-medium mb-2">Design Assistant</h1>
        <p className="text-muted-foreground">
          AI-powered tools to create more accessible and inclusive designs.
        </p>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Content Language</label>
        <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
          <SelectTrigger className="w-full sm:w-[240px]">
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
            {languages.map((language) => (
              <SelectItem key={language.value} value={language.value}>
                {language.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full space-y-6">
        <TabsList className="mb-4">
          <TabsTrigger value="color">Color & Contrast</TabsTrigger>
          <TabsTrigger value="typography">Typography</TabsTrigger>
          <TabsTrigger value="layout">Layout</TabsTrigger>
          <TabsTrigger value="components">Components</TabsTrigger>
        </TabsList>

        <TabsContent value="color" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Color Contrast Checker</CardTitle>
              <CardDescription>
                Check if your text and background colors meet WCAG accessibility standards.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Text Color</label>
                    <div className="flex space-x-2">
                      <div className="h-10 w-10 rounded-md bg-[#1E293B] border"></div>
                      <Input defaultValue="#1E293B" className="flex-1" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Background Color</label>
                    <div className="flex space-x-2">
                      <div className="h-10 w-10 rounded-md bg-[#F8FAFC] border"></div>
                      <Input defaultValue="#F8FAFC" className="flex-1" />
                    </div>
                  </div>
                  <Button onClick={handleCheckContrast} className="w-full">
                    Check Contrast
                  </Button>
                </div>

                <div className="border rounded-lg p-6 flex flex-col items-center justify-center">
                  <div 
                    className="p-6 mb-4 rounded-lg text-center w-full"
                    style={{ 
                      backgroundColor: "#F8FAFC",
                      color: "#1E293B"
                    }}
                  >
                    <span className="text-2xl font-medium">Sample Text</span>
                  </div>
                  
                  <div className="w-full space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Contrast Ratio</span>
                      <Badge className="bg-green-100 text-green-800">14.5:1</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm">WCAG AA (Normal Text)</span>
                      <Check className="h-4 w-4 text-green-600" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm">WCAG AAA (Normal Text)</span>
                      <Check className="h-4 w-4 text-green-600" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm">WCAG AA (Large Text)</span>
                      <Check className="h-4 w-4 text-green-600" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm">WCAG AAA (Large Text)</span>
                      <Check className="h-4 w-4 text-green-600" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Accessible Color Palette Generator</CardTitle>
              <CardDescription>
                Generate a color palette that ensures accessibility for all users, including those with visual impairments.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Primary Brand Color</label>
                  <div className="flex space-x-2">
                    <div className="h-10 w-10 rounded-md bg-[#3B82F6] border"></div>
                    <Input defaultValue="#3B82F6" className="flex-1" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium mb-1">Color Scheme</label>
                    <select className="w-full h-10 px-3 py-2 rounded-md border">
                      <option>Analogous</option>
                      <option>Monochromatic</option>
                      <option>Complementary</option>
                      <option>Triadic</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Contrast Target</label>
                    <select className="w-full h-10 px-3 py-2 rounded-md border">
                      <option>WCAG AA</option>
                      <option>WCAG AAA</option>
                    </select>
                  </div>
                </div>

                <Button onClick={handleGeneratePalette} className="w-full">
                  <Palette className="mr-2 h-4 w-4" />
                  Generate Accessible Palette
                </Button>

                <Separator />

                <div className="grid grid-cols-5 gap-2">
                  {["#1D4ED8", "#3B82F6", "#60A5FA", "#93C5FD", "#DBEAFE"].map((color, i) => (
                    <div key={i} className="space-y-1 text-center">
                      <div 
                        className="h-12 rounded-md border"
                        style={{ backgroundColor: color }}
                      ></div>
                      <div className="text-xs">{color}</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="typography" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Accessible Typography Recommendations</CardTitle>
              <CardDescription>
                Create clear, readable text that works for all users.
                {selectedLanguage === "hi" && " इसमें हिंदी टेक्स्ट भी शामिल है।"}
                {selectedLanguage === "kn" && " ಇದರಲ್ಲಿ ಕನ್ನಡ ಪಠ್ಯವೂ ಸೇರಿದೆ."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Font Family</label>
                      <select className="w-full h-10 px-3 py-2 rounded-md border">
                        <option>Inter</option>
                        <option>Open Sans</option>
                        <option>Roboto</option>
                        <option>Source Sans Pro</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Base Font Size</label>
                      <Input type="number" defaultValue="16" />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Line Height</label>
                      <Input type="number" defaultValue="1.5" step="0.1" />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Letter Spacing</label>
                      <Input type="number" defaultValue="0" step="0.01" />
                    </div>
                    
                    <Button className="w-full">
                      <Type className="mr-2 h-4 w-4" />
                      Update Preview
                    </Button>
                  </div>
                  
                  <div className="border rounded-lg p-6 space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-1">Typography Preview</h3>
                      <p className="text-base">
                        This is an example paragraph showing how your text will look with the selected settings. Good typography is essential for readability and accessibility.
                      </p>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Readability</span>
                        <Badge className="bg-green-100 text-green-800">Excellent</Badge>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Font Size</span>
                        <Badge variant="outline">Compliant</Badge>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Line Height</span>
                        <Badge variant="outline">Compliant</Badge>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Letter Spacing</span>
                        <Badge variant="outline">Compliant</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="layout" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Accessible Layout Analysis</CardTitle>
              <CardDescription>
                Ensure your page structure is accessible and navigable.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button className="w-full">
                  <LayoutGrid className="mr-2 h-4 w-4" />
                  Analyze Layout Structure
                </Button>
                
                <div className="border rounded-lg p-4 bg-gray-50">
                  <p className="text-center text-muted-foreground">
                    Upload or analyze a layout to see recommendations
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="components" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Accessible Components</CardTitle>
              <CardDescription>
                Get pre-built, accessible UI components and code snippets.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {["Navigation", "Forms", "Cards", "Modals", "Tables", "Buttons"].map((component, i) => (
                  <div key={i} className="border rounded-lg p-4 hover:border-primary hover:bg-primary/5 transition-colors cursor-pointer">
                    <h3 className="font-medium">{component}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Accessible {component.toLowerCase()} components
                    </p>
                    <ArrowRight className="h-4 w-4 mt-2 text-primary" />
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
