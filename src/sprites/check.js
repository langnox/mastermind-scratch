import { number, text, message, condition, block, buildBlocks, svgCostume } from '../blocks.js';
import { GUESS_LIST, ROW_VARIABLE, NEXT_ROW_BROADCAST, guessLength } from '../shared.js';

export function checkSprite() {
  return {
    isStage: false, name: 'Check', variables: {}, lists: {}, broadcasts: {}, comments: {},
    blocks: buildBlocks(
      [
        block('event_whenflagclicked'),
        block('motion_gotoxy', { inputs: { X: number(160), Y: number(-160) } }),
        block('looks_show')
      ],
      [
        block('event_whenthisspriteclicked'),
        block('control_if', {
          inputs: { CONDITION: condition(block('operator_equals', { inputs: { OPERAND1: text(guessLength()), OPERAND2: text(4) } })) },
          substack: [
            block('data_changevariableby', { inputs: { VALUE: number(1) }, fields: { VARIABLE: ROW_VARIABLE } }),
            block('data_deletealloflist', { fields: { LIST: GUESS_LIST } }),
            block('event_broadcast', { inputs: { BROADCAST_INPUT: message(NEXT_ROW_BROADCAST) } })
          ]
        })
      ]
    ),
    currentCostume: 0,
    costumes: [
      svgCostume('button', '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="26"><rect width="64" height="26" rx="6" fill="#5f5e5a"/><text x="32" y="18" font-family="Sans Serif" font-size="14" fill="#ffffff" text-anchor="middle">Check</text></svg>', 32, 13)
    ],
    sounds: [], volume: 100, layerOrder: 6, visible: false, x: 0, y: 0, size: 100, direction: 90, draggable: false, rotationStyle: 'all around'
  };
}
