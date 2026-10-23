import { number, text, block, buildBlocks, svgCostume } from '../blocks.js';

export function pegSprite() {
  return {
    isStage: false, name: 'Peg', variables: {}, lists: {}, broadcasts: {}, comments: {},
    blocks: buildBlocks(
      [
        block('event_whenflagclicked'),
        block('looks_say', { inputs: { MESSAGE: text('Hello, Mastermind!') } })
      ],
      [
        block('event_whenthisspriteclicked'),
        block('looks_changeeffectby', { inputs: { CHANGE: number(25) }, fields: { EFFECT: ['COLOR', null] } })
      ]
    ),
    currentCostume: 0,
    costumes: [
      svgCostume('peg', '<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80"><circle cx="40" cy="40" r="36" fill="#d85a30" stroke="#712b13" stroke-width="4"/></svg>', 40, 40)
    ],
    sounds: [], volume: 100, layerOrder: 1, visible: true, x: 0, y: 0, size: 100, direction: 90, draggable: false, rotationStyle: 'all around'
  };
}
