import React from "react";
import AnimationWrapper from "./AnimationWrapper";
import StudentTable from "./StudentTable";
import styled from "styled-components";

const StudentsContainer = styled.div`
  padding: 20px;
`;

const StudentsHeader = styled.h1`
  margin-bottom: 20px;
`;

const Students = () => {
  return (
    <AnimationWrapper>
      <StudentsContainer>
        <StudentsHeader>Students</StudentsHeader>
        <StudentTable />
      </StudentsContainer>
    </AnimationWrapper>
  );
};

export default Students;
