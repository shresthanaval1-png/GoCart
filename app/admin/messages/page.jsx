import prisma from "@/lib/prisma";

export default async function MessagesPage() {

  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" }
  });

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

              {/* TOP */}
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="font-medium text-lg text-slate-800">
                    {msg.name}
                  </p>
                  <p className="text-sm text-slate-500">
                    {msg.email}
                  </p>
                </div>

                <p className="text-xs text-slate-400">
                  {new Date(msg.createdAt).toLocaleString()}
                </p>
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