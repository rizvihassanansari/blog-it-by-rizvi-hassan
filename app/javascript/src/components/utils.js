import dayjs from "dayjs";

export const formatDate = dateInISO => dayjs(dateInISO).format("DD MMMM YYYY");

export const formatDateTime = dateInISO =>
  dayjs(dateInISO).format("hh:mmA, DD MMMM YYYY");
