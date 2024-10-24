import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageCircle, Video, Shield } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            Connect with New People
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Start a conversation with someone new. Meet interesting people from around the world through text or video chat.
          </p>
        </div>

        <Card className="max-w-3xl mx-auto p-6 backdrop-blur-sm bg-background/95">
          <Tabs defaultValue="text" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="text" className="text-lg py-4">
                <MessageCircle className="mr-2 h-5 w-5" />
                Text Chat
              </TabsTrigger>
              <TabsTrigger value="video" className="text-lg py-4">
                <Video className="mr-2 h-5 w-5" />
                Video Chat
              </TabsTrigger>
            </TabsList>

            <TabsContent value="text" className="space-y-6">
              <div className="text-center space-y-4">
                <Link href="/chat">
                  <Button size="lg" className="w-full sm:w-auto px-8 py-6 text-lg">
                    Start Text Chat
                  </Button>
                </Link>
                <p className="text-sm text-muted-foreground">
                  No registration required - start chatting instantly
                </p>
              </div>
            </TabsContent>

            <TabsContent value="video" className="space-y-6">
              <div className="text-center space-y-4">
                <Link href="/video">
                  <Button size="lg" className="w-full sm:w-auto px-8 py-6 text-lg">
                    Start Video Chat
                  </Button>
                </Link>
                <p className="text-sm text-muted-foreground">
                  Camera and microphone required
                </p>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center space-y-2">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Safe & Secure</h3>
              <p className="text-sm text-muted-foreground">End-to-end encrypted chats</p>
            </div>
            <div className="text-center space-y-2">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto">
                <MessageCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Instant Chat</h3>
              <p className="text-sm text-muted-foreground">No registration needed</p>
            </div>
            <div className="text-center space-y-2">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto">
                <Video className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Video Calls</h3>
              <p className="text-sm text-muted-foreground">Face to face conversations</p>
            </div>
          </div>
        </Card>
      </div>
    </main>
  )
}