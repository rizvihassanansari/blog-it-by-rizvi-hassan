import { t } from "i18next";
import * as yup from "yup";

const MIN_PASSWORD_LENGTH = 6;
const MAX_NAME_LENGTH = 35;

export const SIGNUP_FORM_INITIAL_VALUES = {
  name: "",
  email: "",
  organization: "",
  password: "",
  passwordConfirmation: "",
};

export const SIGNUP_FORM_VALIDATION_SCHEMA = yup.object().shape({
  name: yup
    .string()
    .required(t("validations.auth.name"))
    .max(
      MAX_NAME_LENGTH,
      t("validations.auth.nameLength", { length: MAX_NAME_LENGTH })
    ),
  email: yup
    .string()
    .email(t("validations.auth.validEmail"))
    .required(t("validations.auth.email")),
  organization: yup
    .object()
    .shape({ label: yup.string(), value: yup.number() })
    .required(t("validations.auth.organization")),
  password: yup
    .string()
    .required(t("validations.auth.password"))
    .min(
      6,
      t("validations.auth.passwordLength", { length: MIN_PASSWORD_LENGTH })
    ),
  passwordConfirmation: yup
    .string()
    .required(t("validations.auth.passwordConfirm"))
    .oneOf([yup.ref("password")], t("validations.auth.passwordNotMatch")),
});

export const LOGIN_FORM_INITIAL_VALUES = {
  email: "",
  password: "",
};

export const LOGIN_FORM_VALIDATION_SCHEMA = yup.object().shape({
  email: yup.string().required(t("validations.auth.email")),
  password: yup.string().required(t("validations.auth.password")),
});
