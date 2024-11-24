// src/components/Students.js
import React, { useEffect, useState } from 'react';
import AnimationWrapper from './AnimationWrapper';
import { database } from '../firebase';
import { ref, onValue } from 'firebase/database';
import styled from 'styled-components';

const StudentsContainer = styled.div`
  padding: 20px;
`;

const StudentsList = styled.ul`
  list-style: none;
  padding: 0;
`;

const StudentItem = styled.li`
  background-color: #ffffff;
  padding: 20px;
  margin-bottom: 10px;
  border-left: 5px solid #ffa500;
  transition: background-color 0.3s;

  &:hover {
    background-color: #f1f1f1;
  }
`;

const Students = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const studentsRef = ref(database, 'students');
    onValue(studentsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setStudents(Object.values(data));
      }
    });
  }, []);

  return (
    <AnimationWrapper>
      <StudentsContainer>
        <h1>Students</h1>
        <StudentsList>
          {students.map((student, index) => (
            <StudentItem key={index}>
              <h2>{student.name}</h2>
              <p>Age: {student.age}</p>
              <p>Parents: {student.parent_ids.join(', ')}</p>
            </StudentItem>
          ))}
        </StudentsList>
      </StudentsContainer>
    </AnimationWrapper>
  );
};

export default Students;
