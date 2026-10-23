import { block, buildBlocks, svgCostume } from '../blocks.js';
import { NEW_GAME_BROADCAST, PEG_COLOURS } from '../shared.js';

export function thumbnailSprite() {
  const CODE = [5, 1, 3, 2];
  const GUESSES = [[5, 1, 3, 2], [5, 1, 2, 3], [5, 2, 6, 1], [3, 4, 1, 6]];

  function score(guess) {
    const codeLeft = [];
    const guessLeft = [];
    let black = 0;
    guess.forEach((colour, index) => {
      if (colour === CODE[index]) {
        black++;
      } else {
        codeLeft.push(CODE[index]);
        guessLeft.push(colour);
      }
    });
    let white = 0;
    for (const colour of guessLeft) {
      const index = codeLeft.indexOf(colour);
      if (index >= 0) {
        white++;
        codeLeft.splice(index, 1);
      }
    }
    return { black, white };
  }

  function circle(x, y, diameter, fill) {
    return `<circle cx="${x}" cy="${y}" r="${diameter / 2}" fill="${fill}"/>`;
  }

  function row(guess, y) {
    const pegs = guess.map((colour, index) => circle(13 + 32 * index, y, 22, PEG_COLOURS[colour - 1].fill));
    const { black, white } = score(guess);
    const feedback = [141, 153, 141, 153].map((x, slot) => {
      const slotY = y + (slot < 2 ? -6 : 6);
      if (slot < black) return circle(x, slotY, 10, '#2c2c2a');
      if (slot < black + white) return circle(x, slotY, 10, '#ffffff');
      return circle(x, slotY, 8, '#b4b2a9');
    });
    return [...pegs, ...feedback].join('');
  }

  const rows = GUESSES.map((guess, index) => row(guess, 12 + 32 * index)).join('');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="480" height="360"><rect width="480" height="360" fill="#f4f1ea"/><g transform="scale(3)">${rows}</g></svg>`;

  return {
    isStage: false, name: 'Thumbnail', variables: {}, lists: {}, broadcasts: {}, comments: {},
    blocks: buildBlocks(
      [
        block('event_whenbroadcastreceived', { fields: { BROADCAST_OPTION: NEW_GAME_BROADCAST } }),
        block('looks_hide')
      ]
    ),
    currentCostume: 0,
    costumes: [
      svgCostume('thumbnail', svg, 240, 180)
    ],
    sounds: [], volume: 100, layerOrder: 14, visible: true, x: 0, y: 0, size: 100, direction: 90, draggable: false, rotationStyle: 'all around'
  };
}
