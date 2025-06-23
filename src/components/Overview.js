import React, { useState } from "react";
import mainImg from "../assets/overview-main.png"; // Place your main image here

const recentDeliveries = [
  {
    number: "070 346 757 54",
    status: "Ongoing",
    desc: "Please ensure that you scan the package to all the locations.",
    date: "05/11 - 10:30"
  },
  {
    number: "090 234 211 11",
    status: "Ongoing",
    desc: "Logan & Sons: The parcel has been sent.",
    date: "05/11 - 10:30"
  },
  {
    number: "081 013 000 51",
    status: "Ongoing",
    desc: "Logan & Sons: The parcel has been sent.",
    date: "05/11 - 10:30"
  },
  {
    number: "+254 675 341",
    status: "Ongoing",
    desc: "Logan & Sons: The parcel has been sent.",
    date: "05/11 - 10:30"
  },
  {
    number: "080 123 456 78",
    status: "Delivered",
    desc: "Package delivered successfully.",
    date: "05/10 - 14:20"
  },
  {
    number: "081 987 654 32",
    status: "In Transit",
    desc: "Package is on the way.",
    date: "05/09 - 09:15"
  },
  {
    number: "070 555 111 22",
    status: "Pending",
    desc: "Awaiting pickup.",
    date: "05/08 - 08:00"
  },
  {
    number: "090 888 333 44",
    status: "Ongoing",
    desc: "Package is being processed.",
    date: "05/07 - 12:45"
  }
];

const Overview = () => {
  const [showAll, setShowAll] = useState(false);
  const [search, setSearch] = useState("");

  // Filter deliveries by search (case-insensitive, trims spaces)
  const filteredDeliveries = recentDeliveries.filter(d =>
    d.number.replace(/\s+/g, "").toLowerCase().includes(search.replace(/\s+/g, "").toLowerCase())
  );
  const deliveriesToShow = showAll ? filteredDeliveries : filteredDeliveries.slice(0, 5);

  const handleSearch = (e) => {
    e.preventDefault();
    setShowAll(true); // Show all results when searching
  };

  return (
    <div className="overview-dashboard">
      <div className="overview-main">
        <img src={mainImg} alt="Dashboard Main" className="overview-main-img" />
        <div className="overview-summary-cards">
          <div className="overview-card">
            <h3>Total Number of Registered Drivers</h3>
            <p style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>15</p>
          </div>
          <div className="overview-card">
            <h3>Total Number of Deliveries</h3>
            <p style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>15</p>
          </div>
        </div>
      </div>
      <div className="overview-recent">
        <div className="recent-header">
          <h4>Recent Deliveries</h4>
          <form className="recent-search" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search Delivery Number"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <button type="submit">Find</button>
          </form>
        </div>
        <ul className="recent-list">
          {deliveriesToShow.length === 0 ? (
            <li className="recent-item">No deliveries found.</li>
          ) : (
            deliveriesToShow.map((d, i) => (
              <li key={d.number} className="recent-item">
                <div className="recent-number">{d.number}</div>
                <div className="recent-desc">{d.desc}</div>
                <div className="recent-meta">
                  <span>{d.status}</span>
                  <span>{d.date}</span>
                </div>
              </li>
            ))
          )}
        </ul>
        {!showAll && filteredDeliveries.length > 5 && (
          <button className="recent-more" onClick={() => setShowAll(true)}>See more</button>
        )}
        {showAll && filteredDeliveries.length > 5 && (
          <button className="recent-more" onClick={() => setShowAll(false)}>Show less</button>
        )}
      </div>
    </div>
  );
};

export default Overview; 