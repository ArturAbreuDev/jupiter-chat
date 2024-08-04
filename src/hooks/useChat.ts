import { useState, useEffect } from 'react'
import io from 'socket.io-client'

const backendUrl =
  process.env.BACKEND_URL || 'https://jupiter-chat-server.onrender.com/'

const socket = io(backendUrl)

const useChat = (room: string, userId: string) => {
  const [messages, setMessages] = useState<
    { id: string; content: string; timestamp: string; userId: string }[]
  >([])

  useEffect(() => {
    socket.emit('joinRoom', room)

    socket.on('allMessages', (messagesFromServer) => {
      setMessages(messagesFromServer)
    })

    socket.on(
      'receiveMessage',
      (message: {
        id: string
        content: string
        timestamp: string
        userId: string
      }) => {
        setMessages((prevMessages) => [...prevMessages, message])
      },
    )

    return () => {
      socket.off('allMessages')
      socket.off('receiveMessage')
    }
  }, [room])

  const sendMessage = (content: string) => {
    const message = {
      content,
      userId,
      room,
      timestamp: new Date().toISOString(),
    }
    socket.emit('sendMessage', message)
  }

  return { messages, sendMessage }
}

export default useChat
