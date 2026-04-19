'use client'

import { useEffect, useState } from "react"
import { Send } from "lucide-react"

export default function MessagesPage() {

  const [chats, setChats] = useState([])
  const [selectedChat, setSelectedChat] = useState(null)
  const [messages, setMessages] = useState([])
  const [reply, setReply] = useState("")

  // ✅ FETCH ALL CHATS
  const fetchChats = async () => {
    const res = await fetch("/api/admin/chat")
    const data = await res.json()
    setChats(data.chats || [])
  }

  // ✅ FETCH SINGLE CHAT + MARK SEEN
  const openChat = async (chatId) => {
    setSelectedChat(chatId)

    const res = await fetch(`/api/admin/chat/${chatId}`)
    const data = await res.json()

    setMessages(data.messages || [])

    // 🔥 MARK AS SEEN
    await fetch("/api/chat/seen", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ chatId })
    })
  }

  useEffect(() => {
    fetchChats()

    // 🔥 AUTO REFRESH SELECTED CHAT (REAL-TIME FEEL)
    const interval = setInterval(() => {
      if (selectedChat) openChat(selectedChat)
    }, 3000)

    return () => clearInterval(interval)
  }, [selectedChat])

  // ✅ SEND REPLY
  const sendReply = async () => {
    if (!reply.trim() || !selectedChat) return

    await fetch("/api/chat/reply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        chatId: selectedChat,
        message: reply
      })
    })

    setReply("")
    openChat(selectedChat)
  }

  // ✅ DELETE CHAT
  const deleteChat = async () => {
    if (!selectedChat) return
    if (!confirm("Delete this conversation?")) return

    await fetch("/api/admin/chat/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ chatId: selectedChat })
    })

    setSelectedChat(null)
    setMessages([])
    fetchChats()
  }

  return (
    <div className="h-[80vh] flex border rounded-2xl overflow-hidden shadow bg-white">

      {/* 🔥 LEFT SIDEBAR */}
      <div className="w-1/3 border-r bg-white overflow-y-auto">

        <div className="p-4 font-semibold border-b bg-slate-50">
          Conversations
        </div>

        {chats.map(chat => (
          <div
            key={chat.id}
            onClick={() => openChat(chat.id)}
            className={`p-4 cursor-pointer border-b hover:bg-slate-50 transition
              ${selectedChat === chat.id ? "bg-slate-100" : ""}`}
          >
            <p className="font-medium">
              {chat.user?.name || "User"}
            </p>

            <p className="text-xs text-gray-400 truncate">
              {chat.user?.email}
            </p>

            <p className="text-[11px] text-gray-400 mt-1">
              {new Date(chat.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}

      </div>

      {/* 🔥 RIGHT CHAT WINDOW */}
      <div className="flex-1 flex flex-col bg-slate-50">

        {/* HEADER */}
        <div className="p-4 border-b bg-white shadow-sm flex justify-between items-center">
          <div>
            <p className="font-semibold">Live Chat</p>
            <p className="text-xs text-gray-400">Support conversation</p>
          </div>

          {/* 🔥 DELETE BUTTON */}
          {selectedChat && (
            <button
              onClick={deleteChat}
              className="text-red-500 text-sm hover:underline"
            >
              Delete
            </button>
          )}
        </div>

        {/* MESSAGES */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">

          {!selectedChat && (
            <p className="text-gray-400 text-center mt-10">
              Select a chat 👈
            </p>
          )}

          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex ${
                msg.sender === "admin" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-2xl text-sm max-w-[70%] shadow-sm
                ${
                  msg.sender === "admin"
                    ? "bg-green-600 text-white rounded-br-none"
                    : "bg-white border rounded-bl-none"
                }`}
              >
                {msg.message}

                {/* 🕒 TIME */}
                <div className="text-[10px] mt-1 opacity-70 text-right">
                  {new Date(msg.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
          ))}

        </div>

        {/* INPUT */}
        {selectedChat && (
          <div className="p-3 border-t bg-white flex items-center gap-2">

            <input
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              placeholder="Type reply..."
              className="flex-1 border px-3 py-2 rounded-lg text-sm outline-none focus:ring-2 focus:ring-green-500"
              onKeyDown={(e) => e.key === "Enter" && sendReply()}
            />

            <button
              onClick={sendReply}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-1 transition"
            >
              <Send size={16} />
            </button>

          </div>
        )}

      </div>

    </div>
  )
}