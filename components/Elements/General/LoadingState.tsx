type LoadingVariant = "spinner" | "skeleton" | "dots";

interface LoadingStateProps {
  variant?: LoadingVariant;
  size?: "sm" | "md" | "lg";
  className?: string;
  text?: string;
}

export default function LoadingState({
  variant = "spinner",
  size = "md",
  className = "",
  text,
}: LoadingStateProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  const renderVariant = () => {
    switch (variant) {
      case "spinner":
        return (
          <div
            className={`animate-spin rounded-full border-t-2 border-b-2 border-primary-500 ${sizeClasses[size]} ${className}`}
          />
        );
      case "dots":
        return (
          <div className="flex gap-1">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`animate-bounce rounded-full bg-primary-500 ${
                  size === "sm"
                    ? "h-2 w-2"
                    : size === "md"
                    ? "h-3 w-3"
                    : "h-4 w-4"
                }`}
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        );
      case "skeleton":
        return (
          <div
            className={`animate-pulse rounded bg-gray-200 w-full ${
              size === "sm" ? "h-4" : size === "md" ? "h-8" : "h-12"
            } ${className}`}
          />
        );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      {renderVariant()}
      {text && <p className="text-sm text-gray-500 font-medium">{text}</p>}
    </div>
  );
}
