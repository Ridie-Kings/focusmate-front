
import { Dispatch, SetStateAction, useState } from "react";
import { Copy, Check, AlertCircle } from "lucide-react";
import Button from "@/components/Reusable/Button";
import BtnSend from "./Modal/BtnSend";

interface ShareModalProps {
  setIsOpen: Dispatch<SetStateAction<string>>;
  shareCode: string;
}

export default function ShareModal({ setIsOpen, shareCode }: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const shareUrl = `${window.location.origin}/pomodoro/join/${shareCode}`;
  
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      setError("Error al copiar el enlace");
    }
  };
  
  return (
    <div className="flex flex-col gap-2 w-full">
      <p className="text-sm text-gray-500">
        Comparte este enlace para que otros puedan unirse a tu sesión de Pomodoro:
      </p>
      <div className="flex items-center space-x-2">
        <div className="grid flex-1 gap-2">
          <div className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
            <span className="flex-1 opacity-70 truncate">{shareUrl}</span>
          </div>
        </div>
        <Button 
          onClick={handleCopy}
          button="primary"
          type="button"
          size="compact"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </Button>
      </div>
      <p className="text-sm font-medium">Código: {shareCode}</p>
      
      {error && (
        <div className="flex items-center gap-2 text-red-500 text-sm mt-1">
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}

      <BtnSend
        handleClick={() => setIsOpen("")}
        isLoading={false}
        setIsOpen={setIsOpen}
      />
    </div>
  );
}