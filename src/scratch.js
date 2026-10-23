import '@turbowarp/scaffolding';

export async function runProject(element, project, assets) {
  const scaffolding = new window.Scaffolding.Scaffolding();
  scaffolding.setup();
  scaffolding.appendTo(element);

  for (const { assetId, svg } of assets) {
    scaffolding.storage.cache(scaffolding.storage.AssetType.ImageVector, scaffolding.storage.DataFormat.SVG, new TextEncoder().encode(svg), assetId);
  }

  await scaffolding.loadProject(new TextEncoder().encode(JSON.stringify(project)));
  scaffolding.start();
  scaffolding.greenFlag();
  return scaffolding;
}
