import { number, block, buildBlocks, svgCostume } from '../blocks.js';
import { WIN_BROADCAST } from '../shared.js';

export function bannerSprite() {
  return {
    isStage: false, name: 'Banner', variables: {}, lists: {}, broadcasts: {}, comments: {},
    blocks: buildBlocks(
      [
        block('event_whenflagclicked'),
        block('looks_hide'),
        block('motion_gotoxy', { inputs: { X: number(165), Y: number(0) } })
      ],
      [
        block('event_whenbroadcastreceived', { fields: { BROADCAST_OPTION: WIN_BROADCAST } }),
        block('looks_show')
      ]
    ),
    currentCostume: 0,
    costumes: [
      svgCostume('win', '<svg xmlns="http://www.w3.org/2000/svg" width="120" height="40"><rect width="120" height="40" rx="8" fill="#3b6d11"/><text x="60" y="26" font-family="Sans Serif" font-size="18" fill="#ffffff" text-anchor="middle">You win!</text></svg>', 60, 20)
    ],
    sounds: [], volume: 100, layerOrder: 9, visible: false, x: 0, y: 0, size: 100, direction: 90, draggable: false, rotationStyle: 'all around'
  };
}
