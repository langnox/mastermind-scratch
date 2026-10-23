import { number, text, variable, condition, costume, block, buildScripts } from '../blocks.js';
import { GUESS_LIST, UNDO_BROADCAST, NEW_GAME_BROADCAST, PLACED_VARIABLE, guessLength, row, rowY, pegCostumes, isCloneVariable, deleteIfClone } from '../shared.js';

export function guessSprite() {
  const MY_INDEX_VARIABLE = ['my index', 'my-index-variable'];
  const MY_ROW_VARIABLE = ['my row', 'my-row-variable'];
  const IS_CLONE_VARIABLE = isCloneVariable('guess');

  function myIndex() {
    return block('data_variable', { fields: { VARIABLE: MY_INDEX_VARIABLE } });
  }

  function myRow() {
    return block('data_variable', { fields: { VARIABLE: MY_ROW_VARIABLE } });
  }

  return {
    isStage: false, name: 'Guess', lists: {}, broadcasts: {},
    variables: {
      [MY_INDEX_VARIABLE[1]]: [MY_INDEX_VARIABLE[0], 0],
      [MY_ROW_VARIABLE[1]]: [MY_ROW_VARIABLE[0], 0],
      [IS_CLONE_VARIABLE[1]]: [IS_CLONE_VARIABLE[0], 0]
    },
    ...buildScripts(
      [
        block('event_whenbroadcastreceived', { fields: { BROADCAST_OPTION: NEW_GAME_BROADCAST }, y: 0 }),
        deleteIfClone(IS_CLONE_VARIABLE),
        block('looks_hide')
      ],
      [
        block('control_start_as_clone', { comment: 'Takes the next slot from the ‘placed’ counter rather than from the guess length, so pegs entered in the same frame still land in separate holes. It remembers its slot and row for undo.', y: 307, commentX: 764 }),
        block('data_setvariableto', { inputs: { VALUE: text(1) }, fields: { VARIABLE: IS_CLONE_VARIABLE } }),
        block('data_changevariableby', { inputs: { VALUE: number(1) }, fields: { VARIABLE: PLACED_VARIABLE } }),
        block('data_setvariableto', { inputs: { VALUE: text(variable(PLACED_VARIABLE)) }, fields: { VARIABLE: MY_INDEX_VARIABLE } }),
        block('data_setvariableto', { inputs: { VALUE: text(row()) }, fields: { VARIABLE: MY_ROW_VARIABLE } }),
        block('looks_switchcostumeto', {
          inputs: { COSTUME: costume(block('data_itemoflist', { inputs: { INDEX: number(myIndex()) }, fields: { LIST: GUESS_LIST } })) }
        }),
        block('motion_gotoxy', {
          inputs: {
            X: number(block('operator_add', { inputs: { NUM1: number(-96), NUM2: number(block('operator_multiply', { inputs: { NUM1: number(32), NUM2: number(myIndex()) } })) } })),
            Y: number(rowY())
          }
        }),
        block('looks_show')
      ],
      [
        block('event_whenbroadcastreceived', { fields: { BROADCAST_OPTION: UNDO_BROADCAST }, comment: 'Only the peg beyond the end of the shortened guess, in the current row, deletes itself.', y: 792, commentX: 764 }),
        block('control_if', {
          inputs: {
            CONDITION: condition(block('operator_and', {
              inputs: {
                OPERAND1: condition(block('operator_equals', { inputs: { OPERAND1: text(myRow()), OPERAND2: text(row()) } })),
                OPERAND2: condition(block('operator_gt', { inputs: { OPERAND1: text(myIndex()), OPERAND2: text(guessLength()) } }))
              }
            }))
          },
          substack: [
            block('control_delete_this_clone')
          ]
        })
      ]
    ),
    currentCostume: 0,
    costumes: pegCostumes(),
    sounds: [], volume: 100, layerOrder: 5, visible: false, x: 0, y: 0, size: 100, direction: 90, draggable: false, rotationStyle: 'all around'
  };
}
