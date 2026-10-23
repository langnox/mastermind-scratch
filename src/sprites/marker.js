import { number, block, buildBlocks, svgCostume } from '../blocks.js';
import { NEXT_ROW_BROADCAST, NEW_GAME_BROADCAST, WIN_BROADCAST, LOSE_BROADCAST, rowY } from '../shared.js';

export function markerSprite() {
  return {
    isStage: false, name: 'Marker', variables: {}, lists: {}, broadcasts: {}, comments: {},
    blocks: buildBlocks(
      [
        block('event_whenbroadcastreceived', { fields: { BROADCAST_OPTION: NEW_GAME_BROADCAST } }),
        block('motion_gotoxy', { inputs: { X: number(-92), Y: number(-160) } }),
        block('looks_show')
      ],
      [
        block('event_whenbroadcastreceived', { fields: { BROADCAST_OPTION: NEXT_ROW_BROADCAST } }),
        block('motion_sety', { inputs: { Y: number(rowY()) } })
      ],
      [
        block('event_whenbroadcastreceived', { fields: { BROADCAST_OPTION: WIN_BROADCAST } }),
        block('looks_hide')
      ],
      [
        block('event_whenbroadcastreceived', { fields: { BROADCAST_OPTION: LOSE_BROADCAST } }),
        block('looks_hide')
      ]
    ),
    currentCostume: 0,
    costumes: [
      svgCostume('arrow', '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="14"><path d="M0 0 L12 7 L0 14 Z" fill="#5f5e5a"/></svg>', 6, 7)
    ],
    sounds: [], volume: 100, layerOrder: 4, visible: false, x: 0, y: 0, size: 100, direction: 90, draggable: false, rotationStyle: 'all around'
  };
}
