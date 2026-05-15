// const edgeDefaults = {
//   animated: true,
//   style: { stroke: '#4A5B6E', strokeWidth: 2 },
//   labelStyle: { fill: '#A0AEC0', fontWeight: 500, fontSize: '11px' },
//   labelShowBg: true,
//   labelBgStyle: { fill: '#23303D', stroke: '#4A5B6E' },
//   labelBgPadding: [4, 4],
// };

// /**
//  * Process ONT serial search with DYNAMIC router key handling
//  * Path: ONT → OLT → Router (mandal OR gp) → [ParentMandal if gp] → Topology → GP Ring
//  */
// export function processOntSearch(ontSerialNo, file1, file2, file3, file4) {
//   // ── STEP 1: Find ONT in File 1 ─────────────────────────────────────────────
//   const ontEntry = file1.find(ont =>
//     ont.ont_serial_no?.trim().toLowerCase() === ontSerialNo?.trim().toLowerCase()
//   );
//   if (!ontEntry) return null;

//   const { ont_serial_no, ont_id, olt_hostname, olt_ip_address } = ontEntry;
//   if (!olt_hostname) return null;

//   // ── STEP 2: Filter File 2 + DYNAMIC KEY DETECTION ──────────────────────────
//   const oltEntries = file2.filter(entry =>
//     entry.olt_hostname?.toLowerCase() === olt_hostname.toLowerCase()
//   );
//   if (oltEntries.length === 0) return null;

//   // 🔑 KEY LOGIC: Determine which router key has value AND track which one
//   let routerHostname = null;
//   let routerKeyType = null; // 'mandal' or 'gp'

//   for (const entry of oltEntries) {
//     if (entry.mandal_router_hostname?.trim()) {
//       routerHostname = entry.mandal_router_hostname.trim();
//       routerKeyType = 'mandal';
//       break; // Prefer mandal if found
//     }
//     if (entry.gp_router_hostname?.trim()) {
//       routerHostname = entry.gp_router_hostname.trim();
//       routerKeyType = 'gp';
//       // Continue checking in case mandal appears later
//     }
//   }

//   if (!routerHostname) return null;
//   const primaryOltEntry = oltEntries[0];

//   // ── STEP 3: Filter File 3 using THE SAME KEY TYPE from Step 2 ──────────────
//   const file3Filtered = file3.filter(entry => {
//     if (routerKeyType === 'mandal') {
//       return entry.mandal_router_hostname === routerHostname;
//     } else if (routerKeyType === 'gp') {
//       return entry.gp_router_hostname === routerHostname;
//     }
//     return false;
//   });

//   // NEW: If GP path, extract parent mandal router from file3
//   let parentMandal = null;
//   if (routerKeyType === 'gp' && file3Filtered.length > 0) {
//     const firstMatch = file3Filtered[0];
//     parentMandal = {
//       hostname: firstMatch.mandal_router_hostname,
//       ip: firstMatch.mandal_router_ip || ''
//     };
//   }

//   // Extract unique topology values (deduplicated)
//   const uniqueTopologies = [...new Set(
//     file3Filtered.map(e => e.topology).filter(t => t && t.trim() !== '')
//   )];

//   if (uniqueTopologies.length === 0) return null;

//   // ── STEP 4: Filter File 4 by gp_ring_name ──────────────────────────────────
//   const ringData = file4.filter(entry =>
//     uniqueTopologies.includes(entry.gp_ring_name)
//   );

//   if (ringData.length === 0) return null;

//   // Return linear chain + ring data context
//   // NOTE: 'mandalRouterData' key is preserved for backward compatibility;
//   //       'routerContext' alias also included for new consumers.
//   const routerContext = {
//     hostname: routerHostname,
//     routerKeyType,
//     ringData,
//     uniqueTopologies,
//     parentMandalHostname: parentMandal?.hostname
//   };

//   return {
//     linearChain: buildLinearChain({
//       ont: { serial: ont_serial_no, id: ont_id, hostname: `ONT-${ont_serial_no.slice(-6)}` },
//       olt: { hostname: olt_hostname, ip: olt_ip_address },
//       mandalRouter: {
//         hostname: routerHostname,
//         ip: primaryOltEntry?.mandal_router_ip || primaryOltEntry?.gp_router_ip,
//         routerKeyType
//       },
//       parentMandal // NEW: passed through to buildLinearChain
//     }),
//     // Preserve old key so any existing callers using mandalRouterData keep working
//     mandalRouterData: routerContext,
//     // New alias for new callers
//     routerContext
//   };
// }

// /**
//  * Build LINEAR chain: ONT → OLT → Router → [ParentMandal if GP path]
//  */
// function buildLinearChain({ ont, olt, mandalRouter, parentMandal = null }) {
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

//   // Router Node (mandal OR gp type)
//   // NEW: GP routers get amber styling, mandal routers get blue
//   const routerId = `${mandalRouter.routerKeyType}-${mandalRouter.hostname}`;
//   nodes.push({
//     id: routerId,
//     type: 'fiberDevice',
//     position: { x: xStep * 2, y: startY - 30 },
//     data: {
//       type: 'router',
//       hostname: mandalRouter.hostname,
//       ip: mandalRouter.ip,
//       isCentral: true,
//       connectedOlt: olt.hostname,
//       hasRing: true,
//       routerKeyType: mandalRouter.routerKeyType
//     },
//     style: {
//       border: `3px solid ${mandalRouter.routerKeyType === 'gp' ? '#f59e0b' : '#63b3ed'}`,
//       boxShadow: `0 0 15px rgba(${mandalRouter.routerKeyType === 'gp' ? '245,158,11' : '99,179,237'},0.6)`,
//       cursor: 'pointer'
//     }
//   });
//   edges.push({
//     id: `edge-olt-router-${olt.hostname}`,
//     source: oltId,
//     target: routerId,
//     label: '10G Uplink',
//     ...edgeDefaults
//   });

//   // NEW: Parent Mandal node — only added when GP path has a parent mandal
//   if (parentMandal?.hostname) {
//     const mandalId = `mandal-${parentMandal.hostname}`;
//     nodes.push({
//       id: mandalId,
//       type: 'fiberDevice',
//       position: { x: xStep * 3, y: startY - 30 },
//       data: {
//         type: 'router',
//         hostname: parentMandal.hostname,
//         ip: parentMandal.ip,
//         isCentral: false,
//         hasRing: false,
//         isParentMandal: true,
//         routerKeyType: 'mandal'
//       },
//       style: {
//         border: '2px solid #63b3ed',
//         opacity: 0.95,
//         cursor: 'default'
//       }
//     });
//     edges.push({
//       id: `edge-router-mandal`,
//       source: routerId,
//       target: mandalId,
//       label: 'Backhaul',
//       ...edgeDefaults,
//       style: { ...edgeDefaults.style, stroke: '#63b3ed' }
//     });
//   }

//   return { nodes, edges };
// }

// /**
//  * Build RING topology from stored ringData (called on router double-click)
//  */
// export function buildRingFromData(routerHostname, ringData, uniqueTopologies, routerKeyType = 'mandal') {
//   const nodes = [];
//   const edges = [];
//   const cx = 400, cy = 260, radius = 200;

//   // Central Router Node (mandal or gp)
//   const routerId = `${routerKeyType}-${routerHostname}`;
//   nodes.push({
//     id: routerId,
//     type: 'fiberDevice',
//     position: { x: cx - 60, y: cy - 30 },
//     data: {
//       type: 'router',
//       hostname: routerHostname,
//       isCentral: true,
//       isRingCenter: true,
//       routerKeyType
//     },
//     style: { border: '3px solid #63b3ed', boxShadow: '0 0 20px rgba(99,179,237,0.8)' }
//   });

//   // Collect unique GP routers from ringData
//   const gpRouterMap = new Map();
//   ringData.forEach(edge => {
//     // Skip if device is the central router itself
//     if (edge.a_end_device !== routerHostname && !gpRouterMap.has(edge.a_end_device)) {
//       gpRouterMap.set(edge.a_end_device, {
//         hostname: edge.a_end_device,
//         ip: edge.a_end_device_ip,
//         interface: edge.a_end_device_interface,
//         ringName: edge.gp_ring_name
//       });
//     }
//     if (edge.b_end_device !== routerHostname && !gpRouterMap.has(edge.b_end_device)) {
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
//   const getId = (dev) => dev === routerHostname ? routerId : `gp-${dev}`;
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


// // below comment uncomment for gp  next node works above but not mandal 4th so added below do changes 
// // const edgeDefaults = {
// //   animated: true,
// //   style: { stroke: '#4A5B6E', strokeWidth: 2 },
// //   labelStyle: { fill: '#A0AEC0', fontWeight: 500, fontSize: '11px' },
// //   labelShowBg: true,
// //   labelBgStyle: { fill: '#23303D', stroke: '#4A5B6E' },
// //   labelBgPadding: [4, 4],
// // };

// // /**
// //  * Process ONT serial search with DYNAMIC router key handling
// //  * Path: ONT → OLT → GP     → Mandal (4th, file3.mandal_router_hostname)
// //  *   OR: ONT → OLT → Mandal → ZCR    (4th, file3.zcr_router_hostname)
// //  */
// // export function processOntSearch(ontSerialNo, file1, file2, file3, file4) {
// //   // ── STEP 1: Find ONT in File 1 ─────────────────────────────────────────────
// //   const ontEntry = file1.find(ont =>
// //     ont.ont_serial_no?.trim().toLowerCase() === ontSerialNo?.trim().toLowerCase()
// //   );
// //   if (!ontEntry) return null;

// //   const { ont_serial_no, ont_id, olt_hostname, olt_ip_address } = ontEntry;
// //   if (!olt_hostname) return null;

// //   // ── STEP 2: Filter File 2 + DYNAMIC KEY DETECTION ──────────────────────────
// //   const oltEntries = file2.filter(entry =>
// //     entry.olt_hostname?.toLowerCase() === olt_hostname.toLowerCase()
// //   );
// //   if (oltEntries.length === 0) return null;

// //   // KEY LOGIC: Determine which router key has value AND track which one
// //   let routerHostname = null;
// //   let routerKeyType = null; // 'mandal' or 'gp'

// //   for (const entry of oltEntries) {
// //     if (entry.mandal_router_hostname?.trim()) {
// //       routerHostname = entry.mandal_router_hostname.trim();
// //       routerKeyType = 'mandal';
// //       break; // Prefer mandal if found
// //     }
// //     if (entry.gp_router_hostname?.trim()) {
// //       routerHostname = entry.gp_router_hostname.trim();
// //       routerKeyType = 'gp';
// //       // Continue checking in case mandal appears later
// //     }
// //   }

// //   if (!routerHostname) return null;
// //   const primaryOltEntry = oltEntries[0];

// //   // ── STEP 3: Filter File 3 using THE SAME KEY TYPE from Step 2 ──────────────
// //   const file3Filtered = file3.filter(entry => {
// //     if (routerKeyType === 'mandal') {
// //       return entry.mandal_router_hostname === routerHostname;
// //     } else if (routerKeyType === 'gp') {
// //       return entry.gp_router_hostname === routerHostname;
// //     }
// //     return false;
// //   });

// //   // ── STEP 3b: Extract 4th node from file3 — same keys, same logic, if/else per path
// //   let parentMandal = null; // 4th node when 3rd is GP
// //   let parentZcr = null;    // 4th node when 3rd is Mandal

// //   if (file3Filtered.length > 0) {
// //     const firstMatch = file3Filtered[0];
// //     if (routerKeyType === 'gp') {
// //       // GP path → 4th node is Mandal (existing working logic, unchanged)
// //       if (firstMatch.mandal_router_hostname?.trim()) {
// //         parentMandal = {
// //           hostname: firstMatch.mandal_router_hostname.trim(),
// //           ip: firstMatch.mandal_router_ip?.trim() || ''
// //         };
// //       }
// //     } else if (routerKeyType === 'mandal') {
// //       // Mandal path → 4th node is ZCR (same logic, same file3, zcr column)
// //       if (firstMatch.mandal_router_hostname?.trim()) {
// //         parentZcr = {
// //           hostname: JSON.stringify(firstMatch),
// //           ip: firstMatch.mandal_router_ip?.trim() || ''
// //         };
// //       }
// //     }
// //   }

// //   // Extract unique topology values (deduplicated)
// //   const uniqueTopologies = [...new Set(
// //     file3Filtered.map(e => e.topology).filter(t => t && t.trim() !== '')
// //   )];

// //   if (uniqueTopologies.length === 0) return null;

// //   // ── STEP 4: Filter File 4 by gp_ring_name ──────────────────────────────────
// //   const ringData = file4.filter(entry =>
// //     uniqueTopologies.includes(entry.gp_ring_name)
// //   );

// //   if (ringData.length === 0) return null;

// //   // 'mandalRouterData' preserved for backward compatibility
// //   const routerContext = {
// //     hostname: routerHostname,
// //     routerKeyType,
// //     ringData,
// //     uniqueTopologies,
// //     parentMandalHostname: parentMandal?.hostname,
// //     parentZcrHostname: parentZcr?.hostname
// //   };

// //   return {
// //     linearChain: buildLinearChain({
// //       ont: { serial: ont_serial_no, id: ont_id, hostname: `ONT-${ont_serial_no.slice(-6)}` },
// //       olt: { hostname: olt_hostname, ip: olt_ip_address },
// //       mandalRouter: {
// //         hostname: routerHostname,
// //         ip: primaryOltEntry?.mandal_router_ip || primaryOltEntry?.gp_router_ip,
// //         routerKeyType
// //       },
// //       parentMandal, // 4th node when 3rd is GP
// //       parentZcr     // 4th node when 3rd is Mandal
// //     }),
// //     mandalRouterData: routerContext,
// //     routerContext
// //   };
// // }

// // /**
// //  * Build LINEAR chain:
// //  *   ONT → OLT → GP Router → Mandal (4th)  [GP path]
// //  *   ONT → OLT → Mandal    → ZCR    (4th)  [Mandal path]
// //  */
// // function buildLinearChain({ ont, olt, mandalRouter, parentMandal = null, parentZcr = null }) {
// //   const nodes = [];
// //   const edges = [];
// //   const startY = 260, xStep = 250;

// //   // ONT Node
// //   const ontId = `ont-${ont.serial}`;
// //   nodes.push({
// //     id: ontId,
// //     type: 'fiberDevice',
// //     position: { x: 50, y: startY - 30 },
// //     data: {
// //       type: 'ont',
// //       hostname: ont.hostname,
// //       ip: '',
// //       serial: ont.serial,
// //       ontId: ont.id,
// //       isSearchOrigin: true
// //     },
// //     style: { border: '2px solid #22c55e', boxShadow: '0 0 10px rgba(34,197,94,0.4)' }
// //   });

// //   // OLT Node
// //   const oltId = `olt-${olt.hostname}`;
// //   nodes.push({
// //     id: oltId,
// //     type: 'fiberDevice',
// //     position: { x: xStep, y: startY - 30 },
// //     data: {
// //       type: 'olt',
// //       hostname: olt.hostname,
// //       ip: olt.ip,
// //       connectedOnt: ont.serial
// //     }
// //   });
// //   edges.push({
// //     id: `edge-ont-olt-${ont.serial}`,
// //     source: ontId,
// //     target: oltId,
// //     label: 'GPON',
// //     ...edgeDefaults,
// //     style: { ...edgeDefaults.style, stroke: '#22c55e' }
// //   });

// //   // 3rd Node — Router (GP = amber, Mandal = blue)
// //   const routerId = `${mandalRouter.routerKeyType}-${mandalRouter.hostname}`;
// //   nodes.push({
// //     id: routerId,
// //     type: 'fiberDevice',
// //     position: { x: xStep * 2, y: startY - 30 },
// //     data: {
// //       type: 'router',
// //       hostname: mandalRouter.hostname,
// //       ip: mandalRouter.ip,
// //       isCentral: true,
// //       connectedOlt: olt.hostname,
// //       hasRing: true,
// //       routerKeyType: mandalRouter.routerKeyType
// //     },
// //     style: {
// //       border: `3px solid ${mandalRouter.routerKeyType === 'gp' ? '#f59e0b' : '#63b3ed'}`,
// //       boxShadow: `0 0 15px rgba(${mandalRouter.routerKeyType === 'gp' ? '245,158,11' : '99,179,237'},0.6)`,
// //       cursor: 'pointer'
// //     }
// //   });
// //   edges.push({
// //     id: `edge-olt-router-${olt.hostname}`,
// //     source: oltId,
// //     target: routerId,
// //     label: '10G Uplink',
// //     ...edgeDefaults
// //   });

// //   // 4th Node — Parent Mandal: only when 3rd node is GP
// //   if (parentMandal?.hostname) {
// //     const mandalId = `mandal-${parentMandal.hostname}`;
// //     nodes.push({
// //       id: mandalId,
// //       type: 'fiberDevice',
// //       position: { x: xStep * 3, y: startY - 30 },
// //       data: {
// //         type: 'router',
// //         hostname: parentMandal.hostname,
// //         ip: parentMandal.ip,
// //         isCentral: false,
// //         hasRing: false,
// //         isParentMandal: true,
// //         routerKeyType: 'mandal'
// //       },
// //       style: {
// //         border: '2px solid #63b3ed',
// //         opacity: 0.95,
// //         cursor: 'default'
// //       }
// //     });
// //     edges.push({
// //       id: `edge-router-mandal`,
// //       source: routerId,
// //       target: mandalId,
// //       label: 'Backhaul',
// //       ...edgeDefaults,
// //       style: { ...edgeDefaults.style, stroke: '#63b3ed' }
// //     });
// //   }

// //   // 4th Node — Parent ZCR: only when 3rd node is Mandal
// //   if (parentZcr?.hostname) {
// //     const zcrId = `zcr-${parentZcr.hostname}`;
// //     nodes.push({
// //       id: zcrId,
// //       type: 'fiberDevice',
// //       position: { x: xStep * 3, y: startY - 30 },
// //       data: {
// //         type: 'router',
// //         hostname: parentZcr.hostname,
// //         ip: parentZcr.ip,
// //         isCentral: false,
// //         hasRing: false,
// //         isParentZcr: true,
// //         routerKeyType: 'zcr'
// //       },
// //       style: {
// //         border: '2px solid #a855f7',
// //         boxShadow: '0 0 10px rgba(168,85,247,0.4)',
// //         opacity: 0.95,
// //         cursor: 'default'
// //       }
// //     });
// //     edges.push({
// //       id: `edge-mandal-zcr`,
// //       source: routerId,
// //       target: zcrId,
// //       label: 'Backhaul',
// //       ...edgeDefaults,
// //       style: { ...edgeDefaults.style, stroke: '#a855f7' }
// //     });
// //   }

// //   return { nodes, edges };
// // }

// // /**
// //  * Build RING topology from stored ringData (called on router double-click)
// //  */
// // export function buildRingFromData(routerHostname, ringData, uniqueTopologies, routerKeyType = 'mandal') {
// //   const nodes = [];
// //   const edges = [];
// //   const cx = 400, cy = 260, radius = 200;

// //   // Central Router Node (mandal or gp)
// //   const routerId = `${routerKeyType}-${routerHostname}`;
// //   nodes.push({
// //     id: routerId,
// //     type: 'fiberDevice',
// //     position: { x: cx - 60, y: cy - 30 },
// //     data: {
// //       type: 'router',
// //       hostname: routerHostname,
// //       isCentral: true,
// //       isRingCenter: true,
// //       routerKeyType
// //     },
// //     style: { border: '3px solid #63b3ed', boxShadow: '0 0 20px rgba(99,179,237,0.8)' }
// //   });

// //   // Collect unique GP routers from ringData
// //   const gpRouterMap = new Map();
// //   ringData.forEach(edge => {
// //     if (edge.a_end_device !== routerHostname && !gpRouterMap.has(edge.a_end_device)) {
// //       gpRouterMap.set(edge.a_end_device, {
// //         hostname: edge.a_end_device,
// //         ip: edge.a_end_device_ip,
// //         interface: edge.a_end_device_interface,
// //         ringName: edge.gp_ring_name
// //       });
// //     }
// //     if (edge.b_end_device !== routerHostname && !gpRouterMap.has(edge.b_end_device)) {
// //       gpRouterMap.set(edge.b_end_device, {
// //         hostname: edge.b_end_device,
// //         ip: edge.b_end_device_ip,
// //         interface: edge.b_end_device_interface,
// //         ringName: edge.gp_ring_name
// //       });
// //     }
// //   });

// //   // Position GP routers in circular layout
// //   const gpRouters = Array.from(gpRouterMap.entries());
// //   gpRouters.forEach(([hostname, data], i) => {
// //     const angleRad = ((360 / Math.max(gpRouters.length, 1)) * i * Math.PI) / 180;
// //     nodes.push({
// //       id: `gp-${hostname}`,
// //       type: 'fiberDevice',
// //       position: {
// //         x: cx + radius * Math.cos(angleRad) - 60,
// //         y: cy + radius * Math.sin(angleRad) - 30
// //       },
// //       data: {
// //         type: 'router',
// //         hostname: data.hostname,
// //         ip: data.ip,
// //         interface: data.interface,
// //         ringName: data.ringName,
// //         isGpRouter: true
// //       }
// //     });
// //   });

// //   // Create ring edges from ringData
// //   const getId = (dev) => dev === routerHostname ? routerId : `gp-${dev}`;
// //   ringData.forEach((edge, idx) => {
// //     edges.push({
// //       id: `ring-${idx}-${edge.gp_ring_name}`,
// //       source: getId(edge.a_end_device),
// //       target: getId(edge.b_end_device),
// //       label: edge.linear_ring || 'Ring',
// //       ...edgeDefaults,
// //       style: { ...edgeDefaults.style, stroke: '#8b5cf6' }
// //     });
// //   });

// //   return { nodes, edges };
// // }

// // /**
// //  * Fallback static ring (if no ringData available)
// //  */
// // export function buildStaticRingTopology(clickedNode, siblings = []) {
// //   const defaultSiblings = [
// //     { id: `${clickedNode.id}-p1`, hostname: 'peer-01', ip: '10.0.0.1' },
// //     { id: `${clickedNode.id}-p2`, hostname: 'peer-02', ip: '10.0.0.2' },
// //     { id: `${clickedNode.id}-p3`, hostname: 'peer-03', ip: '10.0.0.3' },
// //     { id: `${clickedNode.id}-p4`, hostname: 'peer-04', ip: '10.0.0.4' },
// //   ];
// //   const allNodes = [clickedNode, ...siblings.map(s => ({
// //     id: s.id,
// //     type: 'fiberDevice',
// //     data: { type: 'router', hostname: s.hostname, ip: s.ip },
// //     position: { x: 0, y: 0 }
// //   }))];
// //   const cx = 400, cy = 260, radius = 200, total = allNodes.length;
// //   const ringNodes = allNodes.map((node, i) => {
// //     const angleRad = (((360 / total) * i - 90) * Math.PI) / 180;
// //     return {
// //       ...node,
// //       position: {
// //         x: cx + radius * Math.cos(angleRad) - 60,
// //         y: cy + radius * Math.sin(angleRad) - 30
// //       },
// //       style: node.id === clickedNode.id ? { border: '2px solid #63b3ed' } : {}
// //     };
// //   });
// //   const ringEdges = ringNodes.map((node, i) => {
// //     const next = ringNodes[(i + 1) % ringNodes.length];
// //     return {
// //       id: `ring-${i}`,
// //       source: node.id,
// //       target: next.id,
// //       label: '10G Ring',
// //       ...edgeDefaults
// //     };
// //   });
// //   return { ringNodes, ringEdges };
// // }




// // ?1 latest 2 oldest 
// const edgeDefaults = {
//   animated: true,
//   style: { stroke: '#4A5B6E', strokeWidth: 2 },
//   labelStyle: { fill: '#A0AEC0', fontWeight: 500, fontSize: '11px' },
//   labelShowBg: true,
//   labelBgStyle: { fill: '#23303D', stroke: '#4A5B6E' },
//   labelBgPadding: [4, 4],
// };

// /**
//  * Process ONT serial search with DYNAMIC router key handling
//  * Case 1 (GP path):     ONT → OLT → GP Router    → Mandal (4th)
//  * Case 2 (Mandal path): ONT → OLT → Mandal Router → ZCR   (4th)
//  *
//  * Both cases read 4th node from file3Filtered[0].mandal_router_hostname
//  */
// export function processOntSearch(ontSerialNo, file1, file2, file3, file4) {
//   // ── STEP 1: Find ONT in File 1 ─────────────────────────────────────────────
//   const ontEntry = file1.find(ont =>
//     ont.ont_serial_no?.trim().toLowerCase() === ontSerialNo?.trim().toLowerCase()
//   );
//   if (!ontEntry) return null;

//   const { ont_serial_no, ont_id, olt_hostname, olt_ip_address } = ontEntry;
//   if (!olt_hostname) return null;

//   // ── STEP 2: Filter File 2 + DYNAMIC KEY DETECTION ──────────────────────────
//   const oltEntries = file2.filter(entry =>
//     entry.olt_hostname?.toLowerCase() === olt_hostname.toLowerCase()
//   );
//   if (oltEntries.length === 0) return null;

//   let routerHostname = null;
//   let routerKeyType = null; // 'mandal' or 'gp'

//   for (const entry of oltEntries) {
//     if (entry.mandal_router_hostname?.trim()) {
//       routerHostname = entry.mandal_router_hostname.trim();
//       routerKeyType = 'mandal';
//       break;
//     }
//     if (entry.gp_router_hostname?.trim()) {
//       routerHostname = entry.gp_router_hostname.trim();
//       routerKeyType = 'gp';
//     }
//   }

//   if (!routerHostname) return null;
//   const primaryOltEntry = oltEntries[0];

//   // ── STEP 3: Filter File 3 using THE SAME KEY TYPE from Step 2 ──────────────
//   const file3Filtered = file3.filter(entry => {
//     if (routerKeyType === 'mandal') {
//       return entry.mandal_router_hostname === routerHostname;
//     } else if (routerKeyType === 'gp') {
//       return entry.gp_router_hostname === routerHostname;
//     }
//     return false;
//   });

//   // ── STEP 3b: Extract 4th node ──────────────────────────────────────────────
//   // Case 1 (GP)     → parentMandal from file3Filtered[0].mandal_router_hostname
//   // ── STEP 3b: Extract 4th node ──────────────────────────────────────────────
//   // Case 1 (GP):     filter file3 where gp_router_hostname === routerHostname
//   //                  → firstMatch.mandal_router_hostname = 'VKBKDGLXMAR001' (4th node)
//   //
//   // Case 2 (Mandal): filter file3 where gp_router_hostname === routerHostname
//   //                  → firstMatch.mandal_router_hostname = 'MDMDKXXXZCR001' (4th node)
//   //
//   // Both cases: same filter key (gp_router_hostname), same result field (mandal_router_hostname)
//   // Case 1 uses file3Filtered (already filtered by gp_router_hostname in Step 3)
//   // Case 2 needs a fresh search on file3 by gp_router_hostname (file3Filtered was by mandal key)

//   let parentMandal = null;
//   let parentZcr = null;

//   if (routerKeyType === 'gp') {
//     // Case 1 — file3Filtered already has rows where gp_router_hostname === routerHostname
//     const firstMatch = file3Filtered[0];
//     if (firstMatch?.mandal_router_hostname?.trim()) {
//       parentMandal = {
//         hostname: firstMatch.mandal_router_hostname.trim(),
//         ip: firstMatch.mandal_router_ip?.trim() || ''
//       };
//     }
//   } else if (routerKeyType === 'mandal') {
//     // Case 2 — file3Filtered was filtered by mandal_router_hostname (for topology/ring)
//     //          so we search file3 directly by gp_router_hostname to find the ZCR parent
//     const c2pRow = file3.find(row =>
//       row.gp_router_hostname?.trim().toLowerCase() === routerHostname.toLowerCase()
//     );
//     if (c2pRow?.mandal_router_hostname?.trim()) {
//       parentZcr = {
//         hostname: c2pRow.mandal_router_hostname.trim(),
//         ip: c2pRow.mandal_router_ip?.trim() || ''
//       };
//     }
//   }

//   // Extract unique topology values (deduplicated)
//   const uniqueTopologies = [...new Set(
//     file3Filtered.map(e => e.topology).filter(t => t && t.trim() !== '')
//   )];

//   if (uniqueTopologies.length === 0) return null;

//   // ── STEP 4: Filter File 4 by gp_ring_name ──────────────────────────────────
//   const ringData = file4.filter(entry =>
//     uniqueTopologies.includes(entry.gp_ring_name)
//   );

//   if (ringData.length === 0) return null;

//   const routerContext = {
//     hostname: routerHostname,
//     routerKeyType,
//     ringData,
//     uniqueTopologies,
//     parentMandalHostname: parentMandal?.hostname,
//     parentZcrHostname: parentZcr?.hostname
//   };

//   return {
//     linearChain: buildLinearChain({
//       ont: { serial: ont_serial_no, id: ont_id, hostname: `ONT-${ont_serial_no.slice(-6)}` },
//       olt: { hostname: olt_hostname, ip: olt_ip_address },
//       mandalRouter: {
//         hostname: routerHostname,
//         ip: primaryOltEntry?.mandal_router_ip || primaryOltEntry?.gp_router_ip,
//         routerKeyType
//       },
//       parentMandal, // 4th node when 3rd is GP
//       parentZcr     // 4th node when 3rd is Mandal
//     }),
//     mandalRouterData: routerContext,
//     routerContext
//   };
// }

// /**
//  * Build LINEAR chain:
//  *   Case 1: ONT → OLT → GP Router    → Mandal (4th, blue)
//  *   Case 2: ONT → OLT → Mandal Router → ZCR   (4th, purple)
//  */
// function buildLinearChain({ ont, olt, mandalRouter, parentMandal = null, parentZcr = null }) {
//   const nodes = [];
//   const edges = [];
//   const startY = 260, xStep = 250;

//   // 1. ONT Node
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

//   // 2. OLT Node
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

//   // 3. Router Node — GP = amber, Mandal = blue
//   const routerId = `${mandalRouter.routerKeyType}-${mandalRouter.hostname}`;
//   nodes.push({
//     id: routerId,
//     type: 'fiberDevice',
//     position: { x: xStep * 2, y: startY - 30 },
//     data: {
//       type: 'router',
//       hostname: mandalRouter.hostname,
//       ip: mandalRouter.ip,
//       isCentral: true,
//       connectedOlt: olt.hostname,
//       hasRing: true,
//       routerKeyType: mandalRouter.routerKeyType
//     },
//     style: {
//       border: `3px solid ${mandalRouter.routerKeyType === 'gp' ? '#f59e0b' : '#63b3ed'}`,
//       boxShadow: `0 0 15px rgba(${mandalRouter.routerKeyType === 'gp' ? '245,158,11' : '99,179,237'},0.6)`,
//       cursor: 'pointer'
//     }
//   });
//   edges.push({
//     id: `edge-olt-router-${olt.hostname}`,
//     source: oltId,
//     target: routerId,
//     label: '10G Uplink',
//     ...edgeDefaults
//   });

//   // 4th Node — Case 1: Parent Mandal (only when 3rd is GP)
//   if (parentMandal?.hostname) {
//     const mandalId = `mandal-${parentMandal.hostname}`;
//     nodes.push({
//       id: mandalId,
//       type: 'fiberDevice',
//       position: { x: xStep * 3, y: startY - 30 },
//       data: {
//         type: 'router',
//         hostname: parentMandal.hostname,
//         ip: parentMandal.ip,
//         isCentral: false,
//         hasRing: false,
//         isParentMandal: true,
//         routerKeyType: 'mandal'
//       },
//       style: {
//         border: '2px solid #63b3ed',
//         opacity: 0.95,
//         cursor: 'default'
//       }
//     });
//     edges.push({
//       id: `edge-router-mandal`,
//       source: routerId,
//       target: mandalId,
//       label: 'Backhaul',
//       ...edgeDefaults,
//       style: { ...edgeDefaults.style, stroke: '#63b3ed' }
//     });
//   }

//   // 4th Node — Case 2: Parent ZCR (only when 3rd is Mandal)
//   if (parentZcr?.hostname) {
//     const zcrId = `zcr-${parentZcr.hostname}`;
//     nodes.push({
//       id: zcrId,
//       type: 'fiberDevice',
//       position: { x: xStep * 3, y: startY - 30 },
//       data: {
//         type: 'router',
//         hostname: parentZcr.hostname,
//         ip: parentZcr.ip,
//         isCentral: false,
//         hasRing: false,
//         isParentZcr: true,
//         routerKeyType: 'zcr'
//       },
//       style: {
//         border: '2px solid #a855f7',
//         boxShadow: '0 0 10px rgba(168,85,247,0.4)',
//         opacity: 0.95,
//         cursor: 'default'
//       }
//     });
//     edges.push({
//       id: `edge-mandal-zcr`,
//       source: routerId,
//       target: zcrId,
//       label: 'Backhaul',
//       ...edgeDefaults,
//       style: { ...edgeDefaults.style, stroke: '#a855f7' }
//     });
//   }

//   return { nodes, edges };
// }

// /**
//  * Build RING topology from stored ringData (called on router double-click)
//  */
// export function buildRingFromData(routerHostname, ringData, uniqueTopologies, routerKeyType = 'mandal') {
//   const nodes = [];
//   const edges = [];
//   const cx = 400, cy = 260, radius = 200;

//   const routerId = `${routerKeyType}-${routerHostname}`;
//   nodes.push({
//     id: routerId,
//     type: 'fiberDevice',
//     position: { x: cx - 60, y: cy - 30 },
//     data: {
//       type: 'router',
//       hostname: routerHostname,
//       isCentral: true,
//       isRingCenter: true,
//       routerKeyType
//     },
//     style: { border: '3px solid #63b3ed', boxShadow: '0 0 20px rgba(99,179,237,0.8)' }
//   });

//   const gpRouterMap = new Map();
//   ringData.forEach(edge => {
//     if (edge.a_end_device !== routerHostname && !gpRouterMap.has(edge.a_end_device)) {
//       gpRouterMap.set(edge.a_end_device, {
//         hostname: edge.a_end_device,
//         ip: edge.a_end_device_ip,
//         interface: edge.a_end_device_interface,
//         ringName: edge.gp_ring_name
//       });
//     }
//     if (edge.b_end_device !== routerHostname && !gpRouterMap.has(edge.b_end_device)) {
//       gpRouterMap.set(edge.b_end_device, {
//         hostname: edge.b_end_device,
//         ip: edge.b_end_device_ip,
//         interface: edge.b_end_device_interface,
//         ringName: edge.gp_ring_name
//       });
//     }
//   });

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

//   const getId = (dev) => dev === routerHostname ? routerId : `gp-${dev}`;
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



// const edgeDefaults = {
//   animated: true,
//   style: { stroke: '#4A5B6E', strokeWidth: 2 },
//   labelStyle: { fill: '#A0AEC0', fontWeight: 500, fontSize: '11px' },
//   labelShowBg: true,
//   labelBgStyle: { fill: '#23303D', stroke: '#4A5B6E' },
//   labelBgPadding: [4, 4],
// };
// // ... (all the existing code above stays the same)

// /**
//  * Build RING topology from stored ringData (called on router double-click)
//  */
// export function buildRingFromData(routerHostname, ringData, uniqueTopologies, routerKeyType = 'mandal') {
//   const nodes = [];
//   const edges = [];
//   const cx = 400, cy = 260, radius = 200;

//   const routerId = `${routerKeyType}-${routerHostname}`;
//   nodes.push({
//     id: routerId,
//     type: 'fiberDevice',
//     position: { x: cx - 60, y: cy - 30 },
//     data: {
//       type: 'router',
//       hostname: routerHostname,
//       isCentral: true,
//       isRingCenter: true,
//       routerKeyType
//     },
//     style: { border: '3px solid #63b3ed', boxShadow: '0 0 20px rgba(99,179,237,0.8)' }
//   });

//   const gpRouterMap = new Map();
//   ringData.forEach(edge => {
//     if (edge.a_end_device !== routerHostname && !gpRouterMap.has(edge.a_end_device)) {
//       gpRouterMap.set(edge.a_end_device, {
//         hostname: edge.a_end_device,
//         ip: edge.a_end_device_ip,
//         interface: edge.a_end_device_interface,
//         ringName: edge.gp_ring_name
//       });
//     }
//     if (edge.b_end_device !== routerHostname && !gpRouterMap.has(edge.b_end_device)) {
//       gpRouterMap.set(edge.b_end_device, {
//         hostname: edge.b_end_device,
//         ip: edge.b_end_device_ip,
//         interface: edge.b_end_device_interface,
//         ringName: edge.gp_ring_name
//       });
//     }
//   });

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

//   const getId = (dev) => dev === routerHostname ? routerId : `gp-${dev}`;
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
// /**
//  * Process ONT serial search with DYNAMIC router key handling
//  * Case 1 (GP path):     ONT → OLT → GP Router → Mandal (4th) → ZCR (5th)
//  * Case 2 (Mandal path): ONT → OLT → Mandal Router → ZCR (4th)
//  */
// export function processOntSearch(ontSerialNo, file1, file2, file3, file4) {
//   // ── STEP 1: Find ONT in File 1 ─────────────────────────────────────────────
//   const ontEntry = file1.find(ont =>
//     ont.ont_serial_no?.trim().toLowerCase() === ontSerialNo?.trim().toLowerCase()
//   );
//   if (!ontEntry) return null;

//   const { ont_serial_no, ont_id, olt_hostname, olt_ip_address } = ontEntry;
//   if (!olt_hostname) return null;

//   // ── STEP 2: Filter File 2 + DYNAMIC KEY DETECTION ──────────────────────────
//   const oltEntries = file2.filter(entry =>
//     entry.olt_hostname?.toLowerCase() === olt_hostname.toLowerCase()
//   );
//   if (oltEntries.length === 0) return null;

//   let routerHostname = null;
//   let routerKeyType = null; // 'mandal' or 'gp'

//   for (const entry of oltEntries) {
//     if (entry.mandal_router_hostname?.trim()) {
//       routerHostname = entry.mandal_router_hostname.trim();
//       routerKeyType = 'mandal';
//       break;
//     }
//     if (entry.gp_router_hostname?.trim()) {
//       routerHostname = entry.gp_router_hostname.trim();
//       routerKeyType = 'gp';
//     }
//   }

//   if (!routerHostname) return null;
//   const primaryOltEntry = oltEntries[0];

//   // ── STEP 3: Filter File 3 using THE SAME KEY TYPE from Step 2 ──────────────
//   const file3Filtered = file3.filter(entry => {
//     if (routerKeyType === 'mandal') {
//       return entry.parent_hostname === routerHostname;
//     } else if (routerKeyType === 'gp') {
//       return entry.child_hostname === routerHostname;
//     }
//     return false;
//   });

//   // ── STEP 3b: Extract 4th node + NEW 5th node logic ────────────────────────
//   let parentMandal = null;   // 4th node when 3rd is GP
//   let parentZcr = null;      // 4th node when 3rd is Mandal  OR  5th node when 3rd is GP
//   let parentZcrFromMandal = null; // 5th node when 3rd is GP (ZCR above Mandal)

//   if (routerKeyType === 'gp') {
//     // Case 1 — 3rd node is GP Router
//     // 4th node: find mandal_router_hostname from child2parent where gp_router_hostname === gpRouterHostname
//     const firstMatch = file3Filtered[0];
//     if (firstMatch?.parent_hostname?.trim()) {
//       parentMandal = {
//         hostname: firstMatch.parent_hostname.trim(),
//         ip: firstMatch.parent_ip?.trim() || ''
//       };

//       // ── NEW: 5th node — search child2parent again using parentMandal.hostname as gp_router_hostname
//       const zcrRow = file3.find(row =>
//         row.child_hostname?.trim().toLowerCase() === parentMandal.hostname.toLowerCase()
//       );
//       if (zcrRow?.parent_hostname?.trim()) {
//         parentZcrFromMandal = {
//           hostname: zcrRow.parent_hostname.trim(),
//           ip: zcrRow.parent_ip?.trim() || ''
//         };
//       }
//     }
//   } else if (routerKeyType === 'mandal') {
//     // Case 2 — 3rd node is Mandal Router
//     // 4th node: ZCR — search child2parent where gp_router_hostname === mandalRouterHostname
//     const c2pRow = file3.find(row =>
//       row.child_hostname?.trim().toLowerCase() === routerHostname.toLowerCase()
//     );
//     if (c2pRow?.parent_hostname?.trim()) {
//       parentZcr = {
//         hostname: c2pRow.parent_hostname.trim(),
//         ip: c2pRow.parent_ip?.trim() || ''
//       };
//     }
//   }

//   // Extract unique topology values (deduplicated)
//   const uniqueTopologies = [...new Set(
//     file3Filtered.map(e => e.topology).filter(t => t && t.trim() !== '')
//   )];

//   if (uniqueTopologies.length === 0) return null;

//   // ── STEP 4: Filter File 4 by gp_ring_name ──────────────────────────────────
//   const ringData = file4.filter(entry =>
//     uniqueTopologies.includes(entry.gp_ring_name)
//   );

//   if (ringData.length === 0) return null;

//   const routerContext = {
//     hostname: routerHostname,
//     routerKeyType,
//     ringData,
//     uniqueTopologies,
//     parentMandalHostname: parentMandal?.hostname,
//     parentZcrHostname: parentZcr?.hostname,
//     parentZcrFromMandalHostname: parentZcrFromMandal?.hostname  // NEW
//   };

//   return {
//     linearChain: buildLinearChain({
//       ont: { serial: ont_serial_no, id: ont_id, hostname: `ONT-${ont_serial_no.slice(-6)}` },
//       olt: { hostname: olt_hostname, ip: olt_ip_address },
//       mandalRouter: {
//         hostname: routerHostname,
//         ip: primaryOltEntry?.mandal_router_ip || primaryOltEntry?.gp_router_ip,
//         routerKeyType
//       },
//       parentMandal,            // 4th node when 3rd is GP
//       parentZcr,               // 4th node when 3rd is Mandal
//       parentZcrFromMandal      // 5th node when 3rd is GP (NEW)
//     }),
//     mandalRouterData: routerContext,
//     routerContext
//   };
// }

// /**
//  * Build LINEAR chain:
//  *   Case 1 (GP path):     ONT → OLT → GP Router → Mandal (4th) → ZCR (5th, purple)
//  *   Case 2 (Mandal path): ONT → OLT → Mandal Router → ZCR (4th, purple)
//  */
// function buildLinearChain({
//   ont,
//   olt,
//   mandalRouter,
//   parentMandal = null,
//   parentZcr = null,
//   parentZcrFromMandal = null   // NEW 5th node param
// }) {
//   const nodes = [];
//   const edges = [];
//   const startY = 260, xStep = 250;

//   // 1. ONT Node
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

//   // 2. OLT Node
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

//   // 3. Router Node — GP = amber, Mandal = blue
//   const routerId = `${mandalRouter.routerKeyType}-${mandalRouter.hostname}`;
//   nodes.push({
//     id: routerId,
//     type: 'fiberDevice',
//     position: { x: xStep * 2, y: startY - 30 },
//     data: {
//       type: 'router',
//       hostname: mandalRouter.hostname,
//       ip: mandalRouter.ip,
//       isCentral: true,
//       connectedOlt: olt.hostname,
//       hasRing: true,
//       routerKeyType: mandalRouter.routerKeyType
//     },
//     style: {
//       border: `3px solid ${mandalRouter.routerKeyType === 'gp' ? '#f59e0b' : '#63b3ed'}`,
//       boxShadow: `0 0 15px rgba(${mandalRouter.routerKeyType === 'gp' ? '245,158,11' : '99,179,237'},0.6)`,
//       cursor: 'pointer'
//     }
//   });
//   edges.push({
//     id: `edge-olt-router-${olt.hostname}`,
//     source: oltId,
//     target: routerId,
//     label: '10G Uplink',
//     ...edgeDefaults
//   });

//   // 4th Node — Case 1: Parent Mandal (only when 3rd is GP)
//   if (parentMandal?.hostname) {
//     const mandalId = `mandal-${parentMandal.hostname}`;
//     nodes.push({
//       id: mandalId,
//       type: 'fiberDevice',
//       position: { x: xStep * 3, y: startY - 30 },
//       data: {
//         type: 'router',
//         hostname: parentMandal.hostname,
//         ip: parentMandal.ip,
//         isCentral: false,
//         hasRing: false,
//         isParentMandal: true,
//         routerKeyType: 'mandal'
//       },
//       style: {
//         border: '2px solid #63b3ed',
//         opacity: 0.95,
//         cursor: 'default'
//       }
//     });
//     edges.push({
//       id: `edge-router-mandal`,
//       source: routerId,
//       target: mandalId,
//       label: 'Backhaul',
//       ...edgeDefaults,
//       style: { ...edgeDefaults.style, stroke: '#63b3ed' }
//     });

//     // ── NEW: 5th Node — ZCR above Mandal (only when 3rd is GP and 4th is Mandal)
//     if (parentZcrFromMandal?.hostname) {
//       const zcrId = `zcr-${parentZcrFromMandal.hostname}`;
//       nodes.push({
//         id: zcrId,
//         type: 'fiberDevice',
//         position: { x: xStep * 4, y: startY - 30 },
//         data: {
//           type: 'router',
//           hostname: parentZcrFromMandal.hostname,
//           ip: parentZcrFromMandal.ip,
//           isCentral: false,
//           hasRing: false,
//           isParentZcr: true,
//           routerKeyType: 'zcr'
//         },
//         style: {
//           border: '2px solid #a855f7',
//           boxShadow: '0 0 10px rgba(168,85,247,0.4)',
//           opacity: 0.95,
//           cursor: 'default'
//         }
//       });
//       edges.push({
//         id: `edge-mandal-zcr`,
//         source: mandalId,
//         target: zcrId,
//         label: 'Backhaul',
//         ...edgeDefaults,
//         style: { ...edgeDefaults.style, stroke: '#a855f7' }
//       });
//     }
//   }

//   // 4th Node — Case 2: Parent ZCR (only when 3rd is Mandal, no 5th node needed)
//   if (parentZcr?.hostname) {
//     const zcrId = `zcr-${parentZcr.hostname}`;
//     nodes.push({
//       id: zcrId,
//       type: 'fiberDevice',
//       position: { x: xStep * 3, y: startY - 30 },
//       data: {
//         type: 'router',
//         hostname: parentZcr.hostname,
//         ip: parentZcr.ip,
//         isCentral: false,
//         hasRing: false,
//         isParentZcr: true,
//         routerKeyType: 'zcr'
//       },
//       style: {
//         border: '2px solid #a855f7',
//         boxShadow: '0 0 10px rgba(168,85,247,0.4)',
//         opacity: 0.95,
//         cursor: 'default'
//       }
//     });
//     edges.push({
//       id: `edge-mandal-zcr`,
//       source: routerId,
//       target: zcrId,
//       label: 'Backhaul',
//       ...edgeDefaults,
//       style: { ...edgeDefaults.style, stroke: '#a855f7' }
//     });
//   }

//   return { nodes, edges };
// }

// renamed keys in file3 to be more generic (parent/child) instead of mandal/gp specific, and updated the logic in processOntSearch to dynamically determine which key to use for filtering and extracting parent/child relationships. Also added new logic to handle a potential 5th node (ZCR above Mandal) when the 3rd node is a GP Router.



const edgeDefaults = {
  animated: true,
  style: { stroke: '#4A5B6E', strokeWidth: 2 },
  labelStyle: { fill: '#A0AEC0', fontWeight: 500, fontSize: '11px' },
  labelShowBg: true,
  labelBgStyle: { fill: '#23303D', stroke: '#4A5B6E' },
  labelBgPadding: [4, 4],
};
// ... (all the existing code above stays the same)

/**
 * Build RING topology from stored ringData (called on router double-click)
 */
export function buildRingFromData(routerHostname, ringData, uniqueTopologies, routerKeyType = 'mandal') {
  const nodes = [];
  const edges = [];
  const cx = 400, cy = 260, radius = 200;

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

  const gpRouterMap = new Map();
  ringData.forEach(edge => {
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
/**
 * Process ONT serial search with DYNAMIC router key handling
 * Case 1 (GP path):     ONT → OLT → GP Router → Mandal (4th) → ZCR (5th)
 * Case 2 (Mandal path): ONT → OLT → Mandal Router → ZCR (4th)
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

  let routerHostname = null;
  let routerKeyType = null; // 'mandal' or 'gp'

  for (const entry of oltEntries) {
    if (entry.mandal_router_hostname?.trim()) {
      routerHostname = entry.mandal_router_hostname.trim();
      routerKeyType = 'mandal';
      break;
    }
    if (entry.gp_router_hostname?.trim()) {
      routerHostname = entry.gp_router_hostname.trim();
      routerKeyType = 'gp';
    }
  }

  if (!routerHostname) return null;
  const primaryOltEntry = oltEntries[0];

  // ── STEP 3: Filter File 3 using THE SAME KEY TYPE from Step 2 ──────────────
  const file3Filtered = file3.filter(entry => {
    if (routerKeyType === 'mandal') {
      return entry.parent_hostname === routerHostname;
    } else if (routerKeyType === 'gp') {
      return entry.child_hostname === routerHostname;
    }
    return false;
  });

  // ── STEP 3b: Extract 4th node + NEW 5th node logic ────────────────────────
  let parentMandal = null;   // 4th node when 3rd is GP
  let parentZcr = null;      // 4th node when 3rd is Mandal  OR  5th node when 3rd is GP
  let parentZcrFromMandal = null; // 5th node when 3rd is GP (ZCR above Mandal)

  if (routerKeyType === 'gp') {
    // Case 1 — 3rd node is GP Router
    // 4th node: find mandal_router_hostname from child2parent where gp_router_hostname === gpRouterHostname
    const firstMatch = file3Filtered[0];
    if (firstMatch?.parent_hostname?.trim()) {
      parentMandal = {
        hostname: firstMatch.parent_hostname.trim(),
        ip: firstMatch.parent_ip?.trim() || ''
      };

      // ── NEW: 5th node — search child2parent again using parentMandal.hostname as gp_router_hostname
      const zcrRow = file3.find(row =>
        row.child_hostname?.trim().toLowerCase() === parentMandal.hostname.toLowerCase()
      );
      if (zcrRow?.parent_hostname?.trim()) {
        parentZcrFromMandal = {
          hostname: zcrRow.parent_hostname.trim(),
          ip: zcrRow.parent_ip?.trim() || ''
        };
      }
    }
  } else if (routerKeyType === 'mandal') {
    // Case 2 — 3rd node is Mandal Router
    // 4th node: ZCR — search child2parent where gp_router_hostname === mandalRouterHostname
    const c2pRow = file3.find(row =>
      row.child_hostname?.trim().toLowerCase() === routerHostname.toLowerCase()
    );
    if (c2pRow?.parent_hostname?.trim()) {
      parentZcr = {
        hostname: c2pRow.parent_hostname.trim(),
        ip: c2pRow.parent_ip?.trim() || ''
      };
    }
  }

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

  const routerContext = {
    hostname: routerHostname,
    routerKeyType,
    ringData,
    uniqueTopologies,
    parentMandalHostname: parentMandal?.hostname,
    parentZcrHostname: parentZcr?.hostname,
    parentZcrFromMandalHostname: parentZcrFromMandal?.hostname  // NEW
  };

  return {
    linearChain: buildLinearChain({
      ont: { serial: ont_serial_no, id: ont_id, hostname: `ONT-${ont_serial_no.slice(-6)}` },
      olt: { hostname: olt_hostname, ip: olt_ip_address },
      mandalRouter: {
        hostname: routerHostname,
        ip: primaryOltEntry?.mandal_router_ip || primaryOltEntry?.gp_router_ip,
        routerKeyType
      },
      parentMandal,            // 4th node when 3rd is GP
      parentZcr,               // 4th node when 3rd is Mandal
      parentZcrFromMandal      // 5th node when 3rd is GP (NEW)
    }),
    mandalRouterData: routerContext,
    routerContext
  };
}

/**
 * Build LINEAR chain:
 *   Case 1 (GP path):     ONT → OLT → GP Router → Mandal (4th) → ZCR (5th, purple)
 *   Case 2 (Mandal path): ONT → OLT → Mandal Router → ZCR (4th, purple)
 */
function buildLinearChain({
  ont,
  olt,
  mandalRouter,
  parentMandal = null,
  parentZcr = null,
  parentZcrFromMandal = null   // NEW 5th node param
}) {
  const nodes = [];
  const edges = [];
  const startY = 260, xStep = 250;

  // 1. ONT Node
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

  // 2. OLT Node
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

  // 3. Router Node — GP = amber, Mandal = blue
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
      routerKeyType: mandalRouter.routerKeyType
    },
    style: {
      border: `3px solid ${mandalRouter.routerKeyType === 'gp' ? '#f59e0b' : '#63b3ed'}`,
      boxShadow: `0 0 15px rgba(${mandalRouter.routerKeyType === 'gp' ? '245,158,11' : '99,179,237'},0.6)`,
      cursor: 'pointer'
    }
  });
  edges.push({
    id: `edge-olt-router-${olt.hostname}`,
    source: oltId,
    target: routerId,
    label: '10G Uplink',
    ...edgeDefaults
  });

  // 4th Node — Case 1: Parent Mandal (only when 3rd is GP)
  if (parentMandal?.hostname) {
    const mandalId = `mandal-${parentMandal.hostname}`;
    nodes.push({
      id: mandalId,
      type: 'fiberDevice',
      position: { x: xStep * 3, y: startY - 30 },
      data: {
        type: 'router',
        hostname: parentMandal.hostname,
        ip: parentMandal.ip,
        isCentral: false,
        hasRing: false,
        isParentMandal: true,
        routerKeyType: 'mandal'
      },
      style: {
        border: '2px solid #63b3ed',
        opacity: 0.95,
        cursor: 'default'
      }
    });
    edges.push({
      id: `edge-router-mandal`,
      source: routerId,
      target: mandalId,
      label: 'Backhaul',
      ...edgeDefaults,
      style: { ...edgeDefaults.style, stroke: '#63b3ed' }
    });

    // ── NEW: 5th Node — ZCR above Mandal (only when 3rd is GP and 4th is Mandal)
    if (parentZcrFromMandal?.hostname) {
      const zcrId = `zcr-${parentZcrFromMandal.hostname}`;
      nodes.push({
        id: zcrId,
        type: 'fiberDevice',
        position: { x: xStep * 4, y: startY - 30 },
        data: {
          type: 'router',
          hostname: parentZcrFromMandal.hostname,
          ip: parentZcrFromMandal.ip,
          isCentral: false,
          hasRing: false,
          isParentZcr: true,
          routerKeyType: 'zcr'
        },
        style: {
          border: '2px solid #a855f7',
          boxShadow: '0 0 10px rgba(168,85,247,0.4)',
          opacity: 0.95,
          cursor: 'default'
        }
      });
      edges.push({
        id: `edge-mandal-zcr`,
        source: mandalId,
        target: zcrId,
        label: 'Backhaul',
        ...edgeDefaults,
        style: { ...edgeDefaults.style, stroke: '#a855f7' }
      });
    }
  }

  // 4th Node — Case 2: Parent ZCR (only when 3rd is Mandal, no 5th node needed)
  if (parentZcr?.hostname) {
    const zcrId = `zcr-${parentZcr.hostname}`;
    nodes.push({
      id: zcrId,
      type: 'fiberDevice',
      position: { x: xStep * 3, y: startY - 30 },
      data: {
        type: 'router',
        hostname: parentZcr.hostname,
        ip: parentZcr.ip,
        isCentral: false,
        hasRing: false,
        isParentZcr: true,
        routerKeyType: 'zcr'
      },
      style: {
        border: '2px solid #a855f7',
        boxShadow: '0 0 10px rgba(168,85,247,0.4)',
        opacity: 0.95,
        cursor: 'default'
      }
    });
    edges.push({
      id: `edge-mandal-zcr`,
      source: routerId,
      target: zcrId,
      label: 'Backhaul',
      ...edgeDefaults,
      style: { ...edgeDefaults.style, stroke: '#a855f7' }
    });
  }

  return { nodes, edges };
}