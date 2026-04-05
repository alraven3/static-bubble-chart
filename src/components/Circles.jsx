// Bubbles.jsx
export const Circles = ({ data, xScale, yScale, sizeScale, colorScale }) => {
  return (
    <>
      {data.map((d, i) => (
        <circle
          key={i} 
          cx={xScale(d.gdpPercap)}
          cy={yScale(d.lifeExp)}
          r={sizeScale(d.pop)}
          opacity={0.7}
          strokeWidth={1}
          fill={colorScale(d.continent)}
        />
      ))}
    </>
  );
};