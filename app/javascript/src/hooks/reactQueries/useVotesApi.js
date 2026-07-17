import { useMutation } from "react-query";

import votesApi from "../../apis/votes";
import { QUERY_KEYS } from "../../constants/query";

export const useCreateVote = () =>
  useMutation({
    mutationKey: [QUERY_KEYS.VOTES],
    mutationFn: params => votesApi.create(params),
  });

export const useDestroyVote = () =>
  useMutation({
    mutationKey: [QUERY_KEYS.VOTES],
    mutationFn: params => votesApi.destroy(params),
  });
