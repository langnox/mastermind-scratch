import { number, text, costume, cloneOf, defineProcedure, callProcedure, block, buildScripts } from '../blocks.js';
import { CODE_LIST, NEW_GAME_BROADCAST, pegCostumes, isCloneVariable, deleteIfClone } from '../shared.js';

export function pegSprite() {
  const PEG_VARIABLE = ['peg', 'peg-variable'];
  const IS_CLONE_VARIABLE = isCloneVariable('peg');

  return {
    isStage: false, name: 'Peg', lists: {}, broadcasts: {},
    variables: {
      [PEG_VARIABLE[1]]: [PEG_VARIABLE[0], 0],
      [IS_CLONE_VARIABLE[1]]: [IS_CLONE_VARIABLE[0], 0]
    },
    ...buildScripts(
      [
        block('event_whenbroadcastreceived', { fields: { BROADCAST_OPTION: NEW_GAME_BROADCAST }, y: 0 }),
        deleteIfClone(IS_CLONE_VARIABLE),
        block('looks_hide'),
        callProcedure('pick code')
      ],
      [
        defineProcedure('pick code', { comment: 'Picks four random colours, repeats allowed, into the ‘code’ list, and leaves a clone with the matching costume for each one above the board. The Cover hides them until the game ends.', y: 355, commentX: 441 }),
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
        block('control_start_as_clone', { y: 905 }),
        block('data_setvariableto', { inputs: { VALUE: text(1) }, fields: { VARIABLE: IS_CLONE_VARIABLE } }),
        block('looks_show')
      ]
    ),
    currentCostume: 0,
    costumes: pegCostumes(),
    sounds: [], volume: 100, layerOrder: 2, visible: false, x: 0, y: 0, size: 100, direction: 90, draggable: false, rotationStyle: 'all around'
  };
}
