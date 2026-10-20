// System sketch of the Cargoline rebuild: React client → Node REST API → MySQL,
// with CRM records mapped into QuickBooks form fields instead of re-typed by hand.

const nodes = [
  { x: 40, y: 70, w: 150, label: "React client", sub: "Employees & accountants" },
  { x: 250, y: 70, w: 150, label: "Node.js REST API", sub: "Redesigned data models" },
  { x: 250, y: 200, w: 150, label: "MySQL", sub: "CRM records" },
  { x: 460, y: 135, w: 150, label: "QuickBooks", sub: "Form fields, auto-filled" },
];

export function CargolineBlueprint({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 650 290" className={className} role="img" aria-labelledby="cargoline-diagram-title">
      <title id="cargoline-diagram-title">
        Diagram: a React client calls a Node.js REST API backed by MySQL, which transfers CRM records into QuickBooks form fields.
      </title>
      <defs>
        <marker id="cl-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0,0 L8,4 L0,8" fill="none" stroke="#a8c7fa" strokeWidth="1.2" />
        </marker>
      </defs>
      <g fill="none" stroke="#a8c7fa" strokeWidth="1.2" strokeDasharray="4 4" markerEnd="url(#cl-arrow)" className="[animation:dash-flow_1.6s_linear_infinite]">
        <path d="M190 100 H246" />
        <path d="M325 130 V196" />
        <path d="M400 230 C 440 230, 430 165, 456 165" />
      </g>
      <g fill="none" stroke="#e8a25c" strokeWidth="1.2" strokeDasharray="2 6">
        <path d="M400 100 C 440 100, 430 150, 456 156" opacity="0.55" />
      </g>
      {nodes.map((n) => (
        <g key={n.label} transform={`translate(${n.x} ${n.y})`}>
          <rect width={n.w} height="60" rx="6" fill="#0d1118" stroke="#a8c7fa" strokeOpacity="0.45" />
          <text x="14" y="26" fill="#f5f5f2" fontSize="14" fontFamily="var(--font-geist)" fontWeight="500">
            {n.label}
          </text>
          <text x="14" y="45" fill="#9398a2" fontSize="10.5" fontFamily="var(--font-jetbrains)">
            {n.sub}
          </text>
        </g>
      ))}
      <text x="40" y="36" fill="#5d626b" fontSize="10" fontFamily="var(--font-jetbrains)" letterSpacing="2">
        FIG. 01 · SYSTEM SKETCH
      </text>
      <text x="460" y="262" fill="#e8a25c" fontSize="10" fontFamily="var(--font-jetbrains)" opacity="0.8">
        - - manual re-entry, retired
      </text>
    </svg>
  );
}
