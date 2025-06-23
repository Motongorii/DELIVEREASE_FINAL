import React, { useState } from 'react';
import mapBackground from '../assets/tracker.jpg'; // Using existing asset

// Mock data for driver locations
const driverLocations = [
  { id: 1, name: 'Oyoo Hezzy', location: 'Lagos, NG', status: 'On-trip', vehicle: 'Van', lastUpdate: '2 mins ago' },
  { id: 2, name: 'Jane Smith', location: 'Abuja, NG', status: 'Idle', vehicle: 'Motorcycle', lastUpdate: '10 mins ago' },
  { id: 3, name: 'Adekunle Adebayo', location: 'Ibadan, NG', status: 'On-trip', vehicle: 'Truck', lastUpdate: '5 mins ago' },
  { id: 4, name: 'Blessing Chukwu', location: 'Enugu, NG', status: 'Offline', vehicle: 'Van', lastUpdate: '1 hour ago' },
  { id: 5, name: 'Kwame Nkrumah', location: 'Accra, GH', status: 'On-trip', vehicle: 'Motorcycle', lastUpdate: '8 mins ago' }
];

const Location = () => {
  const [selectedDriver, setSelectedDriver] = useState(driverLocations[0]);

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 8rem)', gap: '1rem', flexDirection: 'column' }}>
      <h2>Driver Locations</h2>
      <div style={{ display: 'flex', flex: 1, gap: '1rem', flexDirection: window.innerWidth <= 768 ? 'column' : 'row' }}>
        <div style={{ 
            flex: 3, 
            borderRadius: '8px',
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            flexDirection: 'column', 
            color: '#fff', 
            backgroundImage: `url(${mapBackground})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative'
        }}>
          <div style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', borderRadius: '8px'}}></div>
          <div style={{position: 'relative', zIndex: 1, textAlign: 'center'}}>
            <p style={{fontSize: '2.5rem', margin: 0}}>📍</p>
            {selectedDriver && <p style={{marginTop: '1rem'}}>Showing location for: <b style={{display: 'block', fontSize: '1.2rem'}}>{selectedDriver.name}</b></p>}
          </div>
        </div>
        <div style={{ flex: 1, background: '#fff', borderRadius: '8px', padding: '1rem', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', overflowY: 'auto', minHeight: '200px' }}>
          <h4>Active Drivers</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {driverLocations.map(driver => (
              <li 
                key={driver.id}
                onClick={() => setSelectedDriver(driver)}
                style={{ 
                    padding: '1rem', 
                    borderBottom: '1px solid #eee', 
                    cursor: 'pointer',
                    background: selectedDriver && selectedDriver.id === driver.id ? '#f0f4ff' : 'transparent',
                    borderRadius: '6px'
                }}
              >
                <div style={{ fontWeight: 'bold' }}>{driver.name}</div>
                <div style={{ fontSize: '0.9rem', color: '#555' }}>{driver.location}</div>
                <div style={{ fontSize: '0.8rem', color: driver.status === 'On-trip' ? 'green' : '#888' }}>
                  Status: {driver.status}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#888' }}>
                  Last update: {driver.lastUpdate}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Location; 