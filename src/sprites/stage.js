import { text, message, block, buildScripts, svgCostume } from '../blocks.js';
import { CODE_LIST, GUESS_LIST, ROW_VARIABLE, NEXT_ROW_BROADCAST, UNDO_BROADCAST, NEW_GAME_BROADCAST, CONFIRM_NEW_GAME_BROADCAST, CANCEL_NEW_GAME_BROADCAST, SCORE_BROADCAST, WIN_BROADCAST, LOSE_BROADCAST, PLAYING_VARIABLE, CONFIRMING_VARIABLE, PLACED_VARIABLE, BLACK_VARIABLE, WHITE_VARIABLE } from '../shared.js';

export function stageTarget() {
  return {
    isStage: true, name: 'Stage',
    broadcasts: {
      [NEXT_ROW_BROADCAST[1]]: NEXT_ROW_BROADCAST[0],
      [UNDO_BROADCAST[1]]: UNDO_BROADCAST[0],
      [NEW_GAME_BROADCAST[1]]: NEW_GAME_BROADCAST[0],
      [CONFIRM_NEW_GAME_BROADCAST[1]]: CONFIRM_NEW_GAME_BROADCAST[0],
      [CANCEL_NEW_GAME_BROADCAST[1]]: CANCEL_NEW_GAME_BROADCAST[0],
      [SCORE_BROADCAST[1]]: SCORE_BROADCAST[0],
      [WIN_BROADCAST[1]]: WIN_BROADCAST[0],
      [LOSE_BROADCAST[1]]: LOSE_BROADCAST[0]
    },
    variables: {
      [ROW_VARIABLE[1]]: [ROW_VARIABLE[0], 1],
      [PLAYING_VARIABLE[1]]: [PLAYING_VARIABLE[0], 1],
      [CONFIRMING_VARIABLE[1]]: [CONFIRMING_VARIABLE[0], 0],
      [PLACED_VARIABLE[1]]: [PLACED_VARIABLE[0], 0],
      [BLACK_VARIABLE[1]]: [BLACK_VARIABLE[0], 0],
      [WHITE_VARIABLE[1]]: [WHITE_VARIABLE[0], 0]
    },
    lists: {
      [CODE_LIST[1]]: [CODE_LIST[0], []],
      [GUESS_LIST[1]]: [GUESS_LIST[0], []]
    },
    ...buildScripts(
      [
        block('event_whenflagclicked', { comment: 'The green flag only sends ‘new game’. All setup runs on that message, so the New game button can restart without the green flag.', y: 0, commentX: 347 }),
        block('event_broadcast', { inputs: { BROADCAST_INPUT: message(NEW_GAME_BROADCAST) } })
      ],
      [
        block('event_whenbroadcastreceived', { fields: { BROADCAST_OPTION: NEW_GAME_BROADCAST }, comment: 'Resets the shared game state: back to row 1, playing, no confirmation open, and an empty guess with nothing placed.', y: 225, commentX: 347 }),
        block('data_setvariableto', { inputs: { VALUE: text(1) }, fields: { VARIABLE: ROW_VARIABLE } }),
        block('data_setvariableto', { inputs: { VALUE: text(1) }, fields: { VARIABLE: PLAYING_VARIABLE } }),
        block('data_setvariableto', { inputs: { VALUE: text(0) }, fields: { VARIABLE: CONFIRMING_VARIABLE } }),
        block('data_deletealloflist', { fields: { LIST: GUESS_LIST } }),
        block('data_setvariableto', { inputs: { VALUE: text(0) }, fields: { VARIABLE: PLACED_VARIABLE } })
      ],
      [
        block('event_whenbroadcastreceived', { fields: { BROADCAST_OPTION: CONFIRM_NEW_GAME_BROADCAST }, comment: 'While ‘confirming’ is 1, the palette, Check, Undo and every key ignore input.', y: 598, commentX: 347 }),
        block('data_setvariableto', { inputs: { VALUE: text(1) }, fields: { VARIABLE: CONFIRMING_VARIABLE } })
      ],
      [
        block('event_whenbroadcastreceived', { fields: { BROADCAST_OPTION: CANCEL_NEW_GAME_BROADCAST }, y: 771 }),
        block('data_setvariableto', { inputs: { VALUE: text(0) }, fields: { VARIABLE: CONFIRMING_VARIABLE } })
      ]
    ),
    currentCostume: 0,
    costumes: [
      svgCostume('backdrop', '<svg xmlns="http://www.w3.org/2000/svg" width="480" height="360"><rect width="480" height="360" fill="#f4f1ea"/></svg>', 240, 180)
    ],
    sounds: [], volume: 100, layerOrder: 0, tempo: 60, videoTransparency: 50, videoState: 'on', textToSpeechLanguage: null
  };
}
