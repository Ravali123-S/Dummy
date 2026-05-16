// // // // import { useState, useCallback } from 'react';
// // // // import DeviceSidebar from './components/DeviceSidebar';
// // // // import NetworkFlow from './components/NetworkFlow';
// // // // import PropertiesPanel from './components/PropertiesPanel';
// // // // import './App.css';

// // // // function App() {
// // // //   const [selectedElement, setSelectedElement] = useState(null);
  
// // // //   // Replace these two lines:
// // // // //const [nodes, setNodes] = useState([]);
// // // // //const [edges, setEdges] = useState([]);

// // // // // Replaced With these: samples if want clear this
// // // // const [nodes, setNodes] = useState([
// // // //   {
// // // //     id: "router-1746123456789-abc12",
// // // //     type: "fiberDevice",
// // // //     position: { x: 100, y: 200 },
// // // //     data: { type: "router", hostname: "core-router-01", ip: "192.168.1.1" }
// // // //   },
// // // //   {
// // // //     id: "switch-1746123456790-def34",
// // // //     type: "fiberDevice",
// // // //     position: { x: 350, y: 100 },
// // // //     data: { type: "switch", hostname: "dist-switch-01", ip: "192.168.1.2" }
// // // //   },
// // // //   {
// // // //     id: "switch-1746123456791-ghi56",
// // // //     type: "fiberDevice",
// // // //     position: { x: 350, y: 300 },
// // // //     data: { type: "switch", hostname: "dist-switch-02", ip: "192.168.1.3" }
// // // //   },
// // // //   {
// // // //     id: "olt-1746123456792-jkl78",
// // // //     type: "fiberDevice",
// // // //     position: { x: 600, y: 100 },
// // // //     data: { type: "olt", hostname: "olt-north-01", ip: "192.168.2.1" }
// // // //   },
// // // //   {
// // // //     id: "olt-1746123456793-mno90",
// // // //     type: "fiberDevice",
// // // //     position: { x: 600, y: 300 },
// // // //     data: { type: "olt", hostname: "olt-south-01", ip: "192.168.2.2" }
// // // //   },
// // // //   {
// // // //     id: "ont-1746123456794-pqr11",
// // // //     type: "fiberDevice",
// // // //     position: { x: 850, y: 50 },
// // // //     data: { type: "ont", hostname: "ont-home-01", ip: "192.168.3.1" }
// // // //   },
// // // //   {
// // // //     id: "ont-1746123456795-stu22",
// // // //     type: "fiberDevice",
// // // //     position: { x: 850, y: 170 },
// // // //     data: { type: "ont", hostname: "ont-home-02", ip: "192.168.3.2" }
// // // //   },
// // // //   {
// // // //     id: "ont-1746123456796-vwx33",
// // // //     type: "fiberDevice",
// // // //     position: { x: 850, y: 280 },
// // // //     data: { type: "ont", hostname: "ont-office-01", ip: "192.168.3.3" }
// // // //   },
// // // //   {
// // // //     id: "ont-1746123456797-yza44",
// // // //     type: "fiberDevice",
// // // //     position: { x: 850, y: 390 },
// // // //     data: { type: "ont", hostname: "ont-office-02", ip: "192.168.3.4" }
// // // //   }
// // // // ]);

// // // // const [edges, setEdges] = useState([
// // // //   {
// // // //     id: "edge-001",
// // // //     source: "router-1746123456789-abc12",
// // // //     target: "switch-1746123456790-def34",
// // // //     label: "10G Uplink", animated: true,
// // // //     style: { stroke: "#4A5B6E", strokeWidth: 2 },
// // // //     labelStyle: { fill: "#A0AEC0", fontWeight: 500, fontSize: "11px" },
// // // //     labelShowBg: true,
// // // //     labelBgStyle: { fill: "#23303D", stroke: "#4A5B6E" },
// // // //     labelBgPadding: [4, 4]
// // // //   },
// // // //   {
// // // //     id: "edge-002",
// // // //     source: "router-1746123456789-abc12",
// // // //     target: "switch-1746123456791-ghi56",
// // // //     label: "10G Uplink", animated: true,
// // // //     style: { stroke: "#4A5B6E", strokeWidth: 2 },
// // // //     labelStyle: { fill: "#A0AEC0", fontWeight: 500, fontSize: "11px" },
// // // //     labelShowBg: true,
// // // //     labelBgStyle: { fill: "#23303D", stroke: "#4A5B6E" },
// // // //     labelBgPadding: [4, 4]
// // // //   },
// // // //   {
// // // //     id: "edge-003",
// // // //     source: "switch-1746123456790-def34",
// // // //     target: "olt-1746123456792-jkl78",
// // // //     label: "1G Fiber", animated: true,
// // // //     style: { stroke: "#4A5B6E", strokeWidth: 2 },
// // // //     labelStyle: { fill: "#A0AEC0", fontWeight: 500, fontSize: "11px" },
// // // //     labelShowBg: true,
// // // //     labelBgStyle: { fill: "#23303D", stroke: "#4A5B6E" },
// // // //     labelBgPadding: [4, 4]
// // // //   },
// // // //   {
// // // //     id: "edge-004",
// // // //     source: "switch-1746123456791-ghi56",
// // // //     target: "olt-1746123456793-mno90",
// // // //     label: "1G Fiber", animated: true,
// // // //     style: { stroke: "#4A5B6E", strokeWidth: 2 },
// // // //     labelStyle: { fill: "#A0AEC0", fontWeight: 500, fontSize: "11px" },
// // // //     labelShowBg: true,
// // // //     labelBgStyle: { fill: "#23303D", stroke: "#4A5B6E" },
// // // //     labelBgPadding: [4, 4]
// // // //   },
// // // //   {
// // // //     id: "edge-005",
// // // //     source: "olt-1746123456792-jkl78",
// // // //     target: "ont-1746123456794-pqr11",
// // // //     label: "GPON Drop", animated: true,
// // // //     style: { stroke: "#4A5B6E", strokeWidth: 2 },
// // // //     labelStyle: { fill: "#A0AEC0", fontWeight: 500, fontSize: "11px" },
// // // //     labelShowBg: true,
// // // //     labelBgStyle: { fill: "#23303D", stroke: "#4A5B6E" },
// // // //     labelBgPadding: [4, 4]
// // // //   },
// // // //   {
// // // //     id: "edge-006",
// // // //     source: "olt-1746123456792-jkl78",
// // // //     target: "ont-1746123456795-stu22",
// // // //     label: "GPON Drop", animated: true,
// // // //     style: { stroke: "#4A5B6E", strokeWidth: 2 },
// // // //     labelStyle: { fill: "#A0AEC0", fontWeight: 500, fontSize: "11px" },
// // // //     labelShowBg: true,
// // // //     labelBgStyle: { fill: "#23303D", stroke: "#4A5B6E" },
// // // //     labelBgPadding: [4, 4]
// // // //   },
// // // //   {
// // // //     id: "edge-007",
// // // //     source: "olt-1746123456793-mno90",
// // // //     target: "ont-1746123456796-vwx33",
// // // //     label: "GPON Drop", animated: true,
// // // //     style: { stroke: "#4A5B6E", strokeWidth: 2 },
// // // //     labelStyle: { fill: "#A0AEC0", fontWeight: 500, fontSize: "11px" },
// // // //     labelShowBg: true,
// // // //     labelBgStyle: { fill: "#23303D", stroke: "#4A5B6E" },
// // // //     labelBgPadding: [4, 4]
// // // //   },
// // // //   {
// // // //     id: "edge-008",
// // // //     source: "olt-1746123456793-mno90",
// // // //     target: "ont-1746123456797-yza44",
// // // //     label: "GPON Drop", animated: true,
// // // //     style: { stroke: "#4A5B6E", strokeWidth: 2 },
// // // //     labelStyle: { fill: "#A0AEC0", fontWeight: 500, fontSize: "11px" },
// // // //     labelShowBg: true,
// // // //     labelBgStyle: { fill: "#23303D", stroke: "#4A5B6E" },
// // // //     labelBgPadding: [4, 4]
// // // //   }
// // // // ]);

// // // //   // ✅ Optional: Persist topology to localStorage
// // // //   const saveTopology = useCallback(() => {
// // // //     const topology = { nodes, edges, timestamp: new Date().toISOString() };
// // // //     localStorage.setItem('fiber-network-topology', JSON.stringify(topology));
// // // //   }, [nodes, edges]);

// // // //   const loadTopology = useCallback(() => {
// // // //     const saved = localStorage.getItem('fiber-network-topology');
// // // //     if (saved) {
// // // //       const { nodes: savedNodes, edges: savedEdges } = JSON.parse(saved);
// // // //       setNodes(savedNodes || []);
// // // //       setEdges(savedEdges || []);
// // // //     }
// // // //   }, []);

// // // //   return (
// // // //     <div className="app-layout">
// // // //       <DeviceSidebar onSave={saveTopology} onLoad={loadTopology} />
// // // //       <div className="flow-area">
// // // //         <NetworkFlow
// // // //           nodes={nodes}
// // // //           setNodes={setNodes}
// // // //           edges={edges}
// // // //           setEdges={setEdges}
// // // //           onElementSelect={setSelectedElement}
// // // //         />
// // // //       </div>
// // // //       <PropertiesPanel
// // // //         selectedElement={selectedElement}
// // // //         nodes={nodes}
// // // //         setNodes={setNodes}
// // // //         edges={edges}
// // // //         setEdges={setEdges}
// // // //       />
// // // //     </div>
// // // //   );
// // // // }

// // // // export default App;

// // // //Above code with static example of nodes in app.js
// // // //below code for sub clicks on node and updated networkflow.js

// // // // import { useState, useCallback } from 'react';
// // // // import DeviceSidebar from './components/DeviceSidebar';
// // // // import NetworkFlow from './components/NetworkFlow';
// // // // import PropertiesPanel from './components/PropertiesPanel';
// // // // import './App.css';

// // // // // ─── Sub-topology shown when drilling into a router ───────────────────────────
// // // // const ROUTER_RING_NODES = [
// // // //   { id: 'ring-r1', type: 'fiberDevice', position: { x: 400, y: 80  }, data: { type: 'router', hostname: 'ring-router-01', ip: '10.0.0.1' } },
// // // //   { id: 'ring-r2', type: 'fiberDevice', position: { x: 680, y: 220 }, data: { type: 'router', hostname: 'ring-router-02', ip: '10.0.0.2' } },
// // // //   { id: 'ring-r3', type: 'fiberDevice', position: { x: 580, y: 420 }, data: { type: 'router', hostname: 'ring-router-03', ip: '10.0.0.3' } },
// // // //   { id: 'ring-r4', type: 'fiberDevice', position: { x: 220, y: 420 }, data: { type: 'router', hostname: 'ring-router-04', ip: '10.0.0.4' } },
// // // //   { id: 'ring-r5', type: 'fiberDevice', position: { x: 120, y: 220 }, data: { type: 'router', hostname: 'ring-router-05', ip: '10.0.0.15' } },
// // // // ];

// // // // const edgeDefaults = {
// // // //   animated: true,
// // // //   style: { stroke: '#4A5B6E', strokeWidth: 2 },
// // // //   labelStyle: { fill: '#A0AEC0', fontWeight: 500, fontSize: '11px' },
// // // //   labelShowBg: true,
// // // //   labelBgStyle: { fill: '#23303D', stroke: '#4A5B6E' },
// // // //   labelBgPadding: [4, 4],
// // // // };

// // // // const ROUTER_RING_EDGES = [
// // // //   { id: 're-1', source: 'ring-r1', target: 'ring-r2', label: '10G Ring', ...edgeDefaults },
// // // //   { id: 're-2', source: 'ring-r2', target: 'ring-r3', label: '10G Ring', ...edgeDefaults },
// // // //   { id: 're-3', source: 'ring-r3', target: 'ring-r4', label: '10G Ring', ...edgeDefaults },
// // // //   { id: 're-4', source: 'ring-r4', target: 'ring-r5', label: '10G Ring', ...edgeDefaults },
// // // //   { id: 're-5', source: 'ring-r5', target: 'ring-r1', label: '10G Ring', ...edgeDefaults },
// // // // ];

// // // // // ─── Main topology (your existing static data) ────────────────────────────────
// // // // const INITIAL_NODES = [
// // // //   { id: 'router-1746123456789-abc12', type: 'fiberDevice', position: { x: 100, y: 200 }, data: { type: 'router', hostname: 'core-router-01', ip: '192.168.1.1' } },
// // // //   { id: 'switch-1746123456790-def34', type: 'fiberDevice', position: { x: 350, y: 100 }, data: { type: 'switch', hostname: 'dist-switch-01', ip: '192.168.1.2' } },
// // // //   { id: 'switch-1746123456791-ghi56', type: 'fiberDevice', position: { x: 350, y: 300 }, data: { type: 'switch', hostname: 'dist-switch-02', ip: '192.168.1.3' } },
// // // //   { id: 'olt-1746123456792-jkl78',    type: 'fiberDevice', position: { x: 600, y: 100 }, data: { type: 'olt',    hostname: 'olt-north-01',    ip: '192.168.2.1' } },
// // // //   { id: 'olt-1746123456793-mno90',    type: 'fiberDevice', position: { x: 600, y: 300 }, data: { type: 'olt',    hostname: 'olt-south-01',    ip: '192.168.2.2' } },
// // // //   { id: 'ont-1746123456794-pqr11',    type: 'fiberDevice', position: { x: 850, y: 50  }, data: { type: 'ont',    hostname: 'ont-home-01',     ip: '192.168.3.1' } },
// // // //   { id: 'ont-1746123456795-stu22',    type: 'fiberDevice', position: { x: 850, y: 170 }, data: { type: 'ont',    hostname: 'ont-home-02',     ip: '192.168.3.2' } },
// // // //   { id: 'ont-1746123456796-vwx33',    type: 'fiberDevice', position: { x: 850, y: 280 }, data: { type: 'ont',    hostname: 'ont-office-01',   ip: '192.168.3.3' } },
// // // //   { id: 'ont-1746123456797-yza44',    type: 'fiberDevice', position: { x: 850, y: 390 }, data: { type: 'ont',    hostname: 'ont-office-02',   ip: '192.168.3.4' } },
// // // // ];

// // // // const INITIAL_EDGES = [
// // // //   { id: 'edge-001', source: 'router-1746123456789-abc12', target: 'switch-1746123456790-def34', label: '10G Uplink', ...edgeDefaults },
// // // //   { id: 'edge-002', source: 'router-1746123456789-abc12', target: 'switch-1746123456791-ghi56', label: '10G Uplink', ...edgeDefaults },
// // // //   { id: 'edge-003', source: 'switch-1746123456790-def34', target: 'olt-1746123456792-jkl78',    label: '1G Fiber',   ...edgeDefaults },
// // // //   { id: 'edge-004', source: 'switch-1746123456791-ghi56', target: 'olt-1746123456793-mno90',    label: '1G Fiber',   ...edgeDefaults },
// // // //   { id: 'edge-005', source: 'olt-1746123456792-jkl78',    target: 'ont-1746123456794-pqr11',    label: 'GPON Drop',  ...edgeDefaults },
// // // //   { id: 'edge-006', source: 'olt-1746123456792-jkl78',    target: 'ont-1746123456795-stu22',    label: 'GPON Drop',  ...edgeDefaults },
// // // //   { id: 'edge-007', source: 'olt-1746123456793-mno90',    target: 'ont-1746123456796-vwx33',    label: 'GPON Drop',  ...edgeDefaults },
// // // //   { id: 'edge-008', source: 'olt-1746123456793-mno90',    target: 'ont-1746123456797-yza44',    label: 'GPON Drop',  ...edgeDefaults },
// // // // ];

// // // // // ─── Component ────────────────────────────────────────────────────────────────
// // // // function App() {
// // // //   const [selectedElement, setSelectedElement] = useState(null);
// // // //   const [nodes, setNodes] = useState(INITIAL_NODES);
// // // //   const [edges, setEdges] = useState(INITIAL_EDGES);

// // // //   // Navigation stack: each entry = { nodes, edges, label }
// // // //   const [navStack, setNavStack] = useState([]);

// // // //   const currentLabel = navStack.length > 0 ? navStack[navStack.length - 1].label : 'Main Topology';

// // // //   // Called from NetworkFlow when a router node is double-clicked
// // // //   const onDrillDown = useCallback((node) => {
// // // //     if (node.data.type !== 'router') return;

// // // //     // Save current view onto stack
// // // //     setNavStack((stack) => [...stack, {
// // // //       nodes, edges,
// // // //       label: currentLabel,
// // // //     }]);

// // // //     // Load ring sub-topology
// // // //     setNodes(ROUTER_RING_NODES);
// // // //     setEdges(ROUTER_RING_EDGES);
// // // //     setSelectedElement(null);
// // // //   }, [nodes, edges, currentLabel]);

// // // //   const onNavigateBack = useCallback(() => {
// // // //     if (navStack.length === 0) return;
// // // //     const prev = navStack[navStack.length - 1];
// // // //     setNodes(prev.nodes);
// // // //     setEdges(prev.edges);
// // // //     setNavStack((stack) => stack.slice(0, -1));
// // // //     setSelectedElement(null);
// // // //   }, [navStack]);

// // // //   const saveTopology = useCallback(() => {
// // // //     localStorage.setItem('fiber-network-topology', JSON.stringify({ nodes, edges, timestamp: new Date().toISOString() }));
// // // //   }, [nodes, edges]);

// // // //   const loadTopology = useCallback(() => {
// // // //     const saved = localStorage.getItem('fiber-network-topology');
// // // //     if (saved) {
// // // //       const { nodes: n, edges: e } = JSON.parse(saved);
// // // //       setNodes(n || []);
// // // //       setEdges(e || []);
// // // //     }
// // // //   }, []);

// // // //   return (
// // // //     <div className="app-layout">
// // // //       <DeviceSidebar onSave={saveTopology} onLoad={loadTopology} />

// // // //       <div className="flow-area" style={{ position: 'relative' }}>

// // // //         {/* ── Breadcrumb / Back bar ── */}
// // // //         <div style={{
// // // //           position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)',
// // // //           zIndex: 10, display: 'flex', alignItems: 'center', gap: 10,
// // // //           background: '#1a2530', border: '1px solid #2D3B48',
// // // //           borderRadius: 8, padding: '6px 14px', boxShadow: '0 2px 8px rgba(0,0,0,0.4)'
// // // //         }}>
// // // //           {navStack.length > 0 && (
// // // //             <button onClick={onNavigateBack} style={{
// // // //               background: '#2D3B48', border: 'none', color: '#A0AEC0',
// // // //               borderRadius: 6, padding: '4px 10px', cursor: 'pointer',
// // // //               fontSize: 13, display: 'flex', alignItems: 'center', gap: 4
// // // //             }}>
// // // //               ← Back
// // // //             </button>
// // // //           )}
// // // //           {navStack.map((entry, i) => (
// // // //             <span key={i} style={{ color: '#64748b', fontSize: 13 }}>
// // // //               {entry.label} /
// // // //             </span>
// // // //           ))}
// // // //           <span style={{ color: '#e2e8f0', fontSize: 13, fontWeight: 600 }}>
// // // //             {currentLabel}
// // // //           </span>
// // // //           {navStack.length === 0 && (
// // // //             <span style={{ color: '#4A5B6E', fontSize: 11, marginLeft: 4 }}>
// // // //               • Double-click a router to drill in
// // // //             </span>
// // // //           )}
// // // //         </div>

// // // //         <NetworkFlow
// // // //           nodes={nodes}
// // // //           setNodes={setNodes}
// // // //           edges={edges}
// // // //           setEdges={setEdges}
// // // //           onElementSelect={setSelectedElement}
// // // //           onDrillDown={onDrillDown}
// // // //         />
// // // //       </div>

// // // //       <PropertiesPanel
// // // //         selectedElement={selectedElement}
// // // //         nodes={nodes}
// // // //         setNodes={setNodes}
// // // //         edges={edges}
// // // //         setEdges={setEdges}
// // // //       />
// // // //     </div>
// // // //   );
// // // // }

// // // // export default App;


// // // //COMMENTED BEWLO CODE ON 9/5/26
// // // //new code 3rd attempt siblings when click previous parent
// // // // import { useState, useCallback } from 'react';
// // // // import DeviceSidebar from './components/DeviceSidebar';
// // // // import NetworkFlow from './components/NetworkFlow';
// // // // import PropertiesPanel from './components/PropertiesPanel';
// // // // import './App.css';

// // // // const edgeDefaults = {
// // // //   animated: true,
// // // //   style: { stroke: '#4A5B6E', strokeWidth: 2 },
// // // //   labelStyle: { fill: '#A0AEC0', fontWeight: 500, fontSize: '11px' },
// // // //   labelShowBg: true,
// // // //   labelBgStyle: { fill: '#23303D', stroke: '#4A5B6E' },
// // // //   labelBgPadding: [4, 4],
// // // // };

// // // // // ─── Sibling routers for each router in main topology ─────────────────────────
// // // // // When you drill into a router, these are the peers shown in the ring with it
// // // // const ROUTER_SIBLINGS = {
// // // //   'router-1746123456789-abc12': [
// // // //     { id: 'peer-r1', hostname: 'peer-router-A', ip: '10.0.1.1' },
// // // //     { id: 'peer-r2', hostname: 'peer-router-B', ip: '10.0.1.2' },
// // // //     { id: 'peer-r3', hostname: 'peer-router-C', ip: '10.0.1.3' },
// // // //     { id: 'peer-r4', hostname: 'peer-router-D', ip: '10.0.1.4' },
// // // //   ],
// // // // };

// // // // // ─── Build ring topology dynamically around the clicked router ────────────────
// // // // function buildRingTopology(clickedNode) {
// // // //   const siblings = ROUTER_SIBLINGS[clickedNode.id] || [
// // // //     { id: `${clickedNode.id}-peer1`, hostname: 'peer-router-01', ip: '10.0.0.1' },
// // // //     { id: `${clickedNode.id}-peer2`, hostname: 'peer-router-02', ip: '10.0.0.2' },
// // // //     { id: `${clickedNode.id}-peer3`, hostname: 'peer-router-03', ip: '10.0.0.3' },
// // // //     { id: `${clickedNode.id}-peer4`, hostname: 'peer-router-04', ip: '10.0.0.4' },
// // // //   ];

// // // //   // All nodes in the ring = clicked router + its siblings
// // // //   const allNodes = [clickedNode, ...siblings.map(s => ({
// // // //     id: s.id,
// // // //     type: 'fiberDevice',
// // // //     data: { type: 'router', hostname: s.hostname, ip: s.ip },
// // // //     position: { x: 0, y: 0 }, // overwritten below
// // // //   }))];

// // // //   const total = allNodes.length;
// // // //   const cx = 400, cy = 260, radius = 200;

// // // //   // Place all nodes evenly around a circle, clicked node at top (270°)
// // // //   const ringNodes = allNodes.map((node, i) => {
// // // //     const angleDeg = (360 / total) * i - 90; // start at top
// // // //     const angleRad = (angleDeg * Math.PI) / 180;
// // // //     return {
// // // //       ...node,
// // // //       position: {
// // // //         x: cx + radius * Math.cos(angleRad) - 60,
// // // //         y: cy + radius * Math.sin(angleRad) - 30,
// // // //       },
// // // //       // Highlight the clicked/origin router
// // // //       style: node.id === clickedNode.id
// // // //         ? { border: '2px solid #63b3ed', boxShadow: '0 0 12px rgba(99,179,237,0.5)' }
// // // //         : {},
// // // //     };
// // // //   });

// // // //   // Connect all nodes in a ring: 0→1→2→...→n→0
// // // //   const ringEdges = ringNodes.map((node, i) => {
// // // //     const next = ringNodes[(i + 1) % ringNodes.length];
// // // //     return {
// // // //       id: `ring-edge-${i}`,
// // // //       source: node.id,
// // // //       target: next.id,
// // // //       label: '11G Ring',
// // // //       ...edgeDefaults,
// // // //     };
// // // //   });

// // // //   return { ringNodes, ringEdges };
// // // // }

// // // // // ─── Main static topology ─────────────────────────────────────────────────────
// // // // const INITIAL_NODES = [
// // // //   { id: 'router-1746123456789-abc12', type: 'fiberDevice', position: { x: 100, y: 200 }, data: { type: 'router', hostname: 'core-router-01', ip: '192.168.1.1' } },
// // // //   { id: 'switch-1746123456790-def34', type: 'fiberDevice', position: { x: 350, y: 100 }, data: { type: 'switch', hostname: 'dist-switch-01', ip: '192.168.1.2' } },
// // // //   { id: 'switch-1746123456791-ghi56', type: 'fiberDevice', position: { x: 350, y: 300 }, data: { type: 'switch', hostname: 'dist-switch-02', ip: '192.168.1.3' } },
// // // //   { id: 'olt-1746123456792-jkl78',    type: 'fiberDevice', position: { x: 600, y: 100 }, data: { type: 'olt',    hostname: 'olt-north-01',    ip: '192.168.2.1' } },
// // // //   { id: 'olt-1746123456793-mno90',    type: 'fiberDevice', position: { x: 600, y: 300 }, data: { type: 'olt',    hostname: 'olt-south-01',    ip: '192.168.2.2' } },
// // // //   { id: 'ont-1746123456794-pqr11',    type: 'fiberDevice', position: { x: 850, y: 50  }, data: { type: 'ont',    hostname: 'ont-home-01',     ip: '192.168.3.1' } },
// // // //   { id: 'ont-1746123456795-stu22',    type: 'fiberDevice', position: { x: 850, y: 170 }, data: { type: 'ont',    hostname: 'ont-home-02',     ip: '192.168.3.2' } },
// // // //   { id: 'ont-1746123456796-vwx33',    type: 'fiberDevice', position: { x: 850, y: 280 }, data: { type: 'ont',    hostname: 'ont-office-01',   ip: '192.168.3.3' } },
// // // //   { id: 'ont-1746123456797-yza44',    type: 'fiberDevice', position: { x: 850, y: 390 }, data: { type: 'ont',    hostname: 'ont-office-02',   ip: '192.168.3.4' } },
// // // // ];

// // // // const INITIAL_EDGES = [
// // // //   { id: 'edge-001', source: 'router-1746123456789-abc12', target: 'switch-1746123456790-def34', label: '10G Uplink', ...edgeDefaults },
// // // //   { id: 'edge-002', source: 'router-1746123456789-abc12', target: 'switch-1746123456791-ghi56', label: '10G Uplink', ...edgeDefaults },
// // // //   { id: 'edge-003', source: 'switch-1746123456790-def34', target: 'olt-1746123456792-jkl78',    label: '1G Fiber',   ...edgeDefaults },
// // // //   { id: 'edge-004', source: 'switch-1746123456791-ghi56', target: 'olt-1746123456793-mno90',    label: '1G Fiber',   ...edgeDefaults },
// // // //   { id: 'edge-005', source: 'olt-1746123456792-jkl78',    target: 'ont-1746123456794-pqr11',    label: 'GPON Drop',  ...edgeDefaults },
// // // //   { id: 'edge-006', source: 'olt-1746123456792-jkl78',    target: 'ont-1746123456795-stu22',    label: 'GPON Drop',  ...edgeDefaults },
// // // //   { id: 'edge-007', source: 'olt-1746123456793-mno90',    target: 'ont-1746123456796-vwx33',    label: 'GPON Drop',  ...edgeDefaults },
// // // //   { id: 'edge-008', source: 'olt-1746123456793-mno90',    target: 'ont-1746123456797-yza44',    label: 'GPON Drop',  ...edgeDefaults },
// // // // ];

// // // // // ─── Component ────────────────────────────────────────────────────────────────
// // // // function App() {
// // // //   const [selectedElement, setSelectedElement] = useState(null);
// // // //   const [nodes, setNodes] = useState(INITIAL_NODES);
// // // //   const [edges, setEdges] = useState(INITIAL_EDGES);

// // // //   // Stack: each entry = { nodes, edges, label }
// // // //   const [navStack, setNavStack] = useState([]);

// // // //   const currentLabel = navStack.length > 0
// // // //     ? `${navStack[navStack.length - 1].label} › Ring View`
// // // //     : 'Main Topology';

// // // //   // Double-click a router → drill into its ring
// // // //   const onDrillDown = useCallback((node) => {
// // // //     if (node.data.type !== 'router') return;

// // // //     const { ringNodes, ringEdges } = buildRingTopology(node);

// // // //     // Save current view
// // // //     setNavStack((stack) => [...stack, {
// // // //       nodes, edges,
// // // //       label: node.data.hostname || node.data.type,
// // // //     }]);

// // // //     setNodes(ringNodes);
// // // //     setEdges(ringEdges);
// // // //     setSelectedElement(null);
// // // //   }, [nodes, edges]);

// // // //   // Back → restore previous view
// // // //   const onNavigateBack = useCallback(() => {
// // // //     if (navStack.length === 0) return;
// // // //     const prev = navStack[navStack.length - 1];
// // // //     setNodes(prev.nodes);
// // // //     setEdges(prev.edges);
// // // //     setNavStack((stack) => stack.slice(0, -1));
// // // //     setSelectedElement(null);
// // // //   }, [navStack]);

// // // //   const saveTopology = useCallback(() => {
// // // //     localStorage.setItem('fiber-network-topology', JSON.stringify({ nodes, edges, timestamp: new Date().toISOString() }));
// // // //   }, [nodes, edges]);

// // // //   const loadTopology = useCallback(() => {
// // // //     const saved = localStorage.getItem('fiber-network-topology');
// // // //     if (saved) {
// // // //       const { nodes: n, edges: e } = JSON.parse(saved);
// // // //       setNodes(n || []);
// // // //       setEdges(e || []);
// // // //     }
// // // //   }, []);

// // // //   return (
// // // //     <div className="app-layout">
// // // //       <DeviceSidebar onSave={saveTopology} onLoad={loadTopology} />

// // // //       <div className="flow-area" style={{ position: 'relative' }}>

// // // //         {/* ── Top breadcrumb bar ── */}
// // // //         <div style={{
// // // //           position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)',
// // // //           zIndex: 10, display: 'flex', alignItems: 'center', gap: 10,
// // // //           background: '#1a2530', border: '1px solid #2D3B48',
// // // //           borderRadius: 8, padding: '6px 14px',
// // // //           boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
// // // //           whiteSpace: 'nowrap',
// // // //         }}>
// // // //           {navStack.length > 0 && (
// // // //             <button onClick={onNavigateBack} style={{
// // // //               background: '#2D3B48', border: 'none', color: '#A0AEC0',
// // // //               borderRadius: 6, padding: '4px 12px', cursor: 'pointer',
// // // //               fontSize: 13, display: 'flex', alignItems: 'center', gap: 4,
// // // //             }}>
// // // //               ← Back
// // // //             </button>
// // // //           )}

// // // //           {/* Breadcrumb trail */}
// // // //           {navStack.map((entry, i) => (
// // // //             <span key={i} style={{ color: '#64748b', fontSize: 13 }}>
// // // //               {entry.label} <span style={{ color: '#4A5B6E' }}>›</span>
// // // //             </span>
// // // //           ))}

// // // //           <span style={{ color: '#e2e8f0', fontSize: 13, fontWeight: 600 }}>
// // // //             {currentLabel}
// // // //           </span>

// // // //           {navStack.length === 0 && (
// // // //             <span style={{ color: '#4A5B6E', fontSize: 11, marginLeft: 6 }}>
// // // //               • Double-click a 🌐 router to explore its ring
// // // //             </span>
// // // //           )}
// // // //         </div>

// // // //         <NetworkFlow
// // // //           nodes={nodes}
// // // //           setNodes={setNodes}
// // // //           edges={edges}
// // // //           setEdges={setEdges}
// // // //           onElementSelect={setSelectedElement}
// // // //           onDrillDown={onDrillDown}
// // // //         />
// // // //       </div>

// // // //       <PropertiesPanel
// // // //         selectedElement={selectedElement}
// // // //         nodes={nodes}
// // // //         setNodes={setNodes}
// // // //         edges={edges}
// // // //         setEdges={setEdges}
// // // //       />
// // // //     </div>
// // // //   );
// // // // }

// // // // export default App;

// // // // commented above code useing on origal content json
// // // import { useState, useCallback } from 'react';
// // // import DeviceSidebar from './components/DeviceSidebar';
// // // import NetworkFlow from './components/NetworkFlow';
// // // import PropertiesPanel from './components/PropertiesPanel';
// // // import { processOntSearch, buildStaticRingTopology } from './utils/topologyMapper';
// // // import './App.css';

// // // // 🔹 Import your 4 JSON data files (adjust paths as needed)
// // // // You can also fetch these from an API endpoint instead
// // // import FILE1_ONT2OLT from './data/ont2olt.json';
// // // import FILE2_OLT2ROUTER from './data/olt2router.json';
// // // import FILE3_CHILD2PARENT from './data/child2parent.json';
// // // import FILE4_GPTOPOLOGY from './data/gptopology.json';

// // // const edgeDefaults = {
// // //   animated: true,
// // //   style: { stroke: '#4A5B6E', strokeWidth: 2 },
// // //   labelStyle: { fill: '#A0AEC0', fontWeight: 500, fontSize: '11px' },
// // //   labelShowBg: true,
// // //   labelBgStyle: { fill: '#23303D', stroke: '#4A5B6E' },
// // //   labelBgPadding: [4, 4],
// // // };

// // // // ─── Main static topology ─────────────────────────────────────────────────────
// // // const INITIAL_NODES = [
// // //   { id: 'router-1746123456789-abc12', type: 'fiberDevice', position: { x: 100, y: 200 }, data: { type: 'router', hostname: 'core-router-01', ip: '192.168.1.1' } },
// // //   { id: 'switch-1746123456790-def34', type: 'fiberDevice', position: { x: 350, y: 100 }, data: { type: 'switch', hostname: 'dist-switch-01', ip: '192.168.1.2' } },
// // //   { id: 'switch-1746123456791-ghi56', type: 'fiberDevice', position: { x: 350, y: 300 }, data: { type: 'switch', hostname: 'dist-switch-02', ip: '192.168.1.3' } },
// // //   { id: 'olt-1746123456792-jkl78',    type: 'fiberDevice', position: { x: 600, y: 100 }, data: { type: 'olt',    hostname: 'olt-north-01',    ip: '192.168.2.1' } },
// // //   { id: 'olt-1746123456793-mno90',    type: 'fiberDevice', position: { x: 600, y: 300 }, data: { type: 'olt',    hostname: 'olt-south-01',    ip: '192.168.2.2' } },
// // //   { id: 'ont-1746123456794-pqr11',    type: 'fiberDevice', position: { x: 850, y: 50  }, data: { type: 'ont',    hostname: 'ont-home-01',     ip: '192.168.3.1' } },
// // //   { id: 'ont-1746123456795-stu22',    type: 'fiberDevice', position: { x: 850, y: 170 }, data: { type: 'ont',    hostname: 'ont-home-02',     ip: '192.168.3.2' } },
// // //   { id: 'ont-1746123456796-vwx33',    type: 'fiberDevice', position: { x: 850, y: 280 }, data: { type: 'ont',    hostname: 'ont-office-01',   ip: '192.168.3.3' } },
// // //   { id: 'ont-1746123456797-yza44',    type: 'fiberDevice', position: { x: 850, y: 390 }, data: { type: 'ont',    hostname: 'ont-office-02',   ip: '192.168.3.4' } },
// // // ];

// // // const INITIAL_EDGES = [
// // //   { id: 'edge-001', source: 'router-1746123456789-abc12', target: 'switch-1746123456790-def34', label: '10G Uplink', ...edgeDefaults },
// // //   { id: 'edge-002', source: 'router-1746123456789-abc12', target: 'switch-1746123456791-ghi56', label: '10G Uplink', ...edgeDefaults },
// // //   { id: 'edge-003', source: 'switch-1746123456790-def34', target: 'olt-1746123456792-jkl78',    label: '1G Fiber',   ...edgeDefaults },
// // //   { id: 'edge-004', source: 'switch-1746123456791-ghi56', target: 'olt-1746123456793-mno90',    label: '1G Fiber',   ...edgeDefaults },
// // //   { id: 'edge-005', source: 'olt-1746123456792-jkl78',    target: 'ont-1746123456794-pqr11',    label: 'GPON Drop',  ...edgeDefaults },
// // //   { id: 'edge-006', source: 'olt-1746123456792-jkl78',    target: 'ont-1746123456795-stu22',    label: 'GPON Drop',  ...edgeDefaults },
// // //   { id: 'edge-007', source: 'olt-1746123456793-mno90',    target: 'ont-1746123456796-vwx33',    label: 'GPON Drop',  ...edgeDefaults },
// // //   { id: 'edge-008', source: 'olt-1746123456793-mno90',    target: 'ont-1746123456797-yza44',    label: 'GPON Drop',  ...edgeDefaults },
// // // ];

// // // function App() {
// // //   const [selectedElement, setSelectedElement] = useState(null);
// // //   const [nodes, setNodes] = useState(INITIAL_NODES);
// // //   const [edges, setEdges] = useState(INITIAL_EDGES);
  
// // //   // 🔹 Search state for ONT serial lookup
// // //   const [ontSerialInput, setOntSerialInput] = useState('');
// // //   const [searchStatus, setSearchStatus] = useState({ loading: false, error: null, found: false });
  
// // //   // Navigation stack for drill-down/back navigation
// // //   const [navStack, setNavStack] = useState([]);
// // //   const currentLabel = navStack.length > 0
// // //     ? `${navStack[navStack.length - 1].label} › Ring View`
// // //     : 'Main Topology';

// // //   // 🔹 Handle ONT serial search submission
// // //   const handleOntSearch = useCallback((serialNo) => {
// // //     if (!serialNo?.trim()) return;
    
// // //     setSearchStatus({ loading: true, error: null, found: false });
    
// // //     try {
// // //       const result = processOntSearch(
// // //         serialNo.trim(),
// // //         FILE1_ONT2OLT,
// // //         FILE2_OLT2ROUTER,
// // //         FILE3_CHILD2PARENT,
// // //         FILE4_GPTOPOLOGY
// // //       );
      
// // //       if (!result) {
// // //         setSearchStatus({ 
// // //           loading: false, 
// // //           error: 'ONT not found or no ring topology available for this serial', 
// // //           found: false 
// // //         });
// // //         return;
// // //       }
      
// // //       const { nodes: ringNodes, edges: ringEdges } = result;
      
// // //       // Save current view to navigation stack
// // //       setNavStack((stack) => [...stack, {
// // //         nodes, edges,
// // //         label: `ONT: ${serialNo.trim()}`,
// // //         isSearchResult: true
// // //       }]);
      
// // //       // Load ring topology into canvas
// // //       setNodes(ringNodes);
// // //       setEdges(ringEdges);
// // //       setSelectedElement(null);
// // //       setSearchStatus({ loading: false, error: null, found: true });
      
// // //     } catch (err) {
// // //       console.error('ONT search error:', err);
// // //       setSearchStatus({ loading: false, error: 'Failed to process search. Check console for details.', found: false });
// // //     }
// // //   }, [nodes, edges]);

// // //   // Double-click a router → drill into static ring (original behavior preserved)
// // //   const onDrillDown = useCallback((node) => {
// // //     if (node.data.type !== 'router') return;
    
// // //     const { ringNodes, ringEdges } = buildStaticRingTopology(node);
    
// // //     setNavStack((stack) => [...stack, {
// // //       nodes, edges,
// // //       label: node.data.hostname || node.data.type,
// // //     }]);
    
// // //     setNodes(ringNodes);
// // //     setEdges(ringEdges);
// // //     setSelectedElement(null);
// // //   }, [nodes, edges]);

// // //   // Back navigation
// // //   const onNavigateBack = useCallback(() => {
// // //     if (navStack.length === 0) return;
// // //     const prev = navStack[navStack.length - 1];
// // //     setNodes(prev.nodes);
// // //     setEdges(prev.edges);
// // //     setNavStack((stack) => stack.slice(0, -1));
// // //     setSelectedElement(null);
// // //   }, [navStack]);

// // //   // Persist topology to localStorage
// // //   const saveTopology = useCallback(() => {
// // //     localStorage.setItem('fiber-network-topology', JSON.stringify({ 
// // //       nodes, edges, timestamp: new Date().toISOString() 
// // //     }));
// // //   }, [nodes, edges]);

// // //   const loadTopology = useCallback(() => {
// // //     const saved = localStorage.getItem('fiber-network-topology');
// // //     if (saved) {
// // //       const { nodes: n, edges: e } = JSON.parse(saved);
// // //       setNodes(n || []);
// // //       setEdges(e || []);
// // //     }
// // //   }, []);

// // //   return (
// // //     <div className="app-layout">
// // //       <DeviceSidebar 
// // //         onSave={saveTopology} 
// // //         onLoad={loadTopology}
// // //         // 🔹 Pass search props to sidebar
// // //         ontSerialInput={ontSerialInput}
// // //         onOntSerialChange={setOntSerialInput}
// // //         onOntSearch={handleOntSearch}
// // //         searchStatus={searchStatus}
// // //       />
      
// // //       <div className="flow-area" style={{ position: 'relative' }}>
// // //         {/* ── Top breadcrumb/search bar ── */}

// // //         <div style={{
// // //           position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)',
// // //           zIndex: 10, display: 'flex', alignItems: 'center', gap: 10,
// // //           background: '#1a2530', border: '1px solid #2D3B48',
// // //           borderRadius: 8, padding: '6px 14px',
// // //           boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
// // //           whiteSpace: 'nowrap',
// // //         }}>
// // //           {navStack.length > 0 && (
// // //             <button onClick={onNavigateBack} style={{
// // //               background: '#2D3B48', border: 'none', color: '#A0AEC0',
// // //               borderRadius: 6, padding: '4px 12px', cursor: 'pointer',
// // //               fontSize: 13, display: 'flex', alignItems: 'center', gap: 4,
// // //             }}>
// // //               ← Back
// // //             </button>
// // //           )}
          
// // //           {/* Breadcrumb trail */}
// // //           {navStack.map((entry, i) => (
// // //             <span key={i} style={{ color: '#64748b', fontSize: 13 }}>
// // //               {entry.label} <span style={{ color: '#4A5B6E' }}>› </span>
// // //             </span>
// // //           ))}
          
// // //           <span style={{ color: '#e2e8f0', fontSize: 13, fontWeight: 600 }}>
// // //             {currentLabel}
// // //           </span>
          
// // //           {navStack.length === 0 && (
// // //             <span style={{ color: '#4A5B6E', fontSize: 11, marginLeft: 6 }}>
// // //               • Search ONT serial or double-click 🌐 router to explore rings
// // //             </span>
// // //           )}
// // //         </div>
// // // // Add this legend component inside the flow-area div, below the breadcrumb bar:

// // // {/* 🔹 Topology Legend */}
// // // {searchStatus.found && (
// // //   <div style={{
// // //     position: 'absolute', bottom: 12, left: 12, zIndex: 10,
// // //     background: '#1a2530', border: '1px solid #2D3B48',
// // //     borderRadius: 8, padding: '8px 12px', fontSize: '11px',
// // //     display: 'flex', flexDirection: 'column', gap: '4px'
// // //   }}>
// // //     <div style={{ fontWeight: 600, marginBottom: '4px', color: '#e2e8f0' }}>🔗 Connectivity</div>
// // //     <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
// // //       <span style={{ width: 20, height: 3, background: '#22c55e', display: 'inline-block' }} />
// // //       <span style={{ color: '#A0AEC0' }}>ONT → OLT (GPON)</span>
// // //     </div>
// // //     <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
// // //       <span style={{ width: 20, height: 3, background: '#4A5B6E', display: 'inline-block' }} />
// // //       <span style={{ color: '#A0AEC0' }}>OLT → Router (10G)</span>
// // //     </div>
// // //     <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
// // //       <span style={{ width: 20, height: 3, background: '#8b5cf6', display: 'inline-block' }} />
// // //       <span style={{ color: '#A0AEC0' }}>GP Ring Links</span>
// // //     </div>
// // //     <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
// // //       <span style={{ width: 20, height: 3, background: '#f59e0b', display: 'inline-block', borderStyle: 'dashed' }} />
// // //       <span style={{ color: '#A0AEC0' }}>Mandal → Ring</span>
// // //     </div>
// // //   </div>
// // // )}
// // //         {/* 🔹 Search status indicators */}
// // //         {searchStatus.loading && (
// // //           <div style={{
// // //             position: 'absolute', top: 60, left: '50%', transform: 'translateX(-50%)',
// // //             zIndex: 10, background: '#2D3B48', color: '#A0AEC0',
// // //             padding: '8px 16px', borderRadius: 6, fontSize: 13
// // //           }}>
// // //             🔍 Processing topology data...
// // //           </div>
// // //         )}
// // //         {searchStatus.error && (
// // //           <div style={{
// // //             position: 'absolute', top: 60, left: '50%', transform: 'translateX(-50%)',
// // //             zIndex: 10, background: '#7f1d1d', color: '#fecaca',
// // //             padding: '8px 16px', borderRadius: 6, fontSize: 13
// // //           }}>
// // //             ⚠️ {searchStatus.error}
// // //           </div>
// // //         )}
// // //         {searchStatus.found && (
// // //           <div style={{
// // //             position: 'absolute', top: 60, left: '50%', transform: 'translateX(-50%)',
// // //             zIndex: 10, background: '#166534', color: '#bbf7d0',
// // //             padding: '8px 16px', borderRadius: 6, fontSize: 13
// // //           }}>
// // //             ✅ Ring topology loaded successfully
// // //           </div>
// // //         )}

// // //         <NetworkFlow
// // //           nodes={nodes}
// // //           setNodes={setNodes}
// // //           edges={edges}
// // //           setEdges={setEdges}
// // //           onElementSelect={setSelectedElement}
// // //           onDrillDown={onDrillDown}
// // //         />
// // //       </div>
      
// // //       <PropertiesPanel
// // //         selectedElement={selectedElement}
// // //         nodes={nodes}
// // //         setNodes={setNodes}
// // //         edges={edges}
// // //         setEdges={setEdges}
// // //       />
// // //     </div>
// // //   );
// // // }

// // // export default App;

// // import { useState, useCallback } from 'react';
// // import DeviceSidebar from './components/DeviceSidebar';
// // import NetworkFlow from './components/NetworkFlow';
// // import PropertiesPanel from './components/PropertiesPanel';
// // import { processOntSearch, buildStaticRingTopology } from './utils/topologyMapper';
// // import './App.css';

// // // 🔹 Import your 4 JSON data files
// // import FILE1_ONT2OLT from './data/ont2olt.json';
// // import FILE2_OLT2ROUTER from './data/olt2router.json';
// // import FILE3_CHILD2PARENT from './data/child2parent.json';
// // import FILE4_GPTOPOLOGY from './data/gptopology.json';

// // const edgeDefaults = {
// //   animated: true,
// //   style: { stroke: '#4A5B6E', strokeWidth: 2 },
// //   labelStyle: { fill: '#A0AEC0', fontWeight: 500, fontSize: '11px' },
// //   labelShowBg: true,
// //   labelBgStyle: { fill: '#23303D', stroke: '#4A5B6E' },
// //   labelBgPadding: [4, 4],
// // };

// // const INITIAL_NODES = [
// //   { id: 'router-1746123456789-abc12', type: 'fiberDevice', position: { x: 100, y: 200 }, data: { type: 'router', hostname: 'core-router-01', ip: '192.168.1.1' } },
// //   { id: 'switch-1746123456790-def34', type: 'fiberDevice', position: { x: 350, y: 100 }, data: { type: 'switch', hostname: 'dist-switch-01', ip: '192.168.1.2' } },
// //   { id: 'switch-1746123456791-ghi56', type: 'fiberDevice', position: { x: 350, y: 300 }, data: { type: 'switch', hostname: 'dist-switch-02', ip: '192.168.1.3' } },
// //   { id: 'olt-1746123456792-jkl78',    type: 'fiberDevice', position: { x: 600, y: 100 }, data: { type: 'olt',    hostname: 'olt-north-01',    ip: '192.168.2.1' } },
// //   { id: 'olt-1746123456793-mno90',    type: 'fiberDevice', position: { x: 600, y: 300 }, data: { type: 'olt',    hostname: 'olt-south-01',    ip: '192.168.2.2' } },
// //   { id: 'ont-1746123456794-pqr11',    type: 'fiberDevice', position: { x: 850, y: 50  }, data: { type: 'ont',    hostname: 'ont-home-01',     ip: '192.168.3.1' } },
// //   { id: 'ont-1746123456795-stu22',    type: 'fiberDevice', position: { x: 850, y: 170 }, data: { type: 'ont',    hostname: 'ont-home-02',     ip: '192.168.3.2' } },
// //   { id: 'ont-1746123456796-vwx33',    type: 'fiberDevice', position: { x: 850, y: 280 }, data: { type: 'ont',    hostname: 'ont-office-01',   ip: '192.168.3.3' } },
// //   { id: 'ont-1746123456797-yza44',    type: 'fiberDevice', position: { x: 850, y: 390 }, data: { type: 'ont',    hostname: 'ont-office-02',   ip: '192.168.3.4' } },
// // ];

// // const INITIAL_EDGES = [
// //   { id: 'edge-001', source: 'router-1746123456789-abc12', target: 'switch-1746123456790-def34', label: '10G Uplink', ...edgeDefaults },
// //   { id: 'edge-002', source: 'router-1746123456789-abc12', target: 'switch-1746123456791-ghi56', label: '10G Uplink', ...edgeDefaults },
// //   { id: 'edge-003', source: 'switch-1746123456790-def34', target: 'olt-1746123456792-jkl78',    label: '1G Fiber',   ...edgeDefaults },
// //   { id: 'edge-004', source: 'switch-1746123456791-ghi56', target: 'olt-1746123456793-mno90',    label: '1G Fiber',   ...edgeDefaults },
// //   { id: 'edge-005', source: 'olt-1746123456792-jkl78',    target: 'ont-1746123456794-pqr11',    label: 'GPON Drop',  ...edgeDefaults },
// //   { id: 'edge-006', source: 'olt-1746123456792-jkl78',    target: 'ont-1746123456795-stu22',    label: 'GPON Drop',  ...edgeDefaults },
// //   { id: 'edge-007', source: 'olt-1746123456793-mno90',    target: 'ont-1746123456796-vwx33',    label: 'GPON Drop',  ...edgeDefaults },
// //   { id: 'edge-008', source: 'olt-1746123456793-mno90',    target: 'ont-1746123456797-yza44',    label: 'GPON Drop',  ...edgeDefaults },
// // ];

// // function App() {
// //   const [selectedElement, setSelectedElement] = useState(null);
// //   const [nodes, setNodes] = useState(INITIAL_NODES);
// //   const [edges, setEdges] = useState(INITIAL_EDGES);
// //   const [ontSerialInput, setOntSerialInput] = useState('');
// //   const [searchStatus, setSearchStatus] = useState({ loading: false, error: null, found: false });
// //   const [navStack, setNavStack] = useState([]);
  
// //   const currentLabel = navStack.length > 0
// //     ? `${navStack[navStack.length - 1].label} › Ring View`
// //     : 'Main Topology';

// //   const handleOntSearch = useCallback((serialNo) => {
// //     if (!serialNo?.trim()) return;
// //     setSearchStatus({ loading: true, error: null, found: false });
    
// //     try {
// //       const result = processOntSearch(
// //         serialNo.trim(),
// //         FILE1_ONT2OLT,
// //         FILE2_OLT2ROUTER,
// //         FILE3_CHILD2PARENT,
// //         FILE4_GPTOPOLOGY
// //       );
      
// //       if (!result) {
// //         setSearchStatus({ loading: false, error: 'ONT not found or no ring topology available', found: false });
// //         return;
// //       }
      
// //       const { nodes: ringNodes, edges: ringEdges } = result;
// //       setNavStack((stack) => [...stack, { nodes, edges, label: `ONT: ${serialNo.trim()}`, isSearchResult: true }]);
// //       setNodes(ringNodes);
// //       setEdges(ringEdges);
// //       setSelectedElement(null);
// //       setSearchStatus({ loading: false, error: null, found: true });
// //     } catch (err) {
// //       console.error('ONT search error:', err);
// //       setSearchStatus({ loading: false, error: 'Failed to process search', found: false });
// //     }
// //   }, [nodes, edges]);

// //   const onDrillDown = useCallback((node) => {
// //     if (node.data.type !== 'router') return;
// //     const { ringNodes, ringEdges } = buildStaticRingTopology(node);
// //     setNavStack((stack) => [...stack, { nodes, edges, label: node.data.hostname || node.data.type }]);
// //     setNodes(ringNodes);
// //     setEdges(ringEdges);
// //     setSelectedElement(null);
// //   }, [nodes, edges]);

// //   const onNavigateBack = useCallback(() => {
// //     if (navStack.length === 0) return;
// //     const prev = navStack[navStack.length - 1];
// //     setNodes(prev.nodes);
// //     setEdges(prev.edges);
// //     setNavStack((stack) => stack.slice(0, -1));
// //     setSelectedElement(null);
// //   }, [navStack]);

// //   const saveTopology = useCallback(() => {
// //     localStorage.setItem('fiber-network-topology', JSON.stringify({ nodes, edges, timestamp: new Date().toISOString() }));
// //   }, [nodes, edges]);

// //   const loadTopology = useCallback(() => {
// //     const saved = localStorage.getItem('fiber-network-topology');
// //     if (saved) {
// //       const { nodes: n, edges: e } = JSON.parse(saved);
// //       setNodes(n || []);
// //       setEdges(e || []);
// //     }
// //   }, []);

// //   return (
// //     <div className="app-layout">
// //       <DeviceSidebar 
// //         onSave={saveTopology} 
// //         onLoad={loadTopology}
// //         ontSerialInput={ontSerialInput}
// //         onOntSerialChange={setOntSerialInput}
// //         onOntSearch={handleOntSearch}
// //         searchStatus={searchStatus}
// //       />
      
// //       <div className="flow-area" style={{ position: 'relative' }}>
// //         {/* ── Top breadcrumb bar ── */}
// //         <div style={{
// //           position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)',
// //           zIndex: 10, display: 'flex', alignItems: 'center', gap: 10,
// //           background: '#1a2530', border: '1px solid #2D3B48',
// //           borderRadius: 8, padding: '6px 14px',
// //           boxShadow: '0 2px 8px rgba(0,0,0,0.4)', whiteSpace: 'nowrap',
// //         }}>
// //           {navStack.length > 0 && (
// //             <button onClick={onNavigateBack} style={{
// //               background: '#2D3B48', border: 'none', color: '#A0AEC0',
// //               borderRadius: 6, padding: '4px 12px', cursor: 'pointer', fontSize: 13
// //             }}>← Back</button>
// //           )}
// //           {navStack.map((entry, i) => (
// //             <span key={i} style={{ color: '#64748b', fontSize: 13 }}>
// //               {entry.label} <span style={{ color: '#4A5B6E' }}>› </span>
// //             </span>
// //           ))}
// //           <span style={{ color: '#e2e8f0', fontSize: 13, fontWeight: 600 }}>{currentLabel}</span>
// //           {navStack.length === 0 && (
// //             <span style={{ color: '#4A5B6E', fontSize: 11, marginLeft: 6 }}>
// //               • Search ONT serial or double-click 🌐 router
// //             </span>
// //           )}
// //         </div>

// //         {/* 🔹 Topology Legend (only show when search found) */}
// //         {searchStatus.found && (
// //           <div style={{
// //             position: 'absolute', bottom: 12, left: 12, zIndex: 10,
// //             background: '#1a2530', border: '1px solid #2D3B48',
// //             borderRadius: 8, padding: '8px 12px', fontSize: '11px',
// //             display: 'flex', flexDirection: 'column', gap: '4px'
// //           }}>
// //             <div style={{ fontWeight: 600, marginBottom: '4px', color: '#e2e8f0' }}>🔗 Connectivity</div>
// //             <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
// //               <span style={{ width: 20, height: 3, background: '#22c55e', display: 'inline-block' }} />
// //               <span style={{ color: '#A0AEC0' }}>ONT → OLT (GPON)</span>
// //             </div>
// //             <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
// //               <span style={{ width: 20, height: 3, background: '#4A5B6E', display: 'inline-block' }} />
// //               <span style={{ color: '#A0AEC0' }}>OLT → Router (10G)</span>
// //             </div>
// //             <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
// //               <span style={{ width: 20, height: 3, background: '#8b5cf6', display: 'inline-block' }} />
// //               <span style={{ color: '#A0AEC0' }}>GP Ring Links</span>
// //             </div>
// //             <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
// //               <span style={{ width: 20, height: 3, background: '#f59e0b', display: 'inline-block', borderStyle: 'dashed' }} />
// //               <span style={{ color: '#A0AEC0' }}>Mandal → Ring</span>
// //             </div>
// //           </div>
// //         )}

// //         {/* 🔹 Search status indicators */}
// //         {searchStatus.loading && (
// //           <div style={{ position: 'absolute', top: 60, left: '50%', transform: 'translateX(-50%)', zIndex: 10, background: '#2D3B48', color: '#A0AEC0', padding: '8px 16px', borderRadius: 6, fontSize: 13 }}>
// //             🔍 Processing...
// //           </div>
// //         )}
// //         {searchStatus.error && (
// //           <div style={{ position: 'absolute', top: 60, left: '50%', transform: 'translateX(-50%)', zIndex: 10, background: '#7f1d1d', color: '#fecaca', padding: '8px 16px', borderRadius: 6, fontSize: 13 }}>
// //             ⚠️ {searchStatus.error}
// //           </div>
// //         )}
// //         {searchStatus.found && (
// //           <div style={{ position: 'absolute', top: 60, left: '50%', transform: 'translateX(-50%)', zIndex: 10, background: '#166534', color: '#bbf7d0', padding: '8px 16px', borderRadius: 6, fontSize: 13 }}>
// //             ✅ Topology loaded
// //           </div>
// //         )}

// //         <NetworkFlow
// //           nodes={nodes}
// //           setNodes={setNodes}
// //           edges={edges}
// //           setEdges={setEdges}
// //           onElementSelect={setSelectedElement}
// //           onDrillDown={onDrillDown}
// //         />
// //       </div>
      
// //       <PropertiesPanel
// //         selectedElement={selectedElement}
// //         nodes={nodes}
// //         setNodes={setNodes}
// //         edges={edges}
// //         setEdges={setEdges}
// //       />
// //     </div>
// //   );
// // }

// // export default App;



// import { useState, useCallback } from 'react';
// import DeviceSidebar from './components/DeviceSidebar';
// import NetworkFlow from './components/NetworkFlow';
// import PropertiesPanel from './components/PropertiesPanel';
// import { processOntSearch, buildRingFromData, buildStaticRingTopology } from './utils/topologyMapper';
// import './App.css';

// // Import JSON data files
// import FILE1_ONT2OLT from './data/ont2olt.json';
// import FILE2_OLT2ROUTER from './data/olt2router.json';
// import FILE3_CHILD2PARENT from './data/child2parent.json';
// import FILE4_GPTOPOLOGY from './data/gptopology.json';

// const edgeDefaults = {
//   animated: true,
//   style: { stroke: '#4A5B6E', strokeWidth: 2 },
//   labelStyle: { fill: '#A0AEC0', fontWeight: 500, fontSize: '11px' },
//   labelShowBg: true,
//   labelBgStyle: { fill: '#23303D', stroke: '#4A5B6E' },
//   labelBgPadding: [4, 4],
// };

// const INITIAL_NODES = [ /* your existing static nodes */ ];
// const INITIAL_EDGES = [ /* your existing static edges */ ];

// function App() {
//   const [selectedElement, setSelectedElement] = useState(null);
//   const [nodes, setNodes] = useState(INITIAL_NODES);
//   const [edges, setEdges] = useState(INITIAL_EDGES);
//   const [ontSerialInput, setOntSerialInput] = useState('');
//   const [searchStatus, setSearchStatus] = useState({ loading: false, error: null, found: false });
//   const [navStack, setNavStack] = useState([]);
  
//   // Store ring data for drill-down (attached to mandal router node)
//   const [ringDataContext, setRingDataContext] = useState(null);

//   const currentLabel = navStack.length > 0
//     ? `${navStack[navStack.length - 1].label} › Ring View`
//     : 'Main Topology';

//   // 🔹 ONT Search: Show LINEAR chain only (ONT→OLT→Router)
//   const handleOntSearch = useCallback((serialNo) => {
//     if (!serialNo?.trim()) return;
//     setSearchStatus({ loading: true, error: null, found: false });
    
//     try {
//       const result = processOntSearch(
//         serialNo.trim(),
//         FILE1_ONT2OLT, FILE2_OLT2ROUTER, FILE3_CHILD2PARENT, FILE4_GPTOPOLOGY
//       );
      
//       if (!result) {
//         setSearchStatus({ loading: false, error: 'ONT not found', found: false });
//         return;
//       }
      
//       const { linearChain, mandalRouterData } = result;
      
//       // Save ring data context for later drill-down
//       setRingDataContext(mandalRouterData);
      
//       // Save current view to nav stack
//       setNavStack((stack) => [...stack, { nodes, edges, label: `ONT: ${serialNo.trim()}` }]);
      
//       // Load LINEAR chain (no ring yet)
//       setNodes(linearChain.nodes);
//       setEdges(linearChain.edges);
//       setSelectedElement(null);
//       setSearchStatus({ loading: false, error: null, found: true });
      
//     } catch (err) {
//       console.error('Search error:', err);
//       setSearchStatus({ loading: false, error: 'Search failed', found: false });
//     }
//   }, [nodes, edges]);

//   // 🔹 Router Double-Click: Expand to show RING topology
//   const onDrillDown = useCallback((node) => {
//     // Only expand if it's a router with ring data
//     if (node.data.type !== 'router' || !node.data.isCentral) return;
    
//     // Check if we have ring data from search context
//     if (ringDataContext?.ringData?.length > 0) {
//       const { nodes: ringNodes, edges: ringEdges } = buildRingFromData(
//         ringDataContext.hostname,
//         ringDataContext.ringData,
//         ringDataContext.uniqueTopologies
//       );
      
//       setNavStack((stack) => [...stack, { nodes, edges, label: node.data.hostname }]);
//       setNodes(ringNodes);
//       setEdges(ringEdges);
//       setSelectedElement(null);
//     } else {
//       // Fallback to static ring if no data
//       const { ringNodes, ringEdges } = buildStaticRingTopology(node);
//       setNavStack((stack) => [...stack, { nodes, edges, label: node.data.hostname }]);
//       setNodes(ringNodes);
//       setEdges(ringEdges);
//       setSelectedElement(null);
//     }
//   }, [nodes, edges, ringDataContext]);

//   const onNavigateBack = useCallback(() => {
//     if (navStack.length === 0) return;
//     const prev = navStack[navStack.length - 1];
//     setNodes(prev.nodes);
//     setEdges(prev.edges);
//     setNavStack((stack) => stack.slice(0, -1));
//     // Clear ring context when going back to main
//     if (navStack.length === 1) setRingDataContext(null);
//     setSelectedElement(null);
//   }, [navStack]);

//   const saveTopology = useCallback(() => {
//     localStorage.setItem('fiber-network-topology', JSON.stringify({ nodes, edges, timestamp: new Date().toISOString() }));
//   }, [nodes, edges]);

//   const loadTopology = useCallback(() => {
//     const saved = localStorage.getItem('fiber-network-topology');
//     if (saved) {
//       const { nodes: n, edges: e } = JSON.parse(saved);
//       setNodes(n || []);
//       setEdges(e || []);
//     }
//   }, []);

//   return (
//     <div className="app-layout">
//       <DeviceSidebar 
//         onSave={saveTopology} onLoad={loadTopology}
//         ontSerialInput={ontSerialInput}
//         onOntSerialChange={setOntSerialInput}
//         onOntSearch={handleOntSearch}
//         searchStatus={searchStatus}
//       />
      
//       <div className="flow-area" style={{ position: 'relative' }}>
//         {/* Breadcrumb Bar */}
//         <div style={{
//           position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)',
//           zIndex: 10, display: 'flex', alignItems: 'center', gap: 10,
//           background: '#1a2530', border: '1px solid #2D3B48',
//           borderRadius: 8, padding: '6px 14px', boxShadow: '0 2px 8px rgba(0,0,0,0.4)'
//         }}>
//           {navStack.length > 0 && (
//             <button onClick={onNavigateBack} style={{
//               background: '#2D3B48', border: 'none', color: '#A0AEC0',
//               borderRadius: 6, padding: '4px 12px', cursor: 'pointer', fontSize: 13
//             }}>← Back</button>
//           )}
//           {navStack.map((entry, i) => (
//             <span key={i} style={{ color: '#64748b', fontSize: 13 }}>
//               {entry.label} <span style={{ color: '#4A5B6E' }}>› </span>
//             </span>
//           ))}
//           <span style={{ color: '#e2e8f0', fontSize: 13, fontWeight: 600 }}>{currentLabel}</span>
//           {navStack.length === 0 && searchStatus.found && (
//             <span style={{ color: '#22c55e', fontSize: 11, marginLeft: 6 }}>
//               💡 Double-click the 🔵 router to view ring topology
//             </span>
//           )}
//         </div>

//         {/* Status Messages */}
//         {searchStatus.loading && (
//           <div style={{ position: 'absolute', top: 60, left: '50%', transform: 'translateX(-50%)', zIndex: 10, background: '#2D3B48', color: '#A0AEC0', padding: '8px 16px', borderRadius: 6 }}>
//             🔍 Processing...
//           </div>
//         )}
//         {searchStatus.error && (
//           <div style={{ position: 'absolute', top: 60, left: '50%', transform: 'translateX(-50%)', zIndex: 10, background: '#7f1d1d', color: '#fecaca', padding: '8px 16px', borderRadius: 6 }}>
//             ⚠️ {searchStatus.error}
//           </div>
//         )}
//         {searchStatus.found && !navStack.some(s => s.label.includes('Ring')) && (
//           <div style={{ position: 'absolute', top: 60, left: '50%', transform: 'translateX(-50%)', zIndex: 10, background: '#166534', color: '#bbf7d0', padding: '8px 16px', borderRadius: 6 }}>
//             {/* ✅ Linear topology loaded • Double-click 🔵 router for ring */}
//           </div>
//         )}

//         <NetworkFlow
//           nodes={nodes} setNodes={setNodes}
//           edges={edges} setEdges={setEdges}
//           onElementSelect={setSelectedElement}
//           onDrillDown={onDrillDown}
//         />
//       </div>
      
//       <PropertiesPanel
//         selectedElement={selectedElement}
//         nodes={nodes} setNodes={setNodes}
//         edges={edges} setEdges={setEdges}
//       />
//     </div>
//   );
// }

// export default App;


// import { useState, useCallback } from 'react';
// import DeviceSidebar from './components/DeviceSidebar';
// import NetworkFlow from './components/NetworkFlow';
// import PropertiesPanel from './components/PropertiesPanel';
// import { processOntSearch, buildRingFromData, buildStaticRingTopology } from './utils/topologyMapper';
// import './App.css';

// // Import JSON data files
// import FILE1_ONT2OLT from './data/ont2olt.json';
// import FILE2_OLT2ROUTER from './data/olt2router.json';
// import FILE3_CHILD2PARENT from './data/child2parent.json';
// import FILE4_GPTOPOLOGY from './data/gptopology.json';
// import FILE5_MANDALTOPOLOGY from './data/mandaltopology.json';

// const edgeDefaults = {
//   animated: true,
//   style: { stroke: '#4A5B6E', strokeWidth: 2 },
//   labelStyle: { fill: '#A0AEC0', fontWeight: 500, fontSize: '11px' },
//   labelShowBg: true,
//   labelBgStyle: { fill: '#23303D', stroke: '#4A5B6E' },
//   labelBgPadding: [4, 4],
// };

// // ─── Main static topology ─────────────────────────────────────────────────────
// const INITIAL_NODES = [
//   { id: 'router-1746123456789-abc12', type: 'fiberDevice', position: { x: 100, y: 200 }, data: { type: 'router', hostname: 'core-router-01', ip: '192.168.1.1' } },
//   { id: 'switch-1746123456790-def34', type: 'fiberDevice', position: { x: 350, y: 100 }, data: { type: 'switch', hostname: 'dist-switch-01', ip: '192.168.1.2' } },
//   { id: 'switch-1746123456791-ghi56', type: 'fiberDevice', position: { x: 350, y: 300 }, data: { type: 'switch', hostname: 'dist-switch-02', ip: '192.168.1.3' } },
//   { id: 'olt-1746123456792-jkl78',    type: 'fiberDevice', position: { x: 600, y: 100 }, data: { type: 'olt',    hostname: 'olt-north-01',    ip: '192.168.2.1' } },
//   { id: 'olt-1746123456793-mno90',    type: 'fiberDevice', position: { x: 600, y: 300 }, data: { type: 'olt',    hostname: 'olt-south-01',    ip: '192.168.2.2' } },
//   { id: 'ont-1746123456794-pqr11',    type: 'fiberDevice', position: { x: 850, y: 50  }, data: { type: 'ont',    hostname: 'ont-home-01',     ip: '192.168.3.1' } },
//   { id: 'ont-1746123456795-stu22',    type: 'fiberDevice', position: { x: 850, y: 170 }, data: { type: 'ont',    hostname: 'ont-home-02',     ip: '192.168.3.2' } },
//   { id: 'ont-1746123456796-vwx33',    type: 'fiberDevice', position: { x: 850, y: 280 }, data: { type: 'ont',    hostname: 'ont-office-01',   ip: '192.168.3.3' } },
//   { id: 'ont-1746123456797-yza44',    type: 'fiberDevice', position: { x: 850, y: 390 }, data: { type: 'ont',    hostname: 'ont-office-02',   ip: '192.168.3.4' } },
// ];

// const INITIAL_EDGES = [
//   { id: 'edge-001', source: 'router-1746123456789-abc12', target: 'switch-1746123456790-def34', label: '10G Uplink', ...edgeDefaults },
//   { id: 'edge-002', source: 'router-1746123456789-abc12', target: 'switch-1746123456791-ghi56', label: '10G Uplink', ...edgeDefaults },
//   { id: 'edge-003', source: 'switch-1746123456790-def34', target: 'olt-1746123456792-jkl78',    label: '1G Fiber',   ...edgeDefaults },
//   { id: 'edge-004', source: 'switch-1746123456791-ghi56', target: 'olt-1746123456793-mno90',    label: '1G Fiber',   ...edgeDefaults },
//   { id: 'edge-005', source: 'olt-1746123456792-jkl78',    target: 'ont-1746123456794-pqr11',    label: 'GPON Drop',  ...edgeDefaults },
//   { id: 'edge-006', source: 'olt-1746123456792-jkl78',    target: 'ont-1746123456795-stu22',    label: 'GPON Drop',  ...edgeDefaults },
//   { id: 'edge-007', source: 'olt-1746123456793-mno90',    target: 'ont-1746123456796-vwx33',    label: 'GPON Drop',  ...edgeDefaults },
//   { id: 'edge-008', source: 'olt-1746123456793-mno90',    target: 'ont-1746123456797-yza44',    label: 'GPON Drop',  ...edgeDefaults },
// ];

// function App() {
//   const [selectedElement, setSelectedElement] = useState(null);
//   const [nodes, setNodes] = useState(INITIAL_NODES);
//   const [edges, setEdges] = useState(INITIAL_EDGES);
//   const [ontSerialInput, setOntSerialInput] = useState('');
//   const [searchStatus, setSearchStatus] = useState({ loading: false, error: null, found: false });
//   const [navStack, setNavStack] = useState([]);
//   const [ringDataContext, setRingDataContext] = useState(null);

//   const currentLabel = navStack.length > 0
//     ? `${navStack[navStack.length - 1].label} › Ring View`
//     : 'Main Topology';

//   // 🔹 ONT Search: Show LINEAR chain only (ONT→OLT→Router)
//   const handleOntSearch = useCallback((serialNo) => {
//     if (!serialNo?.trim()) return;
//     setSearchStatus({ loading: true, error: null, found: false });
    
//     try {
//       const result = processOntSearch(
//         serialNo.trim(),
//         FILE1_ONT2OLT, FILE2_OLT2ROUTER, FILE3_CHILD2PARENT, FILE4_GPTOPOLOGY,
//         FILE5_MANDALTOPOLOGY
//       );
      
//       if (!result) {
//         setSearchStatus({ loading: false, error: 'ONT not found', found: false });
//         return;
//       }
      
//       const { linearChain, mandalRouterData } = result;
//       setRingDataContext(mandalRouterData);
//       setNavStack((stack) => [...stack, { nodes, edges, label: `ONT: ${serialNo.trim()}` }]);
//       setNodes(linearChain.nodes);
//       setEdges(linearChain.edges);
//       setSelectedElement(null);
//       setSearchStatus({ loading: false, error: null, found: true });
      
//     } catch (err) {
//       console.error('Search error:', err);
//       setSearchStatus({ loading: false, error: 'Search failed', found: false });
//     }
//   }, [nodes, edges]);

//   // 🔹 Router Double-Click: Expand to show RING topology (WITH DUPLICATE PREVENTION)
//   // const onDrillDown = useCallback((node) => {
//   //   // ✅ Guard 1: Only routers can be drilled down
//   //   if (node.data.type !== 'router') return;
    
//   //   // ✅ Guard 2: Prevent duplicate ring openings - ignore if already a ring center
//   //   if (node.data.isRingCenter) return;
    
//   //   // ✅ Guard 3: Must be central router with ring capability
//   //   if (!node.data.isCentral) return;
    
//   //   // Check if we have ring data from search context
//   //   if (ringDataContext?.ringData?.length > 0) {
//   //     const { nodes: ringNodes, edges: ringEdges } = buildRingFromData(
//   //       ringDataContext.hostname,
//   //       ringDataContext.ringData,
//   //       ringDataContext.uniqueTopologies
//   //     );
      
//   //     setNavStack((stack) => [...stack, { nodes, edges, label: node.data.hostname }]);
//   //     setNodes(ringNodes);
//   //     setEdges(ringEdges);
//   //     setSelectedElement(null);
//   //   } else {
//   //     // Fallback to static ring if no data
//   //     const { ringNodes, ringEdges } = buildStaticRingTopology(node);
//   //     setNavStack((stack) => [...stack, { nodes, edges, label: node.data.hostname }]);
//   //     setNodes(ringNodes);
//   //     setEdges(ringEdges);
//   //     setSelectedElement(null);
//   //   }
//   // }, [nodes, edges, ringDataContext]);
// //removed and updated for gp router to work
// // 🔹 Router Double-Click: Expand to show RING topology
// const onDrillDown = useCallback((node) => {
//   // Guard: Only routers can be drilled down
//   if (node.data.type !== 'router') return;
  
//   // Guard: Prevent duplicate ring openings
//   if (node.data.isRingCenter) return;
  
//   // Guard: Must be central router with ring capability
//   if (!node.data.isCentral) return;
  
//   // Check if we have ring data from search context
//   if (ringDataContext?.ringData?.length > 0) {
//     const { nodes: ringNodes, edges: ringEdges } = buildRingFromData(
//       ringDataContext.hostname,
//       ringDataContext.ringData,
//       ringDataContext.uniqueTopologies,
//       ringDataContext.routerKeyType || 'mandal' // ✅ Pass the key type
//     );
    
//     setNavStack((stack) => [...stack, { nodes, edges, label: node.data.hostname }]);
//     setNodes(ringNodes);
//     setEdges(ringEdges);
//     setSelectedElement(null);
//   } else {
//     // Fallback to static ring if no data
//     const { ringNodes, ringEdges } = buildStaticRingTopology(node);
//     setNavStack((stack) => [...stack, { nodes, edges, label: node.data.hostname }]);
//     setNodes(ringNodes);
//     setEdges(ringEdges);
//     setSelectedElement(null);
//   }
// }, [nodes, edges, ringDataContext]);
//   const onNavigateBack = useCallback(() => {
//     if (navStack.length === 0) return;
//     const prev = navStack[navStack.length - 1];
//     setNodes(prev.nodes);
//     setEdges(prev.edges);
//     setNavStack((stack) => stack.slice(0, -1));
//     // Clear ring context when returning to main topology
//     if (navStack.length === 1) setRingDataContext(null);
//     setSelectedElement(null);
//   }, [navStack]);

//   const saveTopology = useCallback(() => {
//     localStorage.setItem('fiber-network-topology', JSON.stringify({ nodes, edges, timestamp: new Date().toISOString() }));
//   }, [nodes, edges]);

//   const loadTopology = useCallback(() => {
//     const saved = localStorage.getItem('fiber-network-topology');
//     if (saved) {
//       const { nodes: n, edges: e } = JSON.parse(saved);
//       setNodes(n || []);
//       setEdges(e || []);
//     }
//   }, []);

//   return (
//     <div className="app-layout">
//       <DeviceSidebar 
//         onSave={saveTopology} onLoad={loadTopology}
//         ontSerialInput={ontSerialInput}
//         onOntSerialChange={setOntSerialInput}
//         onOntSearch={handleOntSearch}
//         searchStatus={searchStatus}
//       />
      
//       <div className="flow-area" style={{ position: 'relative' }}>
//         {/* Breadcrumb Bar */}
//         <div style={{
//           position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)',
//           zIndex: 10, display: 'flex', alignItems: 'center', gap: 10,
//           background: '#1a2530', border: '1px solid #2D3B48',
//           borderRadius: 8, padding: '6px 14px', boxShadow: '0 2px 8px rgba(0,0,0,0.4)'
//         }}>
//           {navStack.length > 0 && (
//             <button onClick={onNavigateBack} style={{
//               background: '#2D3B48', border: 'none', color: '#A0AEC0',
//               borderRadius: 6, padding: '4px 12px', cursor: 'pointer', fontSize: 13
//             }}>← Back</button>
//           )}
//           {/* {navStack.map((entry, i) => (
//             <span key={i} style={{ color: '#64748b', fontSize: 13 }}>
//               {entry.label} <span style={{ color: '#4A5B6E' }}>› </span>
//             </span>
//           ))} */}
//           <span style={{ color: '#e2e8f0', fontSize: 13, fontWeight: 600 }}>{currentLabel}</span>
//           {navStack.length === 0 && searchStatus.found && (
//             <span style={{ color: '#22c55e', fontSize: 11, marginLeft: 6 }}>
//               💡 Double-click the 🔵 router to view ring topology
//             </span>
//           )}
//         </div>

//         {/* Status Messages */}
//         {searchStatus.loading && (
//           <div style={{ position: 'absolute', top: 60, left: '50%', transform: 'translateX(-50%)', zIndex: 10, background: '#2D3B48', color: '#A0AEC0', padding: '8px 16px', borderRadius: 6 }}>
//             🔍 Processing...
//           </div>
//         )}
//         {searchStatus.error && (
//           <div style={{ position: 'absolute', top: 60, left: '50%', transform: 'translateX(-50%)', zIndex: 10, background: '#7f1d1d', color: '#fecaca', padding: '8px 16px', borderRadius: 6 }}>
//             ⚠️ {searchStatus.error}
//           </div>
//         )}
//         {searchStatus.found && !navStack.some(s => s.label.includes('Ring')) && (
//           <div style={{ position: 'absolute', top: 60, left: '50%', transform: 'translateX(-50%)', zIndex: 10, background: '#166534', color: '#bbf7d0', padding: '8px 16px', borderRadius: 6 }}>
//             {/* ✅ Linear topology loaded • Double-click 🔵 router for ring */}
//           </div>
//         )}

//         <NetworkFlow
//           nodes={nodes} setNodes={setNodes}
//           edges={edges} setEdges={setEdges}
//           onElementSelect={setSelectedElement}
//           onDrillDown={onDrillDown}
//         />
//       </div>
      
//       <PropertiesPanel
//         selectedElement={selectedElement}
//         nodes={nodes} setNodes={setNodes}
//         edges={edges} setEdges={setEdges}
//       />
//     </div>
//   );
// }

// export default App;

import { useState, useCallback } from 'react';
import DeviceSidebar from './components/DeviceSidebar';
import NetworkFlow from './components/NetworkFlow';
import PropertiesPanel from './components/PropertiesPanel';
import { processOntSearch, buildRingFromData, buildStaticRingTopology, buildMandalRingFromData } from './utils/topologyMapper';
import './App.css';

// Import JSON data files
import FILE1_ONT2OLT from './data/ont2olt.json';
import FILE2_OLT2ROUTER from './data/olt2router.json';
import FILE3_CHILD2PARENT from './data/child2parent.json';
import FILE4_GPTOPOLOGY from './data/gptopology.json';
import FILE5_MANDALTOPOLOGY from './data/mandaltopology.json';

const edgeDefaults = {
  animated: true,
  style: { stroke: '#4A5B6E', strokeWidth: 2 },
  labelStyle: { fill: '#A0AEC0', fontWeight: 500, fontSize: '11px' },
  labelShowBg: true,
  labelBgStyle: { fill: '#23303D', stroke: '#4A5B6E' },
  labelBgPadding: [4, 4],
};

// ─── Main static topology ─────────────────────────────────────────────────────
const INITIAL_NODES = [
  { id: 'router-1746123456789-abc12', type: 'fiberDevice', position: { x: 100, y: 200 }, data: { type: 'router', hostname: 'core-router-01', ip: '192.168.1.1' } },
  { id: 'switch-1746123456790-def34', type: 'fiberDevice', position: { x: 350, y: 100 }, data: { type: 'switch', hostname: 'dist-switch-01', ip: '192.168.1.2' } },
  { id: 'switch-1746123456791-ghi56', type: 'fiberDevice', position: { x: 350, y: 300 }, data: { type: 'switch', hostname: 'dist-switch-02', ip: '192.168.1.3' } },
  { id: 'olt-1746123456792-jkl78',    type: 'fiberDevice', position: { x: 600, y: 100 }, data: { type: 'olt',    hostname: 'olt-north-01',    ip: '192.168.2.1' } },
  { id: 'olt-1746123456793-mno90',    type: 'fiberDevice', position: { x: 600, y: 300 }, data: { type: 'olt',    hostname: 'olt-south-01',    ip: '192.168.2.2' } },
  { id: 'ont-1746123456794-pqr11',    type: 'fiberDevice', position: { x: 850, y: 50  }, data: { type: 'ont',    hostname: 'ont-home-01',     ip: '192.168.3.1' } },
  { id: 'ont-1746123456795-stu22',    type: 'fiberDevice', position: { x: 850, y: 170 }, data: { type: 'ont',    hostname: 'ont-home-02',     ip: '192.168.3.2' } },
  { id: 'ont-1746123456796-vwx33',    type: 'fiberDevice', position: { x: 850, y: 280 }, data: { type: 'ont',    hostname: 'ont-office-01',   ip: '192.168.3.3' } },
  { id: 'ont-1746123456797-yza44',    type: 'fiberDevice', position: { x: 850, y: 390 }, data: { type: 'ont',    hostname: 'ont-office-02',   ip: '192.168.3.4' } },
];

const INITIAL_EDGES = [
  { id: 'edge-001', source: 'router-1746123456789-abc12', target: 'switch-1746123456790-def34', label: '10G Uplink', ...edgeDefaults },
  { id: 'edge-002', source: 'router-1746123456789-abc12', target: 'switch-1746123456791-ghi56', label: '10G Uplink', ...edgeDefaults },
  { id: 'edge-003', source: 'switch-1746123456790-def34', target: 'olt-1746123456792-jkl78',    label: '1G Fiber',   ...edgeDefaults },
  { id: 'edge-004', source: 'switch-1746123456791-ghi56', target: 'olt-1746123456793-mno90',    label: '1G Fiber',   ...edgeDefaults },
  { id: 'edge-005', source: 'olt-1746123456792-jkl78',    target: 'ont-1746123456794-pqr11',    label: 'GPON Drop',  ...edgeDefaults },
  { id: 'edge-006', source: 'olt-1746123456792-jkl78',    target: 'ont-1746123456795-stu22',    label: 'GPON Drop',  ...edgeDefaults },
  { id: 'edge-007', source: 'olt-1746123456793-mno90',    target: 'ont-1746123456796-vwx33',    label: 'GPON Drop',  ...edgeDefaults },
  { id: 'edge-008', source: 'olt-1746123456793-mno90',    target: 'ont-1746123456797-yza44',    label: 'GPON Drop',  ...edgeDefaults },
];

function App() {
  const [selectedElement, setSelectedElement] = useState(null);
  const [nodes, setNodes] = useState(INITIAL_NODES);
  const [edges, setEdges] = useState(INITIAL_EDGES);
  const [ontSerialInput, setOntSerialInput] = useState('');
  const [searchStatus, setSearchStatus] = useState({ loading: false, error: null, found: false });
  const [navStack, setNavStack] = useState([]);
  const [ringDataContext, setRingDataContext] = useState(null);

  const currentLabel = navStack.length > 0
    ? `${navStack[navStack.length - 1].label} › Ring View`
    : 'Main Topology';

  // ── ONT Search: Show LINEAR chain (ONT → OLT → Router → ...) ────────────────
  const handleOntSearch = useCallback((serialNo) => {
    if (!serialNo?.trim()) return;
    setSearchStatus({ loading: true, error: null, found: false });

    try {
      const result = processOntSearch(
        serialNo.trim(),
        FILE1_ONT2OLT,
        FILE2_OLT2ROUTER,
        FILE3_CHILD2PARENT,
        FILE4_GPTOPOLOGY,
        FILE5_MANDALTOPOLOGY
      );

      if (!result) {
        setSearchStatus({ loading: false, error: 'ONT not found', found: false });
        return;
      }

      const { linearChain, mandalRouterData } = result;
      setRingDataContext(mandalRouterData);
      setNavStack((stack) => [...stack, { nodes, edges, label: `ONT: ${serialNo.trim()}` }]);
      setNodes(linearChain.nodes);
      setEdges(linearChain.edges);
      setSelectedElement(null);
      setSearchStatus({ loading: false, error: null, found: true });

    } catch (err) {
      console.error('Search error:', err);
      setSearchStatus({ loading: false, error: 'Search failed', found: false });
    }
  }, [nodes, edges]);

  // ── Double-Click Handler ──────────────────────────────────────────────────────
  // Case 1: GP Router (3rd node, isCentral + hasRing)
  //         → buildRingFromData using ringDataContext (gptopology)
  //
  // Case 2: Mandal Router (4th node in GP path, isParentMandal + hasMandalRing)
  //         → buildMandalRingFromData using node.data.mandalTopologyData (mandaltopology)
  //
  // Case 3: Mandal Router (3rd node in Mandal path, isCentral + hasMandalRing)
  //         → buildMandalRingFromData using node.data.mandalTopologyData (mandaltopology)
  const onDrillDown = useCallback((node) => {
    if (node.data.type !== 'router') return;
    if (node.data.isRingCenter) return; // already in ring view

    // ── Case 2 & 3: Mandal router double-click → show mandal ring ─────────────
    if (node.data.hasMandalRing && node.data.mandalTopologyData?.ringData?.length > 0) {
      const { ringData, topology } = node.data.mandalTopologyData;
      const { nodes: ringNodes, edges: ringEdges } = buildMandalRingFromData(
        node.data.hostname,
        ringData
      );
      setNavStack((stack) => [
        ...stack,
        { nodes, edges, label: node.data.hostname }
      ]);
      setNodes(ringNodes);
      setEdges(ringEdges);
      setSelectedElement(null);
      return;
    }

    // ── Case 1: GP router double-click → show GP ring ─────────────────────────
    if (node.data.isCentral && node.data.hasRing) {
      if (ringDataContext?.ringData?.length > 0) {
        const { nodes: ringNodes, edges: ringEdges } = buildRingFromData(
          ringDataContext.hostname,
          ringDataContext.ringData,
          ringDataContext.uniqueTopologies,
          ringDataContext.routerKeyType || 'mandal'
        );
        setNavStack((stack) => [
          ...stack,
          { nodes, edges, label: node.data.hostname }
        ]);
        setNodes(ringNodes);
        setEdges(ringEdges);
        setSelectedElement(null);
      } else {
        // Fallback static ring
        const { ringNodes, ringEdges } = buildStaticRingTopology(node);
        setNavStack((stack) => [
          ...stack,
          { nodes, edges, label: node.data.hostname }
        ]);
        setNodes(ringNodes);
        setEdges(ringEdges);
        setSelectedElement(null);
      }
    }
  }, [nodes, edges, ringDataContext]);

  // ── Navigate Back ─────────────────────────────────────────────────────────────
  const onNavigateBack = useCallback(() => {
    if (navStack.length === 0) return;
    const prev = navStack[navStack.length - 1];
    setNodes(prev.nodes);
    setEdges(prev.edges);
    setNavStack((stack) => stack.slice(0, -1));
    if (navStack.length === 1) setRingDataContext(null);
    setSelectedElement(null);
  }, [navStack]);

  const saveTopology = useCallback(() => {
    localStorage.setItem('fiber-network-topology', JSON.stringify({ nodes, edges, timestamp: new Date().toISOString() }));
  }, [nodes, edges]);

  const loadTopology = useCallback(() => {
    const saved = localStorage.getItem('fiber-network-topology');
    if (saved) {
      const { nodes: n, edges: e } = JSON.parse(saved);
      setNodes(n || []);
      setEdges(e || []);
    }
  }, []);

  return (
    <div className="app-layout">
      <DeviceSidebar
        onSave={saveTopology} onLoad={loadTopology}
        ontSerialInput={ontSerialInput}
        onOntSerialChange={setOntSerialInput}
        onOntSearch={handleOntSearch}
        searchStatus={searchStatus}
      />

      <div className="flow-area" style={{ position: 'relative' }}>
        {/* Breadcrumb Bar */}
        <div style={{
          position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)',
          zIndex: 10, display: 'flex', alignItems: 'center', gap: 10,
          background: '#1a2530', border: '1px solid #2D3B48',
          borderRadius: 8, padding: '6px 14px', boxShadow: '0 2px 8px rgba(0,0,0,0.4)'
        }}>
          {navStack.length > 0 && (
            <button onClick={onNavigateBack} style={{
              background: '#2D3B48', border: 'none', color: '#A0AEC0',
              borderRadius: 6, padding: '4px 12px', cursor: 'pointer', fontSize: 13
            }}>← Back</button>
          )}
          <span style={{ color: '#e2e8f0', fontSize: 13, fontWeight: 600 }}>{currentLabel}</span>
          {navStack.length === 0 && searchStatus.found && (
            <span style={{ color: '#22c55e', fontSize: 11, marginLeft: 6 }}>
              💡 Double-click the 🔵 router to view ring topology
            </span>
          )}
        </div>

        {/* Status Messages */}
        {searchStatus.loading && (
          <div style={{ position: 'absolute', top: 60, left: '50%', transform: 'translateX(-50%)', zIndex: 10, background: '#2D3B48', color: '#A0AEC0', padding: '8px 16px', borderRadius: 6 }}>
            🔍 Processing...
          </div>
        )}
        {searchStatus.error && (
          <div style={{ position: 'absolute', top: 60, left: '50%', transform: 'translateX(-50%)', zIndex: 10, background: '#7f1d1d', color: '#fecaca', padding: '8px 16px', borderRadius: 6 }}>
            ⚠️ {searchStatus.error}
          </div>
        )}

        <NetworkFlow
          nodes={nodes} setNodes={setNodes}
          edges={edges} setEdges={setEdges}
          onElementSelect={setSelectedElement}
          onDrillDown={onDrillDown}
        />
      </div>

      <PropertiesPanel
        selectedElement={selectedElement}
        nodes={nodes} setNodes={setNodes}
        edges={edges} setEdges={setEdges}
      />
    </div>
  );
}

export default App;