import { filterNonNull } from "@bigbinary/neeto-cist";
import { useMutation, useQuery } from "react-query";

import postsApi from "../../apis/posts";
import { QUERY_KEYS } from "../../constants/query";

export const useFetchPosts = params => {
  const filteredParams = filterNonNull(params);

  return useQuery({
    queryKey: [QUERY_KEYS.POSTS, filteredParams],
    queryFn: () => postsApi.fetch(filteredParams),
  });
};

export const useShowPost = slug =>
  useQuery({
    queryKey: [QUERY_KEYS.POSTS, slug],
    queryFn: () => postsApi.show(slug),
  });

export const useCreatePost = handleSuccess =>
  useMutation({
    mutationKey: [QUERY_KEYS.POSTS],
    mutationFn: payload => postsApi.create(payload),
    onSuccess: handleSuccess,
  });
