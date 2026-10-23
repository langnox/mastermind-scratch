import { number, text, variable, itemOf, condition, costume, cloneOf, defineProcedure, callProcedure, block, buildBlocks, circleCostume } from '../blocks.js';
import { CODE_LIST, GUESS_LIST, SCORE_BROADCAST, BLACK_VARIABLE, WHITE_VARIABLE, rowY } from '../shared.js';

export function feedbackSprite() {
  const INDEX_VARIABLE = ['i', 'i-variable'];
  const IS_CLONE_VARIABLE = ['is clone', 'is-clone-variable'];
  const CODE_LEFT_LIST = ['code left', 'code-left-list'];
  const GUESS_LEFT_LIST = ['guess left', 'guess-left-list'];

  return {
    isStage: false, name: 'Feedback', broadcasts: {}, comments: {},
    variables: {
      [INDEX_VARIABLE[1]]: [INDEX_VARIABLE[0], 0],
      [IS_CLONE_VARIABLE[1]]: [IS_CLONE_VARIABLE[0], 0]
    },
    lists: {
      [CODE_LEFT_LIST[1]]: [CODE_LEFT_LIST[0], []],
      [GUESS_LEFT_LIST[1]]: [GUESS_LEFT_LIST[0], []]
    },
    blocks: buildBlocks(
      [
        block('event_whenflagclicked'),
        block('looks_hide')
      ],
      [
        block('control_start_as_clone'),
        block('data_setvariableto', { inputs: { VALUE: text(1) }, fields: { VARIABLE: IS_CLONE_VARIABLE } }),
        block('looks_show')
      ],
      [
        block('event_whenbroadcastreceived', { fields: { BROADCAST_OPTION: SCORE_BROADCAST } }),
        block('control_if', {
          inputs: { CONDITION: condition(block('operator_equals', { inputs: { OPERAND1: text(variable(IS_CLONE_VARIABLE)), OPERAND2: text(0) } })) },
          substack: [
            callProcedure('score guess'),
            callProcedure('show feedback')
          ]
        })
      ],
      [
        defineProcedure('score guess'),
        block('data_setvariableto', { inputs: { VALUE: text(0) }, fields: { VARIABLE: BLACK_VARIABLE } }),
        block('data_setvariableto', { inputs: { VALUE: text(0) }, fields: { VARIABLE: WHITE_VARIABLE } }),
        block('data_deletealloflist', { fields: { LIST: CODE_LEFT_LIST } }),
        block('data_deletealloflist', { fields: { LIST: GUESS_LEFT_LIST } }),
        block('data_setvariableto', { inputs: { VALUE: text(1) }, fields: { VARIABLE: INDEX_VARIABLE } }),
        block('control_repeat', {
          inputs: { TIMES: number(4) },
          substack: [
            block('control_if_else', {
              inputs: {
                CONDITION: condition(block('operator_equals', {
                  inputs: { OPERAND1: text(itemOf(variable(INDEX_VARIABLE), GUESS_LIST)), OPERAND2: text(itemOf(variable(INDEX_VARIABLE), CODE_LIST)) }
                }))
              },
              substack: [
                block('data_changevariableby', { inputs: { VALUE: number(1) }, fields: { VARIABLE: BLACK_VARIABLE } }),
                block('data_addtolist', { inputs: { ITEM: text(0) }, fields: { LIST: CODE_LEFT_LIST } }),
                block('data_addtolist', { inputs: { ITEM: text(-1) }, fields: { LIST: GUESS_LEFT_LIST } })
              ],
              substack2: [
                block('data_addtolist', { inputs: { ITEM: text(itemOf(variable(INDEX_VARIABLE), CODE_LIST)) }, fields: { LIST: CODE_LEFT_LIST } }),
                block('data_addtolist', { inputs: { ITEM: text(itemOf(variable(INDEX_VARIABLE), GUESS_LIST)) }, fields: { LIST: GUESS_LEFT_LIST } })
              ]
            }),
            block('data_changevariableby', { inputs: { VALUE: number(1) }, fields: { VARIABLE: INDEX_VARIABLE } })
          ]
        }),
        block('data_setvariableto', { inputs: { VALUE: text(1) }, fields: { VARIABLE: INDEX_VARIABLE } }),
        block('control_repeat', {
          inputs: { TIMES: number(4) },
          substack: [
            block('control_if', {
              inputs: {
                CONDITION: condition(block('data_listcontainsitem', {
                  inputs: { ITEM: text(itemOf(variable(INDEX_VARIABLE), GUESS_LEFT_LIST)) },
                  fields: { LIST: CODE_LEFT_LIST }
                }))
              },
              substack: [
                block('data_changevariableby', { inputs: { VALUE: number(1) }, fields: { VARIABLE: WHITE_VARIABLE } }),
                block('data_replaceitemoflist', {
                  inputs: {
                    INDEX: number(block('data_itemnumoflist', {
                      inputs: { ITEM: text(itemOf(variable(INDEX_VARIABLE), GUESS_LEFT_LIST)) },
                      fields: { LIST: CODE_LEFT_LIST }
                    })),
                    ITEM: text(0)
                  },
                  fields: { LIST: CODE_LEFT_LIST }
                })
              ]
            }),
            block('data_changevariableby', { inputs: { VALUE: number(1) }, fields: { VARIABLE: INDEX_VARIABLE } })
          ]
        })
      ],
      [
        defineProcedure('show feedback'),
        block('motion_gotoxy', {
          inputs: {
            X: number(64),
            Y: number(block('operator_add', { inputs: { NUM1: number(rowY()), NUM2: number(6) } }))
          }
        }),
        block('looks_switchcostumeto', { inputs: { COSTUME: costume('black') } }),
        block('control_repeat', {
          inputs: { TIMES: number(variable(BLACK_VARIABLE)) },
          substack: [
            block('control_create_clone_of', { inputs: { CLONE_OPTION: cloneOf('_myself_') } }),
            callProcedure('next slot')
          ]
        }),
        block('looks_switchcostumeto', { inputs: { COSTUME: costume('white') } }),
        block('control_repeat', {
          inputs: { TIMES: number(variable(WHITE_VARIABLE)) },
          substack: [
            block('control_create_clone_of', { inputs: { CLONE_OPTION: cloneOf('_myself_') } }),
            callProcedure('next slot')
          ]
        })
      ],
      [
        defineProcedure('next slot'),
        block('control_if_else', {
          inputs: { CONDITION: condition(block('operator_equals', { inputs: { OPERAND1: text(block('motion_xposition')), OPERAND2: text(64) } })) },
          substack: [
            block('motion_changexby', { inputs: { DX: number(12) } })
          ],
          substack2: [
            block('motion_setx', { inputs: { X: number(64) } }),
            block('motion_changeyby', { inputs: { DY: number(-12) } })
          ]
        })
      ]
    ),
    currentCostume: 0,
    costumes: [
      circleCostume('black', 10, '#2c2c2a'),
      circleCostume('white', 10, '#ffffff')
    ],
    sounds: [], volume: 100, layerOrder: 8, visible: false, x: 0, y: 0, size: 100, direction: 90, draggable: false, rotationStyle: 'all around'
  };
}
