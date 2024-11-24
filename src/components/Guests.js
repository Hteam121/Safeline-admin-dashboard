// src/components/Guests.js
import React, { useEffect, useState } from 'react';
import AnimationWrapper from './AnimationWrapper';
import { database } from '../firebase';
import { ref, onValue } from 'firebase/database';
import styled from 'styled-components';

const GuestsContainer = styled.div`
  padding: 20px;
`;

const GuestsList = styled.ul`
  list-style: none;
  padding: 0;
`;

const GuestItem = styled.li`
  background-color: #ffffff;
  padding: 20px;
  margin-bottom: 10px;
  border-left: 5px solid #ffa500;
  transition: background-color 0.3s;

  &:hover {
    background-color: #f1f1f1;
  }
`;

const Guests = () => {
  const [guests, setGuests] = useState([]);

  useEffect(() => {
    const guestsRef = ref(database, 'guests');
    onValue(guestsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setGuests(Object.values(data));
      }
    });
  }, []);

  return (
    <AnimationWrapper>
      <GuestsContainer>
        <h1>Guests</h1>
        <GuestsList>
          {guests.map((guest, index) => (
            <GuestItem key={index}>
              <h2>{guest.name}</h2>
              <p>Relationship: {guest.relationship}</p>
              <p>Access Timeout: {guest.accessTimeoutDate}</p>
              <p>Parent ID: {guest.parent_id}</p>
            </GuestItem>
          ))}
        </GuestsList>
      </GuestsContainer>
    </AnimationWrapper>
  );
};

export default Guests;
