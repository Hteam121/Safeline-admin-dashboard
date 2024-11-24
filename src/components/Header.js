import React from 'react';
import { Link } from 'react-router-dom';
import { FaBell } from 'react-icons/fa';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: #000000;
  color: #ffffff;
`;

const Logo = styled(Link)`
  font-size: 24px;
  font-weight: bold;
  text-decoration: none;
  color: #ffffff;

  &:hover {
    color: #ffa500;
  }
`;

const Notifications = styled(motion.div)`
  cursor: pointer;
  color: #ffa500; /* Orange accent */
`;

const Header = () => (
  <HeaderContainer>
    <Logo to="/">Your Logo</Logo>
    <Notifications whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
      <FaBell size={24} />
    </Notifications>
  </HeaderContainer>
);

export default Header;
