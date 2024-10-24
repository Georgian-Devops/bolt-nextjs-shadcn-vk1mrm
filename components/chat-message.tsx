import { cn } from "@/lib/utils"

interface ChatMessageProps {
  message: {
    content: string
    sender: "user" | "stranger"
  }
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.sender === "user"

  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "rounded-lg px-4 py-2 max-w-[80%]",
          isUser ? "bg-primary text-primary-foreground" : "bg-secondary"
        )}
      >
        <p className="text-sm">{message.content}</p>
      </div>
    </div>
  )
}