import { stageTarget } from './sprites/stage.js';
import { holeSprite } from './sprites/hole.js';
import { pegSprite } from './sprites/peg.js';

export const PROJECT = {
  targets: [
    stageTarget(),
    holeSprite(),
    pegSprite()
  ],
  monitors: [], extensions: [],
  meta: { semver: '3.0.0', vm: '0.2.0', agent: '' }
};
