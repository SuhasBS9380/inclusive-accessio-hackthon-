
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { videoUrl, language } = await req.json()

    // This would be where you'd call an actual AI service
    // For now, we'll simulate generating captions based on language
    
    let captions = ""
    
    // Simulate delay for processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    if (language === "en") {
      captions = "00:00:01,000 --> 00:00:04,000\nWelcome to our video presentation.\n\n00:00:05,000 --> 00:00:09,000\nToday we'll discuss accessibility features for videos."
    } else if (language === "kn") {
      captions = "00:00:01,000 --> 00:00:04,000\nನಮ್ಮ ವೀಡಿಯೋ ಪ್ರಸ್ತುತಿಗೆ ಸುಸ್ವಾಗತ.\n\n00:00:05,000 --> 00:00:09,000\nಇಂದು ನಾವು ವೀಡಿಯೊಗಳಿಗಾಗಿ ಪ್ರವೇಶಿಸಬಹುದಾದ ವೈಶಿಷ್ಟ್ಯಗಳ ಬಗ್ಗೆ ಚರ್ಚಿಸುತ್ತೇವೆ."
    } else if (language === "hi") {
      captions = "00:00:01,000 --> 00:00:04,000\nहमारी वीडियो प्रस्तुति में आपका स्वागत है।\n\n00:00:05,000 --> 00:00:09,000\nआज हम वीडियो के लिए सुलभता सुविधाओं पर चर्चा करेंगे।"
    } else {
      captions = "00:00:01,000 --> 00:00:04,000\nWelcome to our video presentation.\n\n00:00:05,000 --> 00:00:09,000\nToday we'll discuss accessibility features for videos."
    }

    console.log(`Generated captions in ${language} language`)
    
    return new Response(
      JSON.stringify({
        captions,
        language,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error generating captions:', error)
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
