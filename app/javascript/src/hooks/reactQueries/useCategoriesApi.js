import { useQuery } from "react-query";

import categoriesApi from "../../apis/categories";
import { QUERY_KEYS } from "../../constants/query";

export const useFetchCategories = () =>
  useQuery({
    queryKey: [QUERY_KEYS.CATEGORIES],
    queryFn: () => categoriesApi.fetch(),
  });
