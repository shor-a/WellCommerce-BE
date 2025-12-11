import type { Request, Response, NextFunction } from "express"
import express from "express"
import router from "./routes/appRoutes.ts"
import docsRouter from "./routes/openapiRoutes.ts"
import { error } from "./exceptions/error.ts"
import { notFound } from "./middlewares/notFound.ts"
import cors from "cors"
import "dotenv/config"

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors({ origin: "*" }))

// Show request detail for debugging especially
// app.use((req, res, next) => {
//   console.log(req.method, req.url, req.params, req.body)
//   next()
// })

app.use("/api", router)

// Docs (OpenAPI JSON + Rapidoc UI)
app.use(docsRouter)

app.use(notFound)
app.use(error)

let port = process.env.PORT!

let appUrl = app.listen(port, () => {
  console.log(`Wellcommerce-BE Server is running on port ${port}`)
  console.log(`OpenAPI page can be accessed at ${process.env.APP_URL!}/docs`)
})

export default app
