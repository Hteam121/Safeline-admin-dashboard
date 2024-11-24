import React from "react";
import AnimationWrapper from "./AnimationWrapper";
import ParentTable from "./ParentTable";
import styled from "styled-components";

const ParentsContainer = styled.div`
  padding: 20px;
`;

const ParentsHeader = styled.h1`
  margin-bottom: 20px;
`;

const Parents = () => {
  return (
    <AnimationWrapper>
      <ParentsContainer>
        <ParentsHeader>Parents</ParentsHeader>
        <ParentTable />
      </ParentsContainer>
    </AnimationWrapper>
  );
};

export default Parents;
