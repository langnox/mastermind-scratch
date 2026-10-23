import { number, message, block, buildScripts } from '../blocks.js';
import { NEW_GAME_BROADCAST, CONFIRM_NEW_GAME_BROADCAST, CANCEL_NEW_GAME_BROADCAST, pressedAtVariable, markPressed, sizeCue, buttonCostume } from '../shared.js';

export function noSprite() {
  const NO_PRESSED_AT = pressedAtVariable('no');

  return {
    isStage: false, name: 'No', lists: {}, broadcasts: {},
    variables: {
      [NO_PRESSED_AT[1]]: [NO_PRESSED_AT[0], 0]
    },
    ...buildScripts(
      [
        block('event_whenbroadcastreceived', { fields: { BROADCAST_OPTION: NEW_GAME_BROADCAST }, y: 0 }),
        block('looks_hide'),
        block('motion_gotoxy', { inputs: { X: number(191), Y: number(-68) } }),
        block('control_forever', { substack: [sizeCue(NO_PRESSED_AT)] })
      ],
      [
        block('event_whenbroadcastreceived', { fields: { BROADCAST_OPTION: CONFIRM_NEW_GAME_BROADCAST }, y: 900 }),
        block('looks_show')
      ],
      [
        block('event_whenbroadcastreceived', { fields: { BROADCAST_OPTION: CANCEL_NEW_GAME_BROADCAST }, y: 1071 }),
        block('looks_hide')
      ],
      [
        block('event_whenthisspriteclicked', { y: 683 }),
        markPressed(NO_PRESSED_AT),
        block('event_broadcast', { inputs: { BROADCAST_INPUT: message(CANCEL_NEW_GAME_BROADCAST) } })
      ]
    ),
    currentCostume: 0,
    costumes: [
      buttonCostume('No', 48)
    ],
    sounds: [], volume: 100, layerOrder: 12, visible: false, x: 0, y: 0, size: 100, direction: 90, draggable: false, rotationStyle: 'all around'
  };
}
