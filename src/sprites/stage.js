import { svgCostume } from '../blocks.js';

export function stageTarget() {
  return {
    isStage: true, name: 'Stage', variables: {}, lists: {}, broadcasts: {}, blocks: {}, comments: {},
    currentCostume: 0,
    costumes: [
      svgCostume('backdrop', '<svg xmlns="http://www.w3.org/2000/svg" width="480" height="360"><rect width="480" height="360" fill="#f4f1ea"/></svg>', 240, 180)
    ],
    sounds: [], volume: 100, layerOrder: 0, tempo: 60, videoTransparency: 50, videoState: 'on', textToSpeechLanguage: null
  };
}
