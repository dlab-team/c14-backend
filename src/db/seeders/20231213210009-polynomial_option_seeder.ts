/* eslint-disable @typescript-eslint/no-explicit-any */
'use strict';

import { QueryInterface } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import { Polynomial } from '../models/polynomial';

const createOptions = (
  options: { name: string; group?: string; color: string; description: string }[],
  polynomialId: string,
) => {
  return options.map(({ name, group, color, description }) => ({
    id: uuidv4(),
    name,
    group,
    polynomialId,
    color,
    description,
    createdAt: new Date(),
    updatedAt: new Date(),
  }));
};

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    const groups = {
      Extremo1: 'Extremo 1',
      Extremo2: 'Extremo 2',
    };
    const results = await Polynomial.findAll({
      attributes: ['id', 'name'],
    });

    const dataArray = results.map(result => ({
      id: result.getDataValue('id'),
      name: result.getDataValue('name'),
    }));

    const politicaId = dataArray.find(p => p.name === 'Político')?.id;
    const generoId = dataArray.find(p => p.name === 'Género')?.id;
    const regionId = dataArray.find(p => p.name === 'Regiones')?.id;
    const ingresoId = dataArray.find(p => p.name === 'Ingresos')?.id;
    const puebloId = dataArray.find(p => p.name === 'Pueblos indígenas')?.id;
    const credolId = dataArray.find(p => p.name === 'Credo')?.id;
    const inmigracionId = dataArray.find(p => p.name === 'Inmigración')?.id;
    const directivoId = dataArray.find(p => p.name === 'Directivo')?.id;
    const etarioId = dataArray.find(p => p.name === 'Etario')?.id;
    const orientationId = dataArray.find(p => p.name === 'Orientación sexual')?.id;

    const options = [];

    if (politicaId) {
      const data = createOptions(
        [
          { name: 'Derecha', group: groups.Extremo1, color: 'red', description: 'Derecha' },
          { name: 'Izquierda', group: groups.Extremo2, color: 'blue', description: 'Izquierda' },
          { name: 'Centro', color: 'green', description: 'Centro' },
          { name: 'Independiente', color: 'green', description: 'Independiente' },
        ],
        politicaId,
      );
      options.push(...data);
    }

    if (generoId) {
      const data = createOptions(
        [
          { name: 'Masculino', group: groups.Extremo1, color: 'red', description: 'Masculino' },
          { name: 'Femenino', group: groups.Extremo2, color: 'blue', description: 'Femenino' },
          { name: 'Otro', color: 'green', description: 'Otro' },
        ],
        generoId,
      );
      options.push(...data);
    }
    if (regionId) {
      const data = createOptions(
        [
          {
            name: 'Vivo en región',
            group: groups.Extremo1,
            color: 'blue',
            description: 'vivo fuera del area metropolitana',
          },
          {
            name: 'Vivo en la R. Metropolitana',
            group: groups.Extremo2,
            color: 'red',
            description: 'vivo en el area metropolitana',
          },
        ],
        regionId,
      );
      options.push(...data);
    }
    if (ingresoId) {
      const data = createOptions(
        [
          {
            name: 'Ingresos medio altos - altos',
            group: groups.Extremo1,
            color: 'red',
            description: 'tengo ingresos de clase media-alto y altos',
          },
          {
            name: 'Ingresos medios',
            color: 'green',
            description: 'tengo ingreso de clase media',
          },
          {
            name: 'Ingresos medio bajos - bajos',
            group: groups.Extremo2,
            color: 'blue',
            description: 'tengo ingresos bajos',
          },
        ],
        ingresoId,
      );
      options.push(...data);
    }
    if (puebloId) {
      const data = createOptions(
        [
          {
            name: 'Pertenezco a un pueblo originario o indígena',
            group: groups.Extremo1,
            color: 'red',
            description: 'me considero de un pueblo originario o indigena',
          },
          {
            name: 'No me considero perteneciente a ningún pueblo originario o indígena',
            group: groups.Extremo2,
            color: 'blue',
            description: 'no me considero de un pueblo originario o indegena',
          },
        ],
        puebloId,
      );
      options.push(...data);
    }
    if (credolId) {
      const data = createOptions(
        [
          {
            name: 'Práctico alguna religión',
            group: groups.Extremo1,
            color: 'red',
            description: 'Práctico alguna religión',
          },
          {
            name: 'Sin Religión',
            group: groups.Extremo2,
            color: 'red',
            description: 'No práctico ninguna religión',
          },
        ],
        credolId,
      );
      options.push(...data);
    }
    if (inmigracionId) {
      const data = createOptions(
        [
          {
            name: 'Inmigrante',
            group: groups.Extremo1,
            color: 'red',
            description: 'soy migrante',
          },
          {
            name: 'Chileno',
            group: groups.Extremo2,
            color: 'red',
            description: 'soy ciudadano chileno',
          },
        ],
        inmigracionId,
      );
      options.push(...data);
    }
    if (directivoId) {
      const data = createOptions(
        [
          {
            name: 'Ocupo un cargo directivo en la empresa u organización donde trabajo',
            group: groups.Extremo1,
            color: 'red',
            description: 'Ocupo un cargo directivo en la empresa u organización donde trabajo',
          },
          {
            name: 'No tengo un rol directivo en la empresa u organización donde trabajo',
            group: groups.Extremo2,
            color: 'blue',
            description: 'No tengo un rol directivo en la empresa u organización donde trabajo',
          },
          {
            name: 'Soy independiente y trabajo solo. No trabajo en ninguna empresa u organización',
            color: 'green',
            description: 'Soy independiente y trabajo solo',
          },
          {
            name: 'En este momento no tengo trabajo remunerado (soy estudiante, jubilado, desempleado, labores del hogar, etc.)',
            color: 'green',
            description: 'No tengo ninguna remunacion, ni trabajo',
          },
        ],
        directivoId,
      );
      options.push(...data);
    }
    if (etarioId) {
      const data = createOptions(
        [
          {
            name: '29 años o menos',
            group: groups.Extremo1,
            color: 'red',
            description: 'soy menor de 29 años',
          },
          {
            name: 'Entre 30 y 59 años',
            color: 'green',
            description: 'estoy entre los 30 y 59 años',
          },
          {
            name: '60 años o más',
            group: groups.Extremo2,
            color: 'blue',
            description: 'soy mayor de 60 años',
          },
        ],
        etarioId,
      );
      options.push(...data);
    }
    if (orientationId) {
      const data = createOptions(
        [
          {
            name: 'Heterosexual',
            group: groups.Extremo1,
            color: 'red',
            description: 'soy heterosexual',
          },
          {
            name: 'LGTBQ+',
            group: groups.Extremo2,
            color: 'blue',
            description: 'Me considero de la poblacion LGTBQ+',
          },
        ],
        orientationId,
      );
      options.push(...data);
    }

    await queryInterface.bulkInsert('polynomial_option', options, {});
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('polynomial_option', {});
  },
};
