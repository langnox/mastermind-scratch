import { number, text, color, block, buildBlocks, svgCostume } from '../blocks.js';
import { COLOURS_LIST, CODE_LIST } from '../shared.js';

export function boardSprite() {
  const PEG_VARIABLE = ['peg', 'peg-variable'];

  return {
    isStage: false, name: 'Board', lists: {}, broadcasts: {}, comments: {},
    variables: {
      [PEG_VARIABLE[1]]: [PEG_VARIABLE[0], 0]
    },
    blocks: buildBlocks(
      [
        block('event_whenflagclicked'),
        block('looks_hide'),
        block('pen_clear'),
        block('pen_setPenColorToColor', { inputs: { COLOR: color('#5f5e5a') } }),
        block('motion_gotoxy', { inputs: { X: number(-64), Y: number(128) } }),
        block('control_repeat', {
          inputs: { TIMES: number(10) },
          substack: [
            block('pen_setPenSizeTo', { inputs: { SIZE: number(22) } }),
            block('control_repeat', {
              inputs: { TIMES: number(4) },
              substack: [
                block('pen_penDown'),
                block('pen_penUp'),
                block('motion_changexby', { inputs: { DX: number(32) } })
              ]
            }),
            block('pen_setPenSizeTo', { inputs: { SIZE: number(8) } }),
            block('motion_changeyby', { inputs: { DY: number(6) } }),
            block('control_repeat', {
              inputs: { TIMES: number(2) },
              substack: [
                block('control_repeat', {
                  inputs: { TIMES: number(2) },
                  substack: [
                    block('pen_penDown'),
                    block('pen_penUp'),
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
        }),
        block('data_deletealloflist', { fields: { LIST: CODE_LIST } }),
        block('pen_setPenSizeTo', { inputs: { SIZE: number(22) } }),
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
            block('pen_setPenColorToColor', {
              inputs: {
                COLOR: color(block('data_itemoflist', {
                  inputs: { INDEX: number(block('data_variable', { fields: { VARIABLE: PEG_VARIABLE } })) },
                  fields: { LIST: COLOURS_LIST }
                }))
              }
            }),
            block('pen_penDown'),
            block('pen_penUp'),
            block('motion_changexby', { inputs: { DX: number(32) } })
          ]
        })
      ]
    ),
    currentCostume: 0,
    costumes: [
      svgCostume('blank', '<svg xmlns="http://www.w3.org/2000/svg" width="2" height="2"/>', 1, 1)
    ],
    sounds: [], volume: 100, layerOrder: 1, visible: true, x: 0, y: 0, size: 100, direction: 90, draggable: false, rotationStyle: 'all around'
  };
}
