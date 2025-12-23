const scenarioList = document.getElementById('scenario-list');

for (const key in scenarios) {
    const s = scenarios[key];
    const label = document.createElement('label');
    label.className = "cursor-pointer block";
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
    scenarioList.appendChild(label);
}