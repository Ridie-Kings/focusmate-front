export type AuthType = 'login' | 'register';

export interface AuthField {
	name: string;
	type: string;
	label: string;
	icon?: React.ReactNode;
}

export interface AuthConfig {
	title: string
	fields: AuthField[];
	otherElements?: React.ReactNode;
}

export interface InputFieldProps {
	name: string;
	type: string;
	label: string;
	icon?: React.ReactNode;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface AuthHeaderProps {
	type: AuthType;
}

export interface AuthFormProps {
	type: AuthType;
	onSubmit: (data: Record<string, string>) => void;
}