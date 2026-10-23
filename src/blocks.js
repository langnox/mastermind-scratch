export const ASSETS = [];

export function svgCostume(name, svg, rotationCenterX, rotationCenterY) {
  const assetId = String(ASSETS.length + 1).padStart(32, '0');
  ASSETS.push({ assetId, svg });
  return { name, dataFormat: 'svg', assetId, md5ext: assetId + '.svg', rotationCenterX, rotationCenterY };
}
