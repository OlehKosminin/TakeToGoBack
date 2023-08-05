const errorMessages: { [key: number]: string } = {
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  409: "Conflict",
};

const HttpError = (
  status: number,
  message: string = errorMessages[status]
): Error => {
  const error = new Error(message);
  (error as any).status = status;
  return error;
};

export default HttpError;
