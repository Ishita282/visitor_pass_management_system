import { useEffect, useState } from "react";
import {API_AUTH} from "../service/api";
import "./style.css"


function Dashboard() {

  const [stats, setStats] = useState({});

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const res = await API_AUTH.get("/dashboard/stats");
    setStats(res.data);
  };

  return (
    <div>
      <div className="container">

        <h1>Admin Dashboard</h1>

        <div className="stats">

          <div className="stat-card">
            <h3>Total Visitors Today</h3>
            <h2>{stats.totalVisitors}</h2>
          </div>

          <div className="stat-card">
            <h3>Active Visitors</h3>
            <h2>{stats.activeVisitors}</h2>
          </div>

          <div className="stat-card">
            <h3>Checked Out</h3>
            <h2>{stats.checkedOut}</h2>
          </div>

          <div className="stat-card">
            <h3>Pending Appointments</h3>
            <h2>{stats.pendingAppointments}</h2>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;