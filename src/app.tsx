/* eslint-disable no-self-compare */
import React, { useEffect, useState } from 'react'
import useChat from './hooks/useChat'
import { Sidebar } from './components/sidebar'
import { ChatHeader } from './components/chatHeader'
import { ChatBody } from './components/chatBody'
import { MessageInput } from './components/messageInput'
import { NewChatModal } from './components/newChatModal'
import { Notifications } from './components/notifications'
import { v4 as uuidv4 } from 'uuid'
import { Wrench } from 'lucide-react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export function App() {
  const [menuResponsive, setMenuResponsive] = useState(false)
  const [showChats, setShowChats] = useState(false)
  const [messageInput, setMessageInput] = useState('')
  const [userId, setUserId] = useState<string>('')
  const [currentRoom, setCurrentRoom] = useState<string>('Global')
  const [rooms, setRooms] = useState<string[]>([])
  const [newChatName, setNewChatName] = useState('')
  const [showNewChatModal, setShowNewChatModal] = useState(false)
  const [notifications, setNotifications] = useState<string[]>([])

  useEffect(() => {
    const id = localStorage.getItem('userId') || uuidv4()
    localStorage.setItem('userId', id)
    setUserId(id)

    const savedRooms = JSON.parse(localStorage.getItem('rooms') || '["Global"]')
    setRooms(savedRooms)
  }, [])

  const { messages, sendMessage } = useChat(currentRoom, userId)

  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1]
      if (lastMessage.userId !== userId) {
        // Add notification if message is from another user
        const notificationMessage = `${lastMessage.userId} sent a message in ${currentRoom}`
        setNotifications((prevNotifications) => [
          ...prevNotifications,
          notificationMessage,
        ])
      }
    }
  }, [messages, userId, currentRoom])

  const toggleMenuResponsive = () => {
    setMenuResponsive(!menuResponsive)
  }

  const toggleShowChats = () => {
    setShowChats(!showChats)
  }

  const handleEmoji = () => {
    toast.info(
      'Para inserir emojis, use o atalho do sistema: \n\nWindows: Win + .\nMac: Ctrl + Cmd + Space',
      { icon: <Wrench /> },
    )
  }

  const handleSearch = () => {
    toast.info(
      'Futuramente, você poderá pesquisar salas de chat.\n\nFique atento às atualizações!',
      {
        icon: <Wrench />,
        style: { fontSize: '16px', backgroundColor: '#e9ecef', color: '#333' },
      },
    )
  }

  const handleFeedback = () => {
    toast.info(
      'Em breve, você poderá enviar feedbacks sobre os chats.\n\nAgradecemos sua paciência!',
      {
        icon: <Wrench />,
        style: { fontSize: '16px', backgroundColor: '#e9ecef', color: '#333' },
      },
    )
  }

  const handleFile = () => {
    toast.info(
      'A funcionalidade de envio de arquivos será adicionada futuramente.\n\nFique ligado!',
      {
        icon: <Wrench />,
        style: { fontSize: '16px', backgroundColor: '#e9ecef', color: '#333' },
      },
    )
  }

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      sendMessage(messageInput)
      setMessageInput('')
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        'Mensagem enviada!',
      ])
    }
  }

  const handleNewChat = () => {
    if (newChatName.trim() === '') return
    const newRooms = [...rooms, newChatName]
    setRooms(newRooms)
    localStorage.setItem('rooms', JSON.stringify(newRooms))
    setShowNewChatModal(false)
    setNewChatName('')
    setNotifications((prevNotifications) => [
      ...prevNotifications,
      `Nova sala "${newChatName}" criada!`,
    ])
  }

  const handleDeleteRoom = async () => {
    if (
      window.confirm(
        `Are you sure you want to delete the room "${currentRoom}"?`,
      )
    ) {
      if (currentRoom === 'Global') {
        toast.error('Cannot delete the "Global" room.', { icon: <Wrench /> })
        return
      }
      try {
        const response = await fetch(
          `http://localhost:3333/messages/${currentRoom}`,
          {
            method: 'DELETE',
          },
        )
        const responseData = await response.json()
        console.log('Delete response:', responseData)

        if (!response.ok) {
          throw new Error('Failed to delete messages')
        }

        const updatedRooms = rooms.filter((room) => room !== currentRoom)
        setRooms(updatedRooms)
        localStorage.setItem('rooms', JSON.stringify(updatedRooms))

        if (currentRoom === currentRoom) {
          setCurrentRoom('Global')
        }

        setNotifications((prevNotifications) => [
          ...prevNotifications,
          `Sala "${currentRoom}" deletada!`,
        ])
      } catch (error) {
        toast.error('Error deleting room.', { icon: <Wrench /> })
        console.error('Error deleting room:', error)
      }
    }
  }

  const clearNotifications = () => {
    setNotifications([])
  }

  return (
    <div className="bg-zinc-200 p-2 md:p-6 flex h-screen gap-4">
      <Sidebar
        menuResponsive={menuResponsive}
        showChats={showChats}
        rooms={rooms}
        setCurrentRoom={setCurrentRoom}
        setShowNewChatModal={setShowNewChatModal}
        toggleMenuResponsive={toggleMenuResponsive}
        toggleShowChats={toggleShowChats}
      />
      <main className="flex flex-1 flex-col justify-between items-center overflow-y-auto">
        <ToastContainer />
        <ChatHeader
          currentRoom={currentRoom}
          handleDeleteRoom={handleDeleteRoom}
          handleFeedback={handleFeedback}
          handleSearch={handleSearch}
        />
        <ChatBody messages={messages} userId={userId} />
        <MessageInput
          messageInput={messageInput}
          setMessageInput={setMessageInput}
          handleSendMessage={handleSendMessage}
          handleEmoji={handleEmoji}
          handleFile={handleFile}
        />
      </main>
      {showNewChatModal && (
        <NewChatModal
          newChatName={newChatName}
          setNewChatName={setNewChatName}
          handleNewChat={handleNewChat}
          setShowNewChatModal={setShowNewChatModal}
        />
      )}
      <Notifications
        notifications={notifications}
        clearNotifications={clearNotifications}
      />
    </div>
  )
}
