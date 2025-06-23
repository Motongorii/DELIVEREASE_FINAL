import React, { useState } from 'react';

const financialSummary = {
  totalRevenue: '$18,750',
  totalProfit: '$6,200',
  avgDeliveryRevenue: '$31.25',
  ytdExpenses: '$12,550'
};

const monthlyData = [
  { month: 'Jan', revenue: 2800, expenses: 2200, profit: 600 },
  { month: 'Feb', revenue: 3200, expenses: 2400, profit: 800 },
  { month: 'Mar', revenue: 3800, expenses: 2600, profit: 1200 },
  { month: 'Apr', revenue: 4200, expenses: 2800, profit: 1400 },
  { month: 'May', revenue: 4800, expenses: 3000, profit: 1800 },
  { month: 'Jun', revenue: 5500, expenses: 3200, profit: 2300 }
];

const recentTransactions = [
    { id: 'txn001', date: '2025-06-15', description: 'Delivery Fee - #08101588941', amount: '+$15.00', type: 'revenue' },
    { id: 'txn002', date: '2025-06-14', description: 'Fuel Expense - Truck #3', amount: '-$80.00', type: 'expense' },
    { id: 'txn003', date: '2025-06-14', description: 'Delivery Fee - #09091808067', amount: '+$25.00', type: 'revenue' },
    { id: 'txn004', date: '2025-06-13', description: 'Driver Payout - John Obi', amount: '-$250.00', type: 'expense' }
];

const staffPayments = [
  { id: 'pay001', date: '2025-06-15', staff: 'John Obi', role: 'Driver', amount: '$250.00', method: 'Bank Transfer' },
  { id: 'pay002', date: '2025-06-14', staff: 'Jane Smith', role: 'Driver', amount: '$220.00', method: 'Bank Transfer' },
  { id: 'pay003', date: '2025-06-13', staff: 'Fed', role: 'Admin', amount: '$500.00', method: 'Bank Transfer' },
  { id: 'pay004', date: '2025-06-12', staff: 'Oyoo Hezzy', role: 'Driver', amount: '$180.00', method: 'Bank Transfer' },
];

const Finance = () => {
    const maxRevenue = Math.max(...monthlyData.map(d => d.revenue));
    const maxProfit = Math.max(...monthlyData.map(d => d.profit));
    const [showAllTx, setShowAllTx] = useState(false);
    const transactionsToShow = showAllTx ? recentTransactions : recentTransactions.slice(0, 4);

    return (
        <div style={{ padding: '2rem' }}>
            <h2>Financial Overview</h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                {Object.entries(financialSummary).map(([key, value]) => (
                    <div key={key} style={{ background: '#fff', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                        <div style={{ color: '#666', textTransform: 'uppercase', fontSize: '0.8rem', marginBottom: '0.5rem' }}>{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                        <div style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>{value}</div>
                    </div>
                ))}
            </div>

            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                <div style={{ flex: 2, minWidth: '400px', background: '#fff', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                    <h4>Monthly Performance Trend</h4>
                    <div style={{ display: 'flex', height: '250px', alignItems: 'flex-end', gap: '1.5rem', borderLeft: '2px solid #eee', borderBottom: '2px solid #eee', paddingLeft: '1rem', paddingBottom: '1rem' }}>
                        {monthlyData.map(data => (
                            <div key={data.month} style={{ flex: 1, textAlign: 'center' }}>
                                <div style={{ display: 'flex', height: '100%', alignItems: 'flex-end', justifyContent: 'center', gap: '8px' }}>
                                    <div 
                                        title={`Revenue: $${data.revenue}`} 
                                        style={{ 
                                            background: '#2d3edb', 
                                            width: '45%', 
                                            height: `${Math.max((data.revenue / maxRevenue) * 90, 10)}%`, 
                                            borderRadius: '4px 4px 0 0',
                                            minHeight: '8px'
                                        }}
                                    ></div>
                                    <div 
                                        title={`Profit: $${data.profit}`} 
                                        style={{ 
                                            background: '#27ae60', 
                                            width: '45%', 
                                            height: `${Math.max((data.profit / maxProfit) * 90, 10)}%`, 
                                            borderRadius: '4px 4px 0 0',
                                            minHeight: '8px'
                                        }}
                                    ></div>
                                </div>
                                <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: '#666' }}>{data.month}</div>
                            </div>
                        ))}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '1rem' }}>
                        <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}><div style={{width: '12px', height: '12px', background: '#2d3edb', borderRadius: '2px'}}></div> Revenue</div>
                        <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}><div style={{width: '12px', height: '12px', background: '#27ae60', borderRadius: '2px'}}></div> Profit</div>
                    </div>
                </div>

                <div style={{ flex: 1, minWidth: '300px', background: '#fff', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                    <h4>Recent Transactions</h4>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        {transactionsToShow.map(tx => (
                            <li key={tx.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 0', borderBottom: '1px solid #eee' }}>
                                <div>
                                    <div>{tx.description}</div>
                                    <div style={{ fontSize: '0.8rem', color: '#888' }}>{tx.date}</div>
                                </div>
                                <div style={{ fontWeight: 'bold', color: tx.type === 'revenue' ? 'green' : '#c0392b' }}>{tx.amount}</div>
                            </li>
                        ))}
                    </ul>
                    {recentTransactions.length > 4 && (
                        <button onClick={() => setShowAllTx(s => !s)} style={{ marginTop: '1rem', background: '#2d3edb', color: '#fff', border: 'none', borderRadius: 6, padding: '0.5rem 1.5rem', cursor: 'pointer', width: '100%' }}>
                            {showAllTx ? 'Show Less' : 'Read More'}
                        </button>
                    )}
                </div>
            </div>

            {/* Staff Payments Section */}
            <div style={{ marginTop: '2.5rem', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', padding: '2rem', maxWidth: 700 }}>
                <h4>Staff Payments</h4>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ background: '#f7f8fa' }}>
                            <th style={{ padding: '0.75rem', border: '1px solid #eee', textAlign: 'left' }}>Date</th>
                            <th style={{ padding: '0.75rem', border: '1px solid #eee', textAlign: 'left' }}>Staff</th>
                            <th style={{ padding: '0.75rem', border: '1px solid #eee', textAlign: 'left' }}>Role</th>
                            <th style={{ padding: '0.75rem', border: '1px solid #eee', textAlign: 'left' }}>Amount</th>
                            <th style={{ padding: '0.75rem', border: '1px solid #eee', textAlign: 'left' }}>Method</th>
                        </tr>
                    </thead>
                    <tbody>
                        {staffPayments.map(pay => (
                            <tr key={pay.id}>
                                <td style={{ padding: '0.75rem', border: '1px solid #eee' }}>{pay.date}</td>
                                <td style={{ padding: '0.75rem', border: '1px solid #eee' }}>{pay.staff}</td>
                                <td style={{ padding: '0.75rem', border: '1px solid #eee' }}>{pay.role}</td>
                                <td style={{ padding: '0.75rem', border: '1px solid #eee' }}>{pay.amount}</td>
                                <td style={{ padding: '0.75rem', border: '1px solid #eee' }}>{pay.method}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Finance; 