export function number(value) {
  return [1, [4, String(value)]];
}

export function color(value) {
  return [1, [9, value]];
}

export function block(opcode, { inputs = {}, fields = {}, substack } = {}) {
  return { opcode, inputs, fields, substack };
}

export function buildBlocks(...scripts) {
  const blocks = {};
  let nextId = 1;

  function addStack(stack, parentId) {
    let firstId = null;
    let previousId = null;
    for (const { opcode, inputs, fields, substack } of stack) {
      const id = String(nextId++);
      blocks[id] = { opcode, next: null, parent: previousId ?? parentId, inputs: { ...inputs }, fields, shadow: false, topLevel: false };
      if (substack) {
        blocks[id].inputs.SUBSTACK = [2, addStack(substack, id)];
      }
      if (previousId) {
        blocks[previousId].next = id;
      } else {
        firstId = id;
      }
      previousId = id;
    }
    return firstId;
  }

  scripts.forEach((script, index) => {
    const id = addStack(script, null);
    Object.assign(blocks[id], { topLevel: true, x: 0, y: index * 200 });
  });
  return blocks;
}

export const ASSETS = [];

export function svgCostume(name, svg, rotationCenterX, rotationCenterY) {
  const assetId = String(ASSETS.length + 1).padStart(32, '0');
  ASSETS.push({ assetId, svg });
  return { name, dataFormat: 'svg', assetId, md5ext: assetId + '.svg', rotationCenterX, rotationCenterY };
}
