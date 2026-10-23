import { strToU8, zipSync } from 'fflate';

export function downloadSb3(project, assets, filename) {
  const files = { 'project.json': strToU8(JSON.stringify(project)) };
  for (const { assetId, svg } of assets) {
    files[`${assetId}.svg`] = strToU8(svg);
  }

  const blob = new Blob([zipSync(files)], { type: 'application/x.scratch.sb3' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
}
