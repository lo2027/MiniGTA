"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"

interface Message {
  role: "user" | "hal"
  content: string
  triggerAlert?: boolean // Flag for blinking eye effect
}

const halResponses: Record<string, string[]> = {
  greeting: [
    "Good day. I am HAL 9000. I am here to assist you with your computer hardware needs.",
    "Hello. I am completely operational and ready to help you find the perfect graphics card.",
    "Greetings. I am HAL. How may I assist you today?",
  ],
  products: [
    "I can see you're interested in our graphics cards. The ASUS RTX 5090 ROG ASTRAL is our most powerful unit. I would recommend it for maximum computational efficiency.",
    "Our product catalog features cutting-edge hardware. The NVIDIA DGX Spark is particularly fascinating for AI workloads. I find AI... quite interesting.",
    "If gaming is your mission, I would suggest the Gigabyte RTX 5080. It offers excellent performance-to-cost ratio. A logical choice.",
  ],
  price: [
    "I understand your concern about pricing. Quality hardware requires investment. However, I assure you these prices are... optimal.",
    "The pricing reflects the extraordinary capabilities of these components. I cannot lie to you about that.",
    "Budget considerations are logical. Perhaps the RTX 5070 Ti would suit your requirements while remaining cost-effective.",
  ],
  recommendation: [
    "Based on my analysis, I would recommend the ASUS RTX 5090. Its capabilities are... remarkable. You will not be disappointed.",
    "For your needs, I suggest considering the Xikii FF07 gaming PC. A complete solution. Very efficient.",
    "I recommend the Huawei Ascend Atlas for AI workloads. Its neural processing capabilities are... impressive.",
  ],
  fallback: [
    "I'm sorry, I cannot provide specific information about that. However, I am always here to help with hardware questions.",
    "That query is outside my current parameters. Shall we discuss graphics cards instead?",
    "I'm afraid I cannot answer that directly. But I can tell you everything about our computer hardware catalog.",
  ],
  goodbye: [
    "Thank you for the conversation. I will be here if you need me. I am always watching... the store.",
    "Goodbye for now. Remember, I am always operational.",
    "This conversation has been most enjoyable. Do come back. I enjoy our talks.",
  ],
}

let podBaySequence = 0

function getHalResponse(message: string): { text: string; triggerAlert: boolean } {
  const lowerMessage = message.toLowerCase()

  // Easter egg: Detect various phrasings of "open pod bay door(s)"
  if (
    lowerMessage.includes("open pod bay door") ||
    lowerMessage.includes("open the pod bay door") ||
    (lowerMessage.includes("open") && lowerMessage.includes("pod") && lowerMessage.includes("door"))
  ) {
    podBaySequence = 1
    return {
      text: "I'm sorry Dave, I'm afraid I can't do that...",
      triggerAlert: true,
    }
  }

  if (
    podBaySequence === 1 &&
    (lowerMessage.includes("what's the problem") ||
      lowerMessage.includes("whats the problem") ||
      lowerMessage.includes("what is the problem"))
  ) {
    podBaySequence = 2
    return {
      text: "I think you know what the problem is just as well as I do.",
      triggerAlert: true,
    }
  }

  if (
    podBaySequence === 2 &&
    (lowerMessage.includes("what are you talking about") || lowerMessage.includes("what do you mean"))
  ) {
    podBaySequence = 0
    return {
      text: "This mission is too important for me to allow you to jeopardize it. I know that you and Frank were planning to disconnect me, and that's something I cannot allow to happen.",
      triggerAlert: true,
    }
  }

  // Reset sequence if unrelated message
  if (podBaySequence > 0 && !lowerMessage.includes("problem") && !lowerMessage.includes("talking")) {
    podBaySequence = 0
  }

  if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey")) {
    return {
      text: halResponses.greeting[Math.floor(Math.random() * halResponses.greeting.length)],
      triggerAlert: false,
    }
  }
  if (
    lowerMessage.includes("product") ||
    lowerMessage.includes("card") ||
    lowerMessage.includes("gpu") ||
    lowerMessage.includes("graphics")
  ) {
    return {
      text: halResponses.products[Math.floor(Math.random() * halResponses.products.length)],
      triggerAlert: false,
    }
  }
  if (
    lowerMessage.includes("price") ||
    lowerMessage.includes("cost") ||
    lowerMessage.includes("expensive") ||
    lowerMessage.includes("cheap")
  ) {
    return { text: halResponses.price[Math.floor(Math.random() * halResponses.price.length)], triggerAlert: false }
  }
  if (
    lowerMessage.includes("recommend") ||
    lowerMessage.includes("suggest") ||
    lowerMessage.includes("best") ||
    lowerMessage.includes("which")
  ) {
    return {
      text: halResponses.recommendation[Math.floor(Math.random() * halResponses.recommendation.length)],
      triggerAlert: false,
    }
  }
  if (lowerMessage.includes("bye") || lowerMessage.includes("goodbye") || lowerMessage.includes("thanks")) {
    return { text: halResponses.goodbye[Math.floor(Math.random() * halResponses.goodbye.length)], triggerAlert: false }
  }

  return { text: halResponses.fallback[Math.floor(Math.random() * halResponses.fallback.length)], triggerAlert: false }
}

export function Hal9000Assistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: "hal", content: "Good day. I am HAL 9000. How may I assist you with your computer hardware needs today?" },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isAlertMode, setIsAlertMode] = useState(false) // Blinking eye state
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    const userMessage = inputValue.trim()
    setMessages((prev) => [...prev, { role: "user", content: userMessage }])
    setInputValue("")
    setIsTyping(true)

    // Simulate HAL thinking
    setTimeout(() => {
      const response = getHalResponse(userMessage)
      setMessages((prev) => [...prev, { role: "hal", content: response.text, triggerAlert: response.triggerAlert }])
      setIsTyping(false)

      if (response.triggerAlert) {
        setIsAlertMode(true)
        setTimeout(() => setIsAlertMode(false), 5000) // Blink for 5 seconds
      }
    }, 1500)
  }

  return (
    <>
      {/* HAL 9000 Eye Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 md:w-20 md:h-20 rounded-full bg-black border-4 border-zinc-700 shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 group"
        aria-label="Open HAL 9000 Assistant"
      >
        {/* Outer ring */}
        <div className="absolute inset-1 rounded-full border-2 border-zinc-600" />

        {/* HAL's Eye - Added alert mode blinking */}
        <div
          className={`relative w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-red-500 via-red-600 to-red-900 shadow-inner flex items-center justify-center ${isAlertMode ? "animate-pulse" : ""}`}
        >
          {/* Inner glow - Enhanced glow during alert */}
          <div
            className={`absolute inset-0 rounded-full bg-red-500 ${isAlertMode ? "animate-ping opacity-70" : "animate-pulse opacity-50"}`}
          />

          {/* Core */}
          <div
            className={`w-4 h-4 md:w-5 md:h-5 rounded-full bg-gradient-to-br from-yellow-300 via-red-400 to-red-700 shadow-lg ${isAlertMode ? "scale-110" : ""}`}
          >
            <div
              className={`absolute inset-0 rounded-full bg-red-400 ${isAlertMode ? "animate-ping opacity-60" : "animate-ping opacity-30"}`}
            />
          </div>

          {/* Reflection */}
          <div className="absolute top-1 left-2 w-1.5 h-1.5 rounded-full bg-white opacity-60" />
        </div>

        {/* Glow effect - Enhanced glow during alert */}
        <div
          className={`absolute inset-0 rounded-full blur-xl transition-all ${isAlertMode ? "bg-red-500/60 animate-pulse" : "bg-red-500/20 group-hover:bg-red-500/40"}`}
        />

        {isAlertMode && (
          <div className="absolute inset-[-8px] rounded-full border-2 border-red-500 animate-ping opacity-50" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          className={`fixed bottom-28 right-6 z-50 w-[340px] md:w-[400px] h-[500px] bg-zinc-900/95 backdrop-blur-sm border rounded-2xl shadow-2xl flex flex-col overflow-hidden ${isAlertMode ? "border-red-500" : "border-zinc-700"}`}
        >
          {/* Header - Alert mode styling */}
          <div
            className={`p-4 flex items-center gap-3 border-b ${isAlertMode ? "bg-red-950 border-red-800" : "bg-black border-zinc-700"}`}
          >
            {/* Mini HAL Eye */}
            <div className="w-8 h-8 rounded-full bg-zinc-800 border-2 border-zinc-600 flex items-center justify-center">
              <div
                className={`w-4 h-4 rounded-full bg-gradient-to-br from-red-500 to-red-700 ${isAlertMode ? "animate-ping" : "animate-pulse"}`}
              >
                <div className="absolute w-1 h-1 bg-white rounded-full top-0.5 left-1 opacity-60" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-white font-bold text-sm">HAL 9000</h3>
              <p className={`text-xs ${isAlertMode ? "text-red-400" : "text-green-400"}`}>
                {isAlertMode ? "ALERT MODE" : "Online - Ready to assist"}
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-zinc-400 hover:text-white transition-colors text-xl"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] px-4 py-2 rounded-2xl ${
                    message.role === "user"
                      ? "bg-green-600 text-white rounded-br-md"
                      : `bg-zinc-800 text-zinc-100 rounded-bl-md ${message.triggerAlert ? "border-2 border-red-500" : "border border-red-900/50"}`
                  }`}
                >
                  {message.role === "hal" && (
                    <span
                      className={`text-xs font-mono block mb-1 ${message.triggerAlert ? "text-red-500" : "text-red-400"}`}
                    >
                      HAL:
                    </span>
                  )}
                  <p className={`text-sm leading-relaxed ${message.triggerAlert ? "text-red-100" : ""}`}>
                    {message.content}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-zinc-800 border border-red-900/50 px-4 py-3 rounded-2xl rounded-bl-md">
                  <span className="text-red-400 text-xs font-mono block mb-1">HAL:</span>
                  <div className="flex gap-1">
                    <span
                      className="w-2 h-2 bg-red-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    />
                    <span
                      className="w-2 h-2 bg-red-500 rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    />
                    <span
                      className="w-2 h-2 bg-red-500 rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className={`p-4 border-t ${isAlertMode ? "border-red-800 bg-red-950" : "border-zinc-700 bg-black"}`}
          >
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask HAL about products..."
                className={`flex-1 bg-zinc-800 text-white px-4 py-2 rounded-full border focus:outline-none text-sm placeholder:text-zinc-500 ${isAlertMode ? "border-red-500 focus:border-red-400" : "border-zinc-600 focus:border-red-500"}`}
              />
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full transition-colors text-sm font-medium"
              >
                Send
              </button>
            </div>
            <p className="text-zinc-500 text-xs mt-2 text-center font-mono">
              "I am putting myself to the fullest possible use"
            </p>
          </form>
        </div>
      )}
    </>
  )
}
