
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Bot, User, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Message = {
  id: string;
  content: string;
  sender: "user" | "assistant";
  timestamp: Date;
};

export default function AiAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your accessibility assistant. How can I help you make your content more inclusive today?",
      sender: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate API response
    setTimeout(() => {
      // Generate assistant response based on user input
      let responseContent = "";
      const userInput = input.toLowerCase();

      if (userInput.includes("image") || userInput.includes("alt text") || userInput.includes("caption")) {
        responseContent = "For image accessibility, I recommend adding descriptive alt text that conveys the image's purpose and content. Here are some tips:\n\n1. Be concise but descriptive\n2. Include relevant details about the image\n3. Don't start with 'image of' or 'picture of'\n4. For decorative images, use empty alt text (alt=\"\")\n\nWould you like me to help you write alt text for a specific image?";
      } else if (userInput.includes("color") || userInput.includes("contrast")) {
        responseContent = "Good color contrast is essential for accessibility. Text should have a contrast ratio of at least 4.5:1 against its background (3:1 for large text). Here are some tools to check contrast:\n\n- WebAIM Contrast Checker\n- Stark Contrast Checker\n- Accessible Color Matrix\n\nWould you like me to suggest some accessible color combinations?";
      } else if (userInput.includes("keyboard") || userInput.includes("navigation")) {
        responseContent = "Keyboard accessibility is crucial for many users. Ensure all interactive elements can be accessed and operated using only the keyboard. Some tips:\n\n1. Use proper semantic HTML elements\n2. Maintain a logical tab order\n3. Make focus indicators clearly visible\n4. Ensure dropdown menus are keyboard accessible\n\nIs there a specific keyboard navigation issue you're working on?";
      } else if (userInput.includes("wcag") || userInput.includes("guideline")) {
        responseContent = "The Web Content Accessibility Guidelines (WCAG) are organized around four principles:\n\n1. Perceivable - Information must be presentable to users in ways they can perceive\n2. Operable - Interface components must be operable\n3. Understandable - Information and operation must be understandable\n4. Robust - Content must be robust enough to be interpreted by a variety of user agents\n\nWould you like information about a specific WCAG guideline?";
      } else {
        responseContent = "I'm here to help with all your accessibility questions! I can assist with:\n\n- Creating accessible content\n- Improving website accessibility\n- Understanding accessibility guidelines\n- Writing alt text for images\n- Ensuring color contrast compliance\n- Making forms accessible\n- And much more!\n\nWhat specific accessibility topic can I help you with today?";
      }

      const assistantMessage: Message = {
        id: Date.now().toString(),
        content: responseContent,
        sender: "assistant",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-13rem)] animate-fade-in">
      <div className="mb-4">
        <h1 className="text-3xl font-medium mb-2">AI Accessibility Assistant</h1>
        <p className="text-muted-foreground">
          Get real-time guidance on improving content accessibility and answers to your accessibility questions.
        </p>
      </div>

      <Card className="flex-1 overflow-hidden flex flex-col">
        <CardContent className="p-0 flex flex-col h-full">
          <div className="px-4 py-3 border-b flex items-center justify-between bg-muted/30">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/favicon.ico" />
                <AvatarFallback className="bg-primary text-primary-foreground">IA</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">Accessibility Assistant</p>
                <Badge variant="outline" className="text-xs font-normal">
                  AI Powered
                </Badge>
              </div>
            </div>
          </div>

          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-4 ${
                      message.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {message.sender === "assistant" ? (
                        <Bot className="h-4 w-4" />
                      ) : (
                        <User className="h-4 w-4" />
                      )}
                      <span className="text-xs opacity-70">
                        {formatTimestamp(message.timestamp)}
                      </span>
                    </div>
                    <div className="whitespace-pre-line">{message.content}</div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-lg p-4 bg-secondary">
                    <div className="flex items-center gap-2">
                      <Bot className="h-4 w-4" />
                      <RefreshCw className="h-3 w-3 animate-spin" />
                      <span className="text-xs opacity-70">Typing...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                placeholder="Ask about accessibility guidelines, best practices, or specific questions..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
                className="flex-1"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!input.trim() || isLoading}
                size="icon"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
