import React from 'react';

const promotionsData = [
  {
    id: 'promo001',
    title: '50% Off Your Next Delivery',
    description: 'Enjoy a massive 50% discount on the total cost of your next delivery order over $5. This offer is valid for all users.',
    code: 'HALFPRICE',
    expiry: '2025-12-31',
    terms: 'Minimum order value of $5. Cannot be combined with other offers.'
  },
  {
    id: 'promo002',
    title: '20% Student Discount',
    description: 'Students get 20% off on all deliveries. Verify your student status to redeem this offer.',
    code: 'STUDENT20',
    expiry: 'Ongoing',
    terms: 'Requires valid student ID verification. Applicable to standard delivery services only.'
  },
  {
    id: 'promo003',
    title: 'Free Shipping on Your First Order',
    description: 'New to DeliverEase? Your first delivery is on us! Enjoy free shipping with no minimum order value.',
    code: 'WELCOMEFREE',
    expiry: 'For new users only',
    terms: 'Valid only for the first delivery registered on a new account.'
  },
];

const Promotions = () => {
    return (
        <div style={{ maxWidth: '900px', margin: '2rem auto' }}>
            <h2 style={{ marginBottom: '0.5rem' }}>Promotions & Discounts</h2>
            <p style={{ color: '#666', marginBottom: '2rem' }}>Here are the latest offers available for you.</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem' }}>
                {promotionsData.map(promo => (
                    <div key={promo.id} style={{ background: '#fff', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', border: '1px solid #eee' }}>
                        <div style={{ background: '#2d3edb', color: '#fff', padding: '1.5rem', borderRadius: '8px 8px 0 0' }}>
                            <h3 style={{ margin: 0, fontSize: '1.5rem' }}>{promo.title}</h3>
                        </div>
                        <div style={{ padding: '1.5rem' }}>
                            <p style={{ color: '#555', marginBottom: '1.5rem' }}>{promo.description}</p>
                            <div style={{ textAlign: 'center', marginBottom: '1.5rem', background: '#f7f8fa', padding: '1rem', borderRadius: '6px' }}>
                                <span style={{ color: '#888', fontSize: '0.9rem', display: 'block' }}>YOUR CODE</span>
                                <b style={{ fontSize: '1.8rem', letterSpacing: '2px', color: '#2d3edb' }}>{promo.code}</b>
                            </div>
                            <div style={{ fontSize: '0.9rem', color: '#777' }}>
                                <p><b>Expires:</b> {promo.expiry}</p>
                                <p><b>Terms:</b> {promo.terms}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Promotions; 