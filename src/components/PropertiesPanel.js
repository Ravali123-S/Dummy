export default function PropertiesPanel({ selectedElement, nodes, setNodes, edges, setEdges }) {
  if (!selectedElement) {
    return (
      <aside className="properties-panel">
        <h3>⚙️ Properties</h3>
        <p className="empty-state">
          Select a device or connection to view and edit its properties
        </p>
      </aside>
    );
  }

  const { type, id } = selectedElement;

  // Update node data helper
  const updateNodeData = (field, value) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, [field]: value } } : node
      )
    );
  };

  // Update edge label helper
  const updateEdgeLabel = (value) => {
    setEdges((eds) =>
      eds.map((edge) =>
        edge.id === id ? { ...edge, label: value, animated: !!value } : edge
      )
    );
  };

  // Delete edge helper
  const deleteEdge = () => {
    setEdges((eds) => eds.filter((e) => e.id !== id));
  };

  if (type === 'node') {
    const node = nodes.find((n) => n.id === id);
    if (!node) return null;

    return (
      <aside className="properties-panel">
        <h3>🔧 Device Properties</h3>
        
        <label>
          Hostname
          <input
            type="text"
            value={node.data.hostname || ''}
            onChange={(e) => updateNodeData('hostname', e.target.value)}
            placeholder="e.g., core-router-01"
          />
        </label>

        <label>
          IP Address
          <input
            type="text"
            value={node.data.ip || ''}
            onChange={(e) => updateNodeData('ip', e.target.value)}
            placeholder="e.g., 192.168.1.1"
          />
        </label>

        <label>
          Device Type
          <input 
            type="text" 
            value={node.data.type?.toUpperCase() || ''} 
            disabled 
            style={{ background: '#f8fafc', color: '#64748b' }}
          />
        </label>

        <label>
          Node ID (read-only)
          <input type="text" value={node.id} disabled style={{ background: '#f1f5f9', fontSize: '11px' }} />
        </label>

        <button 
          className="delete-btn" 
          onClick={() => setNodes((nds) => nds.filter(n => n.id !== id))}
          style={{ marginTop: '20px' }}
        >
          🗑️ Delete Device
        </button>
      </aside>
    );
  }

  if (type === 'edge') {
    const edge = edges.find((e) => e.id === id);
    if (!edge) return null;

    const sourceNode = nodes.find(n => n.id === edge.source);
    const targetNode = nodes.find(n => n.id === edge.target);

    return (
      <aside className="properties-panel">
        <h3>🔗 Link Properties</h3>
        
        <label>
          Connection Label
          <input
            type="text"
            value={edge.label || ''}
            onChange={(e) => updateEdgeLabel(e.target.value)}
            placeholder="e.g., 10G Fiber, VLAN 100"
          />
        </label>

        <label>
          Source → Target
          <input 
            type="text" 
            value={`${sourceNode?.data?.hostname || edge.source} → ${targetNode?.data?.hostname || edge.target}`} 
            disabled 
            style={{ background: '#f8fafc', fontSize: '12px' }}
          />
        </label>

        <label>
          Link ID (read-only)
          <input type="text" value={edge.id} disabled style={{ background: '#f1f5f9', fontSize: '11px' }} />
        </label>

        <button 
          className="delete-btn" 
          onClick={deleteEdge}
          style={{ marginTop: '20px' }}
        >
          🗑️ Delete Connection
        </button>
      </aside>
    );
  }

  return null;
}