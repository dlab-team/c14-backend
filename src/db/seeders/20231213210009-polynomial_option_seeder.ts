/* eslint-disable @typescript-eslint/no-explicit-any */
'use strict';

import { QueryInterface } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import { Polynomial } from '../models/polynomial';


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

    let politicalOption: any[] = [];
    let genderOption: any[] = [];
    let regionOption: any[] = [];
    let incomeOption: any[] = [];
    let indigenousOption: any[] = [];
    let religionOption: any[] = [];
    let immigrationOption: any[] = [];
    let managementOption: any[] = [];
    let ageOption: any[] = [];
    let sexualOrientationOption: any[] = [];

    for (let i = 0; i < dataArray.length; i++) {
      if (dataArray[i].name === 'Político') {
        politicalOption = [
          {
            id: uuidv4(),
            name: 'Derecha',
            group: groups.Extremo1,
            polynomialId: dataArray[i].id,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: uuidv4(),
            name: 'Izquierda',
            group: groups.Extremo2,
            polynomialId: dataArray[i].id,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: uuidv4(),
            name: 'Centro',
            polynomialId: dataArray[i].id,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: uuidv4(),
            name: 'Independiente',
            polynomialId: dataArray[i].id,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ];
      }
      if (dataArray[i].name === 'Género') {
        genderOption = [
          {
            id: uuidv4(),
            name: 'Masculino',
            group: groups.Extremo1,
            polynomialId: dataArray[i].id,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: uuidv4(),
            name: 'Femenino',
            group: groups.Extremo2,
            polynomialId: dataArray[i].id,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: uuidv4(),
            name: 'Otro',
            polynomialId: dataArray[i].id,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ];
      }
      if (dataArray[i].name === 'Regiones') {
        const regions = [
          'Antofagasta',
          'Arica y Parinacota',
          'Atacama',
          'Aysén',
          'Biobío',
          'Coquimbo',
          'El Maule',
          'La Araucanía',
          'Los Lagos',
          'Los Ríos',
          'Magallanes',
          'Ñuble',
          'O’Higgins',
          'Tarapacá',
          'Valparaíso',
        ];

        for (let j = 0; j < 15; j++) {
          regionOption.push({
            id: uuidv4(),
            name: regions[j],
            group: groups.Extremo1,
            polynomialId: dataArray[i].id,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        }
        const regionOption1 = [
          {
            id: uuidv4(),
            name: 'Metropolitana',
            group: groups.Extremo2,
            polynomialId: dataArray[i].id,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ];
        regionOption = regionOption.concat(regionOption1);
      }
      if (dataArray[i].name === 'Ingresos') {
        incomeOption = [
          {
            id: uuidv4(),
            name: 'Ingresos altos',
            group: groups.Extremo1,
            polynomialId: dataArray[i].id,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: uuidv4(),
            name: 'Ingresos medio altos',
            group: groups.Extremo1,
            polynomialId: dataArray[i].id,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: uuidv4(),
            name: 'Ingresos medios',
            polynomialId: dataArray[i].id,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: uuidv4(),
            name: 'Ingresos medio bajos',
            group: groups.Extremo2,
            polynomialId: dataArray[i].id,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: uuidv4(),
            name: 'Ingresos bajos',
            group: groups.Extremo2,
            polynomialId: dataArray[i].id,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ];
      }
      if (dataArray[i].name === 'Pueblos indígenas') {
        const indigenous = [
          'Atacameño',
          'Aymara',
          'Chango',
          'Colla',
          'Diaguita',
          'Kawésqar',
          'Mapuche',
          'Quechua',
          'Rapa Nui',
          'Selknam',
          'Yagán',
          'Otro',
        ];

        for (let j = 0; j < 12; j++) {
          indigenousOption.push({
            id: uuidv4(),
            name: indigenous[j],
            group: groups.Extremo1,
            polynomialId: dataArray[i].id,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        }
        const indigenousOption1 = [
          {
            id: uuidv4(),
            name: 'No me considero perteneciente a ningún pueblo originario o indígena',
            group: groups.Extremo2,
            polynomialId: dataArray[i].id,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ];
        indigenousOption = indigenousOption.concat(indigenousOption1);
      }
      if (dataArray[i].name === 'Credo') {
        religionOption = [
          {
            id: uuidv4(),
            name: 'Creyente',
            group: groups.Extremo1,
            polynomialId: dataArray[i].id,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: uuidv4(),
            name: 'Ateo',
            group: groups.Extremo2,
            polynomialId: dataArray[i].id,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: uuidv4(),
            name: 'Agnóstico',
            group: groups.Extremo2,
            polynomialId: dataArray[i].id,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: uuidv4(),
            name: 'Sin Religión',
            group: groups.Extremo2,
            polynomialId: dataArray[i].id,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ];
      }
      if (dataArray[i].name === 'Inmigración') {
        immigrationOption = [
          {
            id: uuidv4(),
            name: 'Inmigrante',
            group: groups.Extremo1,
            polynomialId: dataArray[i].id,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: uuidv4(),
            name: 'Chileno',
            group: groups.Extremo2,
            polynomialId: dataArray[i].id,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ];
      }
      if (dataArray[i].name === 'Directivo') {
        managementOption = [
          {
            id: uuidv4(),
            name: 'Ocupo un cargo directivo en la empresa u organización donde trabajo',
            group: groups.Extremo1,
            polynomialId: dataArray[i].id,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: uuidv4(),
            name: 'No tengo un rol directivo en la empresa u organización donde trabajo',
            group: groups.Extremo2,
            polynomialId: dataArray[i].id,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: uuidv4(),
            name: 'Soy independiente y trabajo solo. No trabajo en ninguna empresa u organización',
            polynomialId: dataArray[i].id,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: uuidv4(),
            name: 'En este momento no tengo trabajo remunerado (soy estudiante, jubilado, desempleado, labores del hogar, etc.)',
            polynomialId: dataArray[i].id,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ];
      }
      if (dataArray[i].name === 'Etario') {
        ageOption = [
          {
            id: uuidv4(),
            name: '29 años o menos',
            group: groups.Extremo1,
            polynomialId: dataArray[i].id,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: uuidv4(),
            name: 'Entre 30 y 59 años',
            polynomialId: dataArray[i].id,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: uuidv4(),
            name: '60 años o más',
            group: groups.Extremo2,
            polynomialId: dataArray[i].id,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ];
      }
      if (dataArray[i].name === 'Orientación sexual') {
        sexualOrientationOption = [
          {
            id: uuidv4(),
            name: 'Heterosexual',
            group: groups.Extremo1,
            polynomialId: dataArray[i].id,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: uuidv4(),
            name: 'Gay',
            group: groups.Extremo2,
            polynomialId: dataArray[i].id,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: uuidv4(),
            name: 'Lesbiana',
            group: groups.Extremo2,
            polynomialId: dataArray[i].id,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: uuidv4(),
            name: 'Bisexual',
            polynomialId: dataArray[i].id,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: uuidv4(),
            name: 'Pansexual',
            polynomialId: dataArray[i].id,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: uuidv4(),
            name: 'Asexual',
            polynomialId: dataArray[i].id,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: uuidv4(),
            name: 'Queer',
            polynomialId: dataArray[i].id,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: uuidv4(),
            name: 'Otra',
            polynomialId: dataArray[i].id,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ];
      }
    }
    const polynomialOptions = politicalOption.concat(
      genderOption,
      regionOption,
      incomeOption,
      indigenousOption,
      religionOption,
      immigrationOption,
      managementOption,
      ageOption,
      sexualOrientationOption,
    );
    // await queryInterface.bulkInsert('polynomial_option', polynomialOptions, {});
  },

  down: async (queryInterface: QueryInterface) => {
    // await queryInterface.bulkDelete('polynomial_option', {});
  },
};
