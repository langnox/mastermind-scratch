import { number, block, buildScripts, svgCostume } from '../blocks.js';
import { NEW_GAME_BROADCAST, WIN_BROADCAST, LOSE_BROADCAST } from '../shared.js';

export function coverSprite() {
  const marks = [16, 48, 80, 112].map(x => `<text x="${x}" y="21" font-family="Sans Serif" font-size="16" fill="#ffffff" text-anchor="middle">?</text>`).join('');

  return {
    isStage: false, name: 'Cover', variables: {}, lists: {}, broadcasts: {},
    ...buildScripts(
      [
        block('event_whenbroadcastreceived', { fields: { BROADCAST_OPTION: NEW_GAME_BROADCAST } }),
        block('motion_gotoxy', { inputs: { X: number(-16), Y: number(164) } }),
        block('looks_show')
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
      svgCostume('cover', `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="30"><rect width="128" height="30" rx="6" fill="#5f5e5a"/>${marks}</svg>`, 64, 15)
    ],
    sounds: [], volume: 100, layerOrder: 13, visible: false, x: 0, y: 0, size: 100, direction: 90, draggable: false, rotationStyle: 'all around'
  };
}
