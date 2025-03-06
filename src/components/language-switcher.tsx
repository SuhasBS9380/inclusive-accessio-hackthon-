
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Check, Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Language = {
  code: string;
  name: string;
  flag: string;
};

const languages: Language[] = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
  { code: "ja", name: "日本語", flag: "🇯🇵" },
  { code: "ar", name: "العربية", flag: "🇸🇦" },
  { code: "kn", name: "ಕನ್ನಡ", flag: "🇮🇳" },
  { code: "hi", name: "हिन्दी", flag: "🇮🇳" },
];

interface LanguageSwitcherProps {
  variant?: "icon" | "full";
}

export function LanguageSwitcher({ variant = "full" }: LanguageSwitcherProps) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(languages[0]);

  useEffect(() => {
    // Get browser language
    const browserLang = navigator.language.split('-')[0];
    const matchedLang = languages.find(lang => lang.code === browserLang);
    
    if (matchedLang) {
      setCurrentLanguage(matchedLang);
    }
  }, []);

  const handleLanguageChange = (language: Language) => {
    setCurrentLanguage(language);
    // In a real app, you'd update translations and store the preference
    document.documentElement.lang = language.code;
    localStorage.setItem("preferredLanguage", language.code);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 gap-1">
          {variant === "full" ? (
            <>
              <Globe className="h-4 w-4" />
              <span className="flex items-center gap-1">
                {currentLanguage.flag} {currentLanguage.code.toUpperCase()}
              </span>
            </>
          ) : (
            <Globe className="h-4 w-4" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language)}
            className="flex items-center justify-between"
          >
            <span className="flex items-center gap-2">
              <span>{language.flag}</span>
              <span>{language.name}</span>
            </span>
            {currentLanguage.code === language.code && (
              <Check className="h-4 w-4 ml-2" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
