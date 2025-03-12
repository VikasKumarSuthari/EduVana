import React, { useCallback } from 'react';
import ReactFlow, { 
  Controls, 
  Background, 
  useNodesState, 
  useEdgesState,
  MarkerType
} from 'reactflow';
import 'reactflow/dist/style.css';
import dagre from 'dagre';

// Node width and height for layout calculation
const nodeWidth = 180;
const nodeHeight = 60;

// Custom node styles
const nodeStyles = {
  main: {
    background: '#4299e1',
    color: 'white',
    border: '1px solid #2b6cb0',
    borderRadius: '8px',
    padding: '10px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.15)',
    width: nodeWidth + 'px',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  subtopic: {
    background: '#48bb78',
    color: 'white',
    border: '1px solid #2f855a',
    borderRadius: '8px',
    padding: '10px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.15)',
    width: nodeWidth + 'px',
    textAlign: 'center'
  },
  detail: {
    background: '#faf089',
    color: '#1a202c',
    border: '1px solid #d69e2e',
    borderRadius: '8px',
    padding: '10px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.15)',
    width: nodeWidth + 'px',
    textAlign: 'center'
  }
};

// Edge styles
const edgeStyles = {
  stroke: '#64748b',
  strokeWidth: 2
};

// Function to create nodes and edges from mindmap data
const createGraphElements = (mindmap) => {
  if (!mindmap) return { initialNodes: [], initialEdges: [] };

  const initialNodes = [
    {
      id: 'main',
      data: { label: mindmap.main_topic },
      position: { x: 0, y: 0 },
      style: nodeStyles.main
    }
  ];

  const initialEdges = [];

  mindmap.subtopics.forEach((subtopic, subIndex) => {
    const subtopicId = `subtopic-${subIndex}`;
    
    // Add subtopic node
    initialNodes.push({
      id: subtopicId,
      data: { label: subtopic.title },
      position: { x: 0, y: 0 },
      style: nodeStyles.subtopic
    });

    // Connect main topic to subtopic
    initialEdges.push({
      id: `edge-main-to-${subtopicId}`,
      source: 'main',
      target: subtopicId,
      style: edgeStyles,
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 15,
        height: 15
      }
    });

    // Add detail nodes and connect them to subtopic
    subtopic.details.forEach((detail, detailIndex) => {
      const detailId = `detail-${subIndex}-${detailIndex}`;
      
      initialNodes.push({
        id: detailId,
        data: { label: detail },
        position: { x: 0, y: 0 },
        style: nodeStyles.detail
      });

      initialEdges.push({
        id: `edge-${subtopicId}-to-${detailId}`,
        source: subtopicId,
        target: detailId,
        style: edgeStyles,
        markerEnd: {
          type: MarkerType.ArrowClosed,
          width: 15,
          height: 15
        }
      });
    });
  });

  return { initialNodes, initialEdges };
};

// Apply dagre layout to organize the graph
const getLayoutedElements = (nodes, edges, direction = 'TB') => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  return nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    return {
      ...node,
      position: {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2
      }
    };
  });
};

function MindMap({ mindmap }) {
  const { initialNodes, initialEdges } = createGraphElements(mindmap);
  
  // Apply layout to initial nodes
  const layoutedNodes = getLayoutedElements(initialNodes, initialEdges);
  
  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Recalculate layout when mindmap changes
  React.useEffect(() => {
    if (mindmap) {
      const { initialNodes, initialEdges } = createGraphElements(mindmap);
      const layoutedNodes = getLayoutedElements(initialNodes, initialEdges);
      setNodes(layoutedNodes);
      setEdges(initialEdges);
    }
  }, [mindmap, setNodes, setEdges]);

  // Ensure the graph stays centered
  const onLayout = useCallback(
    (direction) => {
      const layoutedNodes = getLayoutedElements(nodes, edges, direction);
      setNodes([...layoutedNodes]);
    },
    [nodes, edges, setNodes]
  );

  if (!mindmap) return <p>No mind map data available.</p>;

  return (
    <div className="mindmap-container">
      <h2 className="mb-4 text-xl font-bold">Mind Map: {mindmap.main_topic}</h2>
      <div style={{ width: '100%', height: '70vh', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          minZoom={0.5}
          maxZoom={1.5}
          defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
        >
          <Controls />
          <Background variant="dots" gap={12} size={1} />
        </ReactFlow>
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={() => onLayout('TB')}
          className="mx-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Vertical Layout
        </button>
        <button
          onClick={() => onLayout('LR')}
          className="mx-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Horizontal Layout
        </button>
      </div>
    </div>
  );
}

export default MindMap;