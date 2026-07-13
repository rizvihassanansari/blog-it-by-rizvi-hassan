import * as yup from "yup";

export const SIGNUP_FORM_INITIAL_VALUES = {
  name: "",
  email: "",
  password: "",
  passwordConfirmation: "",
};

export const SIGNUP_FORM_VALIDATION_SCHEMA = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Email must be valid")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters long"),
  passwordConfirmation: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password")], "Passwords do not match"),
});
