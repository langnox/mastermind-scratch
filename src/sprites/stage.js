import { text, block, buildBlocks, svgCostume } from '../blocks.js';
import { CODE_LIST, GUESS_LIST, ROW_VARIABLE, NEXT_ROW_BROADCAST, UNDO_BROADCAST, SCORE_BROADCAST, WIN_BROADCAST, PLAYING_VARIABLE, BLACK_VARIABLE, WHITE_VARIABLE } from '../shared.js';

export function stageTarget() {
  return {
    isStage: true, name: 'Stage', comments: {},
    broadcasts: {
      [NEXT_ROW_BROADCAST[1]]: NEXT_ROW_BROADCAST[0],
      [UNDO_BROADCAST[1]]: UNDO_BROADCAST[0],
      [SCORE_BROADCAST[1]]: SCORE_BROADCAST[0],
      [WIN_BROADCAST[1]]: WIN_BROADCAST[0]
    },
    variables: {
      [ROW_VARIABLE[1]]: [ROW_VARIABLE[0], 1],
      [PLAYING_VARIABLE[1]]: [PLAYING_VARIABLE[0], 1],
      [BLACK_VARIABLE[1]]: [BLACK_VARIABLE[0], 0],
      [WHITE_VARIABLE[1]]: [WHITE_VARIABLE[0], 0]
    },
    lists: {
      [CODE_LIST[1]]: [CODE_LIST[0], []],
      [GUESS_LIST[1]]: [GUESS_LIST[0], []]
    },
    blocks: buildBlocks(
      [
        block('event_whenflagclicked'),
        block('data_setvariableto', { inputs: { VALUE: text(1) }, fields: { VARIABLE: ROW_VARIABLE } }),
        block('data_setvariableto', { inputs: { VALUE: text(1) }, fields: { VARIABLE: PLAYING_VARIABLE } }),
        block('data_deletealloflist', { fields: { LIST: GUESS_LIST } })
      ]
    ),
    currentCostume: 0,
    costumes: [
      svgCostume('backdrop', '<svg xmlns="http://www.w3.org/2000/svg" width="480" height="360"><rect width="480" height="360" fill="#f4f1ea"/></svg>', 240, 180)
    ],
    sounds: [], volume: 100, layerOrder: 0, tempo: 60, videoTransparency: 50, videoState: 'on', textToSpeechLanguage: null
  };
}
