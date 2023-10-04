'use client'
import React from "react";
import Tree from "react-d3-tree";
import orgChartJson from "./nodes.json";
import { useCallback, useState } from "react";
import "./styles.css";

const containerStyles = {
  width: "100vw",
  height: "100vh",
  backgroundColor: "white"
};

export const useCenteredTree = (defaultTranslate = { x: 0, y: 0 }) => {
  const [translate, setTranslate] = useState(defaultTranslate);
  const containerRef = useCallback((containerElem) => {
    if (containerElem !== null) {
      const { width, height } = containerElem.getBoundingClientRect();
      setTranslate({ x: width / 2, y: height / 5 });
    }
  }, []);
  return [translate, containerRef];
};


// Here we're using `renderCustomNodeElement` to represent each node
// as an SVG `rect` instead of the default `circle`.
const renderRectSvgNode = ({ nodeDatum, toggleNode }) => (
  <g>
    <circle r="10" onClick={toggleNode} />
    <text fill="black" strokeWidth="1" x="20">
      {nodeDatum.name}
    </text>
    {nodeDatum.attributes?.query && (<>
      <text fill="black" x="20" dy="20" strokeWidth="1">
        {nodeDatum.attributes?.query}
      </text></>
    )}
  </g>
);

export default function Database() {
  const [translate, containerRef] = useCenteredTree();
  return (
    <div style={containerStyles} ref={containerRef}>
      <Tree
        data={orgChartJson}
        translate={translate}
        renderCustomNodeElement={renderRectSvgNode}
        orientation="vertical"
      />
    </div>
  );
}
