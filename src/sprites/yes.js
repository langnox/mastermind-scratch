import { number, message, block, buildScripts } from '../blocks.js';
import { NEW_GAME_BROADCAST, CONFIRM_NEW_GAME_BROADCAST, CANCEL_NEW_GAME_BROADCAST, pressedAtVariable, markPressed, sizeCue, buttonCostume, forgetPressed } from '../shared.js';

export function yesSprite() {
  const YES_PRESSED_AT = pressedAtVariable('yes');

  return {
    isStage: false, name: 'Yes', lists: {}, broadcasts: {},
    variables: {
      [YES_PRESSED_AT[1]]: [YES_PRESSED_AT[0], 0]
    },
    ...buildScripts(
      [
        block('event_whenbroadcastreceived', { fields: { BROADCAST_OPTION: NEW_GAME_BROADCAST }, y: 0 }),
        forgetPressed(YES_PRESSED_AT),
        block('looks_hide'),
        block('motion_gotoxy', { inputs: { X: number(139), Y: number(-68) } }),
        block('control_forever', { substack: [sizeCue(YES_PRESSED_AT)] })
      ],
      [
        block('event_whenbroadcastreceived', { fields: { BROADCAST_OPTION: CONFIRM_NEW_GAME_BROADCAST }, y: 950 }),
        block('looks_show')
      ],
      [
        block('event_whenbroadcastreceived', { fields: { BROADCAST_OPTION: CANCEL_NEW_GAME_BROADCAST }, y: 1121 }),
        block('looks_hide')
      ],
      [
        block('event_whenthisspriteclicked', { y: 733 }),
        markPressed(YES_PRESSED_AT),
        block('event_broadcast', { inputs: { BROADCAST_INPUT: message(NEW_GAME_BROADCAST) } })
      ]
    ),
    currentCostume: 0,
    costumes: [
      buttonCostume('Yes', 48)
    ],
    sounds: [], volume: 100, layerOrder: 11, visible: false, x: 0, y: 0, size: 100, direction: 90, draggable: false, rotationStyle: 'all around'
  };
}
