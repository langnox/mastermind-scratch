import { number, text, variable, condition, costume, cloneOf, defineProcedure, callProcedure, whenKeyPressed, block, buildScripts, svgCostume } from '../blocks.js';
import { GUESS_LIST, NEW_GAME_BROADCAST, CONFIRM_NEW_GAME_BROADCAST, CANCEL_NEW_GAME_BROADCAST, PLAYING_VARIABLE, guessLength, notConfirming, pressedAtVariable, markPressed, sizeCue, PEG_COLOURS } from '../shared.js';

export function paletteSprite() {
  const PALETTE_IS_CLONE_VARIABLE = ['is clone', 'palette-is-clone-variable'];
  const PALETTE_PRESSED_AT = pressedAtVariable('palette');

  function paletteCostumes() {
    return PEG_COLOURS.map(({ name, fill }) => {
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="44" height="22"><text x="6" y="16" font-family="Sans Serif" font-size="14" fill="#5f5e5a" text-anchor="middle">${name[0].toUpperCase()}</text><circle cx="33" cy="11" r="11" fill="${fill}"/></svg>`;
      return svgCostume(name, svg, 33, 11);
    });
  }

  return {
    isStage: false, name: 'Palette', lists: {}, broadcasts: {},
    variables: {
      [PALETTE_IS_CLONE_VARIABLE[1]]: [PALETTE_IS_CLONE_VARIABLE[0], 0],
      [PALETTE_PRESSED_AT[1]]: [PALETTE_PRESSED_AT[0], 0]
    },
    ...buildScripts(
      [
        block('event_whenbroadcastreceived', { fields: { BROADCAST_OPTION: NEW_GAME_BROADCAST } }),
        block('control_delete_this_clone'),
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
        block('control_start_as_clone', { comment: 'Grows while hovered and shrinks briefly after use. It’s timed from ‘pressed at’, so fast repeated keys are never ignored.' }),
        block('data_setvariableto', { inputs: { VALUE: text(1) }, fields: { VARIABLE: PALETTE_IS_CLONE_VARIABLE } }),
        block('looks_show'),
        block('control_forever', { substack: [sizeCue(PALETTE_PRESSED_AT)] })
      ],
      [
        block('event_whenbroadcastreceived', { fields: { BROADCAST_OPTION: CONFIRM_NEW_GAME_BROADCAST } }),
        block('looks_hide')
      ],
      [
        block('event_whenbroadcastreceived', { fields: { BROADCAST_OPTION: CANCEL_NEW_GAME_BROADCAST }, comment: 'Only the clones come back after ‘No’. The original sprite stays hidden.' }),
        block('control_if', {
          inputs: { CONDITION: condition(block('operator_equals', { inputs: { OPERAND1: text(variable(PALETTE_IS_CLONE_VARIABLE)), OPERAND2: text(1) } })) },
          substack: [
            block('looks_show')
          ]
        })
      ],
      [
        block('event_whenthisspriteclicked'),
        callProcedure('place peg')
      ],
      ...PEG_COLOURS.map(({ name }, index) => [
        whenKeyPressed(name[0], { comment: index === 0 ? 'Every palette clone hears every key. Only the clone whose costume matches the key’s colour places a peg, and the hidden original is skipped through ‘is clone’.' : undefined }),
        block('control_if', {
          inputs: {
            CONDITION: condition(block('operator_and', {
              inputs: {
                OPERAND1: condition(block('operator_equals', { inputs: { OPERAND1: text(variable(PALETTE_IS_CLONE_VARIABLE)), OPERAND2: text(1) } })),
                OPERAND2: condition(block('operator_equals', {
                  inputs: { OPERAND1: text(block('looks_costumenumbername', { fields: { NUMBER_NAME: ['name', null] } })), OPERAND2: text(name) }
                }))
              }
            }))
          },
          substack: [
            callProcedure('place peg')
          ]
        })
      ]),
      [
        defineProcedure('place peg', { comment: 'Adds this colour to the guess and makes a Guess clone, which takes the next hole. Refused when the row is full, the game is over, or a confirmation is open.' }),
        block('control_if', {
          inputs: {
            CONDITION: condition(block('operator_and', {
              inputs: {
                OPERAND1: condition(block('operator_lt', { inputs: { OPERAND1: text(guessLength()), OPERAND2: text(4) } })),
                OPERAND2: condition(block('operator_and', {
                  inputs: {
                    OPERAND1: condition(block('operator_equals', { inputs: { OPERAND1: text(variable(PLAYING_VARIABLE)), OPERAND2: text(1) } })),
                    OPERAND2: condition(notConfirming())
                  }
                }))
              }
            }))
          },
          substack: [
            markPressed(PALETTE_PRESSED_AT),
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
    costumes: paletteCostumes(),
    sounds: [], volume: 100, layerOrder: 3, visible: false, x: 0, y: 0, size: 100, direction: 90, draggable: false, rotationStyle: 'all around'
  };
}
