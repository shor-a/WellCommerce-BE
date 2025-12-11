import { eq } from "drizzle-orm"
import { db } from "../config/db/db.ts"
import { cartInWellcommerce, productsInWellcommerce } from "../config/db/schema.ts"
import type { Response, Request, NextFunction } from "express"
import { CustomError } from "../exceptions/customError.ts"
import { validationResult } from "express-validator"

// Cart Controllers
export async function addCart(req: Request, res: Response, next: NextFunction) {
  const result = validationResult(req)
  if (!result.isEmpty()) {
    return next(new CustomError(JSON.stringify(result.array()), 400))
  }
  try {
    const cart = await db.insert(cartInWellcommerce).values(req.body).returning()
    res.status(201).json({ cart })
  } catch (error) {
    next(new CustomError("Failed to add cart", 500))
  }
}

export async function getAllCarts(req: Request, res: Response, next: NextFunction) {
  try {
    const carts = await db.select().from(cartInWellcommerce)
    res.status(200).json({ carts })
  } catch (error) {
    next(new CustomError("Failed to fetch carts", 500))
  }
}

export async function getCart(req: Request, res: Response, next: NextFunction) {
  const result = validationResult(req)
  if (!result.isEmpty()) {
    return next(new CustomError(JSON.stringify(result.array()), 400))
  }
  try {
    const cart = await db.select().from(cartInWellcommerce).where(eq(cartInWellcommerce.cartId, +req.params.id!))
    res.status(200).json({ cart })
  } catch (error) {
    next(new CustomError("Failed to fetch cart", 500))
  }
}

export async function deleteCart(req: Request, res: Response, next: NextFunction) {
  const result = validationResult(req)
  if (!result.isEmpty()) {
    return next(new CustomError(JSON.stringify(result.array()), 400))
  }
  try {
    const cart = await db.delete(cartInWellcommerce).where(eq(cartInWellcommerce.cartId, +req.params.id!)).returning({
      deletedCartId: cartInWellcommerce.cartId,
    })
    res.status(200).json({ cart })
  } catch (error) {
    next(new CustomError("Failed to delete cart", 500))
  }
}

export async function updateCart(req: Request, res: Response, next: NextFunction) {
  const result = validationResult(req)
  if (!result.isEmpty()) {
    return next(new CustomError(JSON.stringify(result.array()), 400))
  }
  try {
    const cart = await db.update(cartInWellcommerce).set(req.body).where(eq(cartInWellcommerce.cartId, +req.params.id!)).returning()
    res.status(201).json({ cart })
  } catch (error) {
    next(new CustomError("Failed to update cart", 500))
  }
}

// Products Controllers
export async function addProduct(req: Request, res: Response, next: NextFunction) {
  const result = validationResult(req)
  if (!result.isEmpty()) {
    return next(new CustomError(JSON.stringify(result.array()), 400))
  }
  try {
    const product = await db.insert(productsInWellcommerce).values(req.body).returning()
    res.status(201).json({ product })
  } catch (error) {
    next(new CustomError("Failed to add product", 500))
  }
}

export async function getAllProducts(req: Request, res: Response, next: NextFunction) {
  try {
    const products = await db.select().from(productsInWellcommerce)
    res.status(200).json({ products })
  } catch (error) {
    next(new CustomError("Failed to fetch products", 500))
  }
}

export async function getProduct(req: Request, res: Response, next: NextFunction) {
  const result = validationResult(req)
  if (!result.isEmpty()) {
    return next(new CustomError(JSON.stringify(result.array()), 400))
  }
  try {
    const product = await db.select().from(productsInWellcommerce).where(eq(productsInWellcommerce.pId, +req.params.id!))
    res.status(200).json({ product })
  } catch (error) {
    next(new CustomError("Failed to fetch product", 500))
  }
}

export async function deleteProduct(req: Request, res: Response, next: NextFunction) {
  const result = validationResult(req)
  if (!result.isEmpty()) {
    return next(new CustomError(JSON.stringify(result.array()), 400))
  }
  try {
    const product = await db.delete(productsInWellcommerce).where(eq(productsInWellcommerce.pId, +req.params.id!)).returning({
      deletedProductId: productsInWellcommerce.pId,
    })
    res.status(200).json({ product })
  } catch (error) {
    next(new CustomError("Failed to delete product", 500))
  }
}

export async function updateProduct(req: Request, res: Response, next: NextFunction) {
  const result = validationResult(req)
  if (!result.isEmpty()) {
    return next(new CustomError(JSON.stringify(result.array()), 400))
  }
  try {
    const product = await db
      .update(productsInWellcommerce)
      .set(req.body)
      .where(eq(productsInWellcommerce.pId, +req.params.id!))
      .returning()
    res.status(201).json({ product })
  } catch (error) {
    next(new CustomError("Failed to update product", 500))
  }
}
