import { CircleCheck, CircleX, Info, TriangleAlert } from "lucide-react";
import { ToastItem, useToast } from "../ToastProvider";

const ToastContainer = () => {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          toast={toast}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};

export default ToastContainer;

const Toast = ({
  toast,
  onClose,
}: {
  toast: ToastItem;
  onClose: () => void;
}) => {
  const bgColor = {
    success: "#daf8e6",
    error: "#fef3f3",
    warning: "#fffbeb",
    info: "#e9f9ff",
  };
  const textColor = {
    success: "#014E44",
    error: "#BC1C21",
    warning: "#202020",
    info: "#0B76B7",
  };
  const secondTextColor = {
    success: "#637381",
    error: "#F56060",
    warning: "#676767",
    info: "#637381",
  };
  const secondBgColor = {
    success: "#22ad5c",
    error: "#f23030",
    warning: "#fbbf24",
    info: "#0b76b7",
  };

  const iconMap = {
    success: <CircleCheck />,
    error: <CircleX />,
    warning: <TriangleAlert />,
    info: <Info />,
  };

  return (
    <div
      style={{
        backgroundColor: bgColor[toast.type],
        borderLeft: `4px solid ${secondBgColor[toast.type]}`,
      }}
      className="text-white p-4 rounded-md shadow-lg flex items-center justify-between min-w-72 transform transition-all duration-300 ease-in-out"
    >
      <div className="flex items-center gap-3">
        <div
          className="text-white flex-shrink-0 rounded-lg p-2"
          style={{
            backgroundColor: secondBgColor[toast.type],
          }}
        >
          {iconMap[toast.type]}
        </div>
        <p
          className="text-sm font-medium"
          style={{ color: secondTextColor[toast.type] }}
        >
          {toast.message}
        </p>
      </div>
      <button
        onClick={onClose}
        style={{ color: secondTextColor[toast.type] }}
        className="ml-4 cursor-pointer hover:text-gray-200 focus:outline-none"
        aria-label="Close"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
};
