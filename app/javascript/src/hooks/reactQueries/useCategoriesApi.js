import { useQuery } from "react-query";

import categoriesApi from "../../apis/categories";
import { QUERY_KEYS } from "../../constants/query";

export const useFetchCategories = search =>
  useQuery({
    queryKey: [QUERY_KEYS.CATEGORIES, search],
    queryFn: () => categoriesApi.fetch({ search }),
  });
