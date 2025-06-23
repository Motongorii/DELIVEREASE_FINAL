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
// --- End LocalStorage Utility ---

const History = () => {
  const [deliveries] = useState(() => getFromStorage('deliveries', []));
  const [drivers] = useState(() => getFromStorage('drivers', []));

  const getDriverName = (driverId) => {
    if (!driverId) return "N/A";
    const driver = drivers.find(d => d.id.toString() === driverId.toString());
    return driver ? driver.name : "Unknown Driver";
  };
  
  // Sort deliveries by date, from newest to oldest
  const sortedDeliveries = [...deliveries].sort((a, b) => b.id - a.id);

  if (sortedDeliveries.length === 0) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', background: '#fff', borderRadius: 10, boxShadow: '0 2px 8px #0001' }}>
        <h2>No delivery history found.</h2>
        <p>Once deliveries are created, they will appear here.</p>
      </div>
    );
  }

  return (
    <div style={{ background: '#fff', borderRadius: 10, boxShadow: '0 2px 8px #0001', padding: '2rem' }}>
      <h2>Delivery History</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f7f8fa' }}>
            <th style={{ padding: '0.5rem', border: '1px solid #eee', textAlign: 'left' }}>Date Created</th>
            <th style={{ padding: '0.5rem', border: '1px solid #eee', textAlign: 'left' }}>Recipient</th>
            <th style={{ padding: '0.5rem', border: '1px solid #eee', textAlign: 'left' }}>Tracking ID</th>
            <th style={{ padding: '0.5rem', border: '1px solid #eee', textAlign: 'left' }}>Assigned Driver</th>
            <th style={{ padding: '0.5rem', border: '1px solid #eee', textAlign: 'left' }}>Time Window</th>
          </tr>
        </thead>
        <tbody>
          {sortedDeliveries.map(delivery => (
            <tr key={delivery.id}>
              <td data-label="Date Created" style={{ padding: '0.5rem', border: '1px solid #eee' }}>{new Date(delivery.id).toLocaleString()}</td>
              <td data-label="Recipient" style={{ padding: '0.5rem', border: '1px solid #eee' }}>{delivery.recipientName}</td>
              <td data-label="Tracking ID" style={{ padding: '0.5rem', border: '1px solid #eee' }}>{delivery.trackingId || 'N/A'}</td>
              <td data-label="Assigned Driver" style={{ padding: '0.5rem', border: '1px solid #eee' }}>{getDriverName(delivery.assignedDriver)}</td>
              <td data-label="Time Window" style={{ padding: '0.5rem', border: '1px solid #eee' }}>{delivery.startTime} - {delivery.endTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default History; 