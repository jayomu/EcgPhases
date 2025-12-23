let animationId, startTime, progress=0;
const duration=2000;
let currentScenarioKey='normal';

function animate(time){
    if(!startTime) startTime=time;
    const data=scenarios[currentScenarioKey];
    const speed=document.getElementById('speedSlider').value*data.speedMod;
    const elapsed=(time-startTime)*speed;
    progress=(elapsed%duration)/duration;

    const currentApPoints=data.ap;
    const currentEcgPoints=data.ecg;
    const normalAp=scenarios['normal'].ap;
    const normalEcg=scenarios['normal'].ecg;

    const compareAp=currentScenarioKey==='normal'?null:normalAp;
    const compareEcg=currentScenarioKey==='normal'?null:normalEcg;

    // Phase detection
    let currentPhase=4;
    for(let i=1;i<currentApPoints.length;i++){
        if(progress<=currentApPoints[i].x){currentPhase=currentApPoints[i-1].phase; break;}
    }

    // UI Updates
    document.getElementById('ap-phase-display').innerText = currentScenarioKey==='adenosine'?'AV Block':`Phase ${currentPhase}`;
    document.querySelectorAll('.phase-label').forEach(el=>el.classList.remove('active-phase'));
    const activeEl=document.getElementById(`p${currentPhase}`);
    if(activeEl) activeEl.classList.add('active-phase');

    let ecgLabel="Resting";
    if(progress>0.05 && progress<0.12) ecgLabel="P Wave";
    else if(progress>=0.12 && progress<0.15) ecgLabel="PR Interval";
    else if(progress>=0.15 && progress<0.22) ecgLabel="QRS Complex";
    else if(progress>=0.22 && progress<0.45) ecgLabel="ST Segment";
    else if(progress>=0.45 && progress<0.70) ecgLabel="T Wave";
    if(currentScenarioKey==='hypokalemia' && progress>0.70 && progress<0.90) ecgLabel="U Wave";
    if(currentScenarioKey==='adenosine' && progress>0.15) ecgLabel="Dropped Beat";
    document.getElementById('ecg-segment-display').innerText=ecgLabel;

    drawGraph(document.getElementById('apCanvas').getContext('2d'), currentApPoints, progress);
    drawGraph(document.getElementById('ecgCanvas').getContext('2d'), currentEcgPoints, progress);

    animationId=requestAnimationFrame(animate);
}

window.addEventListener('resize', resize);