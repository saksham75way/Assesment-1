import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

export const swaggerOptions: swaggerJsDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "NGO Crowdfunding API",
      description: "API documentation for the NGO crowdfunding platform.",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:5000/api",
        description: "Local development server",
      },
    ],
    paths: {
      "/bank": {
        post: {
          summary: "Create a bank account",
          tags: ["Bank"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Bank",
                },
              },
            },
          },
          responses: {
            "201": { description: "Bank account created successfully." },
          },
        },
        get: {
          summary: "Get all bank accounts",
          tags: ["Bank"],
          responses: {
            "200": { description: "List of bank accounts" },
          },
        },
      },
      "/bank/{id}": {
        get: {
          summary: "Get bank account by ID",
          tags: ["Bank"],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string" },
            },
          ],
          responses: {
            "200": { description: "Bank account details" },
          },
        },
        put: {
          summary: "Update bank account",
          tags: ["Bank"],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string" },
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Bank",
                },
              },
            },
          },
          responses: {
            "200": { description: "Bank account updated successfully." },
          },
        },
        delete: {
          summary: "Delete bank account",
          tags: ["Bank"],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string" },
            },
          ],
          responses: {
            "204": { description: "Bank account deleted." },
          },
        },
      },
      "/funding/create": {
        post: {
          summary: "Create a funding plan",
          tags: ["Funding"],
          security: [{ BearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Funding",
                },
              },
            },
          },
          responses: {
            "201": { description: "Funding plan created." },
          },
        },
      },
      "/funding/all": {
        get: {
          summary: "Get all funding plans",
          tags: ["Funding"],
          responses: {
            "200": { description: "List of all funding plans" },
          },
        },
      },
      "/funding/{id}": {
        get: {
          summary: "Get funding plan by ID",
          tags: ["Funding"],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string" },
            },
          ],
          responses: {
            "200": { description: "Funding plan details" },
          },
        },
      },
      "/payment/create": {
        post: {
          summary: "Create a payment",
          tags: ["Payment"],
          security: [{ BearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Payment",
                },
              },
            },
          },
          responses: {
            "201": { description: "Payment created successfully." },
          },
        },
      },
      "/payment/all": {
        get: {
          summary: "Get all payments",
          tags: ["Payment"],
          security: [{ BearerAuth: [] }],
          responses: {
            "200": { description: "List of all payments" },
          },
        },
      },
      "/user/register": {
        post: {
          summary: "Register a new user",
          tags: ["User"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/User",
                },
              },
            },
          },
          responses: {
            "201": { description: "User registered successfully." },
          },
        },
      },
      "/user/login": {
        post: {
          summary: "User login",
          tags: ["User"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    email: { type: "string" },
                    password: { type: "string" },
                  },
                },
              },
            },
          },
          responses: {
            "200": { description: "User logged in successfully." },
          },
        },
      },
    },
    components: {
      schemas: {
        User: {
          type: "object",
          properties: {
            name: { type: "string" },
            email: { type: "string" },
            password: { type: "string" },
            role: {
              type: "string",
              enum: ["USER", "ADMIN"],
            },
          },
        },
        Bank: {
          type: "object",
          properties: {
            accountNumber: { type: "string" },
            bankName: { type: "string" },
            ifscCode: { type: "string" },
            balance: { type: "number" },
          },
        },
        Funding: {
          type: "object",
          properties: {
            title: { type: "string" },
            description: { type: "string" },
            amountGoal: { type: "number" },
            amountRaised: { type: "number" },
            duration: { type: "integer" },
            status: { type: "string", enum: ["ACTIVE", "CLOSED"] },
          },
        },
        Payment: {
          type: "object",
          properties: {
            userId: { type: "string" },
            fundingId: { type: "string" },
            amount: { type: "number" },
            status: {
              type: "string",
              enum: ["PENDING", "SUCCESS", "FAILED"],
            },
          },
        },
      },
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./routes/*.ts"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export const setupSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  console.log("Swagger Docs available at http://localhost:5000/api-docs");
};
