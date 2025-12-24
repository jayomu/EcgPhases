let animationId, startTime, progress = 0;
const baseDuration = 2000; // Time for 1 beat at normal speed
let currentScenarioKey = 'normal';

// Helper: Linear Interpolation
function lerp(start, end, amt) {
    return start + (end - start) * amt;
}

function animate(time) {
    if (!startTime) startTime = time;
    
    const drugData = scenarios[currentScenarioKey];
    const normalData = scenarios['normal']; 

    if (!drugData || !normalData) return requestAnimationFrame(animate);

    // --- 1. PREPARE DATA (Interpolation + Multi-Beat) ---
    const doseElement = document.getElementById('doseSlider');
    const dose = doseElement ? parseFloat(doseElement.value) : 1.0;
    const numBeats = window.numBeats || 1; // Read from global state

    // A. Generate the Single Beat (Interpolated)
    let singleApPoints = [];
    let singleEcgPoints = [];
    
    // Check interpolation compatibility
    const canInterpolateAp = (drugData.ap.length === normalData.ap.length);
    const canInterpolateEcg = (drugData.ecg.length === normalData.ecg.length);

    // Calculate Single Beat AP
    if (canInterpolateAp) {
        singleApPoints = normalData.ap.map((pNormal, i) => {
            const pDrug = drugData.ap[i];
            return {
                x: lerp(pNormal.x, pDrug.x, dose),
                y: lerp(pNormal.y, pDrug.y, dose),
                phase: pDrug.phase
            };
        });
    } else {
        singleApPoints = dose < 0.5 ? normalData.ap : drugData.ap;
    }

    // Calculate Single Beat ECG
    if (canInterpolateEcg) {
        singleEcgPoints = normalData.ecg.map((pNormal, i) => {
            const pDrug = drugData.ecg[i];
            return {
                x: lerp(pNormal.x, pDrug.x, dose),
                y: lerp(pNormal.y, pDrug.y, dose)
            };
        });
    } else {
        singleEcgPoints = dose < 0.5 ? normalData.ecg : drugData.ecg;
    }

    // B. Create Multi-Beat Arrays
    // We clone the single beat points 'numBeats' times, shifting x
    let finalApPoints = [];
    let finalEcgPoints = [];

    for(let b = 0; b < numBeats; b++) {
        // Shift x by 'b' (0, 1, 2) and then divide by numBeats to normalize to 0-1
        // Beat 1: 0.0-1.0 -> /3 -> 0.00-0.33
        // Beat 2: 1.0-2.0 -> /3 -> 0.33-0.66
        
        const shiftAndScale = (pts) => pts.map(p => ({
            x: (p.x + b) / numBeats, 
            y: p.y,
            phase: p.phase
        }));

        finalApPoints.push(...shiftAndScale(singleApPoints));
        finalEcgPoints.push(...shiftAndScale(singleEcgPoints));
    }


    // --- 2. TIMING ---
    // If we have 3 beats, the "canvas cycle" takes 3x longer to draw
    // This ensures the visual speed of the wave remains constant (Important for Beta Blockers!)
    const speed = document.getElementById('speedSlider').value * drugData.speedMod;
    const totalCycleDuration = baseDuration * numBeats; 
    
    const elapsed = (time - startTime) * speed;
    progress = (elapsed % totalCycleDuration) / totalCycleDuration;


    // --- 3. LOCAL PHASE LOGIC (For Text Labels) ---
    // "progress" is 0 to 1 across the WHOLE screen (3 beats).
    // We need "localProgress" (0 to 1) for just the CURRENT beat to find the text.
    // Math: (0.1 * 3) = 0.3.   (0.4 * 3) = 1.2 -> %1 -> 0.2
    const localProgress = (progress * numBeats) % 1.0;


    // --- 4. TEXT UPDATES (Using Local Progress) ---
    
    // AP Phase Text
    let currentPhase = 4;
    // We use the SINGLE beat points for phase detection (simpler)
    for (let i = 1; i < singleApPoints.length; i++) {
        const p1 = singleApPoints[i - 1];
        const p2 = singleApPoints[i];
        if (localProgress >= p1.x && localProgress < p2.x) {
            currentPhase = p1.phase;
            break;
        }
    }

    const phaseDisplay = document.getElementById('ap-phase-display');
    if(phaseDisplay) {
        phaseDisplay.innerText = currentScenarioKey === 'adenosine' ? 'AV Block' : `Phase ${currentPhase}`;
    }
    
    document.querySelectorAll('.phase-label').forEach(el => el.classList.remove('active-phase'));
    const activeEl = document.getElementById(`p${currentPhase}`);
    if (activeEl) activeEl.classList.add('active-phase');

    // ECG Text
    const activeData = (dose < 0.3) ? normalData : drugData; 
    let ecgLabel = "Resting";
    if (activeData.ecgRegions) {
        const region = activeData.ecgRegions.find(r => localProgress >= r.start && localProgress < r.end);
        if (region) ecgLabel = region.text;
    } 

    const ecgDisplay = document.getElementById('ecg-segment-display');
    if(ecgDisplay) ecgDisplay.innerText = ecgLabel;

    // Highlight ECG Labels
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


    // --- 5. DRAWING ---
    // We render the "Final" (Multi-beat) arrays
    
    const showGhost = dose > 0.1 && numBeats === 1; // Only show ghost on 1x view to avoid clutter
    const compareAp = showGhost ? normalData.ap : null;
    const compareEcg = showGhost ? normalData.ecg : null;

    if(document.getElementById('apCanvas')){
        drawGraph(
            document.getElementById('apCanvas').getContext('2d'), 
            finalApPoints, progress, null, null, compareAp
        );
    }

    if(document.getElementById('ecgCanvas')){
        drawGraph(
            document.getElementById('ecgCanvas').getContext('2d'), 
            finalEcgPoints, progress, null, null, compareEcg
        );
    }

    animationId = requestAnimationFrame(animate);
}

window.addEventListener('resize', resize);

    
