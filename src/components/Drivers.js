import React, { useState, useEffect } from "react";

const emptyDriverForm = { id: null, name: "", phone: "", address: "", notes: "", tags: "" };
const emptyDeliveryForm = {
  recipientName: "",
  recipientPhone: "",
  deliveryAddress: "",
  packageDescription: "",
  deliveryNotes: "",
  startTime: "",
  endTime: "",
  assignedDriver: "",
  trackingId: "",
  tags: ""
};

const inputGroupStyle = { marginBottom: '1rem' };
const labelStyle = { display: 'block', marginBottom: '0.25rem', color: '#555', fontSize: '0.9rem' };
const inputStyle = { width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ddd' };
const buttonStyle = { background: '#2d3edb', color: '#fff', border: 'none', borderRadius: 4, padding: '0.7rem 1.5rem', cursor: 'pointer' };
const cancelButton = { background: '#eee', color: '#222', border: '1px solid #ddd', borderRadius: 4, padding: '0.7rem 1.5rem', cursor: 'pointer' };

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

const saveToStorage = (key, value) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(error);
  }
};
// --- End LocalStorage Utility ---

const initialDriverPool = [
    { id: 1, name: "Oyoo Hezzy", phone: "08012345678", address: "Lagos", notes: "Reliable", tags: "Fragile" },
    { id: 2, name: "Jane Smith", phone: "08123456789", address: "Abuja", notes: "Express deliveries", tags: "Express" },
    { id: 3, name: "Adekunle Adebayo", phone: "09011122233", address: "Ibadan" },
    { id: 4, name: "Blessing Chukwu", phone: "08033344455", address: "Enugu" },
    { id: 5, name: "Kwame Nkrumah", phone: "07055566677", address: "Accra" },
    { id: 6, name: "Fatou Camara", phone: "08177788899", address: "Dakar" },
    { id: 7, name: "Femi Ojo", phone: "09099900011", address: "Lagos" },
    { id: 8, name: "Amina Yusuf", phone: "08011223344", address: "Kano" },
    { id: 9, name: "Sanaa Abdallah", phone: "07033445566", address: "Nairobi" },
    { id: 10, name: "Idris Bello", phone: "08155667788", address: "Kaduna" },
    { id: 11, name: "Chinedu Okoro", phone: "09077889900", address: "Owerri" },
    { id: 12, name: "Ngozi Eze", phone: "08099001122", address: "Abuja" },
    { id: 13, name: "Jomo Otieno", phone: "07011223344", address: "Kisumu" },
    { id: 14, name: "Miriam Dlamini", phone: "08133445566", address: "Johannesburg" },
    { id: 15, name: "Didier Kone", phone: "09055667788", address: "Abidjan" },
    { id: 16, name: "Lupita Achieng", phone: "08077889900", address: "Nairobi" },
    { id: 17, name: "Kofi Mensah", phone: "07099001122", address: "Kumasi" }
];

const Drivers = () => {
  const [drivers, setDrivers] = useState(initialDriverPool);
  
  const [driverForm, setDriverForm] = useState(emptyDriverForm);
  const [deliveryForm, setDeliveryForm] = useState(emptyDeliveryForm);
  const [editing, setEditing] = useState(false);
  const [showAll, setShowAll] = useState(false);
  
  useEffect(() => {
    saveToStorage('drivers', drivers);
  }, [drivers]);

  const handleDriverChange = e => {
    const { name, value } = e.target;
    setDriverForm(f => ({ ...f, [name]: value }));
  };
  
  const handleDeliveryChange = e => {
    const { name, value } = e.target;
    setDeliveryForm(f => ({ ...f, [name]: value }));
  };

  const handleDriverSubmit = e => {
    e.preventDefault();
    if (!driverForm.name || !driverForm.phone) return;
    setDrivers(ds => ds.map(d => d.id === driverForm.id ? { ...driverForm } : d));
    setDriverForm(emptyDriverForm);
    setEditing(false);
  };
  
  const handleDeliverySubmit = e => {
    e.preventDefault();
    if (!deliveryForm.recipientName || !deliveryForm.recipientPhone || !deliveryForm.assignedDriver) {
      alert("Please fill all required fields for the delivery.");
      return;
    }
    
    const newDelivery = { ...deliveryForm, id: Date.now() };
    const allDeliveries = getFromStorage('deliveries', []);
    saveToStorage('deliveries', [...allDeliveries, newDelivery]);
    
    alert(`Delivery for ${deliveryForm.recipientName} created and assigned to driver ID ${deliveryForm.assignedDriver}.`);
    setDeliveryForm(emptyDeliveryForm);
  };

  const handleEdit = driver => {
    setDriverForm(driver);
    setEditing(true);
  };
  
  const cancelEdit = () => {
    setDriverForm(emptyDriverForm);
    setEditing(false);
  }

  const driversToShow = showAll ? drivers : drivers.slice(0, 3);

  return (
    <div style={{ maxWidth: 1000, margin: '2rem auto' }}>
      <div style={{ background: '#fff', borderRadius: 10, boxShadow: '0 2px 8px #0001', padding: '2rem' }}>
        <h2>Registered Drivers</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1rem' }}>
          <thead>
            <tr style={{ background: '#f7f8fa' }}>
              <th style={{ padding: '0.5rem', border: '1px solid #eee', textAlign: 'left' }}>Name</th>
              <th style={{ padding: '0.5rem', border: '1px solid #eee', textAlign: 'left' }}>Phone</th>
              <th style={{ padding: '0.5rem', border: '1px solid #eee', textAlign: 'left' }}>Address</th>
              <th style={{ padding: '0.5rem', border: '1px solid #eee' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {driversToShow.map(driver => (
              <tr key={driver.id}>
                <td data-label="Name" style={{ padding: '0.5rem', border: '1px solid #eee' }}>{driver.name}</td>
                <td data-label="Phone" style={{ padding: '0.5rem', border: '1px solid #eee' }}>{driver.phone}</td>
                <td data-label="Address" style={{ padding: '0.5rem', border: '1px solid #eee' }}>{driver.address}</td>
                <td data-label="Actions" style={{ padding: '0.5rem', border: '1px solid #eee', textAlign: 'center' }}>
                  <button onClick={() => handleEdit(driver)} style={{ ...buttonStyle, padding: '0.3rem 0.7rem' }}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {drivers.length > 3 && (
            <button onClick={() => setShowAll(s => !s)} style={{...cancelButton, width: '100%', textAlign: 'center'}}>
                {showAll ? "Show Less" : "See More"}
            </button>
        )}
      </div>

      <div style={{ marginTop: '2rem', background: '#fff', borderRadius: 10, boxShadow: '0 2px 8px #0001', padding: '2rem' }}>
        {editing ? (
          <div>
            <h3>Update Driver</h3>
            <form onSubmit={handleDriverSubmit} style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              <input name="name" value={driverForm.name} onChange={handleDriverChange} placeholder="Full Name" style={{ ...inputStyle, flex: '1 1 200px' }} required />
              <input name="phone" value={driverForm.phone} onChange={handleDriverChange} placeholder="Phone Number" style={{ ...inputStyle, flex: '1 1 150px' }} required />
              <input name="address" value={driverForm.address} onChange={handleDriverChange} placeholder="Address" style={{ ...inputStyle, flex: '1 1 200px' }} />
              <div style={{ display: 'flex', gap: '1rem', width: '100%', justifyContent: 'flex-end', marginTop: '1rem' }}>
                <button type="button" onClick={cancelEdit} style={cancelButton}>Cancel</button>
                <button type="submit" style={buttonStyle}>Update Driver</button>
              </div>
            </form>
          </div>
        ) : (
          <div>
            <form onSubmit={handleDeliverySubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                <div>
                  <h3 style={{marginTop: 0}}>Delivery Details</h3>
                  <div style={inputGroupStyle}>
                    <label style={labelStyle}>Recipient Full Name</label>
                    <input name="recipientName" value={deliveryForm.recipientName} onChange={handleDeliveryChange} style={inputStyle} required />
                  </div>
                  <div style={inputGroupStyle}>
                    <label style={labelStyle}>Recipient Phone Number</label>
                    <input name="recipientPhone" value={deliveryForm.recipientPhone} onChange={handleDeliveryChange} style={inputStyle} required />
                  </div>
                  <div style={inputGroupStyle}>
                    <label style={labelStyle}>Delivery Address</label>
                    <textarea name="deliveryAddress" value={deliveryForm.deliveryAddress} onChange={handleDeliveryChange} style={{...inputStyle, height: '60px'}} />
                  </div>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <div style={{...inputGroupStyle, flex: 1}}>
                      <label style={labelStyle}>Package Description</label>
                      <textarea name="packageDescription" value={deliveryForm.packageDescription} onChange={handleDeliveryChange} style={{...inputStyle, height: '60px'}} />
                    </div>
                    <div style={{...inputGroupStyle, flex: 1}}>
                      <label style={labelStyle}>Delivery Notes</label>
                      <textarea name="deliveryNotes" value={deliveryForm.deliveryNotes} onChange={handleDeliveryChange} style={{...inputStyle, height: '60px'}} />
                    </div>
                  </div>
                   <div style={inputGroupStyle}>
                      <label style={labelStyle}>Preferred Time Window</label>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <input type="time" name="startTime" value={deliveryForm.startTime} onChange={handleDeliveryChange} style={inputStyle} />
                        <span>to</span>
                        <input type="time" name="endTime" value={deliveryForm.endTime} onChange={handleDeliveryChange} style={inputStyle} />
                      </div>
                  </div>
                </div>
                <div>
                  <h3 style={{marginTop: 0}}>Driver's Assignment</h3>
                  <div style={inputGroupStyle}>
                    <label style={labelStyle}>Assign Driver</label>
                    <select name="assignedDriver" value={deliveryForm.assignedDriver} onChange={handleDeliveryChange} style={inputStyle} required>
                      <option value="">Select from available drivers</option>
                      {drivers.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                    </select>
                  </div>
                  <div style={inputGroupStyle}>
                    <label style={labelStyle}>Delivery Code/Tracking ID</label>
                    <input name="trackingId" value={deliveryForm.trackingId} onChange={handleDeliveryChange} style={inputStyle} />
                  </div>
                   <div style={inputGroupStyle}>
                    <label style={labelStyle}>Tags/Categories (optional)</label>
                    <input name="tags" value={deliveryForm.tags} onChange={handleDeliveryChange} style={inputStyle} placeholder="E.g Fragile" />
                  </div>
                </div>
              </div>
              <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                <button type="button" onClick={() => setDeliveryForm(emptyDeliveryForm)} style={cancelButton}>Cancel</button>
                <button type="submit" style={buttonStyle}>Create Delivery</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Drivers; 