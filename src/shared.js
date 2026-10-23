import { number, text, variable, condition, touching, block, svgCostume, roundedRect, centredText, circleCostume } from './blocks.js';

export const CODE_LIST = ['code', 'code-list'];
export const GUESS_LIST = ['guess', 'guess-list'];
export const ROW_VARIABLE = ['row', 'row-variable'];
export const NEXT_ROW_BROADCAST = ['next row', 'next-row-broadcast'];
export const UNDO_BROADCAST = ['undo', 'undo-broadcast'];
export const NEW_GAME_BROADCAST = ['new game', 'new-game-broadcast'];
export const CONFIRM_NEW_GAME_BROADCAST = ['confirm new game', 'confirm-new-game-broadcast'];
export const CANCEL_NEW_GAME_BROADCAST = ['cancel new game', 'cancel-new-game-broadcast'];
export const SCORE_BROADCAST = ['score', 'score-broadcast'];
export const WIN_BROADCAST = ['win', 'win-broadcast'];
export const LOSE_BROADCAST = ['lose', 'lose-broadcast'];
export const PLAYING_VARIABLE = ['playing', 'playing-variable'];
export const CONFIRMING_VARIABLE = ['confirming', 'confirming-variable'];
export const PLACED_VARIABLE = ['placed', 'placed-variable'];
export const BLACK_VARIABLE = ['black', 'black-variable'];
export const WHITE_VARIABLE = ['white', 'white-variable'];

export function guessLength() {
  return block('data_lengthoflist', { fields: { LIST: GUESS_LIST } });
}

export function row() {
  return block('data_variable', { fields: { VARIABLE: ROW_VARIABLE } });
}

export function notConfirming() {
  return block('operator_equals', { inputs: { OPERAND1: text(variable(CONFIRMING_VARIABLE)), OPERAND2: text(0) } });
}

export function pressedAtVariable(sprite) {
  return ['pressed at', `${sprite}-pressed-at-variable`];
}

export function isCloneVariable(sprite) {
  return ['is clone', `${sprite}-is-clone-variable`];
}

export function deleteIfClone(isClone) {
  return block('control_if', {
    inputs: { CONDITION: condition(block('operator_equals', { inputs: { OPERAND1: text(variable(isClone)), OPERAND2: text(1) } })) },
    substack: [block('control_delete_this_clone')]
  });
}

export function markPressed(pressedAt) {
  return block('data_setvariableto', { inputs: { VALUE: text(block('sensing_timer')) }, fields: { VARIABLE: pressedAt } });
}

export function forgetPressed(pressedAt) {
  return block('data_setvariableto', { inputs: { VALUE: text(-1) }, fields: { VARIABLE: pressedAt } });
}

export function sizeCue(pressedAt) {
  const secondsSincePressed = block('operator_subtract', { inputs: { NUM1: number(block('sensing_timer')), NUM2: number(variable(pressedAt)) } });
  return block('control_if_else', {
    inputs: { CONDITION: condition(block('operator_lt', { inputs: { OPERAND1: text(secondsSincePressed), OPERAND2: text(0.1) } })) },
    substack: [
      block('looks_setsizeto', { inputs: { SIZE: number(90) } })
    ],
    substack2: [
      block('control_if_else', {
        inputs: { CONDITION: condition(touching('_mouse_')) },
        substack: [
          block('looks_setsizeto', { inputs: { SIZE: number(110) } })
        ],
        substack2: [
          block('looks_setsizeto', { inputs: { SIZE: number(100) } })
        ]
      })
    ]
  });
}

export function rowY() {
  return block('operator_add', { inputs: { NUM1: number(-192), NUM2: number(block('operator_multiply', { inputs: { NUM1: number(32), NUM2: number(row()) } })) } });
}

export function buttonCostume(label, width = 64) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="26">${roundedRect(width, 26, 6, '#5f5e5a')}${centredText(label, width / 2, 18, 14, '#ffffff')}</svg>`;
  return svgCostume('button', svg, width / 2, 13);
}

export const PEG_COLOURS = [
  { name: 'red', fill: '#e24b4a' },
  { name: 'orange', fill: '#f39c33' },
  { name: 'yellow', fill: '#f2d43a' },
  { name: 'green', fill: '#5ba84a' },
  { name: 'blue', fill: '#378add' },
  { name: 'purple', fill: '#7f77dd' }
];

export function pegCostumes() {
  return PEG_COLOURS.map(({ name, fill }) => circleCostume(name, 22, fill));
}
