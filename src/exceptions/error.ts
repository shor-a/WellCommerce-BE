import type { Request, Response, NextFunction } from "express"
import { CustomError } from "./customError.ts"

export function error(err: CustomError, req: Request, res: Response, next: NextFunction) {
  const status = err.status ?? 500 // fallback to 500
  let message

  try {
    message = JSON.parse(err.message)
  } catch {
    message = err.message
  }

  res.status(status).json({ message })
}
