import { Role } from "../enums/role.enum";

export interface User {
  id?: string;
  fullName: string;
  email: string;
  password: string;
  role?: Role;
  isActive?: boolean;
}
