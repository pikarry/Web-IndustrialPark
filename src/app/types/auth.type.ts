import { Gender, Role } from "@app/constants";

export interface SignInInitialValues {
  email: string;
  password: string;
}

export interface SignInResponse {
  _id: string;
  email: string;
  role: Role;
  jwt: string;
}

export interface SignUpInitialValues {
  email: string;
  fullname: string;
  password: string;
  confirmPassword: string;
  phone: string;
  address: string;
}

export interface SignUpRequest {
  email: string;
  fullname: string;
  password: string;
  phone: string;
  address: string;
  gender: Gender;
}
