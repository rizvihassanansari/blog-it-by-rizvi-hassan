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
    .required("Title is required")
    .max(
      MAX_TITLE_LENGTH,
      `Title cannot exceed ${MAX_TITLE_LENGTH} characters`
    ),
  description: yup
    .string()
    .required("Title is required")
    .max(
      MAX_DESCRIPTION_LENGTH,
      `Description cannot exceed ${MAX_DESCRIPTION_LENGTH} characters`
    ),
});
