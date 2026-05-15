// // src/components/FiberDeviceNode.js
// import { Handle, Position } from '@xyflow/react';
// import './FiberDeviceNode.css';

// const deviceIcons = { router: '🌐', switch: '🔌', olt: '📡', ont: '💻' };

// export default function FiberDeviceNode({ id, data, selected, isDragging }) {
//   const icon = deviceIcons[data.type] || '📦';
  
//   return (
//     <div
//       className={`fiber-node ${selected ? 'selected' : ''} ${isDragging ? 'dragging' : ''}`}
//       style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
//     >
//       {/* Search origin indicator */}
//       {data.isSearchOrigin && (
//         <div style={{ 
//           position: 'absolute', top: -6, right: -6, 
//           width: 16, height: 16, borderRadius: '50%', 
//           background: '#22c55e', border: '2px solid #1a2530',
//           fontSize: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center'
//         }}>🔍</div>
//       )}
      
//       {/* Type indicator dot */}
//       <div style={{ 
//         position: 'absolute', top: 8, right: 8, 
//         width: 6, height: 6, borderRadius: '50%', 
//         background: data.isCentral ? '#63b3ed' : '#4A5B6E',
//         pointerEvents: 'none' 
//       }} />
      
//       <div className="node-icon" style={{ pointerEvents: 'none' }}>{icon}</div>
//       <div className="node-header">{data.type?.toUpperCase()}</div>
      
//       <div className="node-details">
//         <div className={`node-row ${!data.hostname ? 'value-empty' : ''}`}>
//           <span>Host:</span> <strong>{data.hostname || '—'}</strong>
//         </div>
//         <div className={`node-row ${!data.ip ? 'value-empty' : ''}`}>
//           <span>IP:</span> <strong>{data.ip || '—'}</strong>
//         </div>
//         {data.serial && (
//           <div className="node-row">
//             <span>Serial:</span> <strong>{data.serial}</strong>
//           </div>
//         )}
//         {data.ringName && (
//           <div className="node-row">
//             <span>Ring:</span> <strong>{data.ringName}</strong>
//           </div>
//         )}
//       </div>

//       <Handle type="target" position={Position.Left} style={{ background: '#4A5B6E', borderColor: '#fff', zIndex: 2 }} />
//       <Handle type="source" position={Position.Right} style={{ background: '#4A5B6E', borderColor: '#fff', zIndex: 2 }} />
//     </div>
//   );
// }


import { Handle, Position } from '@xyflow/react';
import './FiberDeviceNode.css';

const deviceIcons = { router: '🌐', switch: '🔌', olt: '📡', ont: '💻' };

export default function FiberDeviceNode({ id, data, selected, isDragging }) {
  const icon = deviceIcons[data.type] || '📦';
  
  return (
    <div
      className={`fiber-node ${selected ? 'selected' : ''} ${isDragging ? 'dragging' : ''}`}
      style={{ cursor: isDragging ? 'grabbing' : (data.hasRing ? 'pointer' : 'grab') }}
    >
      {/* Search origin indicator */}
      {data.isSearchOrigin && (
        <div style={{ position: 'absolute', top: -6, right: -6, width: 16, height: 16, borderRadius: '50%', background: '#22c55e', border: '2px solid #1a2530', fontSize: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🔍</div>
      )}
      
      {/* Drill-down hint for central router */}
      {data.hasRing && !data.isRingCenter && (
        <div style={{ position: 'absolute', bottom: -20, left: '50%', transform: 'translateX(-50%)', fontSize: '10px', color: '#63b3ed', whiteSpace: 'nowrap', pointerEvents: 'none' }}>
          ⇊ Double-click for ring
        </div>
      )}
      
      <div className="node-icon" style={{ pointerEvents: 'none' }}>{icon}</div>
      <div className="node-header">{data.type?.toUpperCase()}</div>
      
      <div className="node-details">
        <div className={`node-row ${!data.hostname ? 'value-empty' : ''}`}>
          <span>Host:</span> <strong>{data.hostname || '—'}</strong>
        </div>
        <div className={`node-row ${!data.ip ? 'value-empty' : ''}`}>
          <span>IP:</span> <strong>{data.ip || '—'}</strong>
        </div>
        {data.serial && <div className="node-row"><span>Serial:</span> <strong>{data.serial}</strong></div>}
        {data.ringName && <div className="node-row"><span>Ring:</span> <strong>{data.ringName}</strong></div>}
      </div>

      <Handle type="target" position={Position.Left} style={{ background: '#4A5B6E', borderColor: '#fff', zIndex: 2 }} />
      <Handle type="source" position={Position.Right} style={{ background: '#4A5B6E', borderColor: '#fff', zIndex: 2 }} />
    </div>
  );
}