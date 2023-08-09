const errorMessages: { [key: number]: string } = {
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  409: "Conflict",
};

const HttpError = (status: number, customMessage?: string): Error => {
  const defaultMessage = errorMessages[status] || "Server Error";
  const message = customMessage || defaultMessage;

  const error = new Error(message);
  (error as any).status = status;

  console.log("error: ", error);
  return error;
};

export default HttpError;
