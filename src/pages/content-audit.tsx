
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ClipboardCheck, AlertCircle, CheckCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

export default function ContentAuditPage() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [auditComplete, setAuditComplete] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) {
      toast({
        title: "URL Required",
        description: "Please enter a valid URL to audit.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    // Simulate API call with setTimeout
    setTimeout(() => {
      setIsLoading(false);
      setAuditComplete(true);
      toast({
        title: "Audit Complete",
        description: "Content audit has been successfully completed.",
      });
    }, 3000);
  };

  const resetAudit = () => {
    setAuditComplete(false);
    setUrl("");
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-medium mb-2">Content Audit</h1>
        <p className="text-muted-foreground">
          Analyze your content for accessibility issues and get recommendations for improvement.
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Run Accessibility Audit</CardTitle>
        </CardHeader>
        <CardContent>
          {!auditComplete ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="url" className="block text-sm font-medium mb-1">
                  Website URL
                </label>
                <Input
                  id="url"
                  placeholder="https://example.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full"
                />
              </div>
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <>
                    <span className="mr-2">Running Audit...</span>
                    <div className="h-4 w-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                  </>
                ) : (
                  <>
                    <ClipboardCheck className="mr-2 h-4 w-4" />
                    Start Content Audit
                  </>
                )}
              </Button>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Audit Results for {url}</h3>
                  <p className="text-sm text-muted-foreground">Completed on {new Date().toLocaleDateString()}</p>
                </div>
                <Button variant="outline" onClick={resetAudit}>
                  New Audit
                </Button>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Overall Accessibility Score</span>
                  <span className="font-medium">78/100</span>
                </div>
                <Progress value={78} className="h-2" />
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h4 className="font-medium">Key Findings</h4>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 border rounded-md bg-amber-50 border-amber-200">
                    <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                    <div>
                      <h5 className="font-medium">Missing Alt Text</h5>
                      <p className="text-sm">12 images are missing alternative text descriptions.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 border rounded-md bg-red-50 border-red-200">
                    <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                    <div>
                      <h5 className="font-medium">Color Contrast Issues</h5>
                      <p className="text-sm">8 elements have insufficient contrast ratio for text readability.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 border rounded-md bg-green-50 border-green-200">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <h5 className="font-medium">Good Header Structure</h5>
                      <p className="text-sm">Proper heading hierarchy is maintained throughout the content.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-3">Compliance Analysis</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="border rounded-md p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">WCAG 2.1 AA</span>
                      <Badge variant="outline" className="bg-amber-100">Partial</Badge>
                    </div>
                    <Progress value={72} className="h-2 mb-2" />
                    <p className="text-xs text-muted-foreground">
                      72% compliant with 8 failures detected
                    </p>
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Section 508</span>
                      <Badge variant="outline" className="bg-green-100">Mostly Compliant</Badge>
                    </div>
                    <Progress value={85} className="h-2 mb-2" />
                    <p className="text-xs text-muted-foreground">
                      85% compliant with 3 failures detected
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3">
                <Button variant="outline">Download Report</Button>
                <Button>View Detailed Results</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
