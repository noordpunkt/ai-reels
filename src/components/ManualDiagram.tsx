import { interpolate, useCurrentFrame } from "remotion";

export const ManualDiagram: React.FC<{
  title: string;
  nodes: string[];
  ink?: boolean;
}> = ({ title, nodes, ink = false }) => {
  const frame = useCurrentFrame();
  const draw = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const stroke = ink ? "#141412" : "#F2F2F2";

  return (
    <div
      style={{
        position: "absolute",
        left: 64,
        right: 64,
        bottom: 120,
        opacity: 0.92,
      }}
    >
      <svg viewBox="0 0 952 160" width="952" height="160">
        <text
          x="0"
          y="28"
          fill={stroke}
          fontSize="18"
          letterSpacing="0.22em"
          fontFamily="ui-sans-serif, system-ui, sans-serif"
        >
          {title}
        </text>
        {nodes.map((node, i) => {
          const x = 20 + i * 230;
          return (
            <g key={node} opacity={draw}>
              <rect
                x={x}
                y="52"
                width="170"
                height="70"
                fill="none"
                stroke={stroke}
                strokeWidth="2"
              />
              <text
                x={x + 85}
                y="94"
                textAnchor="middle"
                fill={stroke}
                fontSize="20"
                fontFamily="ui-sans-serif, system-ui, sans-serif"
                letterSpacing="0.08em"
              >
                {node}
              </text>
              {i < nodes.length - 1 ? (
                <path
                  d={`M${x + 170} 87 L${x + 230} 87`}
                  stroke={stroke}
                  strokeWidth="2"
                  markerEnd="url(#arrow)"
                />
              ) : null}
            </g>
          );
        })}
        <defs>
          <marker
            id="arrow"
            markerWidth="8"
            markerHeight="8"
            refX="6"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L6,3 L0,6" fill="none" stroke={stroke} />
          </marker>
        </defs>
      </svg>
    </div>
  );
};
