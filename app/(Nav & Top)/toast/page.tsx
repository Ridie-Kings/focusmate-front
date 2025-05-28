"use client";
import { useToastStore } from "@/stores/toastStore";

export default function ToastDemo() {
  const { addToast } = useToastStore();

  const showSuccessToast = () => {
    addToast({
      type: "success",
      message: "Operation completed successfully!",
      duration: 3000,
    });
  };

  const showErrorToast = () => {
    addToast({
      type: "error",
      message: "Something went wrong!",
      duration: 5000,
    });
  };

  const showInfoToast = () => {
    addToast({
      type: "info",
      message: "Here's some information for you.",
    });
  };

  const showWarningToast = () => {
    addToast({
      type: "warning",
      message: "Please be careful with this action.",
      duration: 4000,
    });
  };

  return (
    <div className="flex flex-col gap-4 p-6">
      <h1 className="text-2xl font-bold mb-4">Toast System Demo</h1>
      <div className="flex flex-wrap gap-4">
        <button
          onClick={showSuccessToast}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          Show Success Toast
        </button>
        <button
          onClick={showErrorToast}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Show Error Toast
        </button>
        <button
          onClick={showInfoToast}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Show Info Toast
        </button>
        <button
          onClick={showWarningToast}
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
        >
          Show Warning Toast
        </button>
      </div>
    </div>
  );
}
