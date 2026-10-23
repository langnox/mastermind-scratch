import { stageTarget } from './sprites/stage.js';
import { boardSprite } from './sprites/board.js';

export const PROJECT = {
  targets: [
    stageTarget(),
    boardSprite()
  ],
  monitors: [], extensions: ['pen'],
  meta: { semver: '3.0.0', vm: '0.2.0', agent: '' }
};
