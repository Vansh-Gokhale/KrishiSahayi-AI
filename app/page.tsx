"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Leaf, Send, Bot, User, Languages, ExternalLink } from "lucide-react"

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

export default function KrishiSahayiAI() {
  const [language, setLanguage] = useState<"malayalam" | "english">("malayalam")

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        language === "malayalam"
          ? "നമസ്കാരം! ഞാൻ കൃഷി സഹായി AI ആണ്. കേരളത്തിലെ കൃഷിയുമായി ബന്ധപ്പെട്ട നിങ്ങളുടെ എല്ലാ ചോദ്യങ്ങൾക്കും ഉത്തരം നൽകാൻ ഞാൻ ഇവിടെയുണ്ട്. എന്തെങ്കിലും ചോദിക്കൂ!"
          : "Namaste! I am KrishiSahayi AI. I'm here to answer all your agriculture-related questions for Kerala farming. Please ask me anything!",
      role: "assistant",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const toggleLanguage = () => {
    const newLanguage = language === "malayalam" ? "english" : "malayalam"
    setLanguage(newLanguage)

    // Update the initial message when language changes
    setMessages([
      {
        id: "1",
        content:
          newLanguage === "malayalam"
            ? "നമസ്കാരം! ഞാൻ കൃഷി സഹായി AI ആണ്. കേരളത്തിലെ കൃഷിയുമായി ബന്ധപ്പെട്ട നിങ്ങളുടെ എല്ലാ ചോദ്യങ്ങൾക്കും ഉത്തരം നൽകാൻ ഞാൻ ഇവിടെയുണ്ട്. എന്തെങ്കിലും ചോദിക്കൂ!"
            : "Namaste! I am KrishiSahayi AI. I'm here to answer all your agriculture-related questions for Kerala farming. Please ask me anything!",
        role: "assistant",
        timestamp: new Date(),
      },
    ])
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    const userInput = input
    setInput("")
    setIsLoading(true)

    try {
      // Call the AI API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userInput,
          language: language,
        }),
      })

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`)
      }

      const data = await response.json()
      
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        role: "assistant",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiResponse])
    } catch (error) {
      console.error('Error calling AI API:', error)
      
      // Fallback response in case of API error
      const fallbackResponse = language === "malayalam" 
        ? `ക്ഷമിക്കണം, ഇപ്പോൾ ഉത്തരം നൽകാൻ കഴിയുന്നില്ല. ദയവായി കുറച്ച് നിമിഷങ്ങൾക്ക് ശേഷം വീണ്ടും ശ്രമിക്കുക.`
        : `Sorry, I'm unable to provide a response right now. Please try again in a few minutes.`
      
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: fallbackResponse,
        role: "assistant",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiResponse])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-primary text-primary-foreground p-4 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary-foreground/20 p-2 rounded-lg">
              <Leaf className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold">{language === "malayalam" ? "കൃഷി സഹായി AI" : "KrishiSahayi AI"}</h1>
              <p className="text-sm opacity-90">
                {language === "malayalam" ? "Kerala Farmers' AI Assistant" : "കേരള കർഷകരുടെ AI സഹായി"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={toggleLanguage}
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            >
              <Languages className="h-4 w-4 mr-2" />
              {language === "malayalam" ? "English" : "മലയാളം"}
            </Button>
            <Button asChild variant="outline" size="sm">
              <a
                href="https://aims.kerala.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={language === "malayalam" ? "AIMS പോർട്ടൽ തുറക്കുക" : "Open AIMS Portal"}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                {language === "malayalam" ? "AIMS പോർട്ടൽ" : "AIMS Portal"}
              </a>
            </Button>
          </div>
        </div>
      </header>

      {/* Chat Area */}
      <div className="flex-1 max-w-4xl mx-auto w-full p-4">
        <Card className="h-[calc(100vh-200px)] flex flex-col">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.role === "assistant" && (
                    <div className="bg-primary text-primary-foreground p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                      <Bot className="h-4 w-4" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.role === "user"
                        ? "bg-secondary text-secondary-foreground ml-auto"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    <span className="text-xs opacity-70 mt-1 block">
                      {message.timestamp.toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  {message.role === "user" && (
                    <div className="bg-secondary text-secondary-foreground p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                      <User className="h-4 w-4" />
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <div className="bg-primary text-primary-foreground p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="bg-muted text-muted-foreground p-3 rounded-lg">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-current rounded-full animate-bounce" />
                      <div
                        className="w-2 h-2 bg-current rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      />
                      <div
                        className="w-2 h-2 bg-current rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="border-t p-4">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  language === "malayalam"
                    ? "നിങ്ങളുടെ കൃഷി സംബന്ധമായ ചോദ്യം ഇവിടെ ടൈപ്പ് ചെയ്യൂ..."
                    : "Type your agriculture-related question here..."
                }
                className="flex-1 text-base"
                disabled={isLoading}
              />
              <Button type="submit" size="icon" disabled={isLoading || !input.trim()} className="h-10 w-10">
                <Send className="h-4 w-4" />
              </Button>
            </form>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              {language === "malayalam"
                ? "മലയാളത്തിലോ ഇംഗ്ലീഷിലോ ചോദിക്കാം • Ask in Malayalam or English"
                : "Ask in Malayalam or English • മലയാളത്തിലോ ഇംഗ്ലീഷിലോ ചോദിക്കാം"}
            </p>
          </div>
        </Card>
      </div>

      {/* Footer */}
      <footer className="bg-muted p-4 text-center">
        <p className="text-sm text-muted-foreground">
          {language === "malayalam"
            ? "കേരള കർഷകരുടെ വിശ്വസ്ത സഹായി • Trusted Assistant for Kerala Farmers"
            : "Trusted Assistant for Kerala Farmers • കേരള കർഷകരുടെ വിശ്വസ്ത സഹായി"}
        </p>
      </footer>
    </div>
  )
}
