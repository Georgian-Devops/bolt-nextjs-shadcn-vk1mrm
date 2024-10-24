"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { Camera, CameraOff, Loader2, Mic, MicOff, PhoneOff } from "lucide-react"

export default function VideoChat() {
  const router = useRouter()
  const localVideoRef = useRef<HTMLVideoElement>(null)
  const [isConnecting, setIsConnecting] = useState(true)
  const [isCameraOn, setIsCameraOn] = useState(true)
  const [isMicOn, setIsMicOn] = useState(true)
  const [stream, setStream] = useState<MediaStream | null>(null)

  useEffect(() => {
    const startVideo = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
        })
        setStream(mediaStream)
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = mediaStream
        }
        // Simulate finding a partner
        setTimeout(() => setIsConnecting(false), 2000)
      } catch (error) {
        console.error("Error accessing media devices:", error)
        router.push("/")
      }
    }

    startVideo()

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop())
      }
    }
  }, [router])

  const toggleCamera = () => {
    if (stream) {
      stream.getVideoTracks().forEach(track => {
        track.enabled = !track.enabled
      })
      setIsCameraOn(!isCameraOn)
    }
  }

  const toggleMic = () => {
    if (stream) {
      stream.getAudioTracks().forEach(track => {
        track.enabled = !track.enabled
      })
      setIsMicOn(!isMicOn)
    }
  }

  const endCall = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop())
    }
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary p-4">
      <Card className="max-w-4xl mx-auto h-[80vh] flex flex-col">
        {isConnecting ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center space-y-4">
              <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
              <p className="text-muted-foreground">Finding someone to chat with...</p>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 grid grid-cols-2 gap-4 p-4">
              <div className="relative bg-black rounded-lg overflow-hidden">
                <video
                  ref={localVideoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-4 text-white text-sm">
                  You
                </div>
              </div>
              <div className="relative bg-black rounded-lg overflow-hidden flex items-center justify-center">
                <p className="text-white">Waiting for partner...</p>
              </div>
            </div>

            <div className="p-4 border-t">
              <div className="flex justify-center space-x-4">
                <Button
                  variant={isCameraOn ? "outline" : "destructive"}
                  size="icon"
                  onClick={toggleCamera}
                >
                  {isCameraOn ? (
                    <Camera className="h-5 w-5" />
                  ) : (
                    <CameraOff className="h-5 w-5" />
                  )}
                </Button>
                <Button
                  variant={isMicOn ? "outline" : "destructive"}
                  size="icon"
                  onClick={toggleMic}
                >
                  {isMicOn ? (
                    <Mic className="h-5 w-5" />
                  ) : (
                    <MicOff className="h-5 w-5" />
                  )}
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={endCall}
                >
                  <PhoneOff className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  )
}