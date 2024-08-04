import React from 'react'

export function MessageBubble({ message, sender, timestamp, fromUser }) {
  return (
    <div className={`flex mb-4 ${fromUser ? 'justify-end' : ''}`}>
      <div className={`flex items-end ${!fromUser ? 'flex-row-reverse' : ''}`}>
        <div
          className={`w-full break-words p-4 rounded-lg ${
            fromUser
              ? 'bg-jupiter-primary text-white'
              : 'bg-jupiter-secondary text-white'
          }`}
        >
          <p>{message}</p>
          <span className="text-xs text-gray-100">{timestamp}</span>
        </div>
        <img
          src={sender.avatar}
          alt="Profile"
          className="w-8 h-8 rounded-full mx-2"
        />
      </div>
    </div>
  )
}
