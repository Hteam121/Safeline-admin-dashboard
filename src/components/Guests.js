import React from "react";
import AnimationWrapper from "./AnimationWrapper";
import GuestTable from "./GuestTable";
import styled from "styled-components";

const GuestsContainer = styled.div`
  padding: 20px;
`;

const GuestsHeader = styled.h1`
  margin-bottom: 20px;
`;

const Guests = () => {
  return (
    <AnimationWrapper>
      <GuestsContainer>
        <GuestsHeader>Guests</GuestsHeader>
        <GuestTable />
      </GuestsContainer>
    </AnimationWrapper>
  );
};

export default Guests;
