import { Router } from "express"
import getOpenApiSpec from "../config/openapi/openapi.ts"

const router = Router()

router.get("/openapi.json", (req, res) => {
  const spec = getOpenApiSpec(`${req.protocol}://${req.get("host")}`)
  res.json(spec)
})

router.get("/docs", (req, res) => {
  const specUrl = `${req.protocol}://${req.get("host")}/openapi.json`
  res.send(`<!doctype html>
  <html>
    <head>
      <meta charset="utf-8" />
      <title>API Docs - Rapidoc</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </head>
    <body>
      <rapi-doc spec-url="${specUrl}" theme="light" render-style="read"></rapi-doc>
      <script type="module" src="https://unpkg.com/rapidoc/dist/rapidoc-min.js"></script>
    </body>
  </html>`)
})

export default router
