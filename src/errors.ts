import { ErrorRequestHandler, Request, Response, NextFunction } from "express";
import fs from "fs-extra";
const express = require('express');
const app = express();



export function serverError(
  err: ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction
) {
  fs.readFile("public/500.html", "utf-8").then((data) => {
    res.status(500).send(data);
    console.error(err.toString());
  });
}
