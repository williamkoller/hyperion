export type UserOutputType = {
  id: number;
  name: string;
  surname: string;
  password: string;
  email: string;
  lastLogged?: Date | string;
  createdAt: Date | string;
  updatedAt: Date | string;
};
