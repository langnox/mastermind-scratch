import { number, text, message, condition, defineProcedure, callProcedure, whenKeyPressed, block, buildBlocks } from '../blocks.js';
import { GUESS_LIST, UNDO_BROADCAST, guessLength, buttonCostume } from '../shared.js';

export function undoSprite() {
  return {
    isStage: false, name: 'Undo', variables: {}, lists: {}, broadcasts: {}, comments: {},
    blocks: buildBlocks(
      [
        block('event_whenflagclicked'),
        block('motion_gotoxy', { inputs: { X: number(160), Y: number(-128) } }),
        block('control_forever', {
          substack: [
            block('control_if_else', {
              inputs: { CONDITION: condition(block('operator_gt', { inputs: { OPERAND1: text(guessLength()), OPERAND2: text(0) } })) },
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
        callProcedure('undo peg')
      ],
      [
        whenKeyPressed('left arrow'),
        callProcedure('undo peg')
      ],
      [
        defineProcedure('undo peg'),
        block('control_if', {
          inputs: { CONDITION: condition(block('operator_gt', { inputs: { OPERAND1: text(guessLength()), OPERAND2: text(0) } })) },
          substack: [
            block('data_deleteoflist', { inputs: { INDEX: number(guessLength()) }, fields: { LIST: GUESS_LIST } }),
            block('event_broadcast', { inputs: { BROADCAST_INPUT: message(UNDO_BROADCAST) } })
          ]
        })
      ]
    ),
    currentCostume: 0,
    costumes: [
      buttonCostume('Undo ←')
    ],
    sounds: [], volume: 100, layerOrder: 7, visible: false, x: 0, y: 0, size: 100, direction: 90, draggable: false, rotationStyle: 'all around'
  };
}
