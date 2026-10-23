import { number, text, message, condition, defineProcedure, callProcedure, whenKeyPressed, block, buildBlocks } from '../blocks.js';
import { GUESS_LIST, UNDO_BROADCAST, NEW_GAME_BROADCAST, PLACED_VARIABLE, guessLength, notConfirming, pressedAtVariable, markPressed, sizeCue, buttonCostume } from '../shared.js';

export function undoSprite() {
  const UNDO_PRESSED_AT = pressedAtVariable('undo');

  return {
    isStage: false, name: 'Undo', lists: {}, broadcasts: {}, comments: {},
    variables: {
      [UNDO_PRESSED_AT[1]]: [UNDO_PRESSED_AT[0], 0]
    },
    blocks: buildBlocks(
      [
        block('event_whenbroadcastreceived', { fields: { BROADCAST_OPTION: NEW_GAME_BROADCAST } }),
        block('motion_gotoxy', { inputs: { X: number(160), Y: number(-128) } }),
        block('control_forever', {
          substack: [
            block('control_if_else', {
              inputs: {
                CONDITION: condition(block('operator_and', {
                  inputs: {
                    OPERAND1: condition(block('operator_gt', { inputs: { OPERAND1: text(guessLength()), OPERAND2: text(0) } })),
                    OPERAND2: condition(notConfirming())
                  }
                }))
              },
              substack: [
                block('looks_show')
              ],
              substack2: [
                block('looks_hide')
              ]
            }),
            sizeCue(UNDO_PRESSED_AT)
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
          inputs: {
            CONDITION: condition(block('operator_and', {
              inputs: {
                OPERAND1: condition(block('operator_gt', { inputs: { OPERAND1: text(guessLength()), OPERAND2: text(0) } })),
                OPERAND2: condition(notConfirming())
              }
            }))
          },
          substack: [
            markPressed(UNDO_PRESSED_AT),
            block('data_deleteoflist', { inputs: { INDEX: number(guessLength()) }, fields: { LIST: GUESS_LIST } }),
            block('data_changevariableby', { inputs: { VALUE: number(-1) }, fields: { VARIABLE: PLACED_VARIABLE } }),
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
