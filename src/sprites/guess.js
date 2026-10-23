import { number, costume, block, buildBlocks } from '../blocks.js';
import { GUESS_LIST, ROW_VARIABLE, guessLength, pegCostumes } from '../shared.js';

export function guessSprite() {
  function row() {
    return block('data_variable', { fields: { VARIABLE: ROW_VARIABLE } });
  }

  return {
    isStage: false, name: 'Guess', variables: {}, lists: {}, broadcasts: {}, comments: {},
    blocks: buildBlocks(
      [
        block('event_whenflagclicked'),
        block('looks_hide')
      ],
      [
        block('control_start_as_clone'),
        block('looks_switchcostumeto', {
          inputs: { COSTUME: costume(block('data_itemoflist', { inputs: { INDEX: number(guessLength()) }, fields: { LIST: GUESS_LIST } })) }
        }),
        block('motion_gotoxy', {
          inputs: {
            X: number(block('operator_add', { inputs: { NUM1: number(-96), NUM2: number(block('operator_multiply', { inputs: { NUM1: number(32), NUM2: number(guessLength()) } })) } })),
            Y: number(block('operator_add', { inputs: { NUM1: number(-192), NUM2: number(block('operator_multiply', { inputs: { NUM1: number(32), NUM2: number(row()) } })) } }))
          }
        }),
        block('looks_show')
      ]
    ),
    currentCostume: 0,
    costumes: pegCostumes(),
    sounds: [], volume: 100, layerOrder: 5, visible: false, x: 0, y: 0, size: 100, direction: 90, draggable: false, rotationStyle: 'all around'
  };
}
