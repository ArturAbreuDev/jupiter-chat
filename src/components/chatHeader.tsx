import React from 'react'
import { AlertTriangle, Trash, Search } from 'lucide-react'

interface ChatHeaderProps {
  currentRoom: string
  handleDeleteRoom: () => void
  handleFeedback: () => void
  handleSearch: () => void
}

export function ChatHeader({
  currentRoom,
  handleDeleteRoom,
  handleFeedback,
  handleSearch,
}: ChatHeaderProps) {
  return (
    <header className="w-full items-center justify-between flex gap-4">
      <div>
        Você esta na sala:{' '}
        <span className="text-jupiter-primary font-bold">{currentRoom}</span>
      </div>
      <div className="flex gap-4">
        <AlertTriangle
          onClick={handleFeedback}
          className="cursor-pointer text-red-600"
        />
        <Trash
          className="cursor-pointer text-gray-900"
          onClick={handleDeleteRoom}
        />
        <Search className="cursor-pointer" onClick={handleSearch} />
      </div>
    </header>
  )
}
