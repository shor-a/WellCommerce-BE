export function getOpenApiSpec(baseUrl = "http://localhost:3000") {
  return {
    openapi: "3.0.1",
    info: {
      title: "ExpressOne API",
      version: "1.0.0",
      description: "Minimal API with notes endpoints",
    },
    servers: [{ url: baseUrl }],
    paths: {
      "/api/get-all-notes": {
        get: {
          summary: "Get all notes",
          responses: {
            "200": {
              description: "A list of notes",
              content: {
                "application/json": {
                  schema: { type: "object", properties: { notes: { type: "array", items: { $ref: "#/components/schemas/Note" } } } },
                },
              },
            },
          },
        },
      },
      "/api/get-note/{id}": {
        get: {
          summary: "Get a note by id",
          parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
          responses: {
            "200": {
              description: "A note",
              content: {
                "application/json": { schema: { type: "object", properties: { note: { $ref: "#/components/schemas/Note" } } } },
              },
            },
            "400": { description: "Validation error" },
          },
        },
      },
      "/api/add-note": {
        post: {
          summary: "Create a new note",
          requestBody: {
            required: true,
            content: { "application/json": { schema: { $ref: "#/components/schemas/NewNote" } } },
          },
          responses: {
            "201": {
              description: "Created",
              content: {
                "application/json": { schema: { type: "object", properties: { note: { $ref: "#/components/schemas/Note" } } } },
              },
            },
          },
        },
      },
      "/api/update-note/{id}": {
        put: {
          summary: "Update a note",
          parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
          requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/NewNote" } } } },
          responses: {
            "201": {
              description: "Updated",
              content: {
                "application/json": { schema: { type: "object", properties: { note: { $ref: "#/components/schemas/Note" } } } },
              },
            },
          },
        },
      },
      "/api/delete-note/{id}": {
        delete: {
          summary: "Delete a note",
          parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
          responses: {
            "200": {
              description: "Deleted",
              content: { "application/json": { schema: { type: "object", properties: { note: { type: "object" } } } } },
            },
          },
        },
      },
    },
    components: {
      schemas: {
        Note: {
          type: "object",
          properties: {
            id: { type: "integer" },
            title: { type: "string" },
            body: { type: "string" },
            created_at: { type: "string", format: "date-time" },
          },
          required: ["title", "body"],
        },
        NewNote: {
          type: "object",
          properties: { title: { type: "string" }, body: { type: "string" } },
          required: ["title", "body"],
        },
      },
    },
  }
}

export default getOpenApiSpec
