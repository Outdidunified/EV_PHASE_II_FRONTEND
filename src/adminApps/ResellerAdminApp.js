import React, { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from '../reselleradmin/page/Login';
import Dashboard from '../reselleradmin/page/Dashboard';
//manage device

import Unallocateddevice from '../reselleradmin/page/Managedevice/Unallocateddevice';
import Allocateddevice from '../reselleradmin/page/Managedevice/Allocateddevice';
import ViewUnalloc from '../reselleradmin/page/Managedevice/ViewUnalloc';
import ViewAlloc from '../reselleradmin/page/Managedevice/ViewAlloc';
import Assigntoclients from '../reselleradmin/page/Managedevice/Assigntoclients';

//manageclient
import ManageClient from '../reselleradmin/page/Manageclient/ManageClient';
import CreateClients from '../reselleradmin/page/Manageclient/Createclients';
import Viewclient from '../reselleradmin/page/Manageclient/viewclient';
import Updateclient from '../reselleradmin/page/Manageclient/updateclient';
import Asssigntoass from '../reselleradmin/page/Manageclient/Asssigntoass';
import Assigneddevicesclient from "../reselleradmin/page/Manageclient/AssigneddDvicesclient"
import Sessionhistoryclient from '../reselleradmin/page/Manageclient/Sessionhistoryclient';

//wallet
import Wallet from '../reselleradmin/page/Wallet'


import Profile from '../reselleradmin/page/Profile';
import ManageUsers from '../reselleradmin/page/Manageuser/ManageUsers';
import Createusers from '../reselleradmin/page/Manageuser/Createusers';
import Updateuser from '../reselleradmin/page/Manageuser/updateuser';
import Viewuser from '../reselleradmin/page/Manageuser/Viewuser';



const ResellerAdminApp = () => {
  const storedUser = JSON.parse(sessionStorage.getItem('resellerAdminUser'));
  const [loggedIn, setLoggedIn] = useState(!!storedUser);
  const [userInfo, setUserInfo] = useState(storedUser || {});


  const handleLogin = (data) => {
    const { email, ...rest } = data;
    setUserInfo({ email, ...rest });
    setLoggedIn(true);
    sessionStorage.setItem('resellerAdminUser', JSON.stringify({ email, ...rest }));
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUserInfo({});
    sessionStorage.removeItem('resellerAdminUser');
  };

  return (
    <Routes>
      <Route
        path="/"
        element={loggedIn ? <Navigate to="/reselleradmin/Dashboard" /> : <Login handleLogin={handleLogin} />}
      />
      <Route
        path="/Dashboard"
        element={loggedIn ? (
          <Dashboard userInfo={userInfo} handleLogout={handleLogout} />
        ) : (
          <Navigate to="/reselleradmin" />
        )}
      />
      {/* manage device */}
     
      <Route
        path="Unallocateddevice"
        element={loggedIn ? (
          <Unallocateddevice userInfo={userInfo} handleLogout={handleLogout} />
        ) : (
          <Navigate to="/reselleradmin" />
        )}
      />
      <Route
        path="/Allocateddevice"
        element={loggedIn ? (
          <Allocateddevice userInfo={userInfo} handleLogout={handleLogout} />
        ) : (
          <Navigate to="/reselleradmin" />
        )}
      />
       <Route
        path="/ViewUnalloc"
        element={loggedIn ? (
          <ViewUnalloc userInfo={userInfo} handleLogout={handleLogout} />
        ) : (
          <Navigate to="/reselleradmin" />
        )}
      />
      <Route
        path="/ViewAlloc"
        element={loggedIn ? (
          <ViewAlloc userInfo={userInfo} handleLogout={handleLogout} />
        ) : (
          <Navigate to="/reselleradmin" />
        )}
      />
       <Route
        path="/Assigntoclients"
        element={loggedIn ? (
          <Assigntoclients userInfo={userInfo} handleLogout={handleLogout} />
        ) : (
          <Navigate to="/reselleradmin" />
        )}
      />
      {/* manage device */}

      <Route
        path="/ManageUsers"
        element={loggedIn ? (
          <ManageUsers userInfo={userInfo} handleLogout={handleLogout} />
        ) : (
          <Navigate to="/reselleradmin" />
        )}
      />
        <Route
          path="/Createusers"
          element={loggedIn ? <Createusers userInfo={userInfo} handleLogout={handleLogout} /> : <Navigate to="/reselleradmin" />}
        />

      <Route
        path="/updateuser"
        element={loggedIn ? (
          <Updateuser userInfo={userInfo} handleLogout={handleLogout} />
        ) : (
          <Navigate to="/reselleradmin" />
        )}
      />

      <Route
        path="/Viewuser"
        element={loggedIn ? (
          <Viewuser userInfo={userInfo} handleLogout={handleLogout} />
        ) : (
          <Navigate to="/reselleradmin" />
        )}
      />
      
      {/* manageclient */}

      <Route
        path="/ManageClient"
        element={loggedIn ? (
          <ManageClient userInfo={userInfo} handleLogout={handleLogout} />
        ) : (
          <Navigate to="/reselleradmin" />
        )}
      />
      <Route
        path="/CreateClients"
        element={loggedIn ? (
          <CreateClients userInfo={userInfo} handleLogout={handleLogout} />
        ) : (
          <Navigate to="/reselleradmin" />
        )}
      />
      <Route
        path="/updateclient"
        element={loggedIn ? (
          <Updateclient userInfo={userInfo} handleLogout={handleLogout} />
        ) : (
          <Navigate to="/reselleradmin" />
        )}
      />
      <Route
        path="/viewclient"
        element={loggedIn ? (
          <Viewclient userInfo={userInfo} handleLogout={handleLogout} />
        ) : (
          <Navigate to="/reselleradmin" />
        )}
      />
      <Route
        path="/viewclient"
        element={loggedIn ? (
          <Viewclient userInfo={userInfo} handleLogout={handleLogout} />
        ) : (
          <Navigate to="/reselleradmin" />
        )}
      />
      <Route
        path="/Asssigntoass"
        element={loggedIn ? (
          <Asssigntoass userInfo={userInfo} handleLogout={handleLogout} />
        ) : (
          <Navigate to="/reselleradmin" />
        )}
      />
      <Route
        path="/Assigneddevicesclient"
        element={loggedIn ? (
          <Assigneddevicesclient userInfo={userInfo} handleLogout={handleLogout} />
        ) : (
          <Navigate to="/reselleradmin" />
        )}
      />
      <Route
        path="/Sessionhistoryclient"
        element={loggedIn ? (
          <Sessionhistoryclient userInfo={userInfo} handleLogout={handleLogout} />
        ) : (
          <Navigate to="/reselleradmin" />
        )}
      />
      {/*  */}

      <Route
        path="/Wallet"
        element={loggedIn ? (
          <Wallet userInfo={userInfo} handleLogout={handleLogout} />
        ) : (
          <Navigate to="/reselleradmin" />
        )}
      />
      <Route
        path="/Profile"
        element={loggedIn ? (
          <Profile userInfo={userInfo} handleLogout={handleLogout} />
        ) : (
          <Navigate to="/reselleradmin" />
        )}
      />
    </Routes>
  );
};

export default ResellerAdminApp;
