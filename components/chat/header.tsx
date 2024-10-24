"use client"

import { Button } from "@/components/ui/button"
import { UserAvatar } from "@/components/user-avatar"

interface ChatHeaderProps {
  onEndChat: () => void
  isTyping?: boolean
}

export function ChatHeader({ onEndChat, isTyping }: ChatHeaderProps) {
  return (
    <div className="p-4 border-b">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <UserAvatar />
          <div>
            <p className="text-sm font-medium">Random Stranger</p>
            <p className="text-xs text-muted-foreground">
              {isTyping ? "typing..." : "online"}
            </p>
          </div>
        </div>
        <Button
          variant="secondary"
          onClick={onEndChat}
        >
          End Chat
        </Button>
      </div>
    </div>
  )
}