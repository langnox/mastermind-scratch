import { number, text, costume, cloneOf, defineProcedure, callProcedure, block, buildBlocks } from '../blocks.js';
import { CODE_LIST, pegCostumes } from '../shared.js';

export function pegSprite() {
  const PEG_VARIABLE = ['peg', 'peg-variable'];

  return {
    isStage: false, name: 'Peg', lists: {}, broadcasts: {}, comments: {},
    variables: {
      [PEG_VARIABLE[1]]: [PEG_VARIABLE[0], 0]
    },
    blocks: buildBlocks(
      [
        block('event_whenflagclicked'),
        block('looks_hide'),
        callProcedure('pick code')
      ],
      [
        defineProcedure('pick code'),
        block('data_deletealloflist', { fields: { LIST: CODE_LIST } }),
        block('motion_gotoxy', { inputs: { X: number(-64), Y: number(164) } }),
        block('control_repeat', {
          inputs: { TIMES: number(4) },
          substack: [
            block('data_setvariableto', {
              inputs: { VALUE: text(block('operator_random', { inputs: { FROM: number(1), TO: number(6) } })) },
              fields: { VARIABLE: PEG_VARIABLE }
            }),
            block('data_addtolist', {
              inputs: { ITEM: text(block('data_variable', { fields: { VARIABLE: PEG_VARIABLE } })) },
              fields: { LIST: CODE_LIST }
            }),
            block('looks_switchcostumeto', {
              inputs: { COSTUME: costume(block('data_variable', { fields: { VARIABLE: PEG_VARIABLE } })) }
            }),
            block('control_create_clone_of', { inputs: { CLONE_OPTION: cloneOf('_myself_') } }),
            block('motion_changexby', { inputs: { DX: number(32) } })
          ]
        })
      ],
      [
        block('control_start_as_clone'),
        block('looks_show')
      ]
    ),
    currentCostume: 0,
    costumes: pegCostumes(),
    sounds: [], volume: 100, layerOrder: 2, visible: false, x: 0, y: 0, size: 100, direction: 90, draggable: false, rotationStyle: 'all around'
  };
}
