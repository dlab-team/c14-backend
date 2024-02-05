/* eslint-disable @typescript-eslint/no-explicit-any */
'use strict';

import { QueryInterface } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import { Polynomial } from '../models/polynomial';
import { GroupAttributes } from '../models/group';
import { PolynomialOptionAttributes } from '../models/polynomial_option';

interface GroupSeeder extends GroupAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

interface PolynomialOption extends PolynomialOptionAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

const createGroup = (name: string, polynomialId: string): GroupSeeder => {
  return {
    id: uuidv4(),
    name,
    polynomialId,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
};

const createGroups = (names: string[], polynomialId: string): GroupSeeder[] => {
  return names.map(name => createGroup(name, polynomialId));
};

const createOptions = (names: string[], groupId: string): PolynomialOption[] => {
  return names.map(name => ({
    id: uuidv4(),
    name,
    groupId,
    createdAt: new Date(),
    updatedAt: new Date(),
  }));
};

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    const polynomials = await Polynomial.findAll({
      attributes: ['id', 'name'],
    });

    const dataArray = polynomials.map(result => ({
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
    const orienacionId = dataArray.find(p => p.name === 'Orientación sexual')?.id;

    const groups: GroupSeeder[] = [];
    const options: PolynomialOption[] = [];

    if (politicaId) {
      const data = createGroups(['Derecha', 'Izquierda', 'Centro', 'Independiente'], politicaId);
      data[0].oppositeGroupId = data[1].id;
      data[1].oppositeGroupId = data[0].id;
      groups.push(...data);
      options.push(...data.map(d => createOptions([d.name], d.id)).flat());
    }

    if (generoId) {
      const data = createGroups(['Masculino', 'Femenino', 'Otro'], generoId);
      data[0].oppositeGroupId = data[1].id;
      data[1].oppositeGroupId = data[0].id;
      groups.push(...data);
      options.push(
        ...createOptions([data[0].name], data[0].id),
        ...createOptions([data[1].name], data[1].id),
        ...createOptions([data[2].name], data[2].id),
      );
    }
    if (regionId) {
      const data = createGroups(['Viven en región', 'Vive en R. Metropolitana'], regionId);
      data[0].oppositeGroupId = data[1].id;
      data[1].oppositeGroupId = data[0].id;
      groups.push(...data);
      options.push(
        ...createOptions(
          [
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
          ],
          data[0].id,
        ),
        ...createOptions(['Metropolitana'], data[1].id),
      );
    }
    if (ingresoId) {
      const data = createGroups(
        ['Ingresos medio altos - altos', 'Ingresos medios', 'Ingresos medio bajos - bajos'],
        ingresoId,
      );
      data[0].oppositeGroupId = data[2].id;
      data[2].oppositeGroupId = data[0].id;
      options.push(
        ...createOptions(['Ingresos altos', 'Ingresos medio altos'], data[0].id),
        ...createOptions(['Ingresos bajos', 'Ingresos medio bajos'], data[2].id),
        ...createOptions([data[1].name], data[1].id),
      );
      groups.push(...data);
    }
    if (puebloId) {
      const data = createGroups(
        ['Pertenece a publos orginarios', 'No pertenece a pueblos originarios'],
        puebloId,
      );
      data[0].oppositeGroupId = data[1].id;
      data[1].oppositeGroupId = data[0].id;
      groups.push(...data);
    }
    if (credolId) {
      const data = createGroups(['Práctica alguna religión', 'Sin Religión'], credolId);

      data[0].oppositeGroupId = data[1].id;
      data[1].oppositeGroupId = data[0].id;

      groups.push(...data);
    }
    if (inmigracionId) {
      const data = createGroups(['Inmigrante', 'Chileno'], inmigracionId);
      data[0].oppositeGroupId = data[1].id;
      data[1].oppositeGroupId = data[0].id;
      groups.push(...data);
    }
    if (directivoId) {
      const data = createGroups(
        ['Con cargo directivo', 'Sin cargo directivo', 'Independiente', 'Sin trabajo remunerdado'],
        directivoId,
      );
      data[0].oppositeGroupId = data[1].id;
      data[1].oppositeGroupId = data[0].id;
      groups.push(...data);
    }
    if (etarioId) {
      const data = createGroups(
        ['29 años o menos', 'Entre 30 y 59 años', '60 años o más'],
        etarioId,
      );
      data[0].oppositeGroupId = data[2].id;
      data[2].oppositeGroupId = data[0].id;
      groups.push(...data);
    }
    if (orienacionId) {
      const data = createGroups(['Heterosexual', 'LGTBQ+'], orienacionId);
      data[0].oppositeGroupId = data[1].id;
      data[1].oppositeGroupId = data[0].id;
      groups.push(...data);
    }
    console.log(groups);
    await queryInterface.bulkInsert('groups', groups, {});
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('groups', {});
  },
};
