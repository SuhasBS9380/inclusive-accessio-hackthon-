
import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, Camera, CameraOff } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useAuth } from "@/context/auth-context";
import { Navigate } from "react-router-dom";

export default function EmotionDetectorPage() {
  const { user } = useAuth();
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Only load scripts if the component is mounted
    if (typeof window === "undefined") return;

    // Load MorphCast SDK scripts
    const loadScripts = async () => {
      try {
        // Load MorphTools script
        const mphToolsScript = document.createElement("script");
        mphToolsScript.src = "https://sdk.morphcast.com/mphtools/v1.1/mphtools.js";
        mphToolsScript.setAttribute("data-config", "cameraPrivacyPopup, compatibilityUI, compatibilityAutoCheck");
        document.body.appendChild(mphToolsScript);

        // Wait for MorphTools to load
        await new Promise<void>((resolve) => {
          mphToolsScript.onload = () => resolve();
        });

        // Load AI SDK script
        const aiSdkScript = document.createElement("script");
        aiSdkScript.src = "https://ai-sdk.morphcast.com/v1.16/ai-sdk.js";
        document.body.appendChild(aiSdkScript);

        // Wait for AI SDK to load
        await new Promise<void>((resolve) => {
          aiSdkScript.onload = () => resolve();
        });

        // Load overlay script
        const overlayScript = document.createElement("script");
        overlayScript.src = "https://sdk.morphcast.com/mphoverlay/v0.1/mph-ai-overlay.js";
        overlayScript.type = "module";
        document.body.appendChild(overlayScript);

        // Initialize MorphCast when scripts are loaded
        if (window.CY && window.MphTools) {
          // Set privacy text
          window.MphTools.CameraPrivacyPopup.setText({
            title: "Allow us to use your camera",
            description: "This experience is designed to be viewed with your camera on. The next screen will ask your consent to access data from your camera.",
            url: window.location.origin + "/privacy-policy"
          });

          // Add event listener for barrier events
          window.addEventListener(window.CY.modules().EVENT_BARRIER.eventName, (evt) => {
            console.log('EVENT_BARRIER result', evt.detail);
          });
        }
      } catch (err) {
        console.error("Error loading scripts:", err);
        setError("Failed to load emotion detection libraries. Please try again.");
      }
    };

    loadScripts();

    // Clean up scripts when component unmounts
    return () => {
      const scripts = document.querySelectorAll("script[src*='morphcast']");
      scripts.forEach(script => script.remove());
      
      // Stop camera if active
      if (cameraActive && videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
        setCameraActive(false);
      }
    };
  }, []);

  const startCamera = async () => {
    try {
      if (!window.CY) {
        setError("Emotion detection SDK not loaded. Please refresh the page.");
        return;
      }

      await window.CY.loader()
        .licenseKey("skfb39eae74b310530ff197b871637ac71c55d3fb017e7")
        .addModule(window.CY.modules().FACE_EMOTION.name, { smoothness: 0.40 })
        .load()
        .then(({ start }) => {
          start();
          
          // Get the camera stream
          navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
              if (videoRef.current) {
                // Set the video source to the camera stream
                videoRef.current.srcObject = stream;
                setCameraActive(true);
                setError(null);
              }
            })
            .catch(error => {
              console.error('Error getting camera stream:', error);
              setError("Camera access denied. Please allow camera access in your browser settings.");
            });
        });
    } catch (err) {
      console.error("Error starting camera:", err);
      setError("Failed to start emotion detection. Please try again.");
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setCameraActive(false);
    }
  };

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/auth" />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Emotion Detector</h1>
          <p className="text-muted-foreground">
            Use your camera to detect facial emotions in real-time
          </p>
        </div>
        <Button 
          variant={cameraActive ? "destructive" : "default"}
          onClick={cameraActive ? stopCamera : startCamera}
          className="flex items-center gap-2"
        >
          {cameraActive ? (
            <>
              <CameraOff className="h-4 w-4" />
              Stop Camera
            </>
          ) : (
            <>
              <Camera className="h-4 w-4" />
              Start Camera
            </>
          )}
        </Button>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Live Emotion Analysis</CardTitle>
          <CardDescription>
            Your facial expressions will be analyzed in real-time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div 
            id="video-container" 
            ref={containerRef}
            className="w-full max-w-2xl h-[480px] mx-auto border rounded-lg overflow-hidden bg-black relative"
          >
            <video 
              id="video" 
              ref={videoRef}
              width="100%" 
              height="100%" 
              autoPlay 
              playsInline
              muted
              className="object-cover w-full h-full"
            ></video>
            {!cameraActive && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted/50">
                <Camera className="h-16 w-16 text-muted-foreground mb-4" />
                <p className="text-muted-foreground text-center px-4">
                  Click the "Start Camera" button above to begin emotion detection
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
