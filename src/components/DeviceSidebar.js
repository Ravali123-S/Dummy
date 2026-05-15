// export default function DeviceSidebar() {
//   const devices = [
//     { type: 'router', label: 'Router', icon: '🌐', desc: 'Core network router' },
//     { type: 'switch', label: 'Switch', icon: '🔌', desc: 'Layer 2/3 switch' },
//     { type: 'olt', label: 'OLT', icon: '📡', desc: 'Optical Line Terminal' },
//     { type: 'ont', label: 'ONT', icon: '💻', desc: 'Optical Network Terminal' }
//   ];

//   const onDragStart = (event, nodeType) => {
//     event.dataTransfer.setData('application/reactflow', nodeType);
//     event.dataTransfer.effectAllowed = 'move';
//   };

//   return (
//     <aside className="sidebar">
//       <h3>📦 Network Devices</h3>
//       <p className="sidebar-hint">Drag devices onto the canvas to build your fiber topology</p>
      
//       {devices.map((device) => (
//         <div
//           key={device.type}
//           className="sidebar-item"
//           draggable
//           onDragStart={(e) => onDragStart(e, device.type)}
//           title={device.desc}
//         >
//           <span className="sidebar-icon">{device.icon}</span>
//           <div>
//             <div style={{ fontWeight: 600, fontSize: '14px' }}>{device.label}</div>
//             <div style={{ fontSize: '11px', color: '#64748b' }}>{device.desc}</div>
//           </div>
//         </div>
//       ))}
      
//       <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid #e2e8f0' }}>
//         <p style={{ fontSize: '11px', color: '#64748b', lineHeight: 1.5 }}>
//           💡 <strong>Tips:</strong><br/>
//           • Drag from handles to connect<br/>
//           • Click nodes/edges to edit<br/>
//           • Scroll to zoom, drag to pan
//         </p>
//       </div>
//     </aside>
//   );
// }

//commented above code on 9/5
export default function DeviceSidebar({ 
  onSave, 
  onLoad, 
  ontSerialInput, 
  onOntSerialChange, 
  onOntSearch,
  searchStatus 
}) {
  const devices = [
    { type: 'router', label: 'Router', icon: '🌐', desc: 'Core network router' },
    { type: 'switch', label: 'Switch', icon: '🔌', desc: 'Layer 2/3 switch' },
    { type: 'olt', label: 'OLT', icon: '📡', desc: 'Optical Line Terminal' },
    { type: 'ont', label: 'ONT', icon: '💻', desc: 'Optical Network Terminal' }
  ];
  
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };
  
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (ontSerialInput?.trim()) {
      onOntSearch(ontSerialInput.trim());
    }
  };

  return (
    <aside className="sidebar">
      {/* 🔍 ONT Serial Search Section */}
      <div style={{ 
        marginBottom: '20px', 
        paddingBottom: '16px', 
        borderBottom: '1px solid #2D3B48' 
      }}>
        <h3 style={{ marginBottom: '12px', fontSize: '14px' }}>🔍 Find ONT Topology</h3>
        <form onSubmit={handleSearchSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <input
            type="text"
            value={ontSerialInput || ''}
            onChange={(e) => onOntSerialChange(e.target.value)}
            placeholder="Enter ONT Serial No..."
            style={{
              width: '100%',
              padding: '8px 10px',
              background: '#151F28',
              color: '#FFFFFF',
              border: '1px solid #2D3B48',
              borderRadius: '6px',
              fontSize: '13px',
              outline: 'none'
            }}
          />
          <button 
            type="submit"
            disabled={searchStatus?.loading || !ontSerialInput?.trim()}
            style={{
              padding: '8px',
              background: searchStatus?.loading ? '#4A5B6E' : '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: searchStatus?.loading ? 'wait' : 'pointer',
              fontSize: '13px',
              fontWeight: 500,
              transition: 'background 0.2s'
            }}
            onMouseOver={(e) => {
              if (!searchStatus?.loading) e.target.style.background = '#2563eb';
            }}
            onMouseOut={(e) => {
              if (!searchStatus?.loading) e.target.style.background = '#3b82f6';
            }}
          >
            {searchStatus?.loading ? 'Searching...' : 'Search Topology'}
          </button>
        </form>
        {searchStatus?.error && (
          <p style={{ color: '#f87171', fontSize: '11px', marginTop: '8px', margin: 0 }}>
            ⚠️ {searchStatus.error}
          </p>
        )}
      </div>
      
      {/* Device Palette */}
      <h3>📦 Network Devices</h3>
      <p className="sidebar-hint">Drag devices onto the canvas to build your fiber topology</p>
      
      {devices.map((device) => (
        <div
          key={device.type}
          className="sidebar-item"
          draggable
          onDragStart={(e) => onDragStart(e, device.type)}
          title={device.desc}
        >
          <span className="sidebar-icon">{device.icon}</span>
          <div>
            <div style={{ fontWeight: 600, fontSize: '14px' }}>{device.label}</div>
            <div style={{ fontSize: '11px', color: '#64748b' }}>{device.desc}</div>
          </div>
        </div>
      ))}
      
      <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid #2D3B48' }}>
        <p style={{ fontSize: '11px', color: '#64748b', lineHeight: 1.5 }}>
          💡 <strong>Tips:</strong> <br/>
          • Search ONT serial to auto-load ring <br/>
          • Double-click 🌐 router to drill down <br/>
          • Drag from handles to connect devices <br/>
          • Click nodes/edges to edit properties <br/>
          • Scroll to zoom, drag canvas to pan
        </p>
      </div>
    </aside>
  );
}