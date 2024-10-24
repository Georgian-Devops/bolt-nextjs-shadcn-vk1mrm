export interface Message {
  id: string
  content: string
  sender: "user" | "stranger"
  timestamp: number
}

export interface ChatState {
  messages: Message[]
  isConnected: boolean
  isTyping: boolean
}