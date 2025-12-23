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
    }, 
    'flecainide': {
        name: "Class Ic: Flecainide",
        theme: "theme-na",
        barColor: "bg-pink-600",
        desc: "Potent Na⁺ channel blocker. Drastically reduces Phase 0 slope. Result: Massive QRS widening (broad triangle).",
        speedMod: 1.0,
        ecgRegions: [
            { start: 0.00, end: 0.05, text: "Resting" },
            { start: 0.05, end: 0.12, text: "P Wave" },
            { start: 0.12, end: 0.15, text: "PR Interval" },
            { start: 0.15, end: 0.35, text: "Massive QRS" },
            { start: 0.35, end: 0.50, text: "ST Segment" },
            { start: 0.50, end: 0.75, text: "T Wave" },
            { start: 0.75, end: 1.00, text: "Resting" }
        ],
        ap: [
            { x: 0,    y: 0.9,  phase: 4 }, 
            { x: 0.1,  y: 0.9,  phase: 0 }, // Upstroke start
            { x: 0.25, y: 0.1,  phase: 1 }, // Peak
            { x: 0.28, y: 0.18, phase: 2 }, // Plateau start
            { x: 0.50, y: 0.25, phase: 3 }, // Repol start
            { x: 0.70, y: 0.9,  phase: 4 }, 
            { x: 1.0,  y: 0.9,  phase: 4 }
        ],
        ecg: [
            { x: 0, y: 0.7 }, { x: 0.05, y: 0.7 }, { x: 0.075, y: 0.62 }, { x: 0.1, y: 0.7 },
            { x: 0.14, y: 0.7 },
            { x: 0.15, y: 0.75 }, { x: 0.24, y: 0.2 }, { x: 0.30, y: 0.85 }, { x: 0.35, y: 0.7 },
            { x: 0.50, y: 0.7 },
            { x: 0.60, y: 0.6 }, { x: 0.70, y: 0.7 },
            { x: 1.0, y: 0.7 }
        ]
    },

    'amiodarone': {
        name: "Class III: Amiodarone",
        theme: "theme-k",
        barColor: "bg-purple-500",
        desc: "Blocks K⁺ channels (Phase 3). Delays repolarization. AP duration increases significantly. ECG shows marked QT prolongation.",
        speedMod: 1.0,
        ecgRegions: [
            { start: 0.00, end: 0.05, text: "Resting" },
            { start: 0.05, end: 0.12, text: "P Wave" },
            { start: 0.12, end: 0.15, text: "PR Interval" },
            { start: 0.15, end: 0.21, text: "QRS Complex" },
            { start: 0.21, end: 0.60, text: "Long ST" },
            { start: 0.60, end: 0.85, text: "Late T Wave" },
            { start: 0.85, end: 1.00, text: "Resting" }
        ],
        ap: [
            { x: 0,    y: 0.9,  phase: 4 }, 
            { x: 0.1,  y: 0.9,  phase: 4 },
            { x: 0.12, y: 0.1,  phase: 0 }, 
            { x: 0.18, y: 0.18, phase: 2 }, // Plateau start
            { x: 0.60, y: 0.25, phase: 3 }, // Late Repol start
            { x: 0.85, y: 0.9,  phase: 4 }, 
            { x: 1.0,  y: 0.9,  phase: 4 }
        ],
        ecg: [
            { x: 0, y: 0.7 }, { x: 0.05, y: 0.7 }, { x: 0.075, y: 0.62 }, { x: 0.1, y: 0.7 },
            { x: 0.14, y: 0.7 },
            { x: 0.15, y: 0.75 }, { x: 0.17, y: 0.2 }, { x: 0.19, y: 0.85 }, { x: 0.21, y: 0.7 },
            { x: 0.60, y: 0.7 }, 
            { x: 0.75, y: 0.6 }, { x: 0.85, y: 0.7 }, 
            { x: 1.0, y: 0.7 }
        ]
    },

    'verapamil': {
        name: "Class IV: Verapamil",
        theme: "theme-ca",
        barColor: "bg-amber-400",
        desc: "Blocks Ca²⁺ channels. Shortens Phase 2 (Plateau). Main effect is AV Nodal blocking (↑ PR Interval).",
        speedMod: 0.9,
        ecgRegions: [
            { start: 0.00, end: 0.05, text: "Resting" },
            { start: 0.05, end: 0.12, text: "P Wave" },
            { start: 0.12, end: 0.18, text: "Prolonged PR" }, // Extended PR
            { start: 0.18, end: 0.25, text: "QRS Complex" },
            { start: 0.25, end: 0.40, text: "Short ST" },
            { start: 0.40, end: 0.60, text: "T Wave" },
            { start: 0.60, end: 1.00, text: "Resting" }
        ],
        ap: [
            { x: 0,    y: 0.9,  phase: 4 }, 
            { x: 0.1,  y: 0.9,  phase: 4 },
            { x: 0.12, y: 0.1,  phase: 0 }, 
            { x: 0.18, y: 0.18, phase: 2 }, // Plateau start
            { x: 0.35, y: 0.25, phase: 3 }, // Early Repol start
            { x: 0.55, y: 0.9,  phase: 4 }, 
            { x: 1.0,  y: 0.9,  phase: 4 }
        ],
        ecg: [
            { x: 0, y: 0.7 }, { x: 0.05, y: 0.7 }, { x: 0.075, y: 0.62 }, { x: 0.1, y: 0.7 },
            { x: 0.18, y: 0.7 }, 
            { x: 0.19, y: 0.75 }, { x: 0.21, y: 0.2 }, { x: 0.23, y: 0.85 }, { x: 0.25, y: 0.7 },
            { x: 0.35, y: 0.7 }, 
            { x: 0.45, y: 0.6 }, { x: 0.55, y: 0.7 }, 
            { x: 1.0, y: 0.7 }
        ]
    },

    'metoprolol': {
        name: "Beta Blocker: Metoprolol",
        theme: "theme-rate",
        barColor: "bg-emerald-500",
        desc: "Blocks sympathetic beta-receptors. Decreases SA node firing (↓ HR) and slows AV conduction (↑ PR Interval).",
        speedMod: 0.6,
        ecgRegions: [
            { start: 0.00, end: 0.05, text: "Resting" },
            { start: 0.05, end: 0.12, text: "P Wave" },
            { start: 0.12, end: 0.18, text: "Prolonged PR" }, // Extended PR
            { start: 0.18, end: 0.25, text: "QRS Complex" },
            { start: 0.25, end: 0.50, text: "ST Segment" },
            { start: 0.50, end: 0.75, text: "T Wave" },
            { start: 0.75, end: 1.00, text: "Resting" }
        ],
        ap: [
            { x: 0,    y: 0.9,  phase: 4 }, 
            { x: 0.15, y: 0.9,  phase: 4 }, // Longer rest
            { x: 0.17, y: 0.1,  phase: 0 }, 
            { x: 0.23, y: 0.18, phase: 2 }, 
            { x: 0.50, y: 0.25, phase: 3 }, 
            { x: 0.70, y: 0.9,  phase: 4 },
            { x: 1.0,  y: 0.9,  phase: 4 }
        ],
        ecg: [
            { x: 0, y: 0.7 }, { x: 0.05, y: 0.7 }, { x: 0.075, y: 0.62 }, { x: 0.1, y: 0.7 },
            { x: 0.18, y: 0.7 }, 
            { x: 0.19, y: 0.75 }, { x: 0.21, y: 0.2 }, { x: 0.23, y: 0.85 }, { x: 0.25, y: 0.7 },
            { x: 0.50, y: 0.7 },
            { x: 0.60, y: 0.6 }, { x: 0.70, y: 0.7 },
            { x: 1.0, y: 0.7 }
        ]
    },

    'ivabradine': {
        name: "Ivabradine",
        theme: "theme-rate",
        barColor: "bg-emerald-500",
        desc: "Selectively inhibits the funny current (If) in SA node. Pure heart rate reduction. No effect on contractility or repolarization.",
        speedMod: 0.5,
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
            { x: 0,    y: 0.9,  phase: 4 }, 
            { x: 0.12, y: 0.1,  phase: 0 }, 
            { x: 0.18, y: 0.18, phase: 2 }, 
            { x: 0.45, y: 0.25, phase: 3 }, 
            { x: 0.65, y: 0.9,  phase: 4 }, 
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

    'adenosine': {
        name: "Adenosine",
        theme: "theme-rate",
        barColor: "bg-emerald-600",
        desc: "Transient complete AV block. Hyperpolarizes AV node. Visualized here as a P-wave followed by a dropped beat.",
        speedMod: 0.7,
        ecgRegions: [
            { start: 0.00, end: 0.05, text: "Resting" },
            { start: 0.05, end: 0.12, text: "P Wave" },
            { start: 0.12, end: 1.00, text: "Dropped Beat" } // Special region
        ],
        ap: [
            { x: 0, y: 0.9, phase: 4 }, 
            { x: 1.0, y: 0.9, phase: 4 }
        ],
        ecg: [
            { x: 0, y: 0.7 }, { x: 0.05, y: 0.7 }, { x: 0.075, y: 0.62 }, { x: 0.1, y: 0.7 },
            { x: 0.15, y: 0.7 }, { x: 1.0, y: 0.7 }
        ]
    },

    'digoxin': {
        name: "Digoxin",
        theme: "theme-rate",
        barColor: "bg-emerald-700",
        desc: "Increases vagal tone (↑ PR). Hallmark: 'Scooped' or down-sloping ST segment depression.",
        speedMod: 0.9,
        ecgRegions: [
            { start: 0.00, end: 0.05, text: "Resting" },
            { start: 0.05, end: 0.12, text: "P Wave" },
            { start: 0.12, end: 0.18, text: "Prolonged PR" },
            { start: 0.18, end: 0.25, text: "QRS Complex" },
            { start: 0.25, end: 0.45, text: "Scooped ST" }, // Special region
            { start: 0.45, end: 0.70, text: "T Wave" },
            { start: 0.70, end: 1.00, text: "Resting" }
        ],
        ap: [
            { x: 0,    y: 0.9,  phase: 4 }, 
            { x: 0.1,  y: 0.9,  phase: 4 },
            { x: 0.12, y: 0.1,  phase: 0 }, 
            { x: 0.18, y: 0.18, phase: 2 }, // Plateau start
            { x: 0.35, y: 0.35, phase: 3 }, // Repol start (early)
            { x: 0.55, y: 0.9,  phase: 4 }, 
            { x: 1.0,  y: 0.9,  phase: 4 }
        ],
        ecg: [
            { x: 0, y: 0.7 }, { x: 0.05, y: 0.7 }, { x: 0.075, y: 0.62 }, { x: 0.1, y: 0.7 },
            { x: 0.18, y: 0.7 }, 
            { x: 0.19, y: 0.75 }, { x: 0.21, y: 0.2 }, { x: 0.23, y: 0.85 }, { x: 0.25, y: 0.7 },
            { x: 0.35, y: 0.75 }, // Dip
            { x: 0.45, y: 0.72 }, // Rise
            { x: 0.55, y: 0.65 }, { x: 0.65, y: 0.7 },
            { x: 1.0, y: 0.7 }
        ]
    }, 
    'hyperkalemia': {
        name: "Hyperkalemia (High K⁺)",
        theme: "theme-lyte",
        barColor: "bg-red-500",
        desc: "Resting membrane potential becomes less negative. Na⁺ channels inactivate. Slows conduction (Wide QRS). Rapid repolarization creates Peaked T waves.",
        speedMod: 1.0,
        ecgRegions: [
            { start: 0.00, end: 0.05, text: "Resting" },
            { start: 0.05, end: 0.12, text: "Flat P Wave" }, // Flattened P
            { start: 0.12, end: 0.15, text: "PR Interval" },
            { start: 0.15, end: 0.30, text: "Wide QRS" },    // Widened QRS
            { start: 0.30, end: 0.40, text: "ST Segment" },
            { start: 0.40, end: 0.65, text: "Peaked T Wave" }, // Tall T
            { start: 0.65, end: 1.00, text: "Resting" }
        ],
        ap: [
            { x: 0,    y: 0.8,  phase: 4 }, 
            { x: 0.1,  y: 0.8,  phase: 0 }, // Upstroke start
            { x: 0.18, y: 0.15, phase: 1 }, // Notch start
            { x: 0.20, y: 0.2,  phase: 2 }, // Plateau start
            { x: 0.40, y: 0.25, phase: 3 }, // Fast Repol start
            { x: 0.60, y: 0.8,  phase: 4 }, // Back to RMP
            { x: 1.0,  y: 0.8,  phase: 4 }
        ],
        ecg: [
            { x: 0, y: 0.7 }, { x: 0.05, y: 0.7 }, { x: 0.075, y: 0.68 }, { x: 0.1, y: 0.7 },
            { x: 0.14, y: 0.7 },
            { x: 0.15, y: 0.75 }, { x: 0.20, y: 0.2 }, { x: 0.25, y: 0.85 }, { x: 0.28, y: 0.7 },
            { x: 0.40, y: 0.7 },
            { x: 0.50, y: 0.3 }, { x: 0.60, y: 0.7 },
            { x: 1.0, y: 0.7 }
        ]
    },

    'hypokalemia': {
        name: "Hypokalemia (Low K⁺)",
        theme: "theme-lyte",
        barColor: "bg-red-400",
        desc: "Hyperpolarization (Lower RMP). Phase 3 is delayed and flattened. Prominent U Wave appears after T wave.",
        speedMod: 1.0,
        ecgRegions: [
            { start: 0.00, end: 0.05, text: "Resting" },
            { start: 0.05, end: 0.12, text: "P Wave" },
            { start: 0.12, end: 0.15, text: "PR Interval" },
            { start: 0.15, end: 0.22, text: "QRS Complex" },
            { start: 0.22, end: 0.45, text: "ST Depression" }, // Sags slightly
            { start: 0.45, end: 0.70, text: "Flat T Wave" },   // Low T
            { start: 0.70, end: 0.90, text: "Prominent U Wave" }, // The U Wave!
            { start: 0.90, end: 1.00, text: "Resting" }
        ],
        ap: [
            { x: 0,    y: 0.95, phase: 4 }, 
            { x: 0.1,  y: 0.95, phase: 0 }, // Upstroke start
            { x: 0.12, y: 0.1,  phase: 1 }, 
            { x: 0.18, y: 0.18, phase: 2 }, // Plateau start
            { x: 0.45, y: 0.25, phase: 3 }, // Slow/Long Repol start
            { x: 0.80, y: 0.95, phase: 4 }, // Back to RMP (very late)
            { x: 1.0,  y: 0.95, phase: 4 }
        ],
        ecg: [
            { x: 0, y: 0.7 }, { x: 0.05, y: 0.7 }, { x: 0.075, y: 0.62 }, { x: 0.1, y: 0.7 },
            { x: 0.14, y: 0.7 },
            { x: 0.15, y: 0.75 }, { x: 0.17, y: 0.2 }, { x: 0.19, y: 0.85 }, { x: 0.21, y: 0.7 },
            { x: 0.45, y: 0.75 }, 
            { x: 0.55, y: 0.7 }, { x: 0.65, y: 0.75 }, 
            { x: 0.70, y: 0.75 }, { x: 0.80, y: 0.68 }, { x: 0.90, y: 0.75 },
            { x: 1.0, y: 0.75 }
        ]
    }
};
