import { number, message, block, buildBlocks } from '../blocks.js';
import { NEW_GAME_BROADCAST, buttonCostume } from '../shared.js';

export function newGameSprite() {
  return {
    isStage: false, name: 'New game', variables: {}, lists: {}, broadcasts: {}, comments: {},
    blocks: buildBlocks(
      [
        block('event_whenbroadcastreceived', { fields: { BROADCAST_OPTION: NEW_GAME_BROADCAST } }),
        block('motion_gotoxy', { inputs: { X: number(165), Y: number(-36) } }),
        block('looks_show')
      ],
      [
        block('event_whenthisspriteclicked'),
        block('event_broadcast', { inputs: { BROADCAST_INPUT: message(NEW_GAME_BROADCAST) } })
      ]
    ),
    currentCostume: 0,
    costumes: [
      buttonCostume('New game', 90)
    ],
    sounds: [], volume: 100, layerOrder: 10, visible: false, x: 0, y: 0, size: 100, direction: 90, draggable: false, rotationStyle: 'all around'
  };
}
