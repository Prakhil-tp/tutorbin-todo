export type ErrorPayload = {
  message: string;
  failures?: { field: string; message: string }[];
};
