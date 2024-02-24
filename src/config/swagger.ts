import swaggerJSDoc from 'swagger-jsdoc';
import __dirname from '@/utils';

const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'Laboratorio Civico',
      description: 'Documentación del Backend de la aplicación Laboratorio Civico',
      version: '1.0',
    },
  },
  apis: ['./src/docs/*.yaml'],
};

export default swaggerOptions;
