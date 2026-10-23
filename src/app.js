import { runProject } from './scratch.js';
import { ASSETS } from './blocks.js';
import { PROJECT } from './project.js';
import { downloadSb3 } from './sb3.js';

const scaffolding = await runProject(document.getElementById('stage'), PROJECT, ASSETS);

document.getElementById('green-flag').onclick = () => scaffolding.greenFlag();
document.getElementById('download').onclick = () => downloadSb3(PROJECT, ASSETS, 'mastermind.sb3');
