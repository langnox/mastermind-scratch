import { number, text, variable, condition, costume, cloneOf, defineProcedure, callProcedure, block, buildBlocks } from '../blocks.js';
import { GUESS_LIST, PLAYING_VARIABLE, guessLength, pegCostumes } from '../shared.js';

export function paletteSprite() {
  return {
    isStage: false, name: 'Palette', variables: {}, lists: {}, broadcasts: {}, comments: {},
    blocks: buildBlocks(
      [
        block('event_whenflagclicked'),
        block('looks_hide'),
        callProcedure('show palette')
      ],
      [
        defineProcedure('show palette'),
        block('motion_gotoxy', { inputs: { X: number(-150), Y: number(80) } }),
        block('looks_switchcostumeto', { inputs: { COSTUME: costume('red') } }),
        block('control_repeat', {
          inputs: { TIMES: number(6) },
          substack: [
            block('control_create_clone_of', { inputs: { CLONE_OPTION: cloneOf('_myself_') } }),
            block('looks_nextcostume'),
            block('motion_changeyby', { inputs: { DY: number(-32) } })
          ]
        })
      ],
      [
        block('control_start_as_clone'),
        block('looks_show')
      ],
      [
        block('event_whenthisspriteclicked'),
        block('control_if', {
          inputs: {
            CONDITION: condition(block('operator_and', {
              inputs: {
                OPERAND1: condition(block('operator_lt', { inputs: { OPERAND1: text(guessLength()), OPERAND2: text(4) } })),
                OPERAND2: condition(block('operator_equals', { inputs: { OPERAND1: text(variable(PLAYING_VARIABLE)), OPERAND2: text(1) } }))
              }
            }))
          },
          substack: [
            block('data_addtolist', {
              inputs: { ITEM: text(block('looks_costumenumbername', { fields: { NUMBER_NAME: ['number', null] } })) },
              fields: { LIST: GUESS_LIST }
            }),
            block('control_create_clone_of', { inputs: { CLONE_OPTION: cloneOf('Guess') } })
          ]
        })
      ]
    ),
    currentCostume: 0,
    costumes: pegCostumes(),
    sounds: [], volume: 100, layerOrder: 3, visible: false, x: 0, y: 0, size: 100, direction: 90, draggable: false, rotationStyle: 'all around'
  };
}
