const TICK_LENGTH = 6;

export const AxisBottom = ({ xScale, pixelsPerTick, boundsHeight,label }) => {
  const range = xScale.range();
  const width = range[1] - range[0];
  const numberOfTicksTarget = Math.floor(width / pixelsPerTick);

  return (
    <>
      <line
        x1={range[0]} y1={0} x2={range[1]} y2={0}
        stroke="lavender"
      />
      {xScale.ticks(numberOfTicksTarget).map((value) => (
        <g key={value} transform={`translate(${xScale(value)}, 0)`}>
          <line 
            y1={0}
            y2={-boundsHeight}
            stroke="lavender"
            opacity={.2}
          />
          <line y2={TICK_LENGTH} stroke="lavender" />
          <text
            style={{
              fontSize: "12px",
              textAnchor: "middle",
              transform: "translateY(20px)",
              fill: "lavender"
            }}
          >
            {value}
          </text>
        </g>
      ))}
      {label && (
        <text
          x={width / 2}
          y={45}
          fontSize={17}
          textAnchor="middle"
          fill="lavender"
        >
          {label}
        </text>
      )}
    </>
  );
};