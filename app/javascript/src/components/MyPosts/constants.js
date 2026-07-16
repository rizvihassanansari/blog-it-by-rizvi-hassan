import { t } from "i18next";

export const DEFAULT_STATUS_OPTIONS = [
  { label: t("labels.both"), value: null },
  { label: t("labels.draft"), value: false },
  { label: t("labels.published"), value: true },
];

export const DEFAULT_FILTER_OPTIONS = {
  title: "",
  categories: [],
  status: DEFAULT_STATUS_OPTIONS[0],
};
