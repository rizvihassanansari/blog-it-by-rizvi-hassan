import { filterNonNull } from "neetocist";

export const buildUrl = (route, params) => {
  const filteredParams = filterNonNull(params);
  const queryString = new URLSearchParams(filteredParams).toString();

  return !queryString ? route : `${route}?${queryString}`;
};
