import { Gender, Role } from "@app/constants";

export interface MyInfo {
  _id: string;
  email: string;
  phone: string;
  address: string;
  fullname: string;
  gender: Gender;
  avt: string;
  role: Role;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateProfileInitialValues {
  fullname: string;
  phone: string;
  address: string;
}

export interface UpdateProfileRequest {
  fullname: string;
  phone: string;
  gender: Gender;
  address: string;
}
