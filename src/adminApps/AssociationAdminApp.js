import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from '../associationadmin/page/Login';
import Dashboard from '../associationadmin/page/Dashboard';
import ManageDevice from '../associationadmin/page/ManageDevices/ManageDevice';
import EditManageDevice from '../associationadmin/page/ManageDevices/EditManageDevice'
import ManageUsers from '../associationadmin/page/ManageUser/ManageUsers';
import EditManageUsers from '../associationadmin/page/ManageUser/EditManageUsers'
import Wallet from '../associationadmin/page/Wallet';
import Profile from '../associationadmin/page/Profile';

const AssociationaAdminApp = () => {
  const storedUser = JSON.parse(sessionStorage.getItem('associationAdminUser'));
  const [loggedIn, setLoggedIn] = useState(!!storedUser);
  const [userInfo, setUserInfo] = useState(storedUser || {});

  useEffect(() => {
    if (storedUser) {
      setLoggedIn(true);
      setUserInfo(storedUser);
    }
  }, [storedUser]);

  const handleLogin = (data) => {
    setUserInfo(data);
    setLoggedIn(true);
    sessionStorage.setItem('associationAdminUser', JSON.stringify(data));
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUserInfo({});
    sessionStorage.removeItem('associationAdminUser');
  };
  
  return (
    <Routes>
      <Route
        path="/"
        element={loggedIn ? <Navigate to="/associationadmin/Dashboard" /> : <Login handleLogin={handleLogin} />}
      />
      <Route
        path="/Dashboard"
        element={loggedIn ? (
            <Dashboard userInfo={userInfo} handleLogout={handleLogout} />
        ) : (
            <Navigate to="/associationadmin" />
        )}
      />
      <Route
        path="/ManageDevice"
        element={loggedIn ? (
          <ManageDevice userInfo={userInfo} handleLogout={handleLogout} />
        ) : (
          <Navigate to="/associationadmin" />
        )}
      />
      <Route
        path="/EditManageDevice"
        element={loggedIn ? (
          <EditManageDevice userInfo={userInfo} handleLogout={handleLogout} />
        ) : (
          <Navigate to="/associationadmin" />
        )}
      />
      <Route
        path="/ManageUsers"
        element={loggedIn ? (
          <ManageUsers userInfo={userInfo} handleLogout={handleLogout} />
        ) : (
          <Navigate to="/associationadmin" />
        )}
      />
       <Route
        path="/EditManageUsers"
        element={loggedIn ? (
          <EditManageUsers userInfo={userInfo} handleLogout={handleLogout} />
        ) : (
          <Navigate to="/associationadmin" />
        )}
      />
      <Route
        path="/Wallet"
        element={loggedIn ? (
          <Wallet userInfo={userInfo} handleLogout={handleLogout} />
        ) : (
          <Navigate to="/associationadmin" />
        )}
      />
      <Route
        path="/Profile"
        element={loggedIn ? (
          <Profile userInfo={userInfo} handleLogout={handleLogout} />
        ) : (
          <Navigate to="/associationadmin" />
        )}
      />
    </Routes>
  );
};

export default AssociationaAdminApp;
