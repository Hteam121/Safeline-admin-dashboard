// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import AnimationWrapper from './AnimationWrapper';
import { database } from '../firebase';
import { ref, onValue } from 'firebase/database';
import styled from 'styled-components';

const DashboardContainer = styled.div`
  padding: 20px;
`;

const StatsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 40px;
`;

const StatCard = styled.div`
  background-color: #000000;
  color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  width: 30%;
  text-align: center;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.05);
    background-color: #ffa500;
    color: #000000;
  }
`;

const GuestHistory = styled.div`
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    padding: 12px;
    border: 1px solid #ddd;
  }

  tr:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const Dashboard = () => {
  const [stats, setStats] = useState({});
  const [guestHistory, setGuestHistory] = useState([]);

  useEffect(() => {
    const statsRef = ref(database, 'stats');
    onValue(statsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setStats(data);
      }
    });

    const guestHistoryRef = ref(database, 'guestHistory');
    onValue(guestHistoryRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setGuestHistory(Object.values(data));
      }
    });
  }, []);

  return (
    <AnimationWrapper>
      <DashboardContainer>
        <h1>Welcome to the Admin Dashboard</h1>
        <StatsContainer>
          <StatCard>
            <h2>Total Pickups Today</h2>
            <p>{stats.totalPickups || 0}</p>
          </StatCard>
          <StatCard>
            <h2>Pending Guest Approvals</h2>
            <p>{stats.pendingGuests || 0}</p>
          </StatCard>
          <StatCard>
            <h2>Alerts</h2>
            <p>{stats.alerts || 0}</p>
          </StatCard>
        </StatsContainer>
        <GuestHistory>
          <h2>Guest History for Today</h2>
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Pickup Time</th>
                <th>Relationship</th>
              </tr>
            </thead>
            <tbody>
              {guestHistory.map((guest, index) => (
                <tr key={index}>
                  <td>{guest.name}</td>
                  <td>{guest.pickupTime}</td>
                  <td>{guest.relationship}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </GuestHistory>
      </DashboardContainer>
    </AnimationWrapper>
  );
};

export default Dashboard;
