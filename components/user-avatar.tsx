import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { User } from "lucide-react"

export function UserAvatar() {
  return (
    <Avatar>
      <AvatarFallback>
        <User className="h-5 w-5" />
      </AvatarFallback>
    </Avatar>
  )
}