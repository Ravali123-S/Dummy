import { useCallback } from 'react';
import {
  ReactFlow,
  ReactFlowProvider,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  Controls,
  Background,
  MiniMap,
  useReactFlow
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import FiberDeviceNode from './FiberDeviceNode';

const nodeTypes = { fiberDevice: FiberDeviceNode };

// function FlowContent({ onElementSelect, nodes, setNodes, edges, setEdges }) { //below for sub clicks
  function FlowContent({ onElementSelect, nodes, setNodes, edges, setEdges, onDrillDown }) {

  const { screenToFlowPosition } = useReactFlow();

  const onNodesChange = useCallback((changes) => {
    setNodes((nds) => applyNodeChanges(changes, nds));
  }, [setNodes]);

  const onEdgesChange = useCallback((changes) => {
    setEdges((eds) => applyEdgeChanges(changes, eds));
  }, [setEdges]);

  const onConnect = useCallback((params) => {
    setEdges((eds) => addEdge({
      ...params,
      id: `edge-${params.source}-${params.target}-${Date.now()}`,
      label: 'Fiber Link',
      animated: true,
      style: { stroke: '#4A5B6E', strokeWidth: 2 },
      labelStyle: { fill: '#A0AEC0', fontWeight: 500, fontSize: '11px' },
      labelShowBg: true,
      labelBgStyle: { fill: '#23303D', stroke: '#4A5B6E' },
      labelBgPadding: [4, 4]
    }, eds));
  }, [setEdges]);

  const onDragOver = useCallback((e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback((event) => {
    event.preventDefault();
    const type = event.dataTransfer.getData('application/reactflow');
    if (!type) return;

    const position = screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    });

    // ✅ FIXED: Added 'data:' key
    const newNode = {
      id: `${type}-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      type: 'fiberDevice',
      position,
      data: { type, hostname: '', ip: '' }
    };

    setNodes((nds) => [...nds, newNode]);
  }, [screenToFlowPosition, setNodes]);

//   return (
//     <ReactFlow
//       nodes={nodes}
//       edges={edges}
//       onNodesChange={onNodesChange}
//       onEdgesChange={onEdgesChange}
//       onConnect={onConnect}
//       onDragOver={onDragOver}
//       onDrop={onDrop}
//       onNodeClick={(_, node) => onElementSelect({ type: 'node', id: node.id })}
//       onEdgeClick={(_, edge) => onElementSelect({ type: 'edge', id: edge.id })}
//       onPaneClick={() => onElementSelect(null)}
//       nodeTypes={nodeTypes}
//       fitView
//       fitViewOptions={{ padding: 0.2 }}
//       className="react-flow-container"
//     >
//       <Background color="#364452" gap={20} size={1} />
//       <Controls style={{ backgroundColor: '#23303D', color: '#FFF' }} />
//      <MiniMap
//   style={{ backgroundColor: '#111921' }}
//   nodeColor="#1a2530"  /* 🔹 Fixed color for ALL nodes */
//   nodeStrokeColor="#2D3B48"
//   nodeBorderRadius={8}
//   maskColor="rgba(0, 0, 0, 0.4)"
//   maskStrokeColor="rgba(0, 0, 0, 0.4)"
//   maskStrokeWidth={2}
// />
//     </ReactFlow>
//   );
// }

// export default function NetworkFlow(props) {
//   return <ReactFlowProvider><FlowContent {...props} /></ReactFlowProvider>;
// }
return (
    <ReactFlow
      onNodeDoubleClick={(_, node) => onDrillDown(node)}  // 👈 only new line 3rd attempt
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onNodeClick={(_, node) => onElementSelect({ type: 'node', id: node.id })}
      onEdgeClick={(_, edge) => onElementSelect({ type: 'edge', id: edge.id })}
      onPaneClick={() => onElementSelect(null)}
      onNodeDoubleClick={(_, node) => onDrillDown(node)}   // 👈 add this line 2nd
      nodeTypes={nodeTypes}
      fitView
      fitViewOptions={{ padding: 0.2 }}
      className="react-flow-container"
    >
      <Background color="#364452" gap={20} size={1} />
      <Controls style={{ backgroundColor: '#23303D', color: '#FFF' }} />
      <MiniMap
        style={{ backgroundColor: '#111921' }}
        nodeColor="#1a2530"
        nodeStrokeColor="#2D3B48"
        nodeBorderRadius={8}
        maskColor="rgba(0, 0, 0, 0.4)"
        maskStrokeColor="rgba(0, 0, 0, 0.4)"
        maskStrokeWidth={2}
      />
    </ReactFlow>
  );
}

export default function NetworkFlow(props) {
  return <ReactFlowProvider><FlowContent {...props} /></ReactFlowProvider>;
}

