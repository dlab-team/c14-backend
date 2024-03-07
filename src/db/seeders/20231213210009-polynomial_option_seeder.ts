/* eslint-disable @typescript-eslint/no-explicit-any */
'use strict';

import { QueryInterface } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import { Polynomial } from '../models/polynomial';

const createOptions = (options: { name: string; group?: string }[], polynomialId: string) => {
  return options.map(({ name, group }) => ({
    id: uuidv4(),
    name,
    group,
    polynomialId,
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
          { name: 'Derecha', group: groups.Extremo1 },
          { name: 'Izquierda', group: groups.Extremo2 },
          { name: 'Centro' },
          { name: 'Independiente' },
        ],
        politicaId,
      );
      options.push(...data);
    }

    if (generoId) {
      const data = createOptions(
        [
          { name: 'Masculino', group: groups.Extremo1 },
          { name: 'Femenino', group: groups.Extremo2 },
          { name: 'Otro' },
        ],
        generoId,
      );
      options.push(...data);
    }
    if (regionId) {
      const data = createOptions(
        [
          {
            name: 'Otra Región',
            group: groups.Extremo1,
          },
          {
            name: 'Región Metropolitana',
            group: groups.Extremo2,
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
            name: 'Ingresos altos - medio altos',
            group: groups.Extremo1,
          },
          {
            name: 'Ingresos medios',
          },
          {
            name: 'Ingresos bajos - medio bajos',
            group: groups.Extremo2,
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
            name: 'Pertenezco a algún pueblo originario o indígena',
            group: groups.Extremo1,
          },
          {
            name: 'No pertenezco a ningún pueblo originario o indígena',
            group: groups.Extremo2,
          },
        ],
        puebloId,
      );
      options.push(...data);
    }
    if (credolId) {
      const data = createOptions(
        [
          { name: 'Pertenezco o me siento cercano a alguna religión o iglesia', group: groups.Extremo1 },
          { name: 'No pertenezco ni me siento cercano a ninguna religión o iglesia', group: groups.Extremo2 },
        ],
        credolId,
      );
      options.push(...data);
    }
    if (inmigracionId) {
      const data = createOptions(
        [
          { name: 'Soy inmigrante', group: groups.Extremo1 },
          { name: 'Soy chilena/o', group: groups.Extremo2 },
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
          },
          {
            name: 'No tengo un rol directivo en la empresa u organización donde trabajo',
            group: groups.Extremo2,
          },
          {
            name: 'Soy independiente y trabajo solo. No trabajo en ninguna empresa u organización',
          },
          {
            name: 'En este momento no tengo trabajo remunerado (soy estudiante, jubilado, desempleado, labores del hogar, etc.)',
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
          },
          {
            name: 'Entre 30 y 59 años',
          },
          {
            name: '60 años o más',
            group: groups.Extremo2,
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
          },
          {
            name: 'LGTBQ+',
            group: groups.Extremo2,
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
