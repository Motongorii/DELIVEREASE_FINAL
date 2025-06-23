import React, { useState } from "react";

const initialDeliveries = [
    {
      status: "Arriving today!",
      status_desc: "Your parcel is on the way, arriving today",
      progress: 80,
      driverName: "Alex Ojo",
      idNumber: "07034675754",
      origin: "LAG",
      destination: "KANO",
      estimatedDate: "2025-01-10",
      totalCost: "$40.50"
    },
    {
      status: "In Transit",
      status_desc: "Your parcel has been sent, check stats!",
      progress: 30,
      driverName: "John Obi",
      idNumber: "09023421111",
      origin: "PH",
      destination: "IMO",
      estimatedDate: "2025-01-18",
      totalCost: "$25.00"
    },
    {
      status: "Arriving today!",
      status_desc: "Your parcel is on the way, arriving today",
      progress: 90,
      driverName: "Moses Uhem",
      idNumber: "09091808067",
      origin: "ENUGU",
      destination: "ABUJA",
      estimatedDate: "2025-03-02",
      totalCost: "$25.00"
    },
    {
      status: "Delivered",
      status_desc: "Your parcel is delivered by courier",
      progress: 100,
      driverName: "John Honora",
      idNumber: "08101588941",
      origin: "ABUJA",
      destination: "KENYA",
      estimatedDate: "2025-03-06",
      totalCost: "$15.00"
    },
    {
        status: "In Transit",
        status_desc: "Departed from sorting facility.",
        progress: 50,
        driverName: "Chioma Okoro",
        idNumber: "08055566777",
        origin: "KADUNA",
        destination: "JOS",
        estimatedDate: "2025-04-15",
        totalCost: "$20.00"
    },
    {
        status: "Delivered",
        status_desc: "Delivered to recipient.",
        progress: 100,
        driverName: "Tunde Adebayo",
        idNumber: "09011223344",
        origin: "IBADAN",
        destination: "AKURE",
        estimatedDate: "2025-02-20",
        totalCost: "$22.00"
    },
    {
      status: "In Transit",
      status_desc: "Arrived at local sorting hub.",
      progress: 65,
      driverName: "Fatima Bello",
      idNumber: "08187654321",
      origin: "KANO",
      destination: "SOKOTO",
      estimatedDate: "2025-05-10",
      totalCost: "$35.00"
    },
    {
      status: "Arriving today!",
      status_desc: "Out for delivery.",
      progress: 95,
      driverName: "Emeka Nwosu",
      idNumber: "07098765432",
      origin: "ONITSHA",
      destination: "OWERRI",
      estimatedDate: "2025-03-25",
      totalCost: "$18.00"
    },
    {
      status: "Delivered",
      status_desc: "Signed for by recipient.",
      progress: 100,
      driverName: "David Garcia",
      idNumber: "08012349876",
      origin: "BENIN",
      destination: "WARRI",
      estimatedDate: "2025-04-01",
      totalCost: "$16.50"
    },
    {
      status: "In Transit",
      status_desc: "Customs clearance started.",
      progress: 40,
      driverName: "Aisha Mohammed",
      idNumber: "09065432109",
      origin: "LAGOS",
      destination: "ACCRA",
      estimatedDate: "2025-06-05",
      totalCost: "$70.00"
    }
  ];

const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
};

const Tracking = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [pickupDate, setPickupDate] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    const handleSearch = (e) => {
        e.preventDefault();
        // The filtering is already happening on input change, 
        // a real API call would go here.
    }

    const filteredDeliveries = initialDeliveries.filter(d => {
        const matchesSearch = d.idNumber.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesDate = !pickupDate || d.estimatedDate === pickupDate;
        const matchesStatus = statusFilter === 'All' || d.status === statusFilter;
        return matchesSearch && matchesDate && matchesStatus;
    });

  return (
        <div className="tracking-page-v2">
      <h2>Delivery</h2>
            <div className="tracking-filters">
                <form onSubmit={handleSearch} className="tracking-search-v2">
        <input
          type="text"
          placeholder="Search Tracking Number"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
        />
        <button type="submit">Find</button>
      </form>
                <div className="filter-group">
                    <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                        <option value="All">All Deliveries ({initialDeliveries.length})</option>
                        <option value="Arriving today!">Arriving today!</option>
                        <option value="In Transit">In Transit</option>
                        <option value="Delivered">Delivered</option>
                    </select>
                    <input
                        type="date"
                        value={pickupDate}
                        onChange={e => setPickupDate(e.target.value)}
                    />
                </div>
            </div>

            <div className="delivery-list-header">
                <div className="header-item status">STATUS</div>
                <div className="header-item driver">DRIVER'S NAME</div>
                <div className="header-item id">ID NUMBER</div>
                <div className="header-item origin">ORIGIN</div>
                <div className="header-item destination">DESTINATION</div>
                <div className="header-item date">ESTIMATED DATE</div>
                <div className="header-item cost">TOTAL COST</div>
            </div>

            <div className="delivery-list">
                {filteredDeliveries.length > 0 ? filteredDeliveries.map((d, i) => (
                    <div key={i} className="delivery-card-v2">
                        <div className="card-item status">
                            <div className="status-icon">📦</div>
                            <div className="status-text">
                                <b>{d.status}</b>
                                <p>{d.status_desc}</p>
                                <div className="progress-bar-container">
                                    <div className="progress-bar" style={{ width: `${d.progress}%` }}></div>
                                </div>
                            </div>
                        </div>
                        <div className="card-item driver">{d.driverName}</div>
                        <div className="card-item id">{d.idNumber}</div>
                        <div className="card-item origin">{d.origin}</div>
                        <div className="card-item destination">{d.destination}</div>
                        <div className="card-item date">{formatDate(d.estimatedDate)}</div>
                        <div className="card-item cost">
                            <b>{d.totalCost}</b>
                            <span>Tax Fee</span>
                        </div>
                    </div>
                )) : <p style={{textAlign: 'center', marginTop: '2rem'}}>No deliveries match your criteria.</p>}
            </div>
    </div>
  );
}

export default Tracking; 