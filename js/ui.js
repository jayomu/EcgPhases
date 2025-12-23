const scenarioList = document.getElementById('scenario-list');

// 1. Generate the UI
for (const key in scenarios) {
    const s = scenarios[key];
    const label = document.createElement('label');
    label.className = "cursor-pointer block";
    
    // Added an 'onclick' handler to update the variable immediately
    label.innerHTML = `
        <input type="radio" name="scenario" value="${key}" class="btn-check hidden" ${key === 'normal' ? 'checked' : ''}>
        <div class="p-3 rounded-lg border border-slate-700 hover:bg-slate-700/50 transition-all">
            <div class="flex items-center gap-3 mb-1">
                <div class="w-4 h-4 rounded-full border border-slate-500 check-circle"></div>
                <span class="font-bold text-slate-200 text-sm">${s.name}</span>
            </div>
            <div class="pl-7 text-xs text-slate-400">${s.desc}</div>
        </div>
    `;
    
    // Add event listener for clicking this scenario
    label.querySelector('input').addEventListener('change', (e) => {
        if(e.target.checked) {
            updateScenario(key);
        }
    });

    scenarioList.appendChild(label);
}

// 2. Function to handle scenario switching
function updateScenario(key) {
    currentScenarioKey = key; // Update the variable in animate.js
    
    // Update text descriptions
    const data = scenarios[key];
    document.getElementById('info-title').innerText = data.name;
    document.getElementById('info-desc').innerText = data.desc;
    
    // Update Theme Colors on Body
    document.body.className = `p-4 md:p-6 lg:p-8 ${data.theme}`;
}

// 3. INITIALIZATION (The missing piece!)
function init() {
    console.log("Initializing App...");
    
    // Set initial canvas size
    resize();
    
    // Start the Animation Loop
    requestAnimationFrame(animate);
}

// Wait for DOM to be ready, then init
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
