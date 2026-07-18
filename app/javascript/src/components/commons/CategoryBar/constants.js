import { t } from "i18next";
import * as yup from "yup";

export const INITIAL_FORM_PROPS = { name: "" };

export const CATEGORY_FORM_VALIDATION_SCHEMA = yup.object().shape({
  name: yup
    .string()
    .required(t("validations.category.required"))
    .min(3, t("validations.category.checkLength")),
});
