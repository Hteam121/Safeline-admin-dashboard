// src/components/Parents.js
import React, { useEffect, useState } from 'react';
import AnimationWrapper from './AnimationWrapper';
import { database } from '../firebase';
import { ref, onValue } from 'firebase/database';
import styled from 'styled-components';

const ParentsContainer = styled.div`
  padding: 20px;
`;

const ParentsList = styled.ul`
  list-style: none;
  padding: 0;
`;

const ParentItem = styled.li`
  background-color: #ffffff;
  padding: 20px;
  margin-bottom: 10px;
  border-left: 5px solid #ffa500;
  transition: background-color 0.3s;

  &:hover {
    background-color: #f1f1f1;
  }
`;

const Parents = () => {
  const [parents, setParents] = useState([]);

  useEffect(() => {
    const parentsRef = ref(database, 'parents');
    onValue(parentsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setParents(Object.values(data));
      }
    });
  }, []);

  return (
    <AnimationWrapper>
      <ParentsContainer>
        <h1>Parents</h1>
        <ParentsList>
          {parents.map((parent, index) => (
            <ParentItem key={index}>
              <h2>{parent.name}</h2>
              <p>Students: {parent.student_ids.join(', ')}</p>
              <p>License Plates: {parent.license_plate_ids.join(', ')}</p>
            </ParentItem>
          ))}
        </ParentsList>
      </ParentsContainer>
    </AnimationWrapper>
  );
};

export default Parents;
