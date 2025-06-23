import React from "react";

const Help = () => (
  <div style={{ padding: '2rem', maxWidth: '600px', margin: '2rem auto', background: '#fff', borderRadius: '10px', boxShadow: '0 2px 8px #0001' }}>
    <h2>Need Help?</h2>
    <h3>Instructions for Dealing with Parcel Trafficking</h3>
    <ol style={{ fontSize: '1.1rem', color: '#333', marginTop: '1.5rem' }}>
      <li>Ensure your parcel is properly labeled and scanned at each checkpoint.</li>
      <li>Track your parcel using the tracking number provided.</li>
      <li>If you notice any unusual activity, contact support immediately.</li>
      <li>Keep your delivery receipts for reference.</li>
    </ol>
    <p style={{ marginTop: '2rem', color: '#2d3edb', fontWeight: 'bold' }}>For further assistance, please contact our support team.</p>
  </div>
);

export default Help; 