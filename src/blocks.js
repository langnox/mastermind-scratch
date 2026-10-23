export function number(value) {
  return value.opcode ? [3, value, [4, '']] : [1, [4, String(value)]];
}

export function text(value) {
  return value.opcode ? [3, value, [10, '']] : [1, [10, String(value)]];
}

export function variable(reference) {
  return block('data_variable', { fields: { VARIABLE: reference } });
}

export function itemOf(index, list) {
  return block('data_itemoflist', { inputs: { INDEX: number(index) }, fields: { LIST: list } });
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

export function touching(target) {
  return block('sensing_touchingobject', {
    inputs: { TOUCHINGOBJECTMENU: [1, block('sensing_touchingobjectmenu', { fields: { TOUCHINGOBJECTMENU: [target, null] }, shadow: true })] }
  });
}

export function cloneOf(target) {
  return [1, block('control_create_clone_of_menu', { fields: { CLONE_OPTION: [target, null] }, shadow: true })];
}

export function defineProcedure(proccode, { warp = true, comment } = {}) {
  const mutation = { tagName: 'mutation', children: [], proccode, argumentids: '[]', argumentnames: '[]', argumentdefaults: '[]', warp: String(warp) };
  return block('procedures_definition', { inputs: { custom_block: [1, block('procedures_prototype', { shadow: true, mutation })] }, comment });
}

export function callProcedure(proccode, { warp = true } = {}) {
  const mutation = { tagName: 'mutation', children: [], proccode, argumentids: '[]', warp: String(warp) };
  return block('procedures_call', { mutation });
}

export function whenKeyPressed(key, { comment } = {}) {
  return block('event_whenkeypressed', { fields: { KEY_OPTION: [key, null] }, comment });
}

export function block(opcode, { inputs = {}, fields = {}, substack, substack2, shadow = false, mutation, comment } = {}) {
  return { opcode, inputs, fields, substack, substack2, shadow, mutation, comment };
}

let nextId = 1;

let nextCommentId = 1;

export function buildScripts(...scripts) {
  const blocks = {};
  const comments = {};

  function addStack(stack, parentId) {
    let firstId = null;
    let previousId = null;
    for (const { opcode, inputs, fields, substack, substack2, shadow, mutation, comment } of stack) {
      const id = String(nextId++);
      blocks[id] = { opcode, next: null, parent: previousId ?? parentId, inputs: {}, fields, shadow, topLevel: false, mutation };
      if (comment) {
        const commentId = `comment-${nextCommentId++}`;
        blocks[id].comment = commentId;
        comments[commentId] = { blockId: id, x: 0, y: 0, width: 250, height: 40 + 18 * Math.ceil(comment.length / 32), minimized: false, text: comment };
      }
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
    if (blocks[id].comment) {
      Object.assign(comments[blocks[id].comment], { x: 450, y: index * 200 });
    }
  });
  return { blocks, comments };
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
