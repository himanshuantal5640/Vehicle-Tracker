import { useEffect, useRef } from "react"

export default function useSocket(onMessage) {
  const socketRef = useRef(null)

  useEffect(() => {
    if (socketRef.current) return

    const socket = new WebSocket("ws://localhost:5000")
    socketRef.current = socket

    socket.onopen = () => {
      console.log("WebSocket Connected")
    }

    socket.onmessage = (event) => {
  console.log("WS DATA:", event.data)
  const data = JSON.parse(event.data)
  onMessage(data)
}

    socket.onerror = () => {
      console.log("WebSocket Error")
    }

    socket.onclose = () => {
      console.log("WebSocket Closed")
    }

    return () => {
      socket.close()
      socketRef.current = null
    }
  }, [onMessage])
}