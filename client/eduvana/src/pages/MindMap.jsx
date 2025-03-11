import React from "react";
import ReactFlow, { Controls, Background} from "reactflow";
import "reactflow/dist/style.css";
import dagre from "dagre";

const nodeWidth = 150;
const nodeHeight = 50;

// Function to generate a DAG layout
const getLayoutedElements = (nodes, edges) => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));
  dagreGraph.setGraph({ rankdir: "TB" });

  nodes.forEach((node) => dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight }));
  edges.forEach((edge) => dagreGraph.setEdge(edge.source, edge.target));

  dagre.layout(dagreGraph);

  return nodes.map((node) => {
    const { x, y } = dagreGraph.node(node.id);
    return { ...node, position: { x, y } };
  });
};

function MindMap({ mindmap }) {
  if (!mindmap) return <p>No mind map data available.</p>;

  const nodes = [{ id: "main", data: { label: mindmap.main_topic }, position: { x: 250, y: 50 } }];
  const edges = [];

  mindmap.subtopics.forEach((subtopic, index) => {
    const subtopicId = `sub-${index}`;
    nodes.push({ id: subtopicId, data: { label: subtopic.title }, position: { x: 0, y: 0 } });

    edges.push({ id: `edge-${index}`, source: "main", target: subtopicId });

    subtopic.details.forEach((detail, detailIndex) => {
      const detailId = `detail-${index}-${detailIndex}`;
      nodes.push({ id: detailId, data: { label: detail }, position: { x: 0, y: 0 } });

      edges.push({ id: `edge-detail-${index}-${detailIndex}`, source: subtopicId, target: detailId });
    });
  });

  // Apply auto layout
  const layoutedNodes = getLayoutedElements(nodes, edges);

  return (
    <div style={{ width: "100%", height: "500px", border: "1px solid #ccc", borderRadius: "10px" }}>
      <ReactFlow
        nodes={layoutedNodes}
        edges={edges}
        fitView
        panOnDrag
        zoomOnScroll
      >
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
}

export default MindMap;
