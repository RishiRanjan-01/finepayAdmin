// src/swagger.ts

import swaggerJSDoc from 'swagger-jsdoc';
import { SwaggerDefinition } from 'swagger-jsdoc';

const swaggerDefinition: SwaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Finepay api and Microservice API',
    version: '1.0.0',
    description: 'API documentation for the User Microservice',
  },
  servers: [
    {
      url: 'http://localhost:8080',
      description: 'Development server',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./src/controller/*.ts'], // Path to your API routes
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
