import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

interface ICtrlWrapper {
  ctrl: (req: Request, res: Response, next?: NextFunction) => void;
}

const ctrlWrapper = ({ ctrl }: ICtrlWrapper) => {
  const func = async (req: Request, res: Response, next?: NextFunction) => {
    try {
      await ctrl(req, res, next);
    } catch (error) {
      next(error);
    }
  };
  return func;
};

export default ctrlWrapper;
