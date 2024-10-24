"use client"

import { useEffect, useState, useCallback } from "react"
import { Card } from "@/components/ui/card"
import { MessageList } from "@/components/chat/message-list"
import { MessageInput } from "@/components/chat/message-input"
import { ChatHeader } from "@/components/chat/header"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import type { Message, ChatState } from "@/types/chat"

const TYPING_DELAY = 1000
const RESPONSE_DELAY = 2000

export default function ChatPage() {
  const router = useRouter()
  const [chatState, setChatState] = useState<ChatState>({
    messages: [],
    isConnected: false,
    isTyping: false,
  })

  const simulateTyping = useCallback(() => {
    setChatState(prev => ({ ...prev, isTyping: true }))
    return new Promise(resolve => setTimeout(resolve, TYPING_DELAY))
  }, [])

  const addMessage = useCallback((content: string, sender: "user" | "stranger") => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      sender,
      timestamp: Date.now(),
    }
    setChatState(prev => ({
      ...prev,
      messages: [...prev.messages, newMessage],
      isTyping: false,
    }))
  }, [])

  const simulateResponse = useCallback(async () => {
    const responses = [
      "Hello! How are you today?",
      "That's interesting! Tell me more.",
      "I enjoy having conversations like this.",
      "What do you like to do for fun?",
      "Have you traveled anywhere interesting lately?",
    ]
    const randomResponse = responses[Math.floor(Math.random() * responses.length)]
    
    await simulateTyping()
    addMessage(randomResponse, "stranger")
  }, [addMessage, simulateTyping])

  useEffect(() => {
    // Simulate initial connection
    const timer = setTimeout(() => {
      setChatState(prev => ({ 
        ...prev, 
        isConnected: true,
      }))
      addMessage("You are now connected with a stranger. Say hello!", "stranger")
    }, 2000)

    return () => clearTimeout(timer)
  }, [addMessage])

  const handleSendMessage = async (content: string) => {
    addMessage(content, "user")
    setTimeout(() => simulateResponse(), RESPONSE_DELAY)
  }

  const handleEndChat = () => {
    router.push("/")
  }

  if (!chatState.isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary p-4">
        <Card className="max-w-2xl mx-auto h-[80vh] flex items-center justify-center">
          <div className="text-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
            <p className="text-muted-foreground">Finding someone to chat with...</p>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary p-4">
      <Card className="max-w-2xl mx-auto h-[80vh] flex flex-col">
        <ChatHeader 
          onEndChat={handleEndChat}
          isTyping={chatState.isTyping}
        />
        <MessageList messages={chatState.messages} />
        <MessageInput 
          onSend={handleSendMessage}
          disabled={chatState.isTyping}
        />
      </Card>
    </div>
  )
}