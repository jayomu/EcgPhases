const scenarios = {
    'normal': {
        name: "Normal Sinus Rhythm",
        theme: "theme-normal",
        barColor: "bg-cyan-500",
        desc: "Baseline physiological state. Sharp Phase 0 upstroke (Na⁺) = Narrow QRS. Distinct Plateau (Ca²⁺) = Isoelectric ST. Rapid Repolarization (K⁺) = T Wave.",
        speedMod: 1.0,
        ap: [
            { x: 0, y: 0.9, phase: 4 }, 
            { x: 0.1, y: 0.9, phase: 0 }, 
            { x: 0.12, y: 0.1, phase: 1 },
            { x: 0.18, y: 0.18, phase: 2 },
            { x: 0.45, y: 0.25, phase: 3 },
            { x: 0.65, y: 0.9, phase: 4 },
            { x: 1.0, y: 0.9, phase: 4 }
        ],
        ecg: [
            { x: 0, y: 0.7 }, { x: 0.05, y: 0.7 }, { x: 0.075, y: 0.62 }, { x: 0.1, y: 0.7 },
            { x: 0.14, y: 0.7 },
            { x: 0.15, y: 0.75 }, { x: 0.17, y: 0.2 }, { x: 0.19, y: 0.85 }, { x: 0.21, y: 0.7 },
            { x: 0.45, y: 0.7 },
            { x: 0.55, y: 0.6 }, { x: 0.65, y: 0.7 },
            { x: 1.0, y: 0.7 }
        ]
    }, 
             'procainamide': {
                name: "Class Ia: Procainamide",
                theme: "theme-na",
                barColor: "bg-pink-500",
                desc: "Blocks Na⁺ channels (moderate). Slows Phase 0 upstroke → Widens QRS. Blocks K⁺ channels → Prolongs Phase 3 → Lengthens QT interval.",
                speedMod: 1.0,
                ap: [
                    { x: 0, y: 0.9, phase: 4 }, { x: 0.1, y: 0.9, phase: 4 },
                    { x: 0.16, y: 0.1, phase: 0 }, { x: 0.22, y: 0.18, phase: 1 },
                    { x: 0.50, y: 0.25, phase: 2 }, { x: 0.75, y: 0.9, phase: 3 }, // Prolonged
                    { x: 1.0, y: 0.9, phase: 4 }
                ],
                ecg: [
                    { x: 0, y: 0.7 }, { x: 0.05, y: 0.7 }, { x: 0.075, y: 0.62 }, { x: 0.1, y: 0.7 },
                    { x: 0.14, y: 0.7 }, 
                    { x: 0.15, y: 0.75 }, { x: 0.19, y: 0.2 }, { x: 0.23, y: 0.85 }, { x: 0.26, y: 0.7 }, // Wide QRS
                    { x: 0.50, y: 0.7 },
                    { x: 0.65, y: 0.6 }, { x: 0.75, y: 0.7 }, // Late T
                    { x: 1.0, y: 0.7 }
                ]
            }
};

const phaseInfo = {
    0: "Phase 0: Depolarization (QRS)",
    1: "Phase 1: Initial Repolarization",
    2: "Phase 2: Plateau (ST)",
    3: "Phase 3: Repolarization (T)",
    4: "Phase 4: Resting"
};
