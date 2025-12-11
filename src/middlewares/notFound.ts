import type { Response, Request, NextFunction } from "express"
import { CustomError } from "../exceptions/customError.js"

export function notFound(req: Request, res: Response, next: NextFunction) {
  return next(new CustomError("Resource Not Found", 404))
}
