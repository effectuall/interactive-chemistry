const PNM_MODULE = {
  id: 'm-pnm',
  title: 'Particulate Nature of Matter',
  category: 'General Chemistry',
  topics: [
    { id: 't1', label: 'Solids, Liquids & Gases', content: `<h1 class="text-3xl font-bold mb-4">States of Matter</h1> <img src="./assets/states-of-matter.png" alt="Three states of matter displayed side by side: solid particles arranged in tight, ordered grid pattern; liquid particles loosely packed with space between them; gas particles widely dispersed throughout container. Educational diagram with blue background and labeled sections." class="w-full rounded-lg mb-4"><p>Particles behave differently in solids, liquids, and gases...</p>` },
    { id: 't2', label: 'Kinetic Theory', content: `<h1 class="text-3xl font-bold mb-4">States of Matter</h1> <img src="./assets/states-of-matter.png" alt="Three states of matter displayed side by side: solid particles arranged in tight, ordered grid pattern; liquid particles loosely packed with space between them; gas particles widely dispersed throughout container. Educational diagram with blue background and labeled sections." class="w-full rounded-lg mb-4"><p>Particles behave differently in solids, liquids, and gases...</p>`, iframe: 'https://effectuall.github.io/Simulations/Thermodynamics_Kinetic_Theory_of_Gases.html' },
    { id: 't3', label: 'Changes of State', content: '<h1 class="text-3xl font-bold mb-4">Phase Changes</h1><img src="./assets/phase-changes.png" alt="Cyclic diagram showing phase transitions between three states of matter: solid melts to liquid, liquid vaporizes to gas, gas condenses back to liquid, and liquid freezes to solid. Arrows indicate direction of phase changes with energy input or release labeled at each transition." class="w-full rounded-lg mb-4"><p>Energy drives the transitions...</p>' },
    { id: 't4', label: 'Electrochemical Cell', content: '<h1 class="text-3xl font-bold mb-4">Electrochemical Cell</h1><p>Explore the principles of electrochemical cells...</p>', iframe: './SIMS/ElectrochemicalCell.html' },
    {
      id: 't5', label: 'New', content: '<h1>New Image Topic</h1> <p>Text...</p>', image: './assets/hero.png'
    }
  ],
  materials: {
    checklist: '<h2>Checklist</h2><ul><li>Describe states</li><li>Explain diffusion</li></ul>',
    flashcards: '<h2>Flashcards</h2><p>Q: What is sublimation? A: Solid to Gas.</p>',
    qbank: '<h2>Question Bank</h2><p>Which state has fixed volume and shape?</p>'
  }
};

const state = {
  currentSection: 'dashboard',
  modules: [PNM_MODULE],
  activeModule: null
};

// DOM Elements
const contentArea = document.getElementById('content-area');
const pageTitle = document.getElementById('page-title');
const moduleViewer = document.getElementById('module-viewer');
const viewerContent = document.getElementById('module-html-content');

// Render Functions
function renderDashboard() {
  contentArea.innerHTML = `
                <div class="space-y-8">
                    <div class="bg-gradient-to-r from-blue-700 to-indigo-800 rounded-3xl p-10 text-white shadow-xl">
                        <span class="bg-blue-500/30 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">Active Curriculum</span>
                        <h2 class="text-4xl font-black mt-4">${PNM_MODULE.title}</h2>
                        <p class="text-blue-100 mt-6 text-lg max-w-xl">Dive into the kinetic theory and investigate the three states of matter.</p>
                        <button id="btn-start" class="mt-8 bg-white text-blue-800 px-8 py-3 rounded-xl font-bold hover:bg-blue-50 transition-all">Start Learning</button>
                    </div>
                </div>
            `;
  document.getElementById('btn-start').onclick = () => openModule('m-pnm');
}

function renderModules() {
  contentArea.innerHTML = `
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    ${state.modules.map(m => `
                        <div class="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-lg transition-all cursor-pointer open-mod" data-id="${m.id}">
                            <span class="text-[10px] font-bold text-blue-500 uppercase">${m.category}</span>
                            <h4 class="font-bold text-slate-800 mt-2">${m.title}</h4>
                        </div>
                    `).join('')}
                </div>
            `;
  document.querySelectorAll('.open-mod').forEach(btn => {
    btn.onclick = () => openModule(btn.dataset.id);
  });
}

function openModule(id) {
  const mod = state.modules.find(m => m.id === id);
  state.activeModule = mod;
  document.getElementById('view-module-title').innerText = mod.title;

  const nav = document.getElementById('module-topics-nav');
  nav.innerHTML = mod.topics.map(t => `
                <button data-tid="${t.id}" class="topic-select w-full text-left px-4 py-2.5 rounded-lg text-sm text-slate-600 hover:bg-slate-200">
                    ${t.label}
                </button>
            `).join('');

  document.querySelectorAll('.topic-select').forEach(btn => {
    btn.onclick = () => {
      const topic = mod.topics.find(t => t.id === btn.dataset.tid);
      if (topic.content) viewerContent.innerHTML = topic.content;
      if (topic.iframe) {
        viewerContent.innerHTML += `<iframe src="${topic.iframe}" style="width:100%;height:600px;border:none;" class="rounded-lg mt-4"></iframe>`;
      }
      if (topic.image) {
        viewerContent.innerHTML += `<img src="${topic.image}" alt="Topic Image" class="w-full rounded-lg mb-4">`;
      }

    };
  });

  moduleViewer.classList.remove('translate-y-full');
  viewerContent.innerHTML = mod.topics[0].content;
}

// Navigation Setup
document.querySelectorAll('.nav-item').forEach(btn => {
  btn.addEventListener('click', () => {
    const section = btn.dataset.section;
    state.currentSection = section;

    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active-nav'));
    btn.classList.add('active-nav');

    pageTitle.innerText = section.charAt(0).toUpperCase() + section.slice(1);

    if (section === 'dashboard') renderDashboard();
    if (section === 'modules') renderModules();
    if (section === 'labs' || section === 'educator') {
      contentArea.innerHTML = `<div class="p-10 text-center text-slate-400">Section ${section} coming soon.</div>`;
    }
  });
});

document.getElementById('close-viewer').onclick = () => moduleViewer.classList.add('translate-y-full');

document.querySelectorAll('.resource-btn').forEach(btn => {
  btn.onclick = () => {
    if (state.activeModule) {
      viewerContent.innerHTML = state.activeModule.materials[btn.dataset.resource];
    }
  };
});

// Initialize
renderDashboard();