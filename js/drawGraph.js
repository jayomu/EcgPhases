function getY(y,h){ return y*h; }
function getX(x,w){ return x*w; }

function drawGraph(ctx, points, progress, color, activeColor, comparisonPoints=null){
    const w=ctx.canvas.width, h=ctx.canvas.height;
    ctx.clearRect(0,0,w,h);

    // Grid
    ctx.strokeStyle='#1e293b';
    ctx.lineWidth=1;
    const step=w/20;
    for(let i=0;i<w;i+=step){ctx.beginPath();ctx.moveTo(i,0);ctx.lineTo(i,h);ctx.stroke();}
    const hStep=h/10;
    for(let i=0;i<h;i+=hStep){ctx.beginPath();ctx.moveTo(0,i);ctx.lineTo(w,i);ctx.stroke();}

    // Ghost
    if(comparisonPoints){
        ctx.beginPath();
        ctx.strokeStyle='rgba(148,163,184,0.15)';
        ctx.setLineDash([4,4]);
        ctx.lineWidth=2;
        ctx.moveTo(getX(comparisonPoints[0].x,w),getY(comparisonPoints[0].y,h));
        for(let i=1;i<comparisonPoints.length;i++){ctx.lineTo(getX(comparisonPoints[i].x,w),getY(comparisonPoints[i].y,h));}
        ctx.stroke();
        ctx.setLineDash([]);
    }

    // Main Path
    ctx.beginPath();
    ctx.strokeStyle='#334155';
    ctx.lineWidth=3;
    ctx.lineJoin='round';
    ctx.lineCap='round';
    ctx.moveTo(getX(points[0].x,w),getY(points[0].y,h));
    for(let i=1;i<points.length;i++){ctx.lineTo(getX(points[i].x,w),getY(points[i].y,h));}
    ctx.stroke();

    // Active Path
    ctx.beginPath();
    const computedStyle=getComputedStyle(document.body);
    const themeColor=computedStyle.getPropertyValue('--active-color').trim()||activeColor;
    ctx.strokeStyle=themeColor;
    ctx.lineWidth=4;
    ctx.shadowBlur=15;
    ctx.shadowColor=themeColor;
    ctx.moveTo(getX(points[0].x,w),getY(points[0].y,h));
    let currentX=progress;
    for(let i=1;i<points.length;i++){
        const p1=points[i-1], p2=points[i];
        if(currentX>=p2.x){ctx.lineTo(getX(p2.x,w),getY(p2.y,h));}
        else{
            const seg=(currentX-p1.x)/(p2.x-p1.x);
            const interpY=p1.y+(p2.y-p1.y)*seg;
            ctx.lineTo(getX(currentX,w),getY(interpY,h));
            // Leader Dot
            ctx.save();
            ctx.beginPath();
            ctx.fillStyle='#fff';
            ctx.shadowBlur=20;
            ctx.arc(getX(currentX,w),getY(interpY,h),5,0,Math.PI*2);
            ctx.fill();
            ctx.restore();
            break;
        }
    }
    ctx.stroke();
    ctx.shadowBlur=0;
}

function resize(){
    document.querySelectorAll('.canvas-container').forEach(c=>{
        const canvas=c.querySelector('canvas');
        canvas.width=c.clientWidth*window.devicePixelRatio;
        canvas.height=c.clientHeight*window.devicePixelRatio;
    });
}