export type UserType = {
  createdAt: Date;
  email: string;
  phoneNumber: number | null;
  birthDate: Date | null;
  fullname: string;
  password: string;
  refreshtoken: string;
  updatedAt: Date;
  username: string;
  role: "user" | "admin";
  _id: string;
};
