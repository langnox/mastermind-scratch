import { svgCostume } from '../blocks.js';
import { COLOURS_LIST, CODE_LIST } from '../shared.js';

export function stageTarget() {
  return {
    isStage: true, name: 'Stage', variables: {}, broadcasts: {}, blocks: {}, comments: {},
    lists: {
      [COLOURS_LIST[1]]: [COLOURS_LIST[0], ['#e24b4a', '#f39c33', '#f2d43a', '#5ba84a', '#378add', '#7f77dd']],
      [CODE_LIST[1]]: [CODE_LIST[0], []]
    },
    currentCostume: 0,
    costumes: [
      svgCostume('backdrop', '<svg xmlns="http://www.w3.org/2000/svg" width="480" height="360"><rect width="480" height="360" fill="#f4f1ea"/></svg>', 240, 180)
    ],
    sounds: [], volume: 100, layerOrder: 0, tempo: 60, videoTransparency: 50, videoState: 'on', textToSpeechLanguage: null
  };
}
