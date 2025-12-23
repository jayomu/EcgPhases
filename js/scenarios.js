const scenarios = {
    'normal': {
        name: "Normal Sinus Rhythm",
        theme: "theme-normal",
        barColor: "bg-cyan-500",
        desc: "Baseline physiological state.",
        speedMod: 1.0,
        // Defined regions for ECG text (No more hardcoding in animate.js!)
        ecgRegions: [
            { start: 0.00, end: 0.05, text: "Resting" },
            { start: 0.05, end: 0.12, text: "P Wave" },
            { start: 0.12, end: 0.15, text: "PR Interval" },
            { start: 0.15, end: 0.22, text: "QRS Complex" },
            { start: 0.22, end: 0.45, text: "ST Segment" },
            { start: 0.45, end: 0.70, text: "T Wave" },
            { start: 0.70, end: 1.00, text: "Resting" }
        ],
        ap: [
            // phase: X means "The line segment STARTING here is Phase X"
            { x: 0,    y: 0.9,  phase: 4 }, 
            { x: 0.1,  y: 0.9,  phase: 0 }, // <-- START of Upstroke (Phase 0)
            { x: 0.12, y: 0.1,  phase: 1 }, // <-- START of Notch (Phase 1)
            { x: 0.18, y: 0.18, phase: 2 }, // <-- START of Plateau (Phase 2)
            { x: 0.45, y: 0.25, phase: 3 }, // <-- START of Repol (Phase 3)
            { x: 0.65, y: 0.9,  phase: 4 }, // <-- Back to Resting
            { x: 1.0,  y: 0.9,  phase: 4 }
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
        desc: "Blocks Na⁺ (widens QRS) and K⁺ (lengthens QT).",
        speedMod: 1.0,
        // CUSTOM TIMING for Procainamide (Wider QRS, Later T Wave)
        ecgRegions: [
            { start: 0.00, end: 0.05, text: "Resting" },
            { start: 0.05, end: 0.12, text: "P Wave" },
            { start: 0.12, end: 0.16, text: "PR Interval" }, // Slightly longer PR
            { start: 0.16, end: 0.26, text: "Wide QRS" },    // WIDER QRS (ends at 0.26 now)
            { start: 0.26, end: 0.50, text: "ST Segment" },
            { start: 0.50, end: 0.80, text: "Prolonged T" }, // LATER T Wave
            { start: 0.80, end: 1.00, text: "Resting" }
        ],
        ap: [
            // Corrected Phase IDs (Shifted back by one point compared to your old code)
            { x: 0,    y: 0.9,  phase: 4 }, 
            { x: 0.1,  y: 0.9,  phase: 4 },
            { x: 0.16, y: 0.9,  phase: 0 }, // <-- At 0.16, Upstroke begins (Phase 0)
            { x: 0.22, y: 0.1,  phase: 1 }, // <-- At Peak, Notch begins (Phase 1)
            { x: 0.26, y: 0.18, phase: 2 }, // <-- At end of notch, Plateau begins (Phase 2)
            { x: 0.50, y: 0.25, phase: 3 }, // <-- At end of plateau, Repol begins (Phase 3)
            { x: 0.75, y: 0.9,  phase: 4 }, // <-- Back to resting
            { x: 1.0,  y: 0.9,  phase: 4 }
        ],
        ecg: [
            { x: 0, y: 0.7 }, { x: 0.05, y: 0.7 }, { x: 0.075, y: 0.62 }, { x: 0.1, y: 0.7 },
            { x: 0.14, y: 0.7 }, 
            { x: 0.15, y: 0.75 }, { x: 0.19, y: 0.2 }, { x: 0.23, y: 0.85 }, { x: 0.26, y: 0.7 },
            { x: 0.50, y: 0.7 },
            { x: 0.65, y: 0.6 }, { x: 0.75, y: 0.7 },
            { x: 1.0, y: 0.7 }
        ]
    }
};
