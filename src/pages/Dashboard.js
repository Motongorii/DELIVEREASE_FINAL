import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Overview from "../components/Overview";
import Tracking from "../components/Tracking";
import Help from "../components/Help";
import Chat from "../components/Chat";
import Drivers from "../components/Drivers";
import Deliveries from "../components/Deliveries";
import History from "../components/History";
import Location from "../components/Location";
import NewRequest from '../components/NewRequest';
import RequestStatus from '../components/RequestStatus';
import Promotions from '../components/Promotions';
import Finance from '../components/Finance';
import Profile from '../components/Profile';
import { Routes, Route } from "react-router-dom";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className={`dashboard-layout ${sidebarOpen ? 'sidebar-open' : ''}`}>
      <Sidebar />
      {sidebarOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}
      <div className="main-content">
        <Header onMenuClick={toggleSidebar} />
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/tracking" element={<Tracking />} />
          <Route path="/location" element={<Location />} />
          <Route path="/history" element={<History />} />
          <Route path="/help" element={<Help />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/drivers" element={<Drivers />} />
          <Route path="/deliveries" element={<Deliveries />} />
          <Route path="/request/new" element={<NewRequest />} />
          <Route path="/request/status" element={<RequestStatus />} />
          <Route path="/promotions" element={<Promotions />} />
          <Route path="/finance" element={<Finance />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard; 