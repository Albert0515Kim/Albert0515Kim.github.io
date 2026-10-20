// Branching node graph echoing Dendritic's flowchart study sets (and its logo).
const pts: [number, number][] = [
  [200, 40], [120, 100], [280, 95], [70, 170], [165, 165], [245, 175], [330, 160],
  [40, 245], [110, 240], [200, 250], [290, 245], [360, 230], [150, 310], [250, 315],
];
const edges: [number, number][] = [
  [0, 1], [0, 2], [1, 3], [1, 4], [2, 5], [2, 6], [3, 7], [3, 8], [4, 8], [4, 9],
  [5, 9], [5, 10], [6, 10], [6, 11], [8, 12], [9, 12], [9, 13], [10, 13],
];

export function DendriticNetwork({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 350" className={className} aria-hidden="true">
      <defs>
        <radialGradient id="dn-glow">
          <stop offset="0%" stopColor="#7fd6a8" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#7fd6a8" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g stroke="#7fd6a8" strokeOpacity="0.35" strokeWidth="1">
        {edges.map(([a, b], i) => (
          <line key={i} x1={pts[a][0]} y1={pts[a][1]} x2={pts[b][0]} y2={pts[b][1]} />
        ))}
      </g>
      <g stroke="#a8c7fa" strokeOpacity="0.8" strokeWidth="1.1" fill="none" strokeDasharray="3 5" className="[animation:dash-flow_2.4s_linear_infinite]">
        <polyline points={[0, 1, 4, 9, 13].map((i) => pts[i].join(",")).join(" ")} />
      </g>
      {pts.map(([x, y], i) => (
        <g key={i}>
          {i === 0 || i === 9 ? <circle cx={x} cy={y} r="18" fill="url(#dn-glow)" /> : null}
          <circle cx={x} cy={y} r={i === 0 ? 5 : 3.2} fill="#08090b" stroke="#7fd6a8" strokeWidth="1.2" />
        </g>
      ))}
    </svg>
  );
}
