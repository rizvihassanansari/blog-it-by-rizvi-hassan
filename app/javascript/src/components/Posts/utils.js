import dayjs from "dayjs";
import { dissoc, mergeLeft } from "ramda";

export const formatDate = dateInISO => dayjs(dateInISO).format("DD MMMM YYYY");

export const getValues = obj => obj.map(item => item.value);

export const modifySubmitPayload = params => {
  const category_ids = getValues(params.categories);

  return dissoc("categories", mergeLeft({ category_ids }, params));
};
