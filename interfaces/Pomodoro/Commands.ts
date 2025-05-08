export type CommandAction = "togglePlay" | "reset" | "share" | "openFullScreen";

export type CommandButton = {
  id: CommandAction;
  icon: React.ReactNode;
  disabled?: boolean;
  className?: string;
};

export type CommandsProps = {
  fullScreen?: boolean;
};
