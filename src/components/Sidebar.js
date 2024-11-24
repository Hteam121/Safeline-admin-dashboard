import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaUser, FaChild, FaUserFriends, FaCog, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const SidebarContainer = styled.nav`
  width: 250px;
  background-color: #000000;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100%;
`;

const AccountSection = styled.div`
  padding: 20px;
  border-bottom: 1px solid #ffa500;
  cursor: pointer;
`;

const AccountInfo = styled(motion.div)`
  display: flex;
  align-items: center;
`;

const AccountName = styled.span`
  margin-left: 10px;
  font-size: 18px;
`;

const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 20px;
`;

const MenuItem = styled.li`
  margin: 20px 0;
`;

const MenuLink = styled(NavLink)`
  color: #ffffff;
  display: flex;
  align-items: center;
  padding: 10px 20px;

  &.active,
  &:hover {
    background-color: #ffa500;
    color: #000000;
    border-radius: 4px;
  }

  svg {
    margin-right: 10px;
  }
`;

const LogoutPopup = styled.div`
  position: absolute;
  top: 60px;
  left: 20px;
  background-color: #ffffff;
  color: #000000;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 5px;
  z-index: 10;

  button {
    background-color: #000000;
    color: #ffffff;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 5px;

    &:hover {
      background-color: #ffa500;
    }
  }
`;

const Sidebar = () => {
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  return (
    <SidebarContainer>
      <AccountSection onClick={() => setShowLogoutPopup(!showLogoutPopup)}>
        <AccountInfo
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          transition={{ type: 'spring', stiffness: 100 }}
        >
          <FaUser size={40} />
          <AccountName>Admin Account</AccountName>
        </AccountInfo>
        {showLogoutPopup && (
          <LogoutPopup>
            <button onClick={() => (window.location.href = '/logout')}>Logout</button>
          </LogoutPopup>
        )}
      </AccountSection>
      <MenuList>
        <MenuItem>
          <MenuLink to="/parents">
            <FaUser /> Parents
          </MenuLink>
        </MenuItem>
        <MenuItem>
          <MenuLink to="/students">
            <FaChild /> Students
          </MenuLink>
        </MenuItem>
        <MenuItem>
          <MenuLink to="/guests">
            <FaUserFriends /> Guests
          </MenuLink>
        </MenuItem>
        <MenuItem>
          <MenuLink to="/settings">
            <FaCog /> Settings
          </MenuLink>
        </MenuItem>
        <MenuItem>
          <MenuLink to="/contact">
            <FaEnvelope /> Contact
          </MenuLink>
        </MenuItem>
      </MenuList>
    </SidebarContainer>
  );
};

export default Sidebar;
