import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const Sidebar = () => {
    const location = useLocation();
    // const [isManageDeviceOpen, setIsManageDeviceOpen] = useState(false);

    // const toggleManageDevice = () => {
    //     setIsManageDeviceOpen(!isManageDeviceOpen);
    // };

    // const isManageDeviceActive = [
    //     '/clientadmin/Allocateddevice',
    //     '/clientadmin/Unallocateddevice',
    //     '/clientadmin/AssigntoAssociation',
    //     '/clientadmin/ViewAlloc',
    //     '/clientadmin/ViewUnalloc'
    // ].includes(location.pathname);

    const isManageAssociationActive = [
        '/clientadmin/ManageAssociation',
        '/clientadmin/ViewAss',
        '/clientadmin/Assigneddevass',
        '/clientadmin/Assignfinance',
        '/clientadmin/Createass',
        '/clientadmin/Editass',
        
    ].includes(location.pathname);

    const isManageUsersActive = [
        '/clientadmin/ManageUsers',
        '/clientadmin/Createuser',
        '/clientadmin/Edituser',
        '/clientadmin/Viewuser'
    ].includes(location.pathname);

    const isManageFinanceActive = [
        '/clientadmin/ManageFinance',
        '/clientadmin/ViewFinance',
        '/clientadmin/EditFinance',
        '/clientadmin/CreateFinance'
    ].includes(location.pathname);

    return (
        <nav className="sidebar sidebar-offcanvas" id="sidebar">
            <ul className="nav">
                <li className={location.pathname === '/clientadmin/Dashboard' ? 'nav-item active' : 'nav-item'} key="dashboard">
                    <Link className="nav-link" to={{ pathname: "/clientadmin/Dashboard" }}>
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
                            <li className={`nav-item ${location.pathname === '/clientadmin/Allocateddevice' || location.pathname === '/clientadmin/ViewAlloc' ? 'active' : ''}`} key="Allocateddevice">
                                <Link className="nav-link" to={{ pathname: "/clientadmin/Allocateddevice" }}>
                                    Allocated Chargers
                                </Link>
                            </li>
                            <li className={`nav-item ${location.pathname === '/clientadmin/Unallocateddevice' || location.pathname === '/clientadmin/ViewUnalloc' ? 'active' : ''}`} key="Unallocateddevice">
                                <Link className="nav-link" to={{ pathname: "/clientadmin/Unallocateddevice" }}>
                                    Unallocated Chargers
                                </Link>
                            </li>
                            <li className={`nav-item ${location.pathname === '/clientadmin/AssigntoAssociation' ? 'active' : ''}`} key="AssigntoAssociation">
                                <Link className="nav-link" to={{ pathname: "/clientadmin/AssigntoAssociation" }}>
                                    Assign to Association
                                </Link>
                            </li>
                        </ul>
                    </div>
                </li> */}

                <li className={location.pathname === '/clientadmin/Allocateddevice' || location.pathname === '/clientadmin/Unallocateddevice' || location.pathname === '/clientadmin/AssigntoAssociation' ? 'nav-item active' : 'nav-item'} key="ManageDevice">
                    <a class="nav-link" data-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
                    <i className="icon-head menu-icon mdi mdi-cellphone-link"></i>
                    <span className="menu-title">Manage Device</span>
                    <i class="menu-arrow"></i>
                    </a>
                    <div class="collapse" id="ui-basic">
                    <ul class="nav flex-column sub-menu">
                        <li class="nav-item"> <Link class="nav-link" to={{ pathname: "/clientadmin/Allocateddevice" }}>Allocated Chargers</Link></li>
                        <li class="nav-item"> <Link class="nav-link" to={{ pathname: "/clientadmin/Unallocateddevice" }}>Unallocated Chargers</Link></li>
                        <li class="nav-item"> <Link class="nav-link" to={{ pathname: "/clientadmin/AssigntoAssociation" }}>Assigned to Clients</Link></li>
                    </ul>
                    </div>
                </li>

                <li className={`nav-item ${isManageAssociationActive ? 'active' : ''}`} key="ManageAssociation">
                    <Link className="nav-link" to={{ pathname: "/clientadmin/ManageAssociation" }}>
                        <i className="icon-head menu-icon mdi mdi-account-multiple"></i>
                        <span className="menu-title">Manage Association</span>
                    </Link>
                </li>
                
                <li className={`nav-item ${isManageUsersActive ? 'active' : ''}`} key="ManageUsers">
                    <Link className="nav-link" to={{ pathname: "/clientadmin/ManageUsers" }}>
                        <i className="icon-head menu-icon mdi mdi-account-multiple"></i>
                        <span className="menu-title">Manage Users</span>
                    </Link>
                </li>
                
                <li className={`nav-item ${isManageFinanceActive ? 'active' : ''}`} key="ManageFinance">
                    <Link className="nav-link" to={{ pathname: "/clientadmin/ManageFinance" }}>
                        <i className="icon-head menu-icon mdi mdi-cash-multiple"></i>
                        <span className="menu-title">Manage Finance</span>
                    </Link>
                </li>
                
                <li className={location.pathname === '/clientadmin/Wallet' ? 'nav-item active' : 'nav-item'} key="Wallet">
                    <Link className="nav-link" to={{ pathname: "/clientadmin/Wallet" }}>
                        <i className="icon-head menu-icon mdi mdi-cash-multiple"></i>
                        <span className="menu-title">Wallet</span>
                    </Link>
                </li>
                
                <li className={location.pathname === '/clientadmin/Profile' ? 'nav-item active' : 'nav-item'} key="Profile">
                    <Link className="nav-link" to={{ pathname: "/clientadmin/Profile" }}>
                        <i className="icon-head menu-icon mdi mdi-account-circle"></i>
                        <span className="menu-title">Profile</span>
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Sidebar;
