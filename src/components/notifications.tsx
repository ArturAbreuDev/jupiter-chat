import React from 'react'

interface NotificationsProps {
  notifications: string[]
}

export function Notifications({ notifications }: NotificationsProps) {
  return (
    <div className="fixed z-auto top-4 right-44 p-4 bg-white shadow-lg rounded-lg border border-gray-200">
      {notifications.map((notification, index) => (
        <div key={index} className="mb-2 text-gray-700">
          {notification}
        </div>
      ))}
    </div>
  )
}
