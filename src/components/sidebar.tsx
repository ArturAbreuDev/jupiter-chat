import React from 'react'
import {
  ChevronDown,
  ChevronRight,
  Menu,
  MessageCircleMoreIcon,
  Plus,
} from 'lucide-react'

interface SidebarProps {
  menuResponsive: boolean
  showChats: boolean
  rooms: string[]
  setCurrentRoom: (room: string) => void
  setShowNewChatModal: (show: boolean) => void
  toggleMenuResponsive: () => void
  toggleShowChats: () => void
}

export function Sidebar({
  menuResponsive,
  showChats,
  rooms,
  setCurrentRoom,
  setShowNewChatModal,
  toggleMenuResponsive,
  toggleShowChats,
}: SidebarProps) {
  return (
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
          className={`px-4 transition-all py-6 text-white rounded-md bg-jupiter-secondary w-full ${menuResponsive ? 'justify-between' : 'justify-center'} flex items-center cursor-pointer`}
          onClick={() => setShowNewChatModal(true)}
        >
          <Plus />
          {menuResponsive && 'Nova sala'}
        </div>
        {rooms.length > 0 && (
          <div
            className={`px-4 transition-all py-6 text-white rounded-md bg-jupiter-secondary w-full ${menuResponsive ? 'justify-between' : 'justify-center'} flex items-center cursor-pointer`}
            onClick={toggleShowChats}
          >
            {showChats ? <ChevronDown /> : <ChevronRight />}
            {menuResponsive && 'Salas Recentes'}
          </div>
        )}
        {showChats && (
          <>
            <div
              className={`px-4 transition-all py-6 text-white rounded-md bg-jupiter-secondary w-full ${menuResponsive ? 'justify-between' : 'justify-center'} flex items-center cursor-pointer`}
              onClick={() => setCurrentRoom('Global')}
            >
              <MessageCircleMoreIcon />
              {menuResponsive && 'Global'}
            </div>
            {rooms
              .filter((room) => room !== 'Global')
              .map((room, index) => (
                <div
                  key={index}
                  className={`px-4 transition-all py-6 text-white rounded-md bg-jupiter-secondary w-full ${menuResponsive ? 'justify-between' : 'justify-center'} flex items-center cursor-pointer`}
                  onClick={() => setCurrentRoom(room)}
                >
                  <MessageCircleMoreIcon />
                  {menuResponsive && room}
                </div>
              ))}
          </>
        )}
      </div>
      <img
        src="/footer-logo.webp"
        className="size-24 rounded-2xl"
        alt="imagem de perfil"
      />
    </aside>
  )
}
