import { number, message, block, buildBlocks } from '../blocks.js';
import { NEW_GAME_BROADCAST, CONFIRM_NEW_GAME_BROADCAST, CANCEL_NEW_GAME_BROADCAST, pressedAtVariable, markPressed, sizeCue, buttonCostume } from '../shared.js';

export function yesSprite() {
  const YES_PRESSED_AT = pressedAtVariable('yes');

  return {
    isStage: false, name: 'Yes', lists: {}, broadcasts: {}, comments: {},
    variables: {
      [YES_PRESSED_AT[1]]: [YES_PRESSED_AT[0], 0]
    },
    blocks: buildBlocks(
      [
        block('event_whenbroadcastreceived', { fields: { BROADCAST_OPTION: NEW_GAME_BROADCAST } }),
        block('looks_hide'),
        block('motion_gotoxy', { inputs: { X: number(139), Y: number(-68) } }),
        block('control_forever', { substack: [sizeCue(YES_PRESSED_AT)] })
      ],
      [
        block('event_whenbroadcastreceived', { fields: { BROADCAST_OPTION: CONFIRM_NEW_GAME_BROADCAST } }),
        block('looks_show')
      ],
      [
        block('event_whenbroadcastreceived', { fields: { BROADCAST_OPTION: CANCEL_NEW_GAME_BROADCAST } }),
        block('looks_hide')
      ],
      [
        block('event_whenthisspriteclicked'),
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
