import { runProject } from './scratch.js';
import { ASSETS } from './blocks.js';
import { PROJECT } from './project.js';

const scaffolding = await runProject(document.getElementById('stage'), PROJECT, ASSETS);

document.getElementById('green-flag').onclick = () => scaffolding.greenFlag();
