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
          {
            name: 'Derecha',
            group: groups.Extremo1,
            color: '#b00029',
            description:
              '¿Qué % de personas que dicen pertenecer a la opción de Derecha, está de acuerdo con la siguiente frase?',
          },
          {
            name: 'Izquierda',
            group: groups.Extremo2,
            color: '#03396c',
            description:
              '¿Qué % de personas que dicen pertenecer a la opción de Izquierda, está de acuerdo con la siguiente frase?',
          },
          {
            name: 'Centro',
            color: '#01df01',
            description:
              '¿Qué % de personas que dicen pertenecer a la opción de Centro, está de acuerdo con la siguiente frase?',
          },
          {
            name: 'Independiente',
            color: '#01df01',
            description:
              '¿Qué % de personas que dicen ser Independientes, está de acuerdo con la siguiente frase?',
          },
        ],
        politicaId,
      );
      options.push(...data);
    }

    if (generoId) {
      const data = createOptions(
        [
          {
            name: 'Masculino',
            group: groups.Extremo1,
            color: '#b00029',
            description:
              '¿Qué % de personas que se identifican como Masculino, está de acuerdo con la siguiente frase?',
          },
          {
            name: 'Femenino',
            group: groups.Extremo2,
            color: '#03396c',
            description:
              '¿Qué % de personas que se identifican como Femenino, está de acuerdo con la siguiente frase?',
          },
          {
            name: 'Otro',
            color: '#01df01',
            description:
              '¿Qué % de personas que se identifican con un género no binario, está de acuerdo con la siguiente frase?',
          },
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
            color: '#03396c',
            description:
              '¿Qué % de personas que viven fuera del área metropolitana, está de acuerdo con la siguiente frase?',
          },
          {
            name: 'Región Metropolitana',
            group: groups.Extremo2,
            color: '#b00029',
            description:
              '¿Qué % de personas que viven en el área metropolitana, está de acuerdo con la siguiente frase?',
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
            color: '#b00029',
            description:
              '¿Qué % de personas con ingresos de clase media-alta y alta, está de acuerdo con la siguiente frase?',
          },
          {
            name: 'Ingresos medios',
            color: '#01df01',
            description:
              '¿Qué % de personas con ingresos de clase media, está de acuerdo con la siguiente frase?',
          },
          {
            name: 'Ingresos bajos - medio bajos',
            group: groups.Extremo2,
            color: '#03396c',
            description:
              '¿Qué % de personas con ingresos bajos, está de acuerdo con la siguiente frase?',
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
            color: '#b00029',
            description:
              '¿Qué % de personas que se identifican como pertenecientes a un pueblo originario o indígena, está de acuerdo con la siguiente frase?',
          },
          {
            name: 'No pertenezco a ningún pueblo originario o indígena',
            group: groups.Extremo2,
            color: '#03396c',
            description:
              '¿Qué % de personas que no se identifican como pertenecientes a un pueblo originario o indígena, está de acuerdo con la siguiente frase?',
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
            name: 'Pertenezco o me siento cercano a alguna religión o iglesia',
            group: groups.Extremo1,
            color: '#b00029',
            description:
              '¿Qué % de personas que se identifican como pertenecientes a una religión o iglesia, está de acuerdo con la siguiente frase?',
          },
          {
            name: 'No pertenezco ni me siento cercano a ninguna religión o iglesia',
            group: groups.Extremo2,
            color: '#03396c',
            description:
              '¿Qué % de personas que no se identifican como pertenecientes a una religión o iglesia, está de acuerdo con la siguiente frase?',
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
            color: '#b00029',
            description:
              '¿Qué % de personas que se identifican como inmigrantes, está de acuerdo con la siguiente frase?',
          },
          {
            name: 'Chileno',
            group: groups.Extremo2,
            color: '#03396c',
            description:
              '¿Qué % de personas que se identifican como chilenos, está de acuerdo con la siguiente frase?',
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
            color: '#b00029',
            description:
              '¿Qué % de personas que ocupan un cargo directivo en su empresa u organización, está de acuerdo con la siguiente frase?',
          },
          {
            name: 'No tengo un rol directivo en la empresa u organización donde trabajo',
            group: groups.Extremo2,
            color: '#03396c',
            description:
              '¿Qué % de personas que no ocupan un cargo directivo en su empresa u organización, está de acuerdo con la siguiente frase?',
          },
          {
            name: 'Soy independiente y trabajo solo. No trabajo en ninguna empresa u organización',
            color: '#01df01',
            description:
              '¿Qué % de personas que trabajan de forma independiente y no están afiliadas a ninguna empresa u organización, está de acuerdo con la siguiente frase?',
          },

          {
            name: 'En este momento no tengo trabajo remunerado (soy estudiante, jubilado, desempleado, labores del hogar, etc.)',
            color: '#01df01',
            description:
              '¿Qué % de personas que no tienen un trabajo remunerado, está de acuerdo con la siguiente frase?',
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
            color: '#b00029',
            description:
              '¿Qué % de personas de 29 años o menos, está de acuerdo con la siguiente frase?',
          },
          {
            name: 'Entre 30 y 59 años',
            color: '#01df01',
            description:
              '¿Qué % de personas entre 30 y 59 años, está de acuerdo con la siguiente frase?',
          },
          {
            name: '60 años o más',
            group: groups.Extremo2,
            color: '#03396c',
            description:
              '¿Qué % de personas de 60 años o más, está de acuerdo con la siguiente frase?',
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
            color: '#b00029',
            description:
              '¿Qué % de personas que se identifican como heterosexuales, está de acuerdo con la siguiente frase?',
          },
          {
            name: 'LGTBQ+',
            group: groups.Extremo2,
            color: '#03396c',
            description:
              '¿Qué % de personas que se identifican como parte de la comunidad LGTBQ+, está de acuerdo con la siguiente frase?',
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
