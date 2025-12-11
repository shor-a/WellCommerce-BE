import { Router } from "express"
import {
  addCart,
  deleteCart,
  getAllCarts,
  getCart,
  updateCart,
  addProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  updateProduct,
} from "../controllers/mainController.js"
import { validateIdParam, validateCartBody, validateProductBody } from "../utils/validatorFunctions.js"

const router = Router()

// Cart routes
router.get("/get-cart/:id", validateIdParam(), getCart)
router.get("/get-all-carts", getAllCarts)
router.post("/add-cart", validateCartBody(), addCart)
router.put("/update-cart/:id", validateIdParam(), validateCartBody(), updateCart)
router.delete("/delete-cart/:id", validateIdParam(), deleteCart)

// Products routes
router.get("/get-product/:id", validateIdParam(), getProduct)
router.get("/get-all-products", getAllProducts)
router.post("/add-product", validateProductBody(), addProduct)
router.put("/update-product/:id", validateIdParam(), validateProductBody(), updateProduct)
router.delete("/delete-product/:id", validateIdParam(), deleteProduct)

export default router
