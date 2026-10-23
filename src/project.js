import { stageTarget } from './sprites/stage.js';
import { holeSprite } from './sprites/hole.js';
import { pegSprite } from './sprites/peg.js';
import { paletteSprite } from './sprites/palette.js';
import { markerSprite } from './sprites/marker.js';
import { guessSprite } from './sprites/guess.js';
import { checkSprite } from './sprites/check.js';
import { undoSprite } from './sprites/undo.js';
import { feedbackSprite } from './sprites/feedback.js';

export const PROJECT = {
  targets: [
    stageTarget(),
    holeSprite(),
    pegSprite(),
    paletteSprite(),
    markerSprite(),
    guessSprite(),
    checkSprite(),
    undoSprite(),
    feedbackSprite()
  ],
  monitors: [], extensions: [],
  meta: { semver: '3.0.0', vm: '0.2.0', agent: '' }
};
