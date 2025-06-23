import React, { useState, useEffect } from "react";

// --- LocalStorage Utility Functions ---
const getFromStorage = (key, initialValue) => {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  } catch (error) {
    console.error(error);
    return initialValue;
  }
};
// --- End LocalStorage Utility Functions ---

const deliveryData = [
    { id: 'track001', recipientName: 'Alex Ojo', recipientPhone: '07034675754', deliveryAddress: 'Kano, NG', assignedDriver: '1', status: 'Arriving today!', progress: 80, startTime: '09:00', endTime: '17:00' },
    { id: 'track002', recipientName: 'John Obi', recipientPhone: '09023421111', deliveryAddress: 'Imo, NG', assignedDriver: '2', status: 'In Transit', progress: 30, startTime: '10:00', endTime: '18:00' },
    { id: 'track003', recipientName: 'Moses Uhem', recipientPhone: '09091808067', deliveryAddress: 'Abuja, NG', assignedDriver: '3', status: 'Arriving today!', progress: 90, startTime: '08:30', endTime: '16:30' },
    { id: 'track004', recipientName: 'John Honora', recipientPhone: '08101588941', deliveryAddress: 'Kisumu, KE', assignedDriver: '13', status: 'Delivered', progress: 100, startTime: '11:00', endTime: '15:00' },
    { id: 'track005', recipientName: 'Chioma Okoro', recipientPhone: '08055566777', deliveryAddress: 'Jos, NG', assignedDriver: '8', status: 'In Transit', progress: 50, startTime: '09:00', endTime: '17:00' },
    { id: 'track006', recipientName: 'Tunde Adebayo', recipientPhone: '09011223344', deliveryAddress: 'Akure, NG', assignedDriver: '7', status: 'Delivered', progress: 100, startTime: '13:00', endTime: '19:00' }
];

const Deliveries = () => {
  const [deliveries] = useState(() => getFromStorage('deliveries', deliveryData));
  const [drivers] = useState(() => getFromStorage('drivers', []));
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    // If localStorage was empty, populate it with the initial data
    if (getFromStorage('deliveries', []).length === 0) {
      localStorage.setItem('deliveries', JSON.stringify(deliveryData));
    }
  }, []);

  const getDriverName = (driverId) => {
    if (!driverId) return "N/A";
    const driver = drivers.find(d => d.id.toString() === driverId.toString());
    return driver ? driver.name : "Unknown Driver";
  };
  
  const filteredDeliveries = deliveries.filter(d => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = d.recipientName.toLowerCase().includes(searchLower) || d.id.toLowerCase().includes(searchLower);
    const matchesStatus = statusFilter === 'All' || d.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h2>Deliveries</h2>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <input 
            type="text"
            placeholder="Search by name or ID..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid #ddd', minWidth: '250px' }}
          />
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid #ddd' }}>
            <option value="All">All Statuses</option>
            <option value="Arriving today!">Arriving today!</option>
            <option value="In Transit">In Transit</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {filteredDeliveries.length > 0 ? filteredDeliveries.map(delivery => (
          <div key={delivery.id} style={{ background: '#fff', borderRadius: '8px', padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', border: '1px solid #eee' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div>
                <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{delivery.recipientName}</div>
                <div style={{ color: '#555', fontSize: '0.9rem' }}>{delivery.deliveryAddress}</div>
              </div>
              <span style={{ background: delivery.status === 'Delivered' ? '#d4edda' : '#cfe2ff', color: delivery.status === 'Delivered' ? '#155724' : '#0c5460', padding: '0.25rem 0.75rem', borderRadius: '12px', fontSize: '0.8rem' }}>
                {delivery.status}
              </span>
            </div>
            
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#777' }}>
                <span>Progress</span>
                <span>{delivery.progress}%</span>
              </div>
              <div style={{ height: '6px', background: '#eee', borderRadius: '3px', width: '100%', marginTop: '0.25rem' }}>
                <div style={{ height: '100%', background: '#2d3edb', borderRadius: '3px', width: `${delivery.progress}%` }}></div>
              </div>
            </div>

            <div style={{ borderTop: '1px solid #eee', paddingTop: '1rem' }}>
              <div style={{ fontSize: '0.9rem' }}><b style={{minWidth: '100px', display: 'inline-block'}}>Driver:</b> {getDriverName(delivery.assignedDriver)}</div>
              <div style={{ fontSize: '0.9rem' }}><b style={{minWidth: '100px', display: 'inline-block'}}>Time:</b> {delivery.startTime} - {delivery.endTime}</div>
            </div>
          </div>
        )) : <p style={{ textAlign: 'center', gridColumn: '1 / -1' }}>No deliveries match your criteria.</p>}
      </div>
    </div>
  );
};

export default Deliveries; 