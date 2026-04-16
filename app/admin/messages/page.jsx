'use client'

import { useEffect, useState } from "react";

export default function MessagesPage() {

  const [messages, setMessages] = useState([]);

  // ✅ FETCH MESSAGES
  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/contact");
      const data = await res.json();
      setMessages(data.messages || []);
    } catch (error) {
      console.log("Error fetching messages");
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // ✅ DELETE MESSAGE
  const handleDelete = async (id) => {
    const confirmDelete = confirm("Delete this message?");
    if (!confirmDelete) return;

    try {
      await fetch(`/api/contact/${id}`, {
        method: "DELETE",
      });

      setMessages(prev => prev.filter(msg => msg.id !== id));

    } catch (error) {
      alert("Failed to delete message");
    }
  };

  // ✅ MARK AS READ
  const markAsRead = async (id) => {
    try {
      await fetch(`/api/contact/read/${id}`, {
        method: "PATCH",
      });

      setMessages(prev =>
        prev.map(msg =>
          msg.id === id ? { ...msg, isRead: true } : msg
        )
      );
    } catch (error) {
      console.log("Failed to mark as read");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 text-slate-700">

      <h1 className="text-2xl font-semibold mb-8">
        Customer Messages
      </h1>

      {messages.length === 0 ? (
        <p className="text-slate-500">No messages yet</p>
      ) : (
        <div className="space-y-6">

          {messages.map((msg) => (
            <div
              key={msg.id}
              onClick={() => markAsRead(msg.id)}
              className={`border rounded-lg p-5 shadow-sm cursor-pointer transition 
                ${!msg.isRead ? "bg-red-50 border-red-200" : "border-slate-200"}`}
            >

              {/* HEADER */}
              <div className="flex justify-between items-start mb-3">

                <div>
                  <div className="flex items-center gap-2">

                    <p className="font-medium text-lg text-slate-800">
                      {msg.name}
                    </p>

                    {/* 🔴 UNREAD BADGE */}
                    {!msg.isRead && (
                      <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">
                        New
                      </span>
                    )}

                  </div>

                  <p className="text-sm text-slate-500">
                    {msg.email}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <p className="text-xs text-slate-400">
                    {new Date(msg.createdAt).toLocaleString()}
                  </p>

                  {/* 🗑 DELETE BUTTON */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // ✅ prevent triggering markAsRead
                      handleDelete(msg.id);
                    }}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Delete
                  </button>
                </div>

              </div>

              {/* MESSAGE */}
              <p className="text-slate-600 leading-6">
                {msg.message}
              </p>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}