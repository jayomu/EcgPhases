    let animationId, startTime, progress = 0;
const duration = 2000;
let currentScenarioKey = 'normal';

function animate(time) {
    if (!startTime) startTime = time;
    const data = scenarios[currentScenarioKey];
    
    // Safety check: if data is missing, stop to prevent crash
    if (!data) return requestAnimationFrame(animate);

    const speed = document.getElementById('speedSlider').value * data.speedMod;
    const elapsed = (time - startTime) * speed;
    progress = (elapsed % duration) / duration;

    // --- 1. AP PHASE LOGIC ---
    // This finds which segment the current progress point falls BETWEEN
    let currentPhase = 4;
    const currentApPoints = data.ap;
    
    for (let i = 1; i < currentApPoints.length; i++) {
        const p1 = currentApPoints[i - 1];
        const p2 = currentApPoints[i];
        
        // strictly check if we are on the line segment between p1 and p2
        if (progress >= p1.x && progress < p2.x) {
            currentPhase = p1.phase; // Use the phase defined at the START of this segment
            break;
        }
    }

    // Update AP Text
    const phaseDisplay = document.getElementById('ap-phase-display');
    if(phaseDisplay) {
        phaseDisplay.innerText = currentScenarioKey === 'adenosine' ? 'AV Block' : `Phase ${currentPhase}`;
    }
    
    // Highlight AP Label
    document.querySelectorAll('.phase-label').forEach(el => el.classList.remove('active-phase'));
    const activeEl = document.getElementById(`p${currentPhase}`);
    if (activeEl) activeEl.classList.add('active-phase');


    // --- 2. ECG TEXT LOGIC (New Universal System) ---
    // Instead of hardcoded times, we check the "regions" list from scenarios.js
    
    let ecgLabel = "Resting";
    if (data.ecgRegions) {
        // Find the region that contains the current progress
        const region = data.ecgRegions.find(r => progress >= r.start && progress < r.end);
        if (region) ecgLabel = region.text;
    } 

    const ecgDisplay = document.getElementById('ecg-segment-display');
    if(ecgDisplay) ecgDisplay.innerText = ecgLabel;


    // --- 3. DRAWING ---
    const compareAp = currentScenarioKey === 'normal' ? null : scenarios['normal'].ap;
    const compareEcg = currentScenarioKey === 'normal' ? null : scenarios['normal'].ecg;

    if(document.getElementById('apCanvas')){
        drawGraph(
            document.getElementById('apCanvas').getContext('2d'), 
            data.ap, 
            progress, 
            null, 
            null, 
            compareAp
        );
    }

    if(document.getElementById('ecgCanvas')){
        drawGraph(
            document.getElementById('ecgCanvas').getContext('2d'), 
            data.ecg, 
            progress, 
            null, 
            null, 
            compareEcg
        );
    }

    animationId = requestAnimationFrame(animate);
}

window.addEventListener('resize', resize);
