import { isNotEmpty } from "@bigbinary/neeto-cist";

export const buildUrl = (route, params) => {
  let queryString = "";

  if (params.page) {
    queryString += `page=${params.page}`;
  }

  if (params.categories && isNotEmpty(params.categories)) {
    params.categories.forEach(item => {
      queryString += `&categories=${item}`;
    });
  }

  return !queryString ? route : `${route}?${queryString}`;
};
