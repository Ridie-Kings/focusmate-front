export type AuthType = "login" | "register";

export interface AuthField {
  name: string;
  type: string;
  label: string;
  icon?: React.ReactNode;
  placeholder: string;
}

export interface AuthConfig {
  title: string;
  description?: string;
  fields: AuthField[];
  otherElements?: React.ReactNode;
}

export interface AuthHeaderProps {
  type: AuthType;
}
