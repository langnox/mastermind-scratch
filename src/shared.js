import { block, circleCostume } from './blocks.js';

export const CODE_LIST = ['code', 'code-list'];
export const GUESS_LIST = ['guess', 'guess-list'];
export const ROW_VARIABLE = ['row', 'row-variable'];

export function guessLength() {
  return block('data_lengthoflist', { fields: { LIST: GUESS_LIST } });
}

export function pegCostumes() {
  return [
    circleCostume('red', 22, '#e24b4a'),
    circleCostume('orange', 22, '#f39c33'),
    circleCostume('yellow', 22, '#f2d43a'),
    circleCostume('green', 22, '#5ba84a'),
    circleCostume('blue', 22, '#378add'),
    circleCostume('purple', 22, '#7f77dd')
  ];
}
