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

    const currentApPoints = data.ap;
    const currentEcgPoints = data.ecg;
    
    // Get comparison data (ghost lines)
    const normalAp = scenarios['normal'].ap;
    const normalEcg = scenarios['normal'].ecg;
    const compareAp = currentScenarioKey === 'normal' ? null : normalAp;
    const compareEcg = currentScenarioKey === 'normal' ? null : normalEcg;

    // --- Phase Detection Logic (Fixed) ---
    let currentPhase = 4;

    // Find which segment we are currently in
    for (let i = 1; i < currentApPoints.length; i++) {
        const p1 = currentApPoints[i - 1];
        const p2 = currentApPoints[i];

        // Check if progress is between these two points
        if (progress >= p1.x && progress < p2.x) {
            // We are strictly between p1 and p2.
            // The phase of this SEGMENT is defined by the starting point (p1).
            currentPhase = p1.phase;
            break;
        }
    }
    // --- UI Updates ---
    const phaseDisplay = document.getElementById('ap-phase-display');
    if(phaseDisplay) {
        phaseDisplay.innerText = currentScenarioKey === 'adenosine' ? 'AV Block' : `Phase ${currentPhase}`;
    }
    
    document.querySelectorAll('.phase-label').forEach(el => el.classList.remove('active-phase'));
    const activeEl = document.getElementById(`p${currentPhase}`);
    if (activeEl) activeEl.classList.add('active-phase');

    let ecgLabel = "Resting";
    if (progress > 0.05 && progress < 0.12) ecgLabel = "P Wave";
    else if (progress >= 0.12 && progress < 0.15) ecgLabel = "PR Interval";
    else if (progress >= 0.15 && progress < 0.22) ecgLabel = "QRS Complex";
    else if (progress >= 0.22 && progress < 0.45) ecgLabel = "ST Segment";
    else if (progress >= 0.45 && progress < 0.70) ecgLabel = "T Wave";
    
    const ecgDisplay = document.getElementById('ecg-segment-display');
    if(ecgDisplay) ecgDisplay.innerText = ecgLabel;

    // --- DRAWING (Fixed Arguments) ---
    // We pass 'null' for the static color so it uses the defaults in drawGraph
    // We pass the CSS variable or a fallback for activeColor
    
    if(document.getElementById('apCanvas')){
        drawGraph(
            document.getElementById('apCanvas').getContext('2d'), 
            currentApPoints, 
            progress, 
            null, // default static color 
            null, // default active color (will read from CSS)
            compareAp
        );
    }

    if(document.getElementById('ecgCanvas')){
        drawGraph(
            document.getElementById('ecgCanvas').getContext('2d'), 
            currentEcgPoints, 
            progress, 
            null, 
            null, 
            compareEcg
        );
    }

    animationId = requestAnimationFrame(animate);
}

// Don't call requestAnimationFrame here yet. We will do it in ui.js after setup.
window.addEventListener('resize', resize);
