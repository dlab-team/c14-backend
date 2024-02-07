/* eslint-disable @typescript-eslint/no-explicit-any */
'use strict';

import { QueryInterface } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import { Polynomial } from '../models/polynomial';

const createPhrases = ({
  texts,
  group,
  polynomialId,
}: {
  texts: string[];
  group: string;
  polynomialId: string;
}) => {
  return texts.map(text => ({
    id: uuidv4(),
    text,
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

    const right = createPhrases({
      texts: [
        'El aborto debe volver a ser prohibido, es decir, no debe permitirse bajo ninguna causal',
        'Se deben reducir los impuestos, para potenciar la economía',
        'La educación y la salud deben ser provistas principalmente por empresas y organizaciones privadas',
        'El gobierno militar no priorizó los derechos humanos, pero lo importante es que hubo orden y desarrollo económico.',
        'Se debe privilegiar el crecimiento económico y el empleo por sobre la protección del medioambiente',
        'El lenguaje inclusivo es una exageración basada en una ideología',
        'El Estado debe mantenerse alejado de toda actividad empresarial',
        'Las personas deben poder acceder libremente a armas para su defensa personal',
        'Los carabineros deben poder usar sus armas con libertad, sin restricciones',
      ],
      polynomialId: politicalPolyId!,
      group: groups.Extremo1,
    });

    const left = createPhrases({
      texts: [
        'El aborto debe permitirse bajo cualquier causa que la mujer esgrima, solo con límites de plazos',
        'Siempre que exista la posibilidad de hacerlo, se deben subir los impuestos',
        'Los derechos sociales como educación y salud deben ser provistos principalmente por el Estado',
        'Durante los años de dictadura la economía del país vivió un retroceso importante.',
        'Se deben eliminar las restricciones de ingreso de inmigrantes al país',
        'Debe permitirse el consumo recreativo de la marihuana',
        'Los pueblos indígenas deben tener sus propios territorios',
        'Los sindicatos deben poder participar con voz y voto en los directorios de las empresas',
        'Cuando hay mucha injusticia social, se justifican las manifestaciones con rayados, barricadas y bloqueos de calles',
      ],
      polynomialId: politicalPolyId!,
      group: groups.Extremo2,
    });

    const male = createPhrases({
      texts: ['El cuidado de los niños debe ser responsabilidad principalmente de la madre'],
      group: groups.Extremo1,
      polynomialId: genrePolyId!,
    });
    const female = createPhrases({
      texts: [
        'Se deben establecer cuotas en el Parlamento y directorios de empresas para que exista igual número de hombres y mujeres',
      ],
      group: groups.Extremo2,
      polynomialId: genrePolyId!,
    });

    const old = createPhrases({
      texts: [
        'Los jóvenes creen que lo saben todo y se embarcan en iniciativas para las cuales no tienen experiencia',
      ],
      group: groups.Extremo1,
      polynomialId: agePolyId!,
    });
    const young = createPhrases({
      texts: [
        'Las generaciones mayores no entienden los desafíos que la sociedad debe enfrentar hoy en día',
      ],
      group: groups.Extremo2,
      polynomialId: agePolyId!,
    });

    const lowIncome = createPhrases({
      texts: [
        'En Chile, las personas de grupos económicos altos en general tienen un mal trato con las personas de menos ingresos',
      ],
      group: groups.Extremo1,
      polynomialId: incomePolyId!,
    });
    const highIncome = createPhrases({
      texts: [
        'Las personas pobres, en general, no tienen la disciplina del trabajo, les cuesta cumplir compromisos',
      ],
      group: groups.Extremo2,
      polynomialId: incomePolyId!,
    });

    const santiaguinos = createPhrases({
      texts: [
        'De la riqueza económica creada en regiones, un mayor porcentaje debiera quedar en regiones',
      ],
      group: groups.Extremo1,
      polynomialId: localizationPolyId!,
    });
    const regions = createPhrases({
      texts: [
        'Los profesionales que viven en las ciudades de regiones no están tan bien preparados como los profesionales de Santiago',
      ],
      group: groups.Extremo2,
      polynomialId: localizationPolyId!,
    });

    const agnostic = createPhrases({
      texts: ['Las religiones son esencialmente conservadoras, están cerradas a todos los cambios'],
      group: groups.Extremo1,
      polynomialId: religionPolyId!,
    });
    const religious = createPhrases({
      texts: [
        'La sociedad debiera considerar más las opiniones de los líderes religiosos del país',
      ],
      group: groups.Extremo2,
      polynomialId: religionPolyId!,
    });

    const notIndegenous = createPhrases({
      texts: [
        'Los pueblos indígenas, en general, no se logran desarrollar debido a su falta de esfuerzo',
      ],
      group: groups.Extremo1,
      polynomialId: indigenousPolyId!,
    });

    const indigenous = createPhrases({
      texts: [
        'Se deben establecer escaños reservados en el Parlamento, para que exista un mínimo de representantes de pueblos indígenas',
      ],
      group: groups.Extremo2,
      polynomialId: indigenousPolyId!,
    });

    const chilean = createPhrases({
      texts: [
        'Los beneficios que da el Estado (atención de salud, educación, bonos) deben ser prioritariamente para los chilenos',
      ],
      group: groups.Extremo1,
      polynomialId: migrationPolyId!,
    });
    const immigrant = createPhrases({
      texts: ['Los migrantes son un aporte importante al desarrollo económico y social del país'],
      group: groups.Extremo2,
      polynomialId: migrationPolyId!,
    });

    const heterosexual = createPhrases({
      texts: ['Las parejas homosexuales deben tener la posibilidad de adoptar hijos'],
      group: groups.Extremo1,
      polynomialId: sexualOrientationPolyId!,
    });
    const homosexual = createPhrases({
      texts: [
        'Un matrimonio entre personas del mismo sexo debe ser tan legítimo como un matrimonio entre personas de distinto sexo',
      ],
      group: groups.Extremo2,
      polynomialId: sexualOrientationPolyId!,
    });

    const worker = createPhrases({
      texts: [
        'En general, a los empresarios y altos ejecutivos de grandes compañías sólo los motiva generar utilidades',
      ],
      group: groups.Extremo1,
      polynomialId: managementPolyId!,
    });
    const manager = createPhrases({
      texts: [
        'Los trabajadores velan por su situación particular y no consideran la realidad de la empresa',
      ],
      group: groups.Extremo2,
      polynomialId: managementPolyId!,
    });

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

    const phrases = [
      ...political,
      ...gender,
      ...age,
      ...income,
      ...localization,
      ...religion,
      ...indigen,
      ...nationality,
      ...sexualOrientation,
      ...management,
    ];

    await queryInterface.bulkInsert('phrases', phrases, {});
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('phrases', {});
  },
};
