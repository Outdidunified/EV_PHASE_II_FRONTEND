import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const Sidebar = () => {
    const location = useLocation();
    // const [isManageDeviceOpen, setIsManageDeviceOpen] = useState(false);

    // const toggleManageDevice = () => {
    //     setIsManageDeviceOpen(!isManageDeviceOpen);
    // };

    // const isManageDeviceActive = [
    //     '/reselleradmin/Allocateddevice',
    //     '/reselleradmin/Unallocateddevice',
    //     '/reselleradmin/Assigntoclients',
    //     '/reselleradmin/ViewAlloc',
    //     '/reselleradmin/ViewUnalloc'
    // ].includes(location.pathname);

    return (
        <nav className="sidebar sidebar-offcanvas" id="sidebar">
            <ul className="nav">
                <li className={location.pathname === '/reselleradmin/Dashboard' ? 'nav-item active' : 'nav-item'} key="dashboard">
                    <Link className="nav-link" to={{ pathname: "/reselleradmin/Dashboard" }}>
                        <i className="icon-grid menu-icon"></i>
                        <span className="menu-title">Dashboard</span>
                    </Link>
                </li>
                
                {/* <li className={`nav-item ${isManageDeviceActive || isManageDeviceOpen ? 'active' : ''}`} key="ManageDevice">
                    <a className="nav-link" href="#!" onClick={toggleManageDevice}>
                        <i className="icon-head menu-icon mdi mdi-cellphone-link"></i>
                        <span className="menu-title">Manage Device</span>
                        <i className={`menu-arrow ${isManageDeviceOpen ? 'mdi mdi-chevron-down' : 'mdi mdi-chevron-right'}`}></i>
                    </a>
                    <div className={`collapse ${isManageDeviceOpen ? 'show' : ''}`}>
                        <ul className="nav flex-column sub-menu">
                            <li className={`nav-item ${location.pathname === '/reselleradmin/Allocateddevice' ? 'active' : ''}`} key="Allocateddevice">
                                <Link className="nav-link" to={{ pathname: "/reselleradmin/Allocateddevice" }}>
                                    Allocated Chargers
                                </Link>
                            </li>
                            <li className={`nav-item ${location.pathname === '/reselleradmin/Unallocateddevice' ? 'active' : ''}`} key="Unallocateddevice">
                                <Link className="nav-link" to={{ pathname: "/reselleradmin/Unallocateddevice" }}>
                                    Unallocated Chargers
                                </Link>
                            </li>
                            <li className={`nav-item ${location.pathname === '/reselleradmin/Assigntoclients' ? 'active' : ''}`} key="Assigntoclients">
                                <Link className="nav-link" to={{ pathname: "/reselleradmin/Assigntoclients" }}>
                                    Assigned to Clients
                                </Link>
                            </li>
                        </ul>
                    </div>
                </li> */}

                <li className={location.pathname === '/reselleradmin/Allocateddevice' || location.pathname === '/reselleradmin/Unallocateddevice' || location.pathname === '/reselleradmin/Assigntoclients' ? 'nav-item active' : 'nav-item'} key="ManageDevice">
                    <a class="nav-link" data-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
                    <i className="icon-head menu-icon mdi mdi-cellphone-link"></i>
                    <span className="menu-title">Manage Device</span>
                    <i class="menu-arrow"></i>
                    </a>
                    <div class="collapse" id="ui-basic">
                    <ul class="nav flex-column sub-menu">
                        <li class="nav-item"> <Link class="nav-link" to={{ pathname: "/reselleradmin/Allocateddevice" }}>Allocated Chargers</Link></li>
                        <li class="nav-item"> <Link class="nav-link" to={{ pathname: "/reselleradmin/Unallocateddevice" }}>Unallocated Chargers</Link></li>
                        <li class="nav-item"> <Link class="nav-link" to={{ pathname: "/reselleradmin/Assigntoclients" }}>Assigned to Clients</Link></li>
                    </ul>
                    </div>
                </li>

                <li className={location.pathname === '/reselleradmin/ManageClient' || location.pathname === '/reselleradmin/CreateClients' || location.pathname === '/reselleradmin/viewclient' || location.pathname === '/reselleradmin/updateclient' || location.pathname === '/reselleradmin/Asssigntoass' || location.pathname === '/reselleradmin/Assigneddevicesclient'|| location.pathname === '/reselleradmin/Sessionhistoryclient'? 'nav-item active' : 'nav-item'} key="ManageClient">
                    <Link className="nav-link" to={{ pathname: "/reselleradmin/ManageClient" }}>
                        <i className="icon-head menu-icon mdi mdi-account-multiple"></i>
                        <span className="menu-title">Manage Client</span>
                    </Link>
                </li>
                <li className={location.pathname === '/reselleradmin/ManageUsers' || location.pathname === '/reselleradmin/Createusers' || location.pathname === '/reselleradmin/Viewuser' || location.pathname === '/reselleradmin/updateuser'? 'nav-item active' : 'nav-item'} key="ManageUsers">
                    <Link className="nav-link" to={{ pathname: "/reselleradmin/ManageUsers" }}>
                        <i className="icon-head menu-icon mdi mdi-account-multiple"></i>
                        <span className="menu-title">Manage Users</span>
                    </Link>
                </li>
                
                <li className={location.pathname === '/reselleradmin/Wallet' ? 'nav-item active' : 'nav-item'} key="Wallet">
                    <Link className="nav-link" to={{ pathname: "/reselleradmin/Wallet" }}>
                        <i className="icon-head menu-icon mdi mdi-cash-multiple"></i>
                        <span className="menu-title">Wallet</span>
                    </Link>
                </li>
                <li className={location.pathname === '/reselleradmin/Profile' ? 'nav-item active' : 'nav-item'} key="Profile">
                    <Link className="nav-link" to={{ pathname: "/reselleradmin/Profile" }}>
                        <i className="icon-head menu-icon mdi mdi-account-circle"></i>
                        <span className="menu-title">Profile</span>
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Sidebar;
