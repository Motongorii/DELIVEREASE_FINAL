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

const saveToStorage = (key, value) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };
// --- End LocalStorage Utility ---

const emptyRequestForm = {
    senderName: '',
    senderPhone: '',
    pickupAddress: '',
    recipientName: '',
    recipientPhone: '',
    deliveryAddress: '',
    packageDescription: '',
    pickupDate: ''
};

const NewRequest = () => {
    const [form, setForm] = useState(emptyRequestForm);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(f => ({ ...f, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newRequest = { ...form, id: Date.now(), status: 'Pending' };
        const allRequests = getFromStorage('deliveryRequests', []);
        saveToStorage('deliveryRequests', [...allRequests, newRequest]);
        alert('Your delivery request has been submitted!');
        setForm(emptyRequestForm);
    };

    return (
        <div style={{ maxWidth: '800px', margin: '2rem auto', background: '#fff', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <h2>Request a New Delivery</h2>
            <p style={{color: '#666', marginBottom: '2rem'}}>Fill out the form below to schedule a new pickup.</p>
            <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                    <fieldset style={{border: '1px solid #ddd', borderRadius: '6px', padding: '1rem'}}>
                        <legend>Sender Details</legend>
                        <div style={{marginBottom: '1rem'}}>
                            <label>Full Name</label>
                            <input type="text" name="senderName" value={form.senderName} onChange={handleChange} required style={{width: '100%', padding: '0.5rem'}}/>
                        </div>
                        <div style={{marginBottom: '1rem'}}>
                            <label>Phone Number</label>
                            <input type="tel" name="senderPhone" value={form.senderPhone} onChange={handleChange} required style={{width: '100%', padding: '0.5rem'}}/>
                        </div>
                        <div>
                            <label>Pickup Address</label>
                            <textarea name="pickupAddress" value={form.pickupAddress} onChange={handleChange} required style={{width: '100%', padding: '0.5rem', minHeight: '80px'}}></textarea>
                        </div>
                    </fieldset>

                    <fieldset style={{border: '1px solid #ddd', borderRadius: '6px', padding: '1rem'}}>
                        <legend>Recipient Details</legend>
                        <div style={{marginBottom: '1rem'}}>
                            <label>Full Name</label>
                            <input type="text" name="recipientName" value={form.recipientName} onChange={handleChange} required style={{width: '100%', padding: '0.5rem'}}/>
                        </div>
                        <div style={{marginBottom: '1rem'}}>
                            <label>Phone Number</label>
                            <input type="tel" name="recipientPhone" value={form.recipientPhone} onChange={handleChange} required style={{width: '100%', padding: '0.5rem'}}/>
                        </div>
                        <div>
                            <label>Delivery Address</label>
                            <textarea name="deliveryAddress" value={form.deliveryAddress} onChange={handleChange} required style={{width: '100%', padding: '0.5rem', minHeight: '80px'}}></textarea>
                        </div>
                    </fieldset>
                </div>
                
                <fieldset style={{border: '1px solid #ddd', borderRadius: '6px', padding: '1rem', marginTop: '2rem'}}>
                    <legend>Package Details</legend>
                     <div style={{marginBottom: '1rem'}}>
                        <label>Package Description</label>
                        <input type="text" name="packageDescription" value={form.packageDescription} onChange={handleChange} required style={{width: '100%', padding: '0.5rem'}} placeholder="e.g., Small box, documents"/>
                    </div>
                    <div>
                        <label>Preferred Pickup Date</label>
                        <input type="date" name="pickupDate" value={form.pickupDate} onChange={handleChange} required style={{width: '100%', padding: '0.5rem'}}/>
                    </div>
                </fieldset>

                <div style={{textAlign: 'right', marginTop: '2rem'}}>
                    <button type="submit" style={{ background: '#2d3edb', color: '#fff', border: 'none', borderRadius: 4, padding: '0.7rem 1.5rem', cursor: 'pointer', fontWeight: 'bold' }}>Submit Request</button>
                </div>
            </form>
        </div>
    );
};

export default NewRequest; 