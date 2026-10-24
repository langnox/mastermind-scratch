import { number, text, variable, message, condition, defineProcedure, callProcedure, whenKeyPressed, block, buildScripts } from '../blocks.js';
import { GUESS_LIST, ROW_VARIABLE, NEXT_ROW_BROADCAST, NEW_GAME_BROADCAST, SCORE_BROADCAST, WIN_BROADCAST, LOSE_BROADCAST, PLAYING_VARIABLE, PLACED_VARIABLE, BLACK_VARIABLE, guessLength, row, notConfirming, pressedAtVariable, markPressed, sizeCue, buttonCostume, forgetPressed } from '../shared.js';

export function checkSprite() {
  const CHECK_PRESSED_AT = pressedAtVariable('check');

  return {
    isStage: false, name: 'Check', lists: {}, broadcasts: {},
    variables: {
      [CHECK_PRESSED_AT[1]]: [CHECK_PRESSED_AT[0], 0]
    },
    ...buildScripts(
      [
        block('event_whenbroadcastreceived', { fields: { BROADCAST_OPTION: NEW_GAME_BROADCAST }, comment: 'Shows Check only while a full guess is placed and no confirmation is open, and runs the hover and press cue.', y: 0, commentX: 735 }),
        forgetPressed(CHECK_PRESSED_AT),
        block('motion_gotoxy', { inputs: { X: number(160), Y: number(-150) } }),
        block('control_forever', {
          substack: [
            block('control_if_else', {
              inputs: {
                CONDITION: condition(block('operator_and', {
                  inputs: {
                    OPERAND1: condition(block('operator_equals', { inputs: { OPERAND1: text(guessLength()), OPERAND2: text(4) } })),
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
            sizeCue(CHECK_PRESSED_AT)
          ]
        })
      ],
      [
        block('event_whenthisspriteclicked', { y: 911 }),
        callProcedure('submit guess', { warp: false })
      ],
      [
        whenKeyPressed('enter', { y: 2040 }),
        callProcedure('submit guess', { warp: false })
      ],
      [
        defineProcedure('submit guess', { warp: false, comment: 'Waits for scoring, then either ends the game (four black pegs, or the tenth row) or moves to the next row. Runs with screen refresh, because a custom block that waits would stall otherwise.', y: 1080, commentX: 735 }),
        block('control_if', {
          inputs: {
            CONDITION: condition(block('operator_and', {
              inputs: {
                OPERAND1: condition(block('operator_equals', { inputs: { OPERAND1: text(guessLength()), OPERAND2: text(4) } })),
                OPERAND2: condition(notConfirming())
              }
            }))
          },
          substack: [
            markPressed(CHECK_PRESSED_AT),
            block('event_broadcastandwait', { inputs: { BROADCAST_INPUT: message(SCORE_BROADCAST) } }),
            block('data_deletealloflist', { fields: { LIST: GUESS_LIST } }),
            block('data_setvariableto', { inputs: { VALUE: text(0) }, fields: { VARIABLE: PLACED_VARIABLE } }),
            block('control_if_else', {
              inputs: { CONDITION: condition(block('operator_equals', { inputs: { OPERAND1: text(variable(BLACK_VARIABLE)), OPERAND2: text(4) } })) },
              substack: [
                block('data_setvariableto', { inputs: { VALUE: text(0) }, fields: { VARIABLE: PLAYING_VARIABLE } }),
                block('event_broadcast', { inputs: { BROADCAST_INPUT: message(WIN_BROADCAST) } })
              ],
              substack2: [
                block('control_if_else', {
                  inputs: { CONDITION: condition(block('operator_equals', { inputs: { OPERAND1: text(row()), OPERAND2: text(10) } })) },
                  substack: [
                    block('data_setvariableto', { inputs: { VALUE: text(0) }, fields: { VARIABLE: PLAYING_VARIABLE } }),
                    block('event_broadcast', { inputs: { BROADCAST_INPUT: message(LOSE_BROADCAST) } })
                  ],
                  substack2: [
                    block('data_changevariableby', { inputs: { VALUE: number(1) }, fields: { VARIABLE: ROW_VARIABLE } }),
                    block('event_broadcast', { inputs: { BROADCAST_INPUT: message(NEXT_ROW_BROADCAST) } })
                  ]
                })
              ]
            })
          ]
        })
      ]
    ),
    currentCostume: 0,
    costumes: [
      buttonCostume('Check ↵')
    ],
    sounds: [], volume: 100, layerOrder: 6, visible: false, x: 0, y: 0, size: 100, direction: 90, draggable: false, rotationStyle: 'all around'
  };
}
