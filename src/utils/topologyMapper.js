// // src/utils/topologyMapper.js

// const edgeDefaults = {
//   animated: true,
//   style: { stroke: '#4A5B6E', strokeWidth: 2 },
//   labelStyle: { fill: '#A0AEC0', fontWeight: 500, fontSize: '11px' },
//   labelShowBg: true,
//   labelBgStyle: { fill: '#23303D', stroke: '#4A5B6E' },
//   labelBgPadding: [4, 4],
// };

// /**
//  * Process ONT serial search - returns LINEAR chain only: ONT → OLT → Mandal Router
//  * Ring is built separately on router click
//  */
// export function processOntSearch(ontSerialNo, file1, file2, file3, file4) {
//   const ontEntry = file1.find(ont => 
//     ont.ont_serial_no?.trim().toLowerCase() === ontSerialNo?.trim().toLowerCase()
//   );
//   if (!ontEntry) return null;
  
//   const { ont_serial_no, ont_id, olt_hostname, olt_ip_address } = ontEntry;
//   if (!olt_hostname) return null;
  
//   const oltEntries = file2.filter(entry => 
//     entry.olt_hostname?.toLowerCase() === olt_hostname.toLowerCase()
//   );
//   const mandalRouters = [...new Set(
//     oltEntries.map(e => e.mandal_router_hostname).filter(h => h && h.trim() !== '')
//   )];
//   if (mandalRouters.length === 0) return null;
//   const primaryMandalRouter = mandalRouters[0];
//   const primaryOltEntry = oltEntries[0];
  
//   const file3Filtered = file3.filter(entry => 
//     mandalRouters.includes(entry.mandal_router_hostname)
//   );
//   const uniqueTopologies = [...new Set(
//     file3Filtered.map(e => e.topology).filter(t => t && t.trim() !== '')
//   )];
  
//   const ringData = file4.filter(entry => 
//     uniqueTopologies.includes(entry.gp_ring_name)
//   );
  
//   return {
//     linearChain: buildLinearChain({
//       ont: { serial: ont_serial_no, id: ont_id, hostname: `ONT-${ont_serial_no.slice(-6)}` },
//       olt: { hostname: olt_hostname, ip: olt_ip_address },
//       mandalRouter: { hostname: primaryMandalRouter, ip: primaryOltEntry?.mandal_router_ip }
//     }),
//     mandalRouterData: {
//       hostname: primaryMandalRouter,
//       ringData,
//       uniqueTopologies
//     }
//   };
// }

// /**
//  * Build LINEAR chain: ONT → OLT → Mandal Router (no ring)
//  */
// function buildLinearChain({ ont, olt, mandalRouter }) {
//   const nodes = [];
//   const edges = [];
//   const startY = 260, xStep = 250;
  
//   // ONT Node
//   const ontId = `ont-${ont.serial}`;
//   nodes.push({
//     id: ontId,
//     type: 'fiberDevice',
//     position: { x: 50, y: startY - 30 },
//     data: { 
//       type: 'ont', 
//       hostname: ont.hostname, 
//       ip: '', 
//       serial: ont.serial,
//       ontId: ont.id,
//       isSearchOrigin: true
//     },
//     style: { border: '2px solid #22c55e', boxShadow: '0 0 10px rgba(34,197,94,0.4)' }
//   });
  
//   // OLT Node
//   const oltId = `olt-${olt.hostname}`;
//   nodes.push({
//     id: oltId,
//     type: 'fiberDevice',
//     position: { x: xStep, y: startY - 30 },
//     data: { 
//       type: 'olt', 
//       hostname: olt.hostname, 
//       ip: olt.ip,
//       connectedOnt: ont.serial
//     }
//   });
//   edges.push({
//     id: `edge-ont-olt-${ont.serial}`,
//     source: ontId,
//     target: oltId,
//     label: 'GPON',
//     ...edgeDefaults,
//     style: { ...edgeDefaults.style, stroke: '#22c55e' }
//   });
  
//   // Mandal Router Node - stores flag for drill-down
//   const mandalId = `mandal-${mandalRouter.hostname}`;
//   nodes.push({
//     id: mandalId,
//     type: 'fiberDevice',
//     position: { x: xStep * 2, y: startY - 30 },
//     data: { 
//       type: 'router', 
//       hostname: mandalRouter.hostname, 
//       ip: mandalRouter.ip,
//       isCentral: true,
//       connectedOlt: olt.hostname,
//       hasRing: true
//     },
//     style: { border: '3px solid #63b3ed', boxShadow: '0 0 15px rgba(99,179,237,0.6)', cursor: 'pointer' }
//   });
//   edges.push({
//     id: `edge-olt-mandal-${olt.hostname}`,
//     source: oltId,
//     target: mandalId,
//     label: '10G Uplink',
//     ...edgeDefaults
//   });
  
//   return { nodes, edges };
// }

// /**
//  * Build RING topology from stored ringData (called on router double-click)
//  */
// // export function buildRingFromData(mandalRouterHostname, ringData, uniqueTopologies) {
// //   const nodes = [];
// //   const edges = [];
// //   const cx = 400, cy = 260, radius = 200;
  
// //   // Central Mandal Router
// //   const mandalId = `mandal-${mandalRouterHostname}`;
// //   nodes.push({
// //     id: mandalId,
// //     type: 'fiberDevice',
// //     position: { x: cx - 60, y: cy - 30 },
// //     data: { 
// //       type: 'router', 
// //       hostname: mandalRouterHostname, 
// //       isCentral: true, 
// //       isRingCenter: true 
// //     },
// //     style: { border: '3px solid #63b3ed', boxShadow: '0 0 20px rgba(99,179,237,0.8)' }
// //   });
//   export function buildRingFromData(mandalRouterHostname, ringData, uniqueTopologies) {
//   const nodes = [];
//   const edges = [];
//   const cx = 400, cy = 260, radius = 200;
  
//   // Central Mandal Router - ✅ Mark as ring center to prevent duplicate drill-down
//   const mandalId = `mandal-${mandalRouterHostname}`;
//   nodes.push({
//     id: mandalId,
//     type: 'fiberDevice',
//     position: { x: cx - 60, y: cy - 30 },
//     data: { 
//       type: 'router', 
//       hostname: mandalRouterHostname, 
//       isCentral: true, 
//       isRingCenter: true  // ✅ This flag prevents duplicate openings
//     },
//     style: { border: '3px solid #63b3ed', boxShadow: '0 0 20px rgba(99,179,237,0.8)' }
//   });
   
//   // Collect unique GP routers from ringData
//   const gpRouterMap = new Map();
//   ringData.forEach(edge => {
//     if (edge.a_end_device !== mandalRouterHostname && !gpRouterMap.has(edge.a_end_device)) {
//       gpRouterMap.set(edge.a_end_device, {
//         hostname: edge.a_end_device,
//         ip: edge.a_end_device_ip,
//         interface: edge.a_end_device_interface,
//         ringName: edge.gp_ring_name
//       });
//     }
//     if (edge.b_end_device !== mandalRouterHostname && !gpRouterMap.has(edge.b_end_device)) {
//       gpRouterMap.set(edge.b_end_device, {
//         hostname: edge.b_end_device,
//         ip: edge.b_end_device_ip,
//         interface: edge.b_end_device_interface,
//         ringName: edge.gp_ring_name
//       });
//     }
//   });
  
//   // Position GP routers in circular layout
//   const gpRouters = Array.from(gpRouterMap.entries());
//   gpRouters.forEach(([hostname, data], i) => {
//     const angleRad = ((360 / Math.max(gpRouters.length, 1)) * i * Math.PI) / 180;
//     nodes.push({
//       id: `gp-${hostname}`,
//       type: 'fiberDevice',
//       position: {
//         x: cx + radius * Math.cos(angleRad) - 60,
//         y: cy + radius * Math.sin(angleRad) - 30
//       },
//       data: {
//         type: 'router',
//         hostname: data.hostname,
//         ip: data.ip,
//         interface: data.interface,
//         ringName: data.ringName,
//         isGpRouter: true
//       }
//     });
//   });
  
//   // Create ring edges from ringData
//   const getId = (dev) => dev === mandalRouterHostname ? mandalId : `gp-${dev}`;
//   ringData.forEach((edge, idx) => {
//     edges.push({
//       id: `ring-${idx}-${edge.gp_ring_name}`,
//       source: getId(edge.a_end_device),
//       target: getId(edge.b_end_device),
//       label: edge.linear_ring || 'Ring',
//       ...edgeDefaults,
//       style: { ...edgeDefaults.style, stroke: '#8b5cf6' }
//     });
//   });
  
//   return { nodes, edges };
// }

// /**
//  * Fallback static ring (if no ringData available)
//  */
// export function buildStaticRingTopology(clickedNode, siblings = []) {
//   const defaultSiblings = [
//     { id: `${clickedNode.id}-p1`, hostname: 'peer-01', ip: '10.0.0.1' },
//     { id: `${clickedNode.id}-p2`, hostname: 'peer-02', ip: '10.0.0.2' },
//     { id: `${clickedNode.id}-p3`, hostname: 'peer-03', ip: '10.0.0.3' },
//     { id: `${clickedNode.id}-p4`, hostname: 'peer-04', ip: '10.0.0.4' },
//   ];
//   const allNodes = [clickedNode, ...siblings.map(s => ({
//     id: s.id,
//     type: 'fiberDevice',
//     data: { type: 'router', hostname: s.hostname, ip: s.ip },
//     position: { x: 0, y: 0 }
//   }))];
//   const cx = 400, cy = 260, radius = 200, total = allNodes.length;
//   const ringNodes = allNodes.map((node, i) => {
//     const angleRad = (((360 / total) * i - 90) * Math.PI) / 180;
//     return {
//       ...node,
//       position: {
//         x: cx + radius * Math.cos(angleRad) - 60,
//         y: cy + radius * Math.sin(angleRad) - 30
//       },
//       style: node.id === clickedNode.id ? { border: '2px solid #63b3ed' } : {}
//     };
//   });
//   const ringEdges = ringNodes.map((node, i) => {
//     const next = ringNodes[(i + 1) % ringNodes.length];
//     return {
//       id: `ring-${i}`,
//       source: node.id,
//       target: next.id,
//       label: '10G Ring',
//       ...edgeDefaults
//     };
//   });
//   return { ringNodes, ringEdges };
// }

// src/utils/topologyMapper.js

const edgeDefaults = {
  animated: true,
  style: { stroke: '#4A5B6E', strokeWidth: 2 },
  labelStyle: { fill: '#A0AEC0', fontWeight: 500, fontSize: '11px' },
  labelShowBg: true,
  labelBgStyle: { fill: '#23303D', stroke: '#4A5B6E' },
  labelBgPadding: [4, 4],
};

/**
 * Process ONT serial search with DYNAMIC router key handling
 * Path: ONT → OLT → Router (mandal OR gp) → Topology → GP Ring
 */
export function processOntSearch(ontSerialNo, file1, file2, file3, file4) {
  // ── STEP 1: Find ONT in File 1 ─────────────────────────────────────────────
  const ontEntry = file1.find(ont => 
    ont.ont_serial_no?.trim().toLowerCase() === ontSerialNo?.trim().toLowerCase()
  );
  if (!ontEntry) return null;
  
  const { ont_serial_no, ont_id, olt_hostname, olt_ip_address } = ontEntry;
  if (!olt_hostname) return null;
  
  // ── STEP 2: Filter File 2 + DYNAMIC KEY DETECTION ──────────────────────────
  const oltEntries = file2.filter(entry => 
    entry.olt_hostname?.toLowerCase() === olt_hostname.toLowerCase()
  );
  if (oltEntries.length === 0) return null;
  
  // 🔑 KEY LOGIC: Determine which router key has value AND track which one
  let routerHostname = null;
  let routerKeyType = null; // 'mandal' or 'gp'
  
  for (const entry of oltEntries) {
    if (entry.mandal_router_hostname?.trim()) {
      routerHostname = entry.mandal_router_hostname.trim();
      routerKeyType = 'mandal';
      break; // Prefer mandal if found
    }
    if (entry.gp_router_hostname?.trim()) {
      routerHostname = entry.gp_router_hostname.trim();
      routerKeyType = 'gp';
      // Continue checking in case mandal appears later
    }
  }
  
  if (!routerHostname) return null;
  const primaryOltEntry = oltEntries[0];
  
  // ── STEP 3: Filter File 3 using THE SAME KEY TYPE from Step 2 ──────────────
  const file3Filtered = file3.filter(entry => {
    if (routerKeyType === 'mandal') {
      return entry.mandal_router_hostname === routerHostname;
    } else if (routerKeyType === 'gp') {
      return entry.gp_router_hostname === routerHostname;
    }
    return false;
  });
  
  // Extract unique topology values (deduplicated)
  const uniqueTopologies = [...new Set(
    file3Filtered.map(e => e.topology).filter(t => t && t.trim() !== '')
  )];
  
  if (uniqueTopologies.length === 0) return null;
  
  // ── STEP 4: Filter File 4 by gp_ring_name ──────────────────────────────────
  const ringData = file4.filter(entry => 
    uniqueTopologies.includes(entry.gp_ring_name)
  );
  
  if (ringData.length === 0) return null;
  
  // Return linear chain + ring data context
  return {
    linearChain: buildLinearChain({
      ont: { serial: ont_serial_no, id: ont_id, hostname: `ONT-${ont_serial_no.slice(-6)}` },
      olt: { hostname: olt_hostname, ip: olt_ip_address },
      mandalRouter: { 
        hostname: routerHostname, 
        ip: primaryOltEntry?.mandal_router_ip || primaryOltEntry?.gp_router_ip,
        routerKeyType // Pass key type for debugging/display
      }
    }),
    mandalRouterData: {
      hostname: routerHostname,
      routerKeyType,
      ringData,
      uniqueTopologies
    }
  };
}

/**
 * Build LINEAR chain: ONT → OLT → Router (no ring yet)
 */
function buildLinearChain({ ont, olt, mandalRouter }) {
  const nodes = [];
  const edges = [];
  const startY = 260, xStep = 250;
  
  // ONT Node
  const ontId = `ont-${ont.serial}`;
  nodes.push({
    id: ontId,
    type: 'fiberDevice',
    position: { x: 50, y: startY - 30 },
    data: { 
      type: 'ont', 
      hostname: ont.hostname, 
      ip: '', 
      serial: ont.serial,
      ontId: ont.id,
      isSearchOrigin: true
    },
    style: { border: '2px solid #22c55e', boxShadow: '0 0 10px rgba(34,197,94,0.4)' }
  });
  
  // OLT Node
  const oltId = `olt-${olt.hostname}`;
  nodes.push({
    id: oltId,
    type: 'fiberDevice',
    position: { x: xStep, y: startY - 30 },
    data: { 
      type: 'olt', 
      hostname: olt.hostname, 
      ip: olt.ip,
      connectedOnt: ont.serial
    }
  });
  edges.push({
    id: `edge-ont-olt-${ont.serial}`,
    source: ontId,
    target: oltId,
    label: 'GPON',
    ...edgeDefaults,
    style: { ...edgeDefaults.style, stroke: '#22c55e' }
  });
  
  // Router Node (could be mandal OR gp type)
  const routerId = `${mandalRouter.routerKeyType}-${mandalRouter.hostname}`;
  nodes.push({
    id: routerId,
    type: 'fiberDevice',
    position: { x: xStep * 2, y: startY - 30 },
    data: { 
      type: 'router', 
      hostname: mandalRouter.hostname, 
      ip: mandalRouter.ip,
      isCentral: true,
      connectedOlt: olt.hostname,
      hasRing: true,
      routerKeyType: mandalRouter.routerKeyType // Track which key type was used
    },
    style: { border: '3px solid #63b3ed', boxShadow: '0 0 15px rgba(99,179,237,0.6)', cursor: 'pointer' }
  });
  edges.push({
    id: `edge-olt-router-${olt.hostname}`,
    source: oltId,
    target: routerId,
    label: '10G Uplink',
    ...edgeDefaults
  });
  
  return { nodes, edges };
}

/**
 * Build RING topology from stored ringData (called on router double-click)
 */
export function buildRingFromData(routerHostname, ringData, uniqueTopologies, routerKeyType = 'mandal') {
  const nodes = [];
  const edges = [];
  const cx = 400, cy = 260, radius = 200;
  
  // Central Router Node (mandal or gp)
  const routerId = `${routerKeyType}-${routerHostname}`;
  nodes.push({
    id: routerId,
    type: 'fiberDevice',
    position: { x: cx - 60, y: cy - 30 },
    data: { 
      type: 'router', 
      hostname: routerHostname, 
      isCentral: true, 
      isRingCenter: true,
      routerKeyType
    },
    style: { border: '3px solid #63b3ed', boxShadow: '0 0 20px rgba(99,179,237,0.8)' }
  });
  
  // Collect unique GP routers from ringData
  const gpRouterMap = new Map();
  ringData.forEach(edge => {
    // Skip if device is the central router itself
    if (edge.a_end_device !== routerHostname && !gpRouterMap.has(edge.a_end_device)) {
      gpRouterMap.set(edge.a_end_device, {
        hostname: edge.a_end_device,
        ip: edge.a_end_device_ip,
        interface: edge.a_end_device_interface,
        ringName: edge.gp_ring_name
      });
    }
    if (edge.b_end_device !== routerHostname && !gpRouterMap.has(edge.b_end_device)) {
      gpRouterMap.set(edge.b_end_device, {
        hostname: edge.b_end_device,
        ip: edge.b_end_device_ip,
        interface: edge.b_end_device_interface,
        ringName: edge.gp_ring_name
      });
    }
  });
  
  // Position GP routers in circular layout
  const gpRouters = Array.from(gpRouterMap.entries());
  gpRouters.forEach(([hostname, data], i) => {
    const angleRad = ((360 / Math.max(gpRouters.length, 1)) * i * Math.PI) / 180;
    nodes.push({
      id: `gp-${hostname}`,
      type: 'fiberDevice',
      position: {
        x: cx + radius * Math.cos(angleRad) - 60,
        y: cy + radius * Math.sin(angleRad) - 30
      },
      data: {
        type: 'router',
        hostname: data.hostname,
        ip: data.ip,
        interface: data.interface,
        ringName: data.ringName,
        isGpRouter: true
      }
    });
  });
  
  // Create ring edges from ringData
  const getId = (dev) => dev === routerHostname ? routerId : `gp-${dev}`;
  ringData.forEach((edge, idx) => {
    edges.push({
      id: `ring-${idx}-${edge.gp_ring_name}`,
      source: getId(edge.a_end_device),
      target: getId(edge.b_end_device),
      label: edge.linear_ring || 'Ring',
      ...edgeDefaults,
      style: { ...edgeDefaults.style, stroke: '#8b5cf6' }
    });
  });
  
  return { nodes, edges };
}

/**
 * Fallback static ring (if no ringData available)
 */
export function buildStaticRingTopology(clickedNode, siblings = []) {
  const defaultSiblings = [
    { id: `${clickedNode.id}-p1`, hostname: 'peer-01', ip: '10.0.0.1' },
    { id: `${clickedNode.id}-p2`, hostname: 'peer-02', ip: '10.0.0.2' },
    { id: `${clickedNode.id}-p3`, hostname: 'peer-03', ip: '10.0.0.3' },
    { id: `${clickedNode.id}-p4`, hostname: 'peer-04', ip: '10.0.0.4' },
  ];
  const allNodes = [clickedNode, ...siblings.map(s => ({
    id: s.id,
    type: 'fiberDevice',
    data: { type: 'router', hostname: s.hostname, ip: s.ip },
    position: { x: 0, y: 0 }
  }))];
  const cx = 400, cy = 260, radius = 200, total = allNodes.length;
  const ringNodes = allNodes.map((node, i) => {
    const angleRad = (((360 / total) * i - 90) * Math.PI) / 180;
    return {
      ...node,
      position: {
        x: cx + radius * Math.cos(angleRad) - 60,
        y: cy + radius * Math.sin(angleRad) - 30
      },
      style: node.id === clickedNode.id ? { border: '2px solid #63b3ed' } : {}
    };
  });
  const ringEdges = ringNodes.map((node, i) => {
    const next = ringNodes[(i + 1) % ringNodes.length];
    return {
      id: `ring-${i}`,
      source: node.id,
      target: next.id,
      label: '10G Ring',
      ...edgeDefaults
    };
  });
  return { ringNodes, ringEdges };
}