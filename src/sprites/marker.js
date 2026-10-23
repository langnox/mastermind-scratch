import { number, block, buildBlocks, svgCostume } from '../blocks.js';

export function markerSprite() {
  return {
    isStage: false, name: 'Marker', variables: {}, lists: {}, broadcasts: {}, comments: {},
    blocks: buildBlocks(
      [
        block('event_whenflagclicked'),
        block('motion_gotoxy', { inputs: { X: number(-92), Y: number(-160) } }),
        block('looks_show')
      ]
    ),
    currentCostume: 0,
    costumes: [
      svgCostume('arrow', '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="14"><path d="M0 0 L12 7 L0 14 Z" fill="#5f5e5a"/></svg>', 6, 7)
    ],
    sounds: [], volume: 100, layerOrder: 4, visible: false, x: 0, y: 0, size: 100, direction: 90, draggable: false, rotationStyle: 'all around'
  };
}
