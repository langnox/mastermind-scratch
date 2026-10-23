import { number, message, block, buildBlocks } from '../blocks.js';
import { NEW_GAME_BROADCAST, CONFIRM_NEW_GAME_BROADCAST, CANCEL_NEW_GAME_BROADCAST, buttonCostume } from '../shared.js';

export function noSprite() {
  return {
    isStage: false, name: 'No', variables: {}, lists: {}, broadcasts: {}, comments: {},
    blocks: buildBlocks(
      [
        block('event_whenbroadcastreceived', { fields: { BROADCAST_OPTION: NEW_GAME_BROADCAST } }),
        block('looks_hide'),
        block('motion_gotoxy', { inputs: { X: number(191), Y: number(-68) } })
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
