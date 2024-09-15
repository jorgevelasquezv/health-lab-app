import { Gender } from "../enums/gender.enum";
import { IdentificationType } from "../enums/identification-type.enum";
import { Role } from "../enums/role.enum";

export interface User {
  id?: string;
  name: string;
  lastName: string;
  gender: Gender;
  address: string;
  country: string;
  city: string;
  identificationType: IdentificationType;
  identificationNumber: string;
  idMedicalRecord?: string;
  email: string;
  password: string;
  role?: Role;
  isActive?: boolean;
}
