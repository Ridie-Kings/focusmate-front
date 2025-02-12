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

export interface LoginProps {
  email: string;
  password: string;
}

export interface RegisterProps {
  fullName: string;
  username: string;
  email: string;
  password: string;
}
