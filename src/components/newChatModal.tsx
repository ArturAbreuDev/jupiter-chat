import React from 'react'

interface NewChatModalProps {
  newChatName: string
  setNewChatName: React.Dispatch<React.SetStateAction<string>>
  handleNewChat: () => void
  setShowNewChatModal: (show: boolean) => void
}

export function NewChatModal({
  newChatName,
  setNewChatName,
  handleNewChat,
  setShowNewChatModal,
}: NewChatModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl mb-4">Criar nova sala</h2>
        <input
          type="text"
          className="border p-2 w-full mb-4"
          placeholder="Escolha o nome da sala"
          value={newChatName}
          onChange={(e) => setNewChatName(e.target.value)}
        />
        <div className="flex justify-between gap-4">
          <button
            className="border rounded-md border-gray-500 text-black px-4 py-2"
            onClick={() => setShowNewChatModal(false)}
          >
            Cancelar
          </button>
          <button
            className="bg-jupiter-primary text-white px-4 py-2 rounded"
            onClick={handleNewChat}
          >
            Criar
          </button>
        </div>
      </div>
    </div>
  )
}
