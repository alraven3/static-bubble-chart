const TICK_LENGTH = 6;

export const AxisLeft = ({ yScale, pixelsPerTick, boundsWidth, label }) => {
  const range = yScale.range();
  const height = range[0] - range[1];
  const numberOfTicksTarget = Math.floor(height / pixelsPerTick);

  return (
    <>
      <path
        d={["M", 0, range[0], "L", 0, range[1]].join(" ")}
        stroke="lavender"
      />
      {yScale.ticks(numberOfTicksTarget).map((value) => (
        <g key={value} transform={`translate(0, ${yScale(value)})`}>
          <line 
            x1={0}
            x2={boundsWidth}
            stroke="lavender"
            opacity={.2}
          />
          <line x2={-TICK_LENGTH} stroke="lavender" />
          <text
            style={{
              fontSize: "12px",
              textAnchor: "middle",
              transform: "translateX(-20px)",
              fill: "lavender"
            }}
          >
            {value}
          </text>
        </g>
      ))}
      {label && (
        <text
          x={-height / 2}
          y={-45}
          fontSize={17}
          textAnchor="middle"
          transform="rotate(-90)"
          fill="lavender"
        >
          {label}
        </text>
      )}
    </>
  );
};