import { number, text, condition, block, buildBlocks, svgCostume } from '../blocks.js';
import { NEXT_ROW_BROADCAST, WIN_BROADCAST, row, rowY } from '../shared.js';

export function markerSprite() {
  return {
    isStage: false, name: 'Marker', variables: {}, lists: {}, broadcasts: {}, comments: {},
    blocks: buildBlocks(
      [
        block('event_whenflagclicked'),
        block('motion_gotoxy', { inputs: { X: number(-92), Y: number(-160) } }),
        block('looks_show')
      ],
      [
        block('event_whenbroadcastreceived', { fields: { BROADCAST_OPTION: NEXT_ROW_BROADCAST } }),
        block('control_if_else', {
          inputs: { CONDITION: condition(block('operator_lt', { inputs: { OPERAND1: text(row()), OPERAND2: text(11) } })) },
          substack: [
            block('motion_sety', { inputs: { Y: number(rowY()) } })
          ],
          substack2: [
            block('looks_hide')
          ]
        })
      ],
      [
        block('event_whenbroadcastreceived', { fields: { BROADCAST_OPTION: WIN_BROADCAST } }),
        block('looks_hide')
      ]
    ),
    currentCostume: 0,
    costumes: [
      svgCostume('arrow', '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="14"><path d="M0 0 L12 7 L0 14 Z" fill="#5f5e5a"/></svg>', 6, 7)
    ],
    sounds: [], volume: 100, layerOrder: 4, visible: false, x: 0, y: 0, size: 100, direction: 90, draggable: false, rotationStyle: 'all around'
  };
}
