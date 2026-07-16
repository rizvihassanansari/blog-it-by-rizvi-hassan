export const DEFAULT_STATUS_OPTIONS = [
  { label: "Both", value: null },
  { label: "Draft", value: false },
  { label: "Published", value: true },
];

export const DEFAULT_FILTER_OPTIONS = {
  title: "",
  categories: [],
  status: DEFAULT_STATUS_OPTIONS[0],
};
