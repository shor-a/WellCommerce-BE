export function getOpenApiSpec(baseUrl = "http://localhost:3000") {
  return {
    openapi: "3.0.1",
    info: {
      title: "WellCommerce API",
      version: "1.0.0",
      description: "E-commerce API with notes, cart, and products endpoints",
    },
    servers: [{ url: baseUrl }],
    paths: {
      "/api/get-all-carts": {
        get: {
          summary: "Get all carts",
          responses: {
            "200": {
              description: "A list of carts",
              content: {
                "application/json": {
                  schema: { type: "object", properties: { carts: { type: "array", items: { $ref: "#/components/schemas/Cart" } } } },
                },
              },
            },
          },
        },
      },
      "/api/get-cart/{id}": {
        get: {
          summary: "Get a cart by id",
          parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
          responses: {
            "200": {
              description: "A cart",
              content: {
                "application/json": { schema: { type: "object", properties: { cart: { $ref: "#/components/schemas/Cart" } } } },
              },
            },
            "400": { description: "Validation error" },
          },
        },
      },
      "/api/add-cart": {
        post: {
          summary: "Create a new cart",
          requestBody: {
            required: true,
            content: { "application/json": { schema: { $ref: "#/components/schemas/NewCart" } } },
          },
          responses: {
            "201": {
              description: "Created",
              content: {
                "application/json": { schema: { type: "object", properties: { cart: { $ref: "#/components/schemas/Cart" } } } },
              },
            },
          },
        },
      },
      "/api/update-cart/{id}": {
        put: {
          summary: "Update a cart",
          parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
          requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/NewCart" } } } },
          responses: {
            "201": {
              description: "Updated",
              content: {
                "application/json": { schema: { type: "object", properties: { cart: { $ref: "#/components/schemas/Cart" } } } },
              },
            },
          },
        },
      },
      "/api/delete-cart/{id}": {
        delete: {
          summary: "Delete a cart",
          parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
          responses: {
            "200": {
              description: "Deleted",
              content: { "application/json": { schema: { type: "object", properties: { cart: { type: "object" } } } } },
            },
          },
        },
      },
      "/api/get-all-products": {
        get: {
          summary: "Get all products",
          responses: {
            "200": {
              description: "A list of products",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: { products: { type: "array", items: { $ref: "#/components/schemas/Product" } } },
                  },
                },
              },
            },
          },
        },
      },
      "/api/get-product/{id}": {
        get: {
          summary: "Get a product by id",
          parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
          responses: {
            "200": {
              description: "A product",
              content: {
                "application/json": { schema: { type: "object", properties: { product: { $ref: "#/components/schemas/Product" } } } },
              },
            },
            "400": { description: "Validation error" },
          },
        },
      },
      "/api/add-product": {
        post: {
          summary: "Create a new product",
          requestBody: {
            required: true,
            content: { "application/json": { schema: { $ref: "#/components/schemas/NewProduct" } } },
          },
          responses: {
            "201": {
              description: "Created",
              content: {
                "application/json": { schema: { type: "object", properties: { product: { $ref: "#/components/schemas/Product" } } } },
              },
            },
          },
        },
      },
      "/api/update-product/{id}": {
        put: {
          summary: "Update a product",
          parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
          requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/NewProduct" } } } },
          responses: {
            "201": {
              description: "Updated",
              content: {
                "application/json": { schema: { type: "object", properties: { product: { $ref: "#/components/schemas/Product" } } } },
              },
            },
          },
        },
      },
      "/api/delete-product/{id}": {
        delete: {
          summary: "Delete a product",
          parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
          responses: {
            "200": {
              description: "Deleted",
              content: { "application/json": { schema: { type: "object", properties: { product: { type: "object" } } } } },
            },
          },
        },
      },
    },
    components: {
      schemas: {
        Cart: {
          type: "object",
          properties: {
            id: { type: "integer" },
            customerName: { type: "string", maxLength: 50 },
            customerPhone: { type: "string", maxLength: 16 },
            customerAddress: { type: "string", maxLength: 256 },
            totalPrice: { type: "number" },
            variantDetails: { type: "array" },
            orderComplete: { type: "string", enum: ["Y", "N"] },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
          required: ["customerName", "customerPhone", "customerAddress", "totalPrice"],
        },
        NewCart: {
          type: "object",
          properties: {
            customerName: { type: "string", maxLength: 50 },
            customerPhone: { type: "string", maxLength: 16 },
            customerAddress: { type: "string", maxLength: 256 },
            totalPrice: { type: "number" },
            variantDetails: { type: "array" },
            orderComplete: { type: "string", enum: ["Y", "N"] },
          },
          required: ["customerName", "customerPhone", "customerAddress", "totalPrice"],
        },
        Product: {
          type: "object",
          properties: {
            id: { type: "integer" },
            image: { type: "string" },
            name: { type: "string", maxLength: 150 },
            category: { type: "string", maxLength: 80 },
            dressStyle: { type: "string", maxLength: 80 },
            rating: { type: "number", minimum: 0, maximum: 5 },
            ratingCount: { type: "integer", minimum: 0 },
            price: { type: "number" },
            description: { type: "string" },
            originalPrice: { type: "number" },
            discount: { type: "number" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
          required: ["image", "name", "category", "dressStyle", "rating", "price", "description"],
        },
        NewProduct: {
          type: "object",
          properties: {
            image: { type: "string" },
            name: { type: "string", maxLength: 150 },
            category: { type: "string", maxLength: 80 },
            dressStyle: { type: "string", maxLength: 80 },
            rating: { type: "number", minimum: 0, maximum: 5 },
            ratingCount: { type: "integer", minimum: 0 },
            price: { type: "number" },
            description: { type: "string" },
            originalPrice: { type: "number" },
            discount: { type: "number" },
          },
          required: ["image", "name", "category", "dressStyle", "rating", "price", "description"],
        },
      },
    },
  }
}

export default getOpenApiSpec
