const ITEM_HEIGHT = 25; // Hauteur de chaque ligne
const SWATCH_SIZE = 16; // Taille du carré de couleur
const LABEL_PADDING = 8; // Espace entre le carré et le texte

export const ColorLegend = ({ scale }) => {
  const domains = scale.domain();

  if (!scale || domains.length === 0) return null;

  // Calcul de la hauteur totale du SVG
  const legendHeight = domains.length * ITEM_HEIGHT + 20; // +20 pour les marges
  const legendWidth = 150; // Largeur fixe suffisante pour les noms

  return (
    <svg 
      width={legendWidth} 
      height={legendHeight} 
      style={{ overflow: 'visible' }}
      className="color-legend"
    >

      <g transform={`translate(0, 20)`}>
        {domains.map((continent, i) => {
          const y = i * ITEM_HEIGHT;
          const color = scale(continent);

          return (
            <g key={continent} transform={`translate(0, ${y})`}>
              {/* Carré de couleur (Swatch) */}
              <rect
                width={SWATCH_SIZE}
                height={SWATCH_SIZE}
                fill={color}
                rx={2} // Coins légèrement arrondis
              />
              
              {/* Texte du continent */}
              <text
                x={SWATCH_SIZE + LABEL_PADDING}
                y={SWATCH_SIZE / 1.2} // Centrage vertical par rapport au carré
                fontSize={12}
                alignmentBaseline="middle"
                fill="lavender"
              >
                {continent}
              </text>
            </g>
          );
        })}
      </g>
    </svg>
  );
};