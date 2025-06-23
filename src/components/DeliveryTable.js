import React from "react";

const DeliveryTable = ({ deliveries }) => (
  <table className="delivery-table">
    <thead>
      <tr>
        <th>Status</th>
        <th>Driver's Name</th>
        <th>Tracking No</th>
        <th>Origin</th>
        <th>Destination</th>
        <th>Estimated Date</th>
        <th>Total Cost</th>
      </tr>
    </thead>
    <tbody>
      {deliveries.map((d, i) => (
        <tr key={i}>
          <td>{d.status}</td>
          <td>{d.driverName}</td>
          <td>{d.trackingNo}</td>
          <td>{d.origin}</td>
          <td>{d.destination}</td>
          <td>{d.estimatedDate}</td>
          <td>{d.totalCost}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default DeliveryTable; 