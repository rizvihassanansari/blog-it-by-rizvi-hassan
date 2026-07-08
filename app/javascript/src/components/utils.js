import dayjs from "dayjs";

export const formatDate = dateInISO => dayjs(dateInISO).format("DD MMMM YYYY");
