import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

const Sidebar = () => {
  const [requestOpen, setRequestOpen] = useState(false);
  return (
    <aside className="sidebar">
      <img src={logo} alt="Deliverease Logo" className="sidebar-logo" />
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem', width: '100%' }}>
        <NavLink to="/" end style={{ padding: '0.5rem 0.8rem', borderRadius: '5px' }}><span role="img" aria-label="overview">📋</span> Overview</NavLink>
        <NavLink to="/tracking" style={{ padding: '0.5rem 0.8rem', borderRadius: '5px' }}><span role="img" aria-label="tracking">📦</span> Tracking</NavLink>
        <NavLink to="/location" style={{ padding: '0.5rem 0.8rem', borderRadius: '5px' }}><span role="img" aria-label="location">📍</span> Location</NavLink>
        <NavLink to="/history" style={{ padding: '0.5rem 0.8rem', borderRadius: '5px' }}><span role="img" aria-label="history">🕑</span> History</NavLink>
        <NavLink to="/drivers" style={{ padding: '0.5rem 0.8rem', borderRadius: '5px' }}><span role="img" aria-label="drivers">🧑‍✈️</span> Registed drivers</NavLink>
        <NavLink to="/deliveries" style={{ padding: '0.5rem 0.8rem', borderRadius: '5px' }}><span role="img" aria-label="deliveries">🚚</span> Deliveries</NavLink>
        <div style={{ width: '100%' }}>
          <button
            style={{
              background: 'none',
              border: 'none',
              color: '#222',
              fontWeight: 500,
              padding: '0.5rem 0.8rem',
              borderRadius: '5px',
              width: '100%',
              textAlign: 'left',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: requestOpen ? 0 : '0.7rem',
            }}
            onClick={() => setRequestOpen((open) => !open)}
            aria-expanded={requestOpen}
          >
            <span role="img" aria-label="request">📝</span> Request
            <span style={{ marginLeft: 'auto' }}>{requestOpen ? '▲' : '▼'}</span>
          </button>
          {requestOpen && (
            <div style={{ paddingLeft: '2rem', marginBottom: '0.7rem' }}>
              <NavLink to="/request/new" style={{ display: 'block', margin: '0.3rem 0', padding: '0.4rem 0.7rem', borderRadius: '5px' }}>New Request</NavLink>
              <NavLink to="/request/status" style={{ display: 'block', margin: '0.3rem 0', padding: '0.4rem 0.7rem', borderRadius: '5px' }}>Request Status</NavLink>
            </div>
          )}
        </div>
        <NavLink to="/finance" style={{ padding: '0.5rem 0.8rem', borderRadius: '5px' }}><span role="img" aria-label="finance">💰</span> Finance</NavLink>
        <NavLink to="/chat" style={{ padding: '0.5rem 0.8rem', borderRadius: '5px' }}><span role="img" aria-label="chat">💬</span> Chat</NavLink>
        <NavLink to="/promotions" style={{ padding: '0.5rem 0.8rem', borderRadius: '5px' }}><span role="img" aria-label="promotions">🏷️</span> Promotions</NavLink>
        <div style={{ height: '1.5rem' }}></div>
        <NavLink to="/profile" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#222', fontWeight: 500, padding: '0.5rem 0.8rem', borderRadius: '5px' }}>
          <span role="img" aria-label="profile">👤</span> Profile
        </NavLink>
      </nav>
      <div style={{ marginTop: '2rem', width: '100%', textAlign: 'center', background: '#f8fafd', borderRadius: '8px', padding: '1rem', boxShadow: '0 1px 4px #0001' }}>
        <img src={require('../assets/login.png')} alt="Discount" style={{ width: '60px', marginBottom: '0.5rem' }} />
        <div style={{ fontSize: '0.95rem', color: '#333', marginBottom: '0.5rem' }}>Enjoy 50% Discount on orders over <b>$5</b></div>
        <a href="/promotions" style={{ color: '#2d3edb', fontWeight: 'bold', fontSize: '0.9rem' }}>More Details</a>
      </div>
      <div style={{ marginTop: '2rem', width: '100%', background: '#fffbe7', borderRadius: '8px', padding: '1rem', boxShadow: '0 1px 4px #0001', fontSize: '0.95rem', color: '#222', textAlign: 'center' }}>
        <a href="/help" style={{ color: '#2d3edb', fontWeight: 'bold', fontSize: '1rem', textDecoration: 'none' }}>Need Help?</a>
      </div>
    </aside>
  );
};

export default Sidebar; 