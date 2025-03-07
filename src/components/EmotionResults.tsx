
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface EmotionResultsProps {
  active: boolean;
}

interface Emotion {
  name: string;
  value: number;
}

const EmotionResults = ({ active }: EmotionResultsProps) => {
  const [emotions, setEmotions] = useState<Emotion[]>([
    { name: "Angry", value: 0 },
    { name: "Disgust", value: 0 },
    { name: "Fear", value: 0 },
    { name: "Happy", value: 0 },
    { name: "Neutral", value: 0 },
    { name: "Sad", value: 0 },
    { name: "Surprise", value: 0 },
  ]);
  const [dominantEmotion, setDominantEmotion] = useState<string>("None");

  useEffect(() => {
    if (!active || typeof window === "undefined") return;

    const handleEmotionEvent = (evt: Event) => {
      const morphCastEvent = evt as any;
      if (morphCastEvent.detail && morphCastEvent.detail.face_emotion) {
        const emotionData = morphCastEvent.detail.face_emotion.emotion;
        const dominant = morphCastEvent.detail.face_emotion.dominantEmotion;
        
        if (emotionData) {
          const newEmotions = Object.entries(emotionData).map(([name, value]) => ({
            name,
            value: Number(value) * 100, // Convert to percentage
          }));
          
          setEmotions(newEmotions);
          setDominantEmotion(dominant);
        }
      }
    };

    if (window.CY) {
      window.addEventListener(window.CY.modules().EVENT_BARRIER.eventName, handleEmotionEvent);
    }

    return () => {
      if (window.CY) {
        window.removeEventListener(window.CY.modules().EVENT_BARRIER.eventName, handleEmotionEvent);
      }
    };
  }, [active]);

  if (!active) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Emotion Results</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center h-80">
          <p className="text-muted-foreground">Start the camera to see emotion results</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Emotion Results</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6 text-center">
          <h3 className="text-2xl font-bold">
            {dominantEmotion !== "None" ? (
              <>Current Emotion: <span className="text-primary">{dominantEmotion}</span></>
            ) : (
              "No face detected"
            )}
          </h3>
        </div>
        
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={emotions} layout="vertical" margin={{ left: 20, right: 20 }}>
            <XAxis type="number" domain={[0, 100]} />
            <YAxis dataKey="name" type="category" width={80} />
            <Tooltip formatter={(value) => [`${value.toFixed(1)}%`, 'Intensity']} />
            <Bar dataKey="value" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default EmotionResults;
