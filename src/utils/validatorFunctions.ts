import { body, param } from "express-validator"

export const validateIdParam = () => [param("id").isInt({ min: 1 }).withMessage("ID must be a positive integer")]

export const validateCartBody = () => [
  body("customerName").isLength({ min: 1, max: 50 }).withMessage("Customer name is required and must be max 50 characters"),
  body("customerPhone").isLength({ min: 1, max: 16 }).withMessage("Customer phone is required and must be max 16 characters"),
  body("customerAddress").isLength({ min: 1, max: 256 }).withMessage("Customer address is required and must be max 256 characters"),
  body("totalPrice").isNumeric().withMessage("Total price must be numeric"),
  body("variantDetails").optional().isArray().withMessage("Variant details must be an array"),
  body("orderComplete").optional().isIn(["Y", "N"]).withMessage("Order complete must be Y or N"),
]

export const validateProductBody = () => [
  body("image").notEmpty().withMessage("Image is required"),
  body("name").isLength({ min: 1, max: 150 }).withMessage("Name is required and must be max 150 characters"),
  body("category").isLength({ min: 1, max: 80 }).withMessage("Category is required and must be max 80 characters"),
  body("dressStyle").isLength({ min: 1, max: 80 }).withMessage("Dress style is required and must be max 80 characters"),
  body("rating").isFloat({ min: 0, max: 5 }).withMessage("Rating must be between 0 and 5"),
  body("ratingCount").optional().isInt({ min: 0 }).withMessage("Rating count must be non-negative integer"),
  body("price").isNumeric().withMessage("Price must be numeric"),
  body("description").notEmpty().withMessage("Description is required"),
  body("originalPrice").optional().isNumeric().withMessage("Original price must be numeric"),
  body("discount").optional().isNumeric().withMessage("Discount must be numeric"),
]
