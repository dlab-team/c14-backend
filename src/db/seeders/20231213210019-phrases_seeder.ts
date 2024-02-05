/* eslint-disable @typescript-eslint/no-explicit-any */
'use strict';

import { QueryInterface } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import { Group } from '../models/group';

const createPhrases = (texts: string[], groupId: string): any => {
  return texts.map(text => ({
    id: uuidv4(),
    text,
    groupId,
    createdAt: new Date(),
    updatedAt: new Date(),
  }));
};

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    const groups = await Group.findAll({
      attributes: ['id', 'name'],
    });

    const Derecha = groups.find(g => g.name === 'Derecha');
    const Izquierda = groups.find(g => g.name === 'Izquierda');
    const male = groups.find(g => g.name === 'Masculino');
    const female = groups.find(g => g.name === 'Femenino');
    const young = groups.find(g => g.name === '29 años o menos');
    const old = groups.find(g => g.name === '60 años o más');
    const lowIncome = groups.find(g => g.name === 'Ingresos medio bajos - bajos');
    const highIncome = groups.find(g => g.name === 'Ingresos medio altos - altos');
    const region = groups.find(g => g.name === 'Viven en región');
    const capital = groups.find(g => g.name === 'Vive en R. Metropolitana');
    const indigenas = groups.find(g => g.name === 'Pertenece a publos orginarios');
    const notIndigenas = groups.find(g => g.name === 'No pertenece a pueblos originarios');
    const religious = groups.find(g => g.name === 'Práctica alguna religión');
    const agnostic = groups.find(g => g.name === 'Sin Religión');
    const immigrant = groups.find(g => g.name === 'Inmigrante');
    const chilean = groups.find(g => g.name === 'Chileno');

    const heterosexual = groups.find(g => g.name === 'Heterosexual');
    const homosexual = groups.find(g => g.name === 'LGTBQ+');
    const manager = groups.find(g => g.name === 'Con cargo directivo');
    const worker = groups.find(g => g.name === 'Sin cargo directivo');

    const phrases: any[] = [];

    if (Derecha?.id) {
      const data = createPhrases(
        [
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
        Derecha.id,
      );
      phrases.push(...data);
    }

    if (Izquierda?.id) {
      const data = createPhrases(
        [
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
        Izquierda?.id,
      );
      phrases.push(...data);
    }

    // male = [
    // female = [
    if (male?.id) {
      const data = createPhrases(
        ['El cuidado de los niños debe ser responsabilidad principalmente de la madre'],
        male?.id,
      );
      phrases.push(...data);
    }
    if (female?.id) {
      const data = createPhrases(
        [
          'Se deben establecer cuotas en el Parlamento y directorios de empresas para que exista igual número de hombres y mujeres',
        ],
        female?.id,
      );
      phrases.push(...data);
    }
    if (young?.id) {
      const data = createPhrases(
        [
          'Las generaciones mayores no entienden los desafíos que la sociedad debe enfrentar hoy en día',
        ],
        young.id,
      );
      phrases.push(...data);
    }
    if (old?.id) {
      const data = createPhrases(
        [
          'Los jóvenes creen que lo saben todo y se embarcan en iniciativas para las cuales no tienen experiencia',
        ],
        old.id,
      );
      phrases.push(...data);
    }
    if (lowIncome?.id) {
      const data = createPhrases(
        [
          'En Chile, las personas de grupos económicos altos en general tienen un mal trato con las personas de menos ingresos',
        ],
        lowIncome.id,
      );
      phrases.push(...data);
    }
    if (highIncome?.id) {
      const data = createPhrases(
        [
          'Las personas pobres, en general, no tienen la disciplina del trabajo, les cuesta cumplir compromisos',
        ],
        highIncome.id,
      );
      phrases.push(...data);
    }

    if (capital?.id) {
      const data = createPhrases(
        [
          'De la riqueza económica creada en regiones, un mayor porcentaje debiera quedar en regiones',
        ],
        capital.id,
      );
      phrases.push(...data);
    }
    if (region?.id) {
      const data = createPhrases(
        [
          'Los profesionales que viven en las ciudades de regiones no están tan bien preparados como los profesionales de Santiago',
        ],
        region.id,
      );
      phrases.push(...data);
    }

    if (agnostic?.id) {
      const data = createPhrases(
        ['Las religiones son esencialmente conservadoras, están cerradas a todos los cambios'],
        agnostic.id,
      );
      phrases.push(...data);
    }
    if (religious?.id) {
      const data = createPhrases(
        ['La sociedad debiera considerar más las opiniones de los líderes religiosos del país'],
        religious.id,
      );
      phrases.push(...data);
    }

    if (indigenas?.id) {
      const data = createPhrases(
        [
          'Se deben establecer escaños reservados en el Parlamento, para que exista un mínimo de representantes de pueblos indígenas',
        ],
        indigenas.id,
      );
      phrases.push(...data);
    }
    if (notIndigenas?.id) {
      const data = createPhrases(
        [
          'Los pueblos indígenas, en general, no se logran desarrollar debido a su falta de esfuerzo',
        ],
        notIndigenas.id,
      );
      phrases.push(...data);
    }

    if (chilean?.id) {
      const data = createPhrases(
        [
          'Los beneficios que da el Estado (atención de salud, educación, bonos) deben ser prioritariamente para los chilenos',
        ],
        chilean.id,
      );
      phrases.push(...data);
    }
    if (immigrant?.id) {
      const data = createPhrases(
        ['Los migrantes son un aporte importante al desarrollo económico y social del país'],
        immigrant.id,
      );
      phrases.push(...data);
    }

    if (heterosexual?.id) {
      const data = createPhrases(
        ['Sólo las parejas heterosexuales (hombre y mujer) deben poder adoptar hijos'],
        heterosexual.id,
      );
      phrases.push(...data);
    }
    if (homosexual?.id) {
      const data = createPhrases(
        [
          'Un matrimonio entre personas del mismo sexo debe ser tan legítimo como un matrimonio entre personas de distinto sexo',
        ],
        homosexual.id,
      );
      phrases.push(...data);
    }

    if (manager?.id) {
      const data = createPhrases(
        [
          'Los trabajadores velan por su situación particular y no consideran la realidad de la empresa',
        ],
        manager.id,
      );
      phrases.push(...data);
    }
    if (worker?.id) {
      const data = createPhrases(
        [
          'En general, a los empresarios y altos ejecutivos de grandes compañías sólo los motiva generar utilidades',
        ],
        worker.id,
      );
      phrases.push(...data);
    }

    await queryInterface.bulkInsert('phrases', phrases, {});
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('phrases', {});
  },
};
