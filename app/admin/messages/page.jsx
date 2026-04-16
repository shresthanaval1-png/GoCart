'use client'

import { useEffect, useState } from "react";

export default function MessagesPage() {

  const [messages, setMessages] = useState([]);

  // ✅ FETCH MESSAGES FROM API
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

      // update UI instantly
      setMessages(prev => prev.filter(msg => msg.id !== id));

    } catch (error) {
      alert("Failed to delete message");
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
              className="border border-slate-200 rounded-lg p-5 shadow-sm"
            >

              {/* HEADER */}
              <div className="flex justify-between items-start mb-3">

                <div>
                  <p className="font-medium text-lg text-slate-800">
                    {msg.name}
                  </p>
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
                    onClick={() => handleDelete(msg.id)}
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