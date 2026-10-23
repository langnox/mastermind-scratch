export function number(value) {
  return value.opcode ? [3, value, [4, '']] : [1, [4, String(value)]];
}

export function text(value) {
  return value.opcode ? [3, value, [10, '']] : [1, [10, String(value)]];
}

export function message([name, id]) {
  return [1, [11, name, id]];
}

export function condition(value) {
  return [2, value];
}

export function costume(value) {
  const menu = block('looks_costume', { fields: { COSTUME: [value.opcode ? '' : value, null] }, shadow: true });
  return value.opcode ? [3, value, menu] : [1, menu];
}

export function cloneOf(target) {
  return [1, block('control_create_clone_of_menu', { fields: { CLONE_OPTION: [target, null] }, shadow: true })];
}

export function defineProcedure(proccode) {
  const mutation = { tagName: 'mutation', children: [], proccode, argumentids: '[]', argumentnames: '[]', argumentdefaults: '[]', warp: 'true' };
  return block('procedures_definition', { inputs: { custom_block: [1, block('procedures_prototype', { shadow: true, mutation })] } });
}

export function callProcedure(proccode) {
  const mutation = { tagName: 'mutation', children: [], proccode, argumentids: '[]', warp: 'true' };
  return block('procedures_call', { mutation });
}

export function block(opcode, { inputs = {}, fields = {}, substack, substack2, shadow = false, mutation } = {}) {
  return { opcode, inputs, fields, substack, substack2, shadow, mutation };
}

export function buildBlocks(...scripts) {
  const blocks = {};
  let nextId = 1;

  function addStack(stack, parentId) {
    let firstId = null;
    let previousId = null;
    for (const { opcode, inputs, fields, substack, substack2, shadow, mutation } of stack) {
      const id = String(nextId++);
      blocks[id] = { opcode, next: null, parent: previousId ?? parentId, inputs: {}, fields, shadow, topLevel: false, mutation };
      for (const [name, [type, ...parts]] of Object.entries(inputs)) {
        blocks[id].inputs[name] = [type, ...parts.map(part => part.opcode ? addStack([part], id) : part)];
      }
      if (substack) {
        blocks[id].inputs.SUBSTACK = [2, addStack(substack, id)];
      }
      if (substack2) {
        blocks[id].inputs.SUBSTACK2 = [2, addStack(substack2, id)];
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
  let asset = ASSETS.find(existing => existing.svg === svg);
  if (!asset) {
    asset = { assetId: String(ASSETS.length + 1).padStart(32, '0'), svg };
    ASSETS.push(asset);
  }
  return { name, dataFormat: 'svg', assetId: asset.assetId, md5ext: asset.assetId + '.svg', rotationCenterX, rotationCenterY };
}

export function circleCostume(name, diameter, fill) {
  const radius = diameter / 2;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${diameter}" height="${diameter}"><circle cx="${radius}" cy="${radius}" r="${radius}" fill="${fill}"/></svg>`;
  return svgCostume(name, svg, radius, radius);
}
