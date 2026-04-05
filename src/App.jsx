import './App.css'

import * as d3 from "d3";
import { AxisBottom } from "./components/AxisBottom";
import { AxisLeft } from "./components/AxisLeft";
import { Circles } from "./components/Circles";
import { BubbleLegend } from './components/BubbleLegend';
import { ColorLegend } from './components/ColorLegend';
import { data } from "./data";
console.log(data);

const MARGIN = { top: 30, right: 50, bottom: 50, left: 60 };
const width = 800;
const height = 500;

export default function App() {
  const boundsWidth = width - MARGIN.left - MARGIN.right;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  const xScale = d3.scaleLinear().domain([0, d3.max(data,d=>d.gdpPercap)]).range([0, boundsWidth]);
  const yScale = d3.scaleLinear().domain([35, d3.max(data,d=>d.lifeExp)]).range([boundsHeight, 0]);
  const maxPop = d3.max(data, d=>d.pop);
  const sizeScale = d3.scaleSqrt()
    .domain([0, maxPop])
    .range([2, 30]);
  const colorScale = d3.scaleOrdinal()
    .domain(["Europe","Asia","Africa","Americas","Oceania"])
    .range(['#0072B2', '#F0E442', '#D55E00', '#E69F00', '#56B4E9']); 

  return (
    <div className="chart">
      <h1>Static Bubble Chart</h1>
      <svg width={width} height={height} className="chartArea">
        <g transform={`translate(${MARGIN.left}, ${MARGIN.top})`}>
          <Circles 
            data={data}
            xScale={xScale}
            yScale={yScale}
            sizeScale={sizeScale}
            colorScale={colorScale}
          />

          <g transform={`translate(0, ${boundsHeight})`}>
            <AxisBottom 
              xScale={xScale} 
              pixelsPerTick={60} 
              boundsHeight={boundsHeight} 
              label="GDP per capita"
            />
          </g>

          <AxisLeft 
            yScale={yScale} 
            pixelsPerTick={40} 
            boundsWidth={boundsWidth}
            label="Life expectancy"
          />
        </g>
      </svg>
      <div style={{ position: "absolute", right: 200, bottom: 200 }}>
        <p>Population</p>
        <BubbleLegend scale={sizeScale} tickNumber={4} />
        <p>Continent</p>
        <ColorLegend scale={colorScale} />
      </div>
      <p>Source: Gapminder</p>
    </div>
  );
}