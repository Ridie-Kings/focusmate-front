"use client";
import { useToastStore } from "@/stores/toastStore";
import { Ban, CircleAlert, Info, ThumbsUp, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function Toast() {
  const { toasts, removeToast } = useToastStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`min-w-[300px] p-4 rounded-lg shadow-lg flex items-start justify-between gap-4 animate-slide-in border-l-4 ${
            toast.type === "success"
              ? "bg-[#daf8e6] border-[#22AD5C] text-[#014E44]"
              : toast.type === "error"
              ? "bg-[#fef3f3] border-[#F23030] text-[#BC1C21]"
              : toast.type === "warning"
              ? "bg-[#fffbeb] border-[#FBBF24] text-[#202020]"
              : "bg-[#e9f9ff] border-[#0b76b7] text-[#0B76B7]"
          }`}
        >
          {toast.type === "success" ? (
            <ThumbsUp className="bg-[#22AD5C] text-white rounded p-1" />
          ) : toast.type === "error" ? (
            <Ban className="bg-[#f23030] text-white rounded p-1" />
          ) : toast.type === "warning" ? (
            <CircleAlert className="bg-[#FBBF24] text-white rounded p-1" />
          ) : (
            <Info className="bg-[#0b76b7] text-white rounded p-1" />
          )}
          <div className="flex-1 flex flex-col gap-2">
            <p className="font-medium text-lg">{toast.message}</p>
            {toast.description && (
              <p className="opacity-90">{toast.description}</p>
            )}
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="hover:opacity-80 transition-opacity"
          >
            <X size={20} />
          </button>
        </div>
      ))}
    </div>
  );
}
