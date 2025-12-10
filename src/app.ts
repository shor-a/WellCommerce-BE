import express from "express"
import type { Request, Response, NextFunction } from "express"
import cors from "cors"

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors({ origin: "*" }))

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).send({ status: "Route not found" })
  next()
})

let port = 3001
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
