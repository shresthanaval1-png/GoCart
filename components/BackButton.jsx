'use client'
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
  onClick={() => router.back()}
  className="mt-6 mb-2 p-2 rounded-full hover:bg-slate-100 transition text-slate-500 hover:text-green-600"
>
  <MoveLeftIcon size={20} />
</button>
  );
}