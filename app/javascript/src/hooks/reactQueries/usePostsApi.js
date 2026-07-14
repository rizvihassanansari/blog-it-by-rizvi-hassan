import { filterNonNull } from "@bigbinary/neeto-cist";
import { useMutation, useQuery } from "react-query";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import postsApi from "../../apis/posts";
import { QUERY_KEYS } from "../../constants/query";
import routes from "../../routes";

export const useFetchPosts = params => {
  const filteredParams = filterNonNull(params);

  return useQuery({
    queryKey: [QUERY_KEYS.POSTS, filteredParams],
    queryFn: () => postsApi.fetch(filteredParams),
  });
};

export const useShowPost = slug => {
  const history = useHistory();

  return useQuery({
    queryKey: [QUERY_KEYS.POSTS, slug],
    queryFn: () => postsApi.show(slug),
    retry: false,
    onError: () => history.replace(routes.root),
  });
};

export const useCreatePost = handleSuccess =>
  useMutation({
    mutationKey: [QUERY_KEYS.POSTS],
    mutationFn: payload => postsApi.create(payload),
    onSuccess: handleSuccess,
  });

export const useUpdatePost = () =>
  useMutation({
    mutationKey: [QUERY_KEYS.POSTS],
    mutationFn: values => postsApi.update(values),
  });
