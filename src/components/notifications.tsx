import React, { useEffect } from 'react'

interface NotificationsProps {
  notifications: string[]
  clearNotifications: () => void
}

export function Notifications({
  notifications,
  clearNotifications,
}: NotificationsProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      clearNotifications()
    }, 5000)

    return () => clearTimeout(timer)
  }, [notifications, clearNotifications])

  return (
    <div className="fixed z-auto top-4 right-4 p-4 bg-white shadow-lg rounded-lg border border-gray-200">
      {notifications.map((notification, index) => (
        <div key={index} className="mb-2 text-gray-700">
          {notification}
        </div>
      ))}
    </div>
  )
}
