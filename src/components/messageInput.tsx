import React from 'react'
import { Paperclip, Smile, Send } from 'lucide-react'

interface MessageInputProps {
  messageInput: string
  setMessageInput: React.Dispatch<React.SetStateAction<string>>
  handleSendMessage: () => void
  handleEmoji: () => void
  handleFile: () => void
}

export function MessageInput({
  messageInput,
  setMessageInput,
  handleSendMessage,
  handleEmoji,
  handleFile,
}: MessageInputProps) {
  return (
    <div className="p-4 flex justify-between items-center bg-white w-full rounded-xl border border-jupiter-primary">
      <input
        type="text"
        placeholder="Escreva uma mensagem"
        className="flex-1 outline-none"
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
      />
      <div className="flex gap-4">
        <Paperclip className="cursor-pointer" onClick={handleFile} />
        <div>
          <Smile className="cursor-pointer" onClick={handleEmoji} />
        </div>
        <button onClick={handleSendMessage}>
          <Send className="text-jupiter-secondary" />
        </button>
      </div>
    </div>
  )
}
