import React from 'react'
import { MessageBubble } from './messageBubble'

interface ChatBodyProps {
  messages: { id: string; content: string; timestamp: string; userId: string }[]
  userId: string
}

export function ChatBody({ messages, userId }: ChatBodyProps) {
  return (
    <main className="flex w-full flex-col flex-1 justify-end">
      {messages.map((msg) => (
        <MessageBubble
          key={msg.id}
          message={msg.content}
          sender={{ avatar: '/footer-logo.webp' }}
          timestamp={msg.timestamp}
          fromUser={msg.userId === userId}
        />
      ))}
    </main>
  )
}
