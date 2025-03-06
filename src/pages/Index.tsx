
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Code, MessageSquare, Image, Type } from "lucide-react";

export default function HomePage() {
  const features = [
    {
      icon: <Type className="h-6 w-6 text-primary" />,
      title: "Text Simplification",
      description: "Transform complex text into easy-to-understand language.",
      link: "/text-simplifier"
    },
    {
      icon: <Image className="h-6 w-6 text-primary" />,
      title: "Image Caption",
      description: "Generate detailed and accurate captions for images.",
      link: "/image-caption"
    },
    {
      icon: <MessageSquare className="h-6 w-6 text-primary" />,
      title: "AI Assistant",
      description: "Get real-time guidance on improving content accessibility.",
      link: "/ai-assistant"
    },
    {
      icon: <Code className="h-6 w-6 text-primary" />,
      title: "Content Audit",
      description: "Analyze and improve accessibility of your digital content.",
      link: "/dashboard"
    }
  ];

  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* Hero Section */}
      <section className="section relative overflow-hidden">
        <div className="container-tight text-center relative z-10">
          <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary animate-fade-in mb-6">
            Introducing InclusiveAI
          </div>
          <h1 className="font-medium tracking-tight animate-slide-up [animation-delay:200ms]">
            <span className="block">Make digital content</span>
            <span className="text-primary">accessible for everyone</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto animate-slide-up [animation-delay:400ms]">
            InclusiveAI uses artificial intelligence to help you create more accessible digital experiences.
            Simplify text, generate image descriptions, and get real-time accessibility guidance.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 animate-slide-up [animation-delay:600ms]">
            <Button size="lg" asChild>
              <Link to="/text-simplifier">
                Try Text Simplifier
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/dashboard">
                View Dashboard
              </Link>
            </Button>
          </div>
        </div>
        <div className="absolute inset-0 -z-10 h-full w-full bg-gradient-to-b from-background via-background to-background/60" />
        <div className="absolute left-1/2 top-0 -z-20 h-[800px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-radial from-primary/20 to-transparent opacity-40 blur-3xl" />
      </section>

      {/* Features Section */}
      <section className="section bg-secondary/50">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-medium tracking-tight">
              AI-Powered Accessibility Tools
            </h2>
            <p className="mt-4 text-muted-foreground">
              Our suite of intelligent tools helps you create more inclusive digital experiences.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-card rounded-xl p-6 shadow-subtle card-hover"
              >
                <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                <p className="text-muted-foreground mb-4">{feature.description}</p>
                <Link 
                  to={feature.link} 
                  className="text-primary font-medium text-sm inline-flex items-center hover:underline"
                >
                  Try Now
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="section">
        <div className="container-tight">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-medium tracking-tight">How It Works</h2>
            <p className="mt-4 text-muted-foreground">
              InclusiveAI uses advanced AI models to make digital content more accessible.
            </p>
          </div>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-border hidden md:block"></div>
            <div className="space-y-12 relative">
              {[
                {
                  step: "01",
                  title: "Input your content",
                  description: "Upload text, images, or website URLs that you want to make more accessible."
                },
                {
                  step: "02",
                  title: "AI analysis",
                  description: "Our AI models analyze your content and identify accessibility improvements."
                },
                {
                  step: "03",
                  title: "Receive recommendations",
                  description: "Get actionable suggestions to improve accessibility and inclusivity."
                },
                {
                  step: "04",
                  title: "Implement changes",
                  description: "Apply the recommended changes to make your content more accessible."
                }
              ].map((item, i) => (
                <div key={i} className="relative flex flex-col md:flex-row gap-8 items-start">
                  <div className="md:w-16 flex-shrink-0 flex md:justify-center">
                    <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium z-10">
                      {item.step}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-medium">{item.title}</h3>
                    <p className="mt-2 text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-primary text-primary-foreground">
        <div className="container-tight text-center">
          <h2 className="text-3xl font-medium tracking-tight">
            Ready to make your content more accessible?
          </h2>
          <p className="mt-4 text-primary-foreground/80 max-w-2xl mx-auto">
            Start using InclusiveAI today and join thousands of creators making the web more accessible for everyone.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90" asChild>
              <Link to="/text-simplifier">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
