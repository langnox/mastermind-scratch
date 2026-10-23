import { number, text, variable, message, condition, block, buildScripts } from '../blocks.js';
import { NEW_GAME_BROADCAST, CONFIRM_NEW_GAME_BROADCAST, CANCEL_NEW_GAME_BROADCAST, PLAYING_VARIABLE, guessLength, row, pressedAtVariable, markPressed, sizeCue, buttonCostume } from '../shared.js';

export function newGameSprite() {
  const NEW_GAME_PRESSED_AT = pressedAtVariable('new-game');

  return {
    isStage: false, name: 'New game', lists: {}, broadcasts: {},
    variables: {
      [NEW_GAME_PRESSED_AT[1]]: [NEW_GAME_PRESSED_AT[0], 0]
    },
    ...buildScripts(
      [
        block('event_whenbroadcastreceived', { fields: { BROADCAST_OPTION: NEW_GAME_BROADCAST } }),
        block('motion_gotoxy', { inputs: { X: number(165), Y: number(-36) } }),
        block('looks_show'),
        block('control_forever', { substack: [sizeCue(NEW_GAME_PRESSED_AT)] })
      ],
      [
        block('event_whenbroadcastreceived', { fields: { BROADCAST_OPTION: CONFIRM_NEW_GAME_BROADCAST } }),
        block('looks_hide')
      ],
      [
        block('event_whenbroadcastreceived', { fields: { BROADCAST_OPTION: CANCEL_NEW_GAME_BROADCAST } }),
        block('looks_show')
      ],
      [
        block('event_whenthisspriteclicked'),
        markPressed(NEW_GAME_PRESSED_AT),
        block('control_if_else', {
          inputs: {
            CONDITION: condition(block('operator_and', {
              inputs: {
                OPERAND1: condition(block('operator_equals', { inputs: { OPERAND1: text(variable(PLAYING_VARIABLE)), OPERAND2: text(1) } })),
                OPERAND2: condition(block('operator_or', {
                  inputs: {
                    OPERAND1: condition(block('operator_gt', { inputs: { OPERAND1: text(row()), OPERAND2: text(1) } })),
                    OPERAND2: condition(block('operator_gt', { inputs: { OPERAND1: text(guessLength()), OPERAND2: text(0) } }))
                  }
                }))
              }
            }))
          },
          substack: [
            block('event_broadcast', { inputs: { BROADCAST_INPUT: message(CONFIRM_NEW_GAME_BROADCAST) } })
          ],
          substack2: [
            block('event_broadcast', { inputs: { BROADCAST_INPUT: message(NEW_GAME_BROADCAST) } })
          ]
        })
      ]
    ),
    currentCostume: 0,
    costumes: [
      buttonCostume('New game', 90)
    ],
    sounds: [], volume: 100, layerOrder: 10, visible: false, x: 0, y: 0, size: 100, direction: 90, draggable: false, rotationStyle: 'all around'
  };
}
