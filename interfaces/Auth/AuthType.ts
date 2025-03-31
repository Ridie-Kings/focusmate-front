export type AuthType = "login" | "register";

export type AuthField = {
  name: string;
  type: string;
  label: string;
  icon?: React.ReactNode;
  placeholder: string;
};

export type AuthConfig = {
  title: string;
  description?: string;
  fields: AuthField[];
  otherElements?: React.ReactNode;
};

export type AuthHeaderProps = {
  type: AuthType;
};

export type AuthResponse = {
  success: boolean;
  message: string;
};
