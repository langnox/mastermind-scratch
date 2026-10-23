import { stageTarget } from './sprites/stage.js';
import { holeSprite } from './sprites/hole.js';
import { pegSprite } from './sprites/peg.js';
import { paletteSprite } from './sprites/palette.js';
import { markerSprite } from './sprites/marker.js';
import { guessSprite } from './sprites/guess.js';
import { checkSprite } from './sprites/check.js';
import { undoSprite } from './sprites/undo.js';
import { feedbackSprite } from './sprites/feedback.js';
import { bannerSprite } from './sprites/banner.js';
import { newGameSprite } from './sprites/new-game.js';
import { yesSprite } from './sprites/yes.js';
import { noSprite } from './sprites/no.js';
import { coverSprite } from './sprites/cover.js';
import { thumbnailSprite } from './sprites/thumbnail.js';

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
    feedbackSprite(),
    bannerSprite(),
    newGameSprite(),
    yesSprite(),
    noSprite(),
    coverSprite(),
    thumbnailSprite()
  ],
  monitors: [], extensions: [],
  meta: { semver: '3.0.0', vm: '0.2.0', agent: '' }
};
