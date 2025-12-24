let animationId, startTime, progress = 0;
const duration = 2000;
let currentScenarioKey = 'normal';

// Helper: Linear Interpolation (Math magic to blend numbers)
function lerp(start, end, amt) {
    return start + (end - start) * amt;
}

function animate(time) {
    if (!startTime) startTime = time;
    
    const drugData = scenarios[currentScenarioKey];
    const normalData = scenarios['normal']; // We need Normal data for the calculation

    if (!drugData || !normalData) return requestAnimationFrame(animate);

    const speed = document.getElementById('speedSlider').value * drugData.speedMod;
    
    // --- DOSE LOGIC ---
    // Get slider value (0 = Normal, 1 = Drug, 2 = Toxic)
    const doseElement = document.getElementById('doseSlider');
    const dose = doseElement ? parseFloat(doseElement.value) : 1.0;

    // Determine which points to draw
    let currentApPoints = [];
    let currentEcgPoints = [];

    // Check if we can interpolate (must have same number of points)
    // e.g., Adenosine has 2 points vs Normal 7, so we can't blend them.
    const canInterpolateAp = (drugData.ap.length === normalData.ap.length);
    const canInterpolateEcg = (drugData.ecg.length === normalData.ecg.length);

    // 1. Calculate AP Points
    if (canInterpolateAp) {
        currentApPoints = normalData.ap.map((pNormal, i) => {
            const pDrug = drugData.ap[i];
            return {
                x: lerp(pNormal.x, pDrug.x, dose),
                y: lerp(pNormal.y, pDrug.y, dose),
                phase: pDrug.phase // Keep phase ID from drug
            };
        });
    } else {
        // Fallback for Adenosine or drugs with different point counts
        // Snap to Normal if dose < 0.5, else Drug
        currentApPoints = dose < 0.5 ? normalData.ap : drugData.ap;
    }

    // 2. Calculate ECG Points
    if (canInterpolateEcg) {
        currentEcgPoints = normalData.ecg.map((pNormal, i) => {
            const pDrug = drugData.ecg[i];
            return {
                x: lerp(pNormal.x, pDrug.x, dose),
                y: lerp(pNormal.y, pDrug.y, dose)
            };
        });
    } else {
        currentEcgPoints = dose < 0.5 ? normalData.ecg : drugData.ecg;
    }

    // --- TIMING ---
    const elapsed = (time - startTime) * speed;
    progress = (elapsed % duration) / duration;


    // --- PHASE DETECTION ---
    let currentPhase = 4;
    for (let i = 1; i < currentApPoints.length; i++) {
        const p1 = currentApPoints[i - 1];
        const p2 = currentApPoints[i];
        if (progress >= p1.x && progress < p2.x) {
            currentPhase = p1.phase;
            break;
        }
    }

    // Update Phase Text
    const phaseDisplay = document.getElementById('ap-phase-display');
    if(phaseDisplay) {
        phaseDisplay.innerText = currentScenarioKey === 'adenosine' ? 'AV Block' : `Phase ${currentPhase}`;
    }
    
    // Highlight AP Phase Label
    document.querySelectorAll('.phase-label').forEach(el => el.classList.remove('active-phase'));
    const activeEl = document.getElementById(`p${currentPhase}`);
    if (activeEl) activeEl.classList.add('active-phase');


    // --- ECG TEXT LOGIC ---
    // If dose is very low (< 0.3), show "Normal" text logic to avoid confusion
    const activeData = (dose < 0.3) ? normalData : drugData; 
    
    let ecgLabel = "Resting";
    if (activeData.ecgRegions) {
        const region = activeData.ecgRegions.find(r => progress >= r.start && progress < r.end);
        if (region) ecgLabel = region.text;
    } 

    const ecgDisplay = document.getElementById('ecg-segment-display');
    if(ecgDisplay) ecgDisplay.innerText = ecgLabel;


    // --- HIGHLIGHT ECG LABELS ---
    let activeEcgId = null;
    if (ecgLabel.includes("P Wave")) activeEcgId = 'ecg-p';
    else if (ecgLabel.includes("PR")) activeEcgId = 'ecg-pr';
    else if (ecgLabel.includes("QRS")) activeEcgId = 'ecg-qrs';
    else if (ecgLabel.includes("ST")) activeEcgId = 'ecg-st';
    else if (ecgLabel.includes("T Wave")) activeEcgId = 'ecg-t';
    
    if (activeEcgId) {
        const activeEcgEl = document.getElementById(activeEcgId);
        if (activeEcgEl) activeEcgEl.classList.add('active-phase');
    }


    // --- DRAWING ---
    // Only show "Ghost" lines (gray comparison lines) if dose is > 0.1
    const showGhost = dose > 0.1;
    const compareAp = showGhost ? normalData.ap : null;
    const compareEcg = showGhost ? normalData.ecg : null;

    if(document.getElementById('apCanvas')){
        drawGraph(
            document.getElementById('apCanvas').getContext('2d'), 
            currentApPoints, progress, null, null, compareAp
        );
    }

    if(document.getElementById('ecgCanvas')){
        drawGraph(
            document.getElementById('ecgCanvas').getContext('2d'), 
            currentEcgPoints, progress, null, null, compareEcg
        );
    }

    animationId = requestAnimationFrame(animate);
}

window.addEventListener('resize', resize);
