import React, { useEffect } from 'react';

const Logout = () => {
  useEffect(() => {
    // Clear authentication tokens or session data
    window.location.href = '/login';
  }, []);

  return <div>Logging out...</div>;
};

export default Logout;
