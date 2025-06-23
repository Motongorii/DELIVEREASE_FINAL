import React, { useState } from 'react';

// --- LocalStorage Utility ---
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

const statusColors = {
    Pending: { background: '#fffbe7', color: '#856404' },
    Approved: { background: '#d4edda', color: '#155724' },
    "In Transit": { background: '#cfe2ff', color: '#0c5460' },
    Rejected: { background: '#f8d7da', color: '#721c24' }
};

const RequestStatus = () => {
    const [requests] = useState(() => getFromStorage('deliveryRequests', []));

    if (requests.length === 0) {
        return (
            <div style={{ padding: '2rem', textAlign: 'center', background: '#fff', borderRadius: 10, boxShadow: '0 2px 8px #0001' }}>
                <h2>No delivery requests found.</h2>
                <p>Submit a new request from the "New Request" page.</p>
            </div>
        );
    }
    
    const sortedRequests = [...requests].sort((a, b) => b.id - a.id);

    return (
        <div style={{ background: '#fff', borderRadius: 10, boxShadow: '0 2px 8px #0001', padding: '2rem' }}>
            <h2>Delivery Request Status</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
                <thead>
                    <tr style={{ background: '#f7f8fa' }}>
                        <th style={{ padding: '0.75rem', border: '1px solid #eee', textAlign: 'left' }}>Date</th>
                        <th style={{ padding: '0.75rem', border: '1px solid #eee', textAlign: 'left' }}>Sender</th>
                        <th style={{ padding: '0.75rem', border: '1px solid #eee', textAlign: 'left' }}>Recipient</th>
                        <th style={{ padding: '0.75rem', border: '1px solid #eee', textAlign: 'left' }}>Pickup Date</th>
                        <th style={{ padding: '0.75rem', border: '1px solid #eee', textAlign: 'center' }}>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedRequests.map(req => (
                        <tr key={req.id}>
                            <td data-label="Date" style={{ padding: '0.75rem', border: '1px solid #eee' }}>{new Date(req.id).toLocaleDateString()}</td>
                            <td data-label="Sender" style={{ padding: '0.75rem', border: '1px solid #eee' }}>{req.senderName}</td>
                            <td data-label="Recipient" style={{ padding: '0.75rem', border: '1px solid #eee' }}>{req.recipientName}</td>
                            <td data-label="Pickup Date" style={{ padding: '0.75rem', border: '1px solid #eee' }}>{req.pickupDate}</td>
                            <td data-label="Status" style={{ padding: '0.75rem', border: '1px solid #eee', textAlign: 'center' }}>
                                <span style={{ 
                                    padding: '0.25rem 0.75rem', 
                                    borderRadius: '12px', 
                                    ...statusColors[req.status] 
                                }}>
                                    {req.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RequestStatus; 