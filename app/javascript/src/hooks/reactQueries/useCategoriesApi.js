import { QUERY_KEYS } from "constants/query";

import categoriesApi from "apis/categories";
import { useMutation, useQuery } from "react-query";

export const useFetchCategories = search =>
  useQuery({
    queryKey: [QUERY_KEYS.CATEGORIES, search],
    queryFn: () => categoriesApi.fetch({ search }),
  });

export const useCreateCategory = handleSuccess =>
  useMutation({
    mutationKey: [QUERY_KEYS.CATEGORIES],
    mutationFn: payload => categoriesApi.create(payload),
    onSuccess: handleSuccess,
  });
