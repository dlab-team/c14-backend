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
    const politicalPoly = await Polynomial.findOne({
      attributes: ['id'],
      where: {
        name: 'Político',
      },
    });
    const politicalPolyId = politicalPoly?.id;

    const managementPoly = await Polynomial.findOne({
      attributes: ['id'],
      where: {
        name: 'Directivo',
      },
    });
    const managementPolyId = managementPoly?.id;

    const incomePoly = await Polynomial.findOne({
      attributes: ['id'],
      where: {
        name: 'Ingresos',
      },
    });
    const incomePolyId = incomePoly?.id;

    const migrationPoly = await Polynomial.findOne({
      attributes: ['id'],
      where: {
        name: 'Inmigración',
      },
    });
    const migrationPolyId = migrationPoly?.id;

    const sexualOrientationPoly = await Polynomial.findOne({
      attributes: ['id'],
      where: {
        name: 'Orientación sexual',
      },
    });
    const sexualOrientationPolyId = sexualOrientationPoly?.id;

    const localizationPoly = await Polynomial.findOne({
      attributes: ['id'],
      where: {
        name: 'Regiones',
      },
    });
    const localizationPolyId = localizationPoly?.id;

    const indigenousPoly = await Polynomial.findOne({
      attributes: ['id'],
      where: {
        name: 'Pueblos indígenas',
      },
    });
    const indigenousPolyId = indigenousPoly?.id;

    const religionPoly = await Polynomial.findOne({
      attributes: ['id'],
      where: {
        name: 'Credo',
      },
    });
    const religionPolyId = religionPoly?.id;

    const genrePoly = await Polynomial.findOne({
      attributes: ['id'],
      where: {
        name: 'Género',
      },
    });
    const genrePolyId = genrePoly?.id;

    const agePoly = await Polynomial.findOne({
      attributes: ['id'],
      where: {
        name: 'Etario',
      },
    });
    const agePolyId = agePoly?.id;

    let right: any[] = [];
    let left: any[] = [];
    let male: any[] = [];
    let female: any[] = [];
    let old: any[] = [];
    let young: any[] = [];
    let lowIncome: any[] = [];
    let highIncome: any[] = [];
    let regions: any[] = [];
    let santiaguinos: any[] = [];
    let agnostic: any[] = [];
    let religious: any[] = [];
    let indigenous: any[] = [];
    let notIndegenous: any[] = [];
    let immigrant: any[] = [];
    let chilean: any[] = [];
    let homosexual: any[] = [];
    let heterosexual: any[] = [];
    let worker: any[] = [];
    let manager: any[] = [];

    right = [
      {
        id: uuidv4(),
        text: 'El aborto debe volver a ser prohibido, es decir, no debe permitirse bajo ninguna causal',
        group: groups.Extremo1,
        polynomialId: politicalPolyId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        text: 'Se deben reducir los impuestos, para potenciar la economía',
        group: groups.Extremo1,
        polynomialId: politicalPolyId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        text: 'La educación y la salud deben ser provistas principalmente por empresas y organizaciones privadas',
        group: groups.Extremo1,
        polynomialId: politicalPolyId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        text: 'El gobierno militar no priorizó los derechos humanos, pero lo importante es que hubo orden y desarrollo económico.',
        group: groups.Extremo1,
        polynomialId: politicalPolyId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        text: 'Se debe privilegiar el crecimiento económico y el empleo por sobre la protección del medioambiente',
        group: groups.Extremo1,
        polynomialId: politicalPolyId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        text: 'El lenguaje inclusivo es una exageración basada en una ideología',
        group: groups.Extremo1,
        polynomialId: politicalPolyId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        text: 'El Estado debe mantenerse alejado de toda actividad empresarial',
        group: groups.Extremo1,
        polynomialId: politicalPolyId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        text: 'Las personas deben poder acceder libremente a armas para su defensa personal',
        group: groups.Extremo1,
        polynomialId: politicalPolyId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        text: 'Los carabineros deben poder usar sus armas con libertad, sin restricciones',
        group: groups.Extremo1,
        polynomialId: politicalPolyId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    left = [
      {
        id: uuidv4(),
        text: 'El aborto debe permitirse bajo cualquier causa que la mujer esgrima, solo con límites de plazos',
        group: groups.Extremo2,
        polynomialId: politicalPolyId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        text: 'Siempre que exista la posibilidad de hacerlo, se deben subir los impuestos',
        group: groups.Extremo2,
        polynomialId: politicalPolyId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        text: 'Los derechos sociales como educación y salud deben ser provistos principalmente por el Estado',
        group: groups.Extremo2,
        polynomialId: politicalPolyId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        text: 'Durante los años de dictadura la economía del país vivió un retroceso importante.',
        group: groups.Extremo2,
        polynomialId: politicalPolyId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        text: 'Se deben eliminar las restricciones de ingreso de inmigrantes al país',
        group: groups.Extremo2,
        polynomialId: politicalPolyId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        text: 'Debe permitirse el consumo recreativo de la marihuana',
        group: groups.Extremo2,
        polynomialId: politicalPolyId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        text: 'Los pueblos indígenas deben tener sus propios territorios',
        group: groups.Extremo2,
        polynomialId: politicalPolyId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        text: 'Los sindicatos deben poder participar con voz y voto en los directorios de las empresas',
        group: groups.Extremo2,
        polynomialId: politicalPolyId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        text: 'Cuando hay mucha injusticia social, se justifican las manifestaciones con rayados, barricadas y bloqueos de calles',
        group: groups.Extremo2,
        polynomialId: politicalPolyId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    male = [
      {
        id: uuidv4(),
        text: 'El cuidado de los niños debe ser responsabilidad principalmente de la madre',
        group: groups.Extremo1,
        polynomialId: genrePolyId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    female = [
      {
        id: uuidv4(),
        text: 'Se deben establecer cuotas en el Parlamento y directorios de empresas para que exista igual número de hombres y mujeres',
        group: groups.Extremo2,
        polynomialId: genrePolyId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    old = [
      {
        id: uuidv4(),
        text: 'Los jóvenes creen que lo saben todo y se embarcan en iniciativas para las cuales no tienen experiencia',
        group: groups.Extremo1,
        polynomialId: agePolyId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    young = [
      {
        id: uuidv4(),
        text: 'Las generaciones mayores no entienden los desafíos que la sociedad debe enfrentar hoy en día',
        group: groups.Extremo2,
        polynomialId: agePolyId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    lowIncome = [
      {
        id: uuidv4(),
        text: 'En Chile, las personas de grupos económicos altos en general tienen un mal trato con las personas de menos ingresos',
        group: groups.Extremo1,
        polynomialId: incomePolyId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    highIncome = [
      {
        id: uuidv4(),
        text: 'Las personas pobres, en general, no tienen la disciplina del trabajo, les cuesta cumplir compromisos',
        group: groups.Extremo2,
        polynomialId: incomePolyId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    santiaguinos = [
      {
        id: uuidv4(),
        text: 'De la riqueza económica creada en regiones, un mayor porcentaje debiera quedar en regiones',
        group: groups.Extremo1,
        polynomialId: localizationPolyId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    regions = [
      {
        id: uuidv4(),
        text: 'Los profesionales que viven en las ciudades de regiones no están tan bien preparados como los profesionales de Santiago',
        group: groups.Extremo2,
        polynomialId: localizationPolyId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    agnostic = [
      {
        id: uuidv4(),
        text: 'Las religiones son esencialmente conservadoras, están cerradas a todos los cambios',
        group: groups.Extremo1,
        polynomialId: religionPolyId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    religious = [
      {
        id: uuidv4(),
        text: 'La sociedad debiera considerar más las opiniones de los líderes religiosos del país',
        group: groups.Extremo2,
        polynomialId: religionPolyId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    notIndegenous = [
      {
        id: uuidv4(),
        text: 'Los pueblos indígenas, en general, no se logran desarrollar debido a su falta de esfuerzo',
        group: groups.Extremo1,
        polynomialId: indigenousPolyId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    indigenous = [
      {
        id: uuidv4(),
        text: 'Se deben establecer escaños reservados en el Parlamento, para que exista un mínimo de representantes de pueblos indígenas',
        group: groups.Extremo2,
        polynomialId: indigenousPolyId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    chilean = [
      {
        id: uuidv4(),
        text: 'Los beneficios que da el Estado (atención de salud, educación, bonos) deben ser prioritariamente para los chilenos',
        group: groups.Extremo1,
        polynomialId: migrationPolyId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    immigrant = [
      {
        id: uuidv4(),
        text: 'Los migrantes son un aporte importante al desarrollo económico y social del país',
        group: groups.Extremo2,
        polynomialId: migrationPolyId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    heterosexual = [
      {
        id: uuidv4(),
        text: 'Las parejas homosexuales deben tener la posibilidad de adoptar hijos',
        group: groups.Extremo1,
        polynomialId: sexualOrientationPolyId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    homosexual = [
      {
        id: uuidv4(),
        text: 'Un matrimonio entre personas del mismo sexo debe ser tan legítimo como un matrimonio entre personas de distinto sexo',
        group: groups.Extremo2,
        polynomialId: sexualOrientationPolyId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    worker = [
      {
        id: uuidv4(),
        text: 'En general, a los empresarios y altos ejecutivos de grandes compañías sólo los motiva generar utilidades',
        group: groups.Extremo1,
        polynomialId: managementPolyId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    manager = [
      {
        id: uuidv4(),
        text: 'Los trabajadores velan por su situación particular y no consideran la realidad de la empresa',
        group: groups.Extremo2,
        polynomialId: managementPolyId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    const political = right.concat(left);
    const gender = male.concat(female);
    const age = old.concat(young);
    const income = lowIncome.concat(highIncome);
    const localization = regions.concat(santiaguinos);
    const religion = agnostic.concat(religious);
    const indigen = indigenous.concat(notIndegenous);
    const nationality = immigrant.concat(chilean);
    const sexualOrientation = homosexual.concat(heterosexual);
    const management = worker.concat(manager);

    const phrases = political.concat(
      gender,
      age,
      income,
      localization,
      religion,
      indigen,
      nationality,
      sexualOrientation,
      management,
    );

    await queryInterface.bulkInsert('phrases', phrases, {});
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('phrases', {});
  },
};
