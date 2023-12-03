import __dirname from '@/utils';

const swaggerOptions = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'Laboratorio Civico',
      description: 'Documentación del Backend de la aplicación Laboratorio Civico',
    },
  },
  apis: [`${__dirname}/docs/*.yaml`],
};
console.log(__dirname);

export default swaggerOptions;
