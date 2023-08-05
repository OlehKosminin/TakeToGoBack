import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

interface IFuncProps {
  err: ErrorRequestHandler;
  req: Request;
  res: Response;
  next: NextFunction;
}

export default IFuncProps;
