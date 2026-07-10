import { t } from "i18next";
import * as yup from "yup";

const MAX_TITLE_LENGTH = 125;
const MAX_DESCRIPTION_LENGTH = 10000;

export const POST_FORM_INITIAL_VALUES = {
  title: "",
  description: "",
};

export const POST_FORM_VALIDATION_SCHEMA = yup.object().shape({
  title: yup
    .string()
    .required(t("validations.titleRequired"))
    .max(
      MAX_TITLE_LENGTH,
      t("validations.titleCannotExceed", { length: MAX_TITLE_LENGTH })
    ),
  description: yup
    .string()
    .required(t("validations.descriptionRequired"))
    .max(
      MAX_DESCRIPTION_LENGTH,
      t("validations.descriptionCannotExceed", {
        length: MAX_DESCRIPTION_LENGTH,
      })
    ),
});
