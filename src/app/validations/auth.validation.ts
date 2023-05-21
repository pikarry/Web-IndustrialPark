import { REGEX_EMAIL } from "@app/constants";
import * as Yup from "yup";

export const signInValidationSchema = Yup.object().shape({
  email: Yup.string().required("The email is incorrect"),
  password: Yup.string().required("The password is incorrect"),
});

export const signUpValidationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is invalid")
    .matches(REGEX_EMAIL, "Email is invalid"),
  fullname: Yup.string().required("Full name is invalid"),
  password: Yup.string().required("Password is invalid"),
  confirmPassword: Yup.string()
    .required("Confirm password is invalid")
    .oneOf([Yup.ref("password")], "Confirm password does not match"),
  phone: Yup.string()
    .required("Phone is invalid")
    .matches(/^[0-9]{10,11}$/, "Phone is invalid"),
  address: Yup.string().required("Address is invalid"),
});
