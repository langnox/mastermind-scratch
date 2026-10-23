import { svgCostume } from '../blocks.js';

export function pegSprite() {
  return {
    isStage: false, name: 'Peg', variables: {}, lists: {}, broadcasts: {}, comments: {},
    blocks: {
      flag: { opcode: 'event_whenflagclicked', next: 'say', parent: null, inputs: {}, fields: {}, shadow: false, topLevel: true, x: 0, y: 0 },
      say: { opcode: 'looks_say', next: null, parent: 'flag', inputs: { MESSAGE: [1, [10, 'Hello, Mastermind!']] }, fields: {}, shadow: false, topLevel: false },
      click: { opcode: 'event_whenthisspriteclicked', next: 'recolor', parent: null, inputs: {}, fields: {}, shadow: false, topLevel: true, x: 0, y: 200 },
      recolor: { opcode: 'looks_changeeffectby', next: null, parent: 'click', inputs: { CHANGE: [1, [4, '25']] }, fields: { EFFECT: ['COLOR', null] }, shadow: false, topLevel: false }
    },
    currentCostume: 0,
    costumes: [
      svgCostume('peg', '<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80"><circle cx="40" cy="40" r="36" fill="#d85a30" stroke="#712b13" stroke-width="4"/></svg>', 40, 40)
    ],
    sounds: [], volume: 100, layerOrder: 1, visible: true, x: 0, y: 0, size: 100, direction: 90, draggable: false, rotationStyle: 'all around'
  };
}
