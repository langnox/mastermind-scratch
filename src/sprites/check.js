import { number, text, message, condition, block, buildBlocks } from '../blocks.js';
import { GUESS_LIST, ROW_VARIABLE, NEXT_ROW_BROADCAST, guessLength, buttonCostume } from '../shared.js';

export function checkSprite() {
  return {
    isStage: false, name: 'Check', variables: {}, lists: {}, broadcasts: {}, comments: {},
    blocks: buildBlocks(
      [
        block('event_whenflagclicked'),
        block('motion_gotoxy', { inputs: { X: number(160), Y: number(-160) } }),
        block('control_forever', {
          substack: [
            block('control_if_else', {
              inputs: { CONDITION: condition(block('operator_equals', { inputs: { OPERAND1: text(guessLength()), OPERAND2: text(4) } })) },
              substack: [
                block('looks_show')
              ],
              substack2: [
                block('looks_hide')
              ]
            })
          ]
        })
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
      buttonCostume('Check')
    ],
    sounds: [], volume: 100, layerOrder: 6, visible: false, x: 0, y: 0, size: 100, direction: 90, draggable: false, rotationStyle: 'all around'
  };
}
