let animationId, startTime, progress = 0;
const duration = 2000;
let currentScenarioKey = 'normal';

function animate(time) {
    if (!startTime) startTime = time;
    const data = scenarios[currentScenarioKey];
    
    if (!data) return requestAnimationFrame(animate);

    const speed = document.getElementById('speedSlider').value * data.speedMod;
    const elapsed = (time - startTime) * speed;
    progress = (elapsed % duration) / duration;

    // --- 1. AP PHASE LOGIC ---
    let currentPhase = 4;
    const currentApPoints = data.ap;
    
    for (let i = 1; i < currentApPoints.length; i++) {
        const p1 = currentApPoints[i - 1];
        const p2 = currentApPoints[i];
        if (progress >= p1.x && progress < p2.x) {
            currentPhase = p1.phase;
            break;
        }
    }

    // Update AP Text
    const phaseDisplay = document.getElementById('ap-phase-display');
    if(phaseDisplay) {
        phaseDisplay.innerText = currentScenarioKey === 'adenosine' ? 'AV Block' : `Phase ${currentPhase}`;
    }
    
    // --- 2. ECG TEXT LOGIC ---
    let ecgLabel = "Resting";
    if (data.ecgRegions) {
        const region = data.ecgRegions.find(r => progress >= r.start && progress < r.end);
        if (region) ecgLabel = region.text;
    } 

    const ecgDisplay = document.getElementById('ecg-segment-display');
    if(ecgDisplay) ecgDisplay.innerText = ecgLabel;


    // --- 3. HIGHLIGHTING (Universal) ---
    // Reset ALL labels first
    document.querySelectorAll('.phase-label').forEach(el => el.classList.remove('active-phase'));

    // A. Highlight AP Label (p0, p1, etc)
    const activeApEl = document.getElementById(`p${currentPhase}`);
    if (activeApEl) activeApEl.classList.add('active-phase');

    // B. Highlight ECG Label (Smart Matching)
    // We check if the current 'ecgLabel' text contains the key words
    let activeEcgId = null;
    if (ecgLabel.includes("P Wave")) activeEcgId = 'ecg-p';
    else if (ecgLabel.includes("PR")) activeEcgId = 'ecg-pr';
    else if (ecgLabel.includes("QRS")) activeEcgId = 'ecg-qrs'; // Matches "Wide QRS", "Massive QRS"
    else if (ecgLabel.includes("ST")) activeEcgId = 'ecg-st';   // Matches "Scooped ST"
    else if (ecgLabel.includes("T Wave")) activeEcgId = 'ecg-t'; // Matches "Peaked T Wave"
    
    if (activeEcgId) {
        const activeEcgEl = document.getElementById(activeEcgId);
        if (activeEcgEl) activeEcgEl.classList.add('active-phase');
    }


    // --- 4. DRAWING ---
    const compareAp = currentScenarioKey === 'normal' ? null : scenarios['normal'].ap;
    const compareEcg = currentScenarioKey === 'normal' ? null : scenarios['normal'].ecg;

    if(document.getElementById('apCanvas')){
        drawGraph(
            document.getElementById('apCanvas').getContext('2d'), 
            data.ap, progress, null, null, compareAp
        );
    }

    if(document.getElementById('ecgCanvas')){
        drawGraph(
            document.getElementById('ecgCanvas').getContext('2d'), 
            data.ecg, progress, null, null, compareEcg
        );
    }

    animationId = requestAnimationFrame(animate);
}

window.addEventListener('resize', resize);
