export type CommandAction =
  | "togglePlay"
  | "pause"
  | "reset"
  | "share"
  | "openFullScreen"
  | "settings";

export type CommandButton = {
  id: CommandAction;
  icon: React.ReactNode;
  disabled?: boolean;
  className?: string;
};

export type CommandsProps = {
  fullScreen?: boolean;
};
