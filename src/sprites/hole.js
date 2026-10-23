import { number, costume, cloneOf, defineProcedure, callProcedure, block, buildScripts, circleCostume } from '../blocks.js';
import { NEW_GAME_BROADCAST } from '../shared.js';

export function holeSprite() {
  return {
    isStage: false, name: 'Hole', variables: {}, lists: {}, broadcasts: {},
    ...buildScripts(
      [
        block('event_whenbroadcastreceived', { fields: { BROADCAST_OPTION: NEW_GAME_BROADCAST } }),
        block('control_delete_this_clone'),
        block('looks_hide'),
        callProcedure('draw board')
      ],
      [
        defineProcedure('draw board'),
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
        block('control_start_as_clone'),
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
