import express from "express";
import cors from "cors";
import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use(
  (
    err: ErrorRequestHandler,
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    const status = err instanceof Error ? 500 : (err as any).status || 500;
    const message =
      err instanceof Error
        ? "Server error"
        : (err as any).message || "Server error";
    res.status(status).json({ message });
  }
);

export default app;
