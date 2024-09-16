module.exports = {
  swaggerDefinition: {
    openapi: "3.0.1",
    info: {
      title: "GameStart API with Swagger",
      version: "1.0.0",
      description:
        "This is a simple CRUD API application made with Koa and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "GameStart",
        url: "https://gamestart.onrender.com",
        email: "mohamed.alsagher@student.hogent.be",
      },
    },
    servers: [
      {
        url: "https://gamestart-api.onrender.com/api",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: {
      bearerAuth: [],
    },
    tags: [
      { name: "users", description: "Operations gerelateerd met users" },
      { name: "bestelling", description: "Operations gerelateerd met orders" },
      { name: "games", description: "Operations gerelateerd met games" },
    ],
    paths: {
      "/users/login": {
        post: {
          summary: "User login",
          tags: ["users"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    email: {
                      type: "string",
                      format: "email",
                    },
                    password: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: "Successful login",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      token: {
                        type: "string",
                      },
                    },
                  },
                },
              },
            },
            401: {
              description: "Invalid email or password",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      message: {
                        type: "string",
                      },
                    },
                  },
                },
              },
            },
            500: {
              description: "Internal Server Error",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      message: {
                        type: "string",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      "/users/register": {
        post: {
          summary: "Register a new user",
          tags: ["users"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    name: {
                      type: "string",
                    },
                    lastName: {
                      type: "string",
                    },
                    dateOfBirth: {
                      type: "string",
                      format: "date",
                    },
                    username: {
                      type: "string",
                    },
                    email: {
                      type: "string",
                      format: "email",
                    },
                    password: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
          responses: {
            201: {
              description: "User registered successfully",

              schema: {
                type: "object",
                properties: {
                  token: {
                    type: "string",
                  },
                },
              },
            },
            400: {
              description: "The given email already exists",
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                  },
                },
              },
            },
            500: {
              description: "Internal Server Error",
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
      },
      "/users": {
        get: {
          summary: "Get user information",
          tags: ["users"],
          security: [
            {
              bearerAuth: [],
            },
          ],
          responses: {
            200: {
              description: "User information retrieved successfully",
              schema: {
                type: "object",
                properties: {
                  id: { type: "integer", format: "int64" },
                  name: { type: "string" },
                  lastName: { type: "string" },
                },
              },
              example: {
                id: 123,
                name: "John",
                lastName: "Doe",
              },
            },
            404: {
              description: "User not found",

              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                  },
                },
              },
            },
            500: {
              description: "Internal Server Error",

              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
        put: {
          summary: "Update user information",
          tags: ["users"],
          security: [
            {
              bearerAuth: [],
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    name: {
                      type: "string",
                      maxLength: 255,
                    },
                    lastName: {
                      type: "string",
                      maxLength: 255,
                    },
                    username: {
                      type: "string",
                    },
                    email: {
                      type: "string",
                      format: "email",
                    },
                    password: {
                      type: "string",
                      minLength: 6,
                    },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: "User information updated successfully",

              schema: {
                type: "object",
              },
            },
            400: {
              description: "The given email already exists",
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                  },
                },
              },
            },
            500: {
              description: "Internal Server Error",

              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
        delete: {
          summary: "Delete user (self)",
          tags: ["users"],
          security: [
            {
              bearerAuth: [],
            },
          ],
          responses: {
            200: {
              description: "User deleted successfully",

              schema: {
                type: "object",
              },
            },
            403: {
              description: "Permission denied",

              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                  },
                },
              },
            },
            404: {
              description: "User not found",

              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                  },
                },
              },
            },
            500: {
              description: "Internal Server Error",

              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
      },
      "/users/{id}": {
        get: {
          summary: "Get user by ID (Admin only)",
          tags: ["users"],
          security: [
            {
              bearerAuth: [],
            },
          ],
          parameters: [
            {
              in: "path",
              name: "id",
              required: true,
              schema: {
                type: "integer",
                format: "int64",
              },
            },
          ],
          responses: {
            200: {
              description: "User information retrieved successfully",
              schema: {
                type: "object",
                properties: {
                  id: { type: "integer", format: "int64" },
                  name: { type: "string" },
                  lastName: { type: "string" },
                },
              },
              example: {
                id: 123,
                name: "John",
                lastName: "Doe",
              },
            },
            403: {
              description: "Forbidden",
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                  },
                },
              },
            },
            404: {
              description: "User not found",
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                  },
                },
              },
            },
            500: {
              description: "Internal Server Error",

              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
        put: {
          summary: "Update user information by id (Admin only)",
          tags: ["users"],
          security: [
            {
              bearerAuth: [],
            },
          ],
          parameters: [
            {
              in: "path",
              name: "id",
              required: true,
              schema: {
                type: "integer",
                format: "int64",
              },
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    name: {
                      type: "string",
                      maxLength: 255,
                    },
                    lastName: {
                      type: "string",
                      maxLength: 255,
                    },
                    username: {
                      type: "string",
                    },
                    email: {
                      type: "string",
                      format: "email",
                    },
                    password: {
                      type: "string",
                      minLength: 6,
                    },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: "User information updated successfully",
              schema: {
                type: "object",
              },
            },
            403: {
              description: "Forbidden",
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                  },
                },
              },
            },
            404: {
              description: "User not found",
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                  },
                },
              },
            },
            500: {
              description: "Internal Server Error",
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
        delete: {
          summary: "Delete user by ID (Admin only)",
          tags: ["users"],
          security: [
            {
              bearerAuth: [],
            },
          ],
          parameters: [
            {
              in: "path",
              name: "id",
              required: true,
              schema: {
                type: "integer",
                format: "int64",
              },
            },
          ],
          responses: {
            200: {
              description: "User deleted successfully",

              schema: {
                type: "object",
              },
            },
            403: {
              description: "Forbidden",
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                  },
                },
              },
            },
            404: {
              description: "User not found",
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                  },
                },
              },
            },
            500: {
              description: "Internal Server Error",
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
      },
      "/bestelling": {
        get: {
          summary: "Get all bestellingen (self)",
          tags: ["bestelling"],
          security: [
            {
              bearerAuth: [],
            },
          ],
          responses: {
            200: {
              description: "Bestellingen retrieved successfully",
              schema: {
                type: "array",
              },
            },
            403: {
              description: "Permission denied",
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                  },
                },
              },
            },
            500: {
              description: "Internal Server Error",

              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
        post: {
          summary: "Create a new bestelling",
          tags: ["bestelling"],
          security: [
            {
              bearerAuth: [],
            },
          ],
          requestBody: {
            required: true,

            schema: {
              type: "object",
              required: ["games", "betaalmethode", "totaalbedrag"],
              properties: {
                games: {
                  type: "array",
                  items: {
                    type: "object",
                    required: ["gameID", "quantity", "price"],
                    properties: {
                      gameID: {
                        type: "integer",
                        format: "int64",
                        minimum: 1,
                      },
                      quantity: {
                        type: "integer",
                        minimum: 1,
                      },
                      price: {
                        type: "number",
                        minimum: 0,
                      },
                    },
                  },
                  minItems: 1,
                },
                betaalmethode: {
                  type: "string",
                  maxLength: 15,
                },
                totaalbedrag: {
                  type: "number",
                  minimum: 0,
                },
              },
            },
          },
          responses: {
            201: {
              description: "Bestelling created successfully",

              schema: {
                type: "object",
                properties: {
                  id: {
                    type: "integer",
                    format: "int64",
                  },
                },
              },
            },
            400: {
              description: "Invalid input data",

              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                  },
                },
              },
            },
            500: {
              description: "Internal Server Error",

              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
      },
      "/bestelling/{id}": {
        get: {
          summary: "Get bestelling by ID (Admin only)",
          tags: ["bestelling"],
          security: [
            {
              bearerAuth: [],
            },
          ],
          parameters: [
            {
              in: "path",
              name: "id",
              required: true,
              schema: {
                type: "integer",
                format: "int64",
              },
            },
          ],
          responses: {
            200: {
              description: "Bestelling retrieved successfully",

              schema: {
                type: "object",
              },
            },
            403: {
              description: "Forbidden",
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                  },
                },
              },
            },
            500: {
              description: "Internal Server Error",
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
      },
      "/games": {
        get: {
          summary: "Get all games",
          tags: ["games"],
          responses: {
            200: {
              description: "Games retrieved successfully",
              schema: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: {
                      type: "integer",
                      format: "int64",
                      description: "The unique identifier for the game.",
                    },
                    name: {
                      type: "string",
                      description: "The name of the game.",
                    },
                    beschrijving: {
                      type: "string",
                      description: "The description of the game.",
                    },
                    prijs: {
                      type: "number",
                      description: "The price of the game.",
                    },
                    console: {
                      type: "string",
                      description: "The gaming console/platform for the game.",
                    },
                    image_url: {
                      type: "string",
                      description: "The URL of the game's image.",
                    },
                  },
                },
              },
            },
            500: {
              description: "Internal Server Error",
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  apis: ["./rest"],
};
