import {
  AlertTriangle,
  ChevronDown,
  ChevronRight,
  Menu,
  MessageCircleMoreIcon,
  Plus,
  Search,
  Send,
  Smile,
  Trash,
} from 'lucide-react'
import React, { useState } from 'react'
import { MessageBubble } from './components/messageBubble'

export function App() {
  const [messages, setMessages] = useState([
    {
      message:
        'bla bla bla bla bla bla blabla bla bla bla bla bla blabla bla bla bla bla bla blabla bla bla bla bla bla bla',
      sender: { avatar: '/footer-logo.webp' },
      timestamp: '10:30 AM',
      fromUser: false,
    },
    {
      message:
        'bla bla bla bla bla bla blabla bla bla bla bla bla blabla bla bla bla bla bla blabla bla bla bla bla bla blabla bla bla bla bla bla blabla bla bla bla bla bla blabla bla bla bla bla bla blabla bla bla bla bla bla blabla bla bla bla bla bla blabla bla bla bla bla bla blabla bla bla bla bla bla blabla bla bla bla bla bla blabla bla bla bla bla bla blabla bla bla bla bla bla blabla bla bla bla bla bla blabla bla bla bla bla bla blabla bla bla bla bla bla blabla bla bla bla bla bla blabla bla bla bla bla bla bla :)',
      sender: { avatar: '/footer-logo.webp' },
      timestamp: '10:32 AM',
      fromUser: true,
    },
  ])

  const [menuResponsive, setMenuResponsive] = useState(false)
  const [showChats, setShowChats] = useState(false)

  const toggleMenuResponsive = () => {
    setMenuResponsive(!menuResponsive)
  }

  const toggleShowChats = () => {
    setShowChats(!showChats)
  }

  return (
    <div className="bg-zinc-200 p-6 flex h-screen gap-4">
      <aside
        className={`transition-all overflow-y-auto duration-300 ${menuResponsive ? 'w-96' : 'w-52'} flex flex-col justify-between items-center rounded-md p-8 bg-jupiter-primary`}
      >
        <div>
          <Menu
            className="size-8 text-white cursor-pointer"
            onClick={toggleMenuResponsive}
          />
        </div>

        <div className="flex-1 w-full my-10 flex flex-col gap-5 justify-start items-center">
          <div
            className={`px-4 transition-all py-6 text-white rounded-md bg-jupiter-secondary w-full ${menuResponsive ? 'justify-between' : 'justify-center'} flex  items-center`}
          >
            <Plus />
            {menuResponsive && 'New chat'}
          </div>
          <div
            className={`px-4 transition-all py-6 text-white rounded-md bg-jupiter-secondary w-full ${menuResponsive ? 'justify-between' : 'justify-center'} flex  items-center cursor-pointer`}
            onClick={toggleShowChats}
          >
            {showChats ? <ChevronDown /> : <ChevronRight />}
            {menuResponsive && 'Recent Chats '}
          </div>
          {showChats && (
            <>
              <div
                className={`px-4 transition-all py-6 text-white rounded-md bg-jupiter-secondary w-full ${menuResponsive ? 'justify-between' : 'justify-center'} flex  items-center`}
              >
                <MessageCircleMoreIcon />
                {menuResponsive && 'Chat 1'}
              </div>
              <div
                className={`px-4 transition-all py-6 text-white rounded-md bg-jupiter-secondary w-full ${menuResponsive ? 'justify-between' : 'justify-center'} flex  items-center`}
              >
                <MessageCircleMoreIcon />
                {menuResponsive && 'Chat 2'}
              </div>
              <div
                className={`px-4 transition-all py-6 text-white rounded-md bg-jupiter-secondary w-full ${menuResponsive ? 'justify-between' : 'justify-center'} flex  items-center`}
              >
                <MessageCircleMoreIcon />
                {menuResponsive && 'Chat 3'}
              </div>
            </>
          )}
        </div>
        <img
          src="/footer-logo.webp"
          className="size-24 rounded-2xl"
          alt="imagem de perfil"
        />
      </aside>
      <main className="flex flex-1 flex-col justify-between items-center overflow-y-auto">
        <header className="w-full items-center justify-end flex gap-4">
          <AlertTriangle className="cursor-pointer text-red-600" />
          <Trash className="cursor-pointer text-gray-900" />
          <Search className="cursor-pointer" />
        </header>
        <main className="flex w-full flex-col flex-1 justify-end">
          {messages.map((msg, index) => (
            <MessageBubble
              key={index}
              message={msg.message}
              sender={msg.sender}
              timestamp={msg.timestamp}
              fromUser={msg.fromUser}
            />
          ))}
        </main>
        <div className="p-4 flex justify-between items-center bg-white w-full rounded-xl border border-jupiter-primary">
          <input
            type="text"
            name=""
            id=""
            placeholder="Type a new message here"
            className="flex-1 outline-none"
          />
          <div className="flex gap-2">
            <div>
              <Smile />
            </div>
            <button>
              <Send className="text-jupiter-secondary" />
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
