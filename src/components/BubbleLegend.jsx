const DASH_WIDTH = 60;
const LABEL_PADDING = 5;

export const BubbleLegend = ({ scale, tickNumber = 4 }) => {
  // 1. Générer les ticks (méthode native de l'objet scale)
  const ticks = scale.ticks(tickNumber);
  
  if (!scale || ticks.length === 0) return null;

  // 2. Calculs basés sur les méthodes de l'objet scale
  const maxValue = ticks[ticks.length - 1];
  const maxRadius = scale(maxValue); // On appelle scale comme une fonction
  const diameter = maxRadius * 2;

  const legendWidth = diameter + DASH_WIDTH + 80; 
  const legendHeight = diameter + 20; 

  // Ligne de base pour aligner les cercles par le bas
  const baseLineY = legendHeight - 10; 

  const circles = ticks.map((tick, i) => {
    const radius = scale(tick);
    const cx = radius; 
    const cy = baseLineY - radius; 
    const lineY = cy - radius;

    return (
      <g key={i} className="bubble-legend-item">
        <circle
          cx={cx}
          cy={cy}
          r={radius}
          fill="none"
          stroke="lavender"
          strokeWidth={1.5}
          opacity={0.8}
        />
        <line
          x1={cx}
          y1={lineY}
          x2={cx + DASH_WIDTH}
          y2={lineY}
          stroke="lavender"
          strokeDasharray="4,4"
          strokeWidth={1}
          opacity={0.6}
        />
        <text
          x={cx + DASH_WIDTH + LABEL_PADDING}
          y={lineY}
          fontSize={11}
          alignmentBaseline="middle"
          fill="lavender"
        >
          {typeof tick === 'number' ? tick.toLocaleString() : tick}
        </text>
      </g>
    );
  });

  return (
    <svg 
      width={legendWidth} 
      height={legendHeight} 
      style={{ overflow: 'visible' }}
      className="bubble-legend"
    >
      <g>{circles}</g>
    </svg>
  );
};