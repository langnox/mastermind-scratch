import { number, text, costume, cloneOf, defineProcedure, callProcedure, block, buildScripts, circleCostume } from '../blocks.js';
import { NEW_GAME_BROADCAST, isCloneVariable, deleteIfClone } from '../shared.js';

export function holeSprite() {
  const IS_CLONE_VARIABLE = isCloneVariable('hole');

  return {
    isStage: false, name: 'Hole', lists: {}, broadcasts: {},
    variables: {
      [IS_CLONE_VARIABLE[1]]: [IS_CLONE_VARIABLE[0], 0]
    },
    ...buildScripts(
      [
        block('event_whenbroadcastreceived', { fields: { BROADCAST_OPTION: NEW_GAME_BROADCAST }, y: 0 }),
        deleteIfClone(IS_CLONE_VARIABLE),
        block('looks_hide'),
        callProcedure('draw board')
      ],
      [
        defineProcedure('draw board', { comment: 'Walks the board row by row, leaving a clone at each hole: four large code holes, then a 2×2 group of small feedback holes. Runs without screen refresh, so the whole board appears at once.', y: 355, commentX: 343 }),
        block('motion_gotoxy', { inputs: { X: number(-64), Y: number(128) } }),
        block('control_repeat', {
          inputs: { TIMES: number(10) },
          substack: [
            block('looks_switchcostumeto', { inputs: { COSTUME: costume('large') } }),
            block('control_repeat', {
              inputs: { TIMES: number(4) },
              substack: [
                block('control_create_clone_of', { inputs: { CLONE_OPTION: cloneOf('_myself_') } }),
                block('motion_changexby', { inputs: { DX: number(32) } })
              ]
            }),
            block('looks_switchcostumeto', { inputs: { COSTUME: costume('small') } }),
            block('motion_changeyby', { inputs: { DY: number(6) } }),
            block('control_repeat', {
              inputs: { TIMES: number(2) },
              substack: [
                block('control_repeat', {
                  inputs: { TIMES: number(2) },
                  substack: [
                    block('control_create_clone_of', { inputs: { CLONE_OPTION: cloneOf('_myself_') } }),
                    block('motion_changexby', { inputs: { DX: number(12) } })
                  ]
                }),
                block('motion_changexby', { inputs: { DX: number(-24) } }),
                block('motion_changeyby', { inputs: { DY: number(-12) } })
              ]
            }),
            block('motion_changeyby', { inputs: { DY: number(18) } }),
            block('motion_changeyby', { inputs: { DY: number(-32) } }),
            block('motion_setx', { inputs: { X: number(-64) } })
          ]
        })
      ],
      [
        block('control_start_as_clone', { y: 1431 }),
        block('data_setvariableto', { inputs: { VALUE: text(1) }, fields: { VARIABLE: IS_CLONE_VARIABLE } }),
        block('looks_show')
      ]
    ),
    currentCostume: 0,
    costumes: [
      circleCostume('large', 22, '#b4b2a9'),
      circleCostume('small', 8, '#b4b2a9')
    ],
    sounds: [], volume: 100, layerOrder: 1, visible: false, x: 0, y: 0, size: 100, direction: 90, draggable: false, rotationStyle: 'all around'
  };
}
