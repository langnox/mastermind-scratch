import { number, costume, block, buildBlocks, svgCostume } from '../blocks.js';
import { WIN_BROADCAST, LOSE_BROADCAST } from '../shared.js';

export function bannerSprite() {
  function bannerCostume(name, label, fill) {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="40"><rect width="120" height="40" rx="8" fill="${fill}"/><text x="60" y="26" font-family="Sans Serif" font-size="18" fill="#ffffff" text-anchor="middle">${label}</text></svg>`;
    return svgCostume(name, svg, 60, 20);
  }

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
        block('looks_switchcostumeto', { inputs: { COSTUME: costume('win') } }),
        block('looks_show')
      ],
      [
        block('event_whenbroadcastreceived', { fields: { BROADCAST_OPTION: LOSE_BROADCAST } }),
        block('looks_switchcostumeto', { inputs: { COSTUME: costume('lose') } }),
        block('looks_show')
      ]
    ),
    currentCostume: 0,
    costumes: [
      bannerCostume('win', 'You win!', '#3b6d11'),
      bannerCostume('lose', 'You lose', '#a32d2d')
    ],
    sounds: [], volume: 100, layerOrder: 9, visible: false, x: 0, y: 0, size: 100, direction: 90, draggable: false, rotationStyle: 'all around'
  };
}
