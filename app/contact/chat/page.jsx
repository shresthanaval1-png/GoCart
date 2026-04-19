'use client'
import { useEffect, useState } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import { MoveLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Contact() {

  const router = useRouter();

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  // ✅ FETCH CHAT
  const fetchChat = async () => {
    const res = await fetch("/api/chat/get");
    const data = await res.json();
    setMessages(data.chat?.messages || []);
  };

  useEffect(() => {
    fetchChat();

    // 🔥 Auto refresh
    const interval = setInterval(fetchChat, 3000);
    return () => clearInterval(interval);
  }, []);

  // ✅ SEND MESSAGE
  const sendMessage = async () => {
    if (!text.trim()) return;

    await fetch("/api/chat/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: text }),
    });

    setText("");
    fetchChat();
  };

  // ✅ END CHAT
  const endChat = async () => {
    await fetch("/api/chat/end", { method: "POST" });
    setMessages([]);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 text-slate-700">

      {/* 🔙 BACK BUTTON */}
      <button
        onClick={() => router.back()}
        className="mb-3 p-2 rounded-full hover:bg-slate-100 transition text-slate-500 hover:text-green-600"
      >
        <MoveLeftIcon size={20} />
      </button>

      {/* 🍞 BREADCRUMB */}
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Support Chat", href: "/contact" }
        ]}
      />

      {/* 🧾 TITLE */}
      <h1 className="text-3xl font-semibold mt-2 mb-2 text-slate-800">
        Support Chat
      </h1>

      <p className="mb-6 text-slate-500">
        Chat directly with our support team 💬
      </p>

      {/* 💬 CHAT */}
      <div className="max-w-2xl w-full">

        {/* CHAT BOX */}
        <div className="h-[480px] overflow-y-auto px-4 py-5 rounded-2xl bg-gradient-to-b from-slate-50 to-white border shadow-inner space-y-4">

          {messages.length === 0 && (
            <p className="text-center text-gray-400 text-sm">
              Start conversation 👇
            </p>
          )}

          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-end gap-2 ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >

              {/* ADMIN AVATAR */}
              {msg.sender !== "user" && (
                <div className="w-7 h-7 rounded-full bg-gray-300 flex items-center justify-center text-xs">
                  A
                </div>
              )}

              {/* MESSAGE */}
              <div
                className={`px-4 py-2 rounded-2xl text-sm max-w-[75%] shadow-sm
                ${
                  msg.sender === "user"
                    ? "bg-green-600 text-white rounded-br-none"
                    : "bg-white border rounded-bl-none"
                }`}
              >
                {msg.message}

                {/* TIME + TICKS */}
                <div className="text-[10px] mt-1 opacity-70 flex justify-end gap-1 items-center">
                  {new Date(msg.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}

                  {/* ✅ TICKS */}
                  {msg.sender === "user" && (
                    <span>
                      {msg.isSeen ? "✓✓" : "✓"}
                    </span>
                  )}
                </div>
              </div>

            </div>
          ))}

        </div>

        {/* INPUT */}
        <div className="flex items-center gap-2 mt-4 bg-white border rounded-xl px-3 py-2 shadow">

          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 outline-none text-sm px-2"
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />

          <button
            onClick={sendMessage}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg text-sm transition"
          >
            Send
          </button>

        </div>

        {/* 🔥 END CHAT BUTTON */}
        <button
          onClick={endChat}
          className="mt-4 text-sm text-red-500 hover:underline"
        >
          End Conversation
        </button>

      </div>

    </div>
  );
}