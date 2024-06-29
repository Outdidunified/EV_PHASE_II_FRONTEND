import React from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const ViewManageDevice = ({ userInfo, handleLogout }) => {
    const location = useLocation();
    const dataItem = location.state?.dataItem;    

    const navigate = useNavigate();
    
    const handleBack = () => {
        navigate('/superadmin/ManageDevice');
    };

    const gridContainerStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gridGap: '10px',
        padding: '10px',
    };
    
    const gridItemStyle = {
        padding: '10px',
        fontWeight: 'bold',
    };

    // Timestamp data 
    function formatTimestamp(originalTimestamp) {
        const date = new Date(originalTimestamp);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        
        let hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        hours = String(hours).padStart(2, '0');
    
        const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds} ${ampm}`;
        return formattedDate;
    } 

    return (
        <div className='container-scroller'>
            {/* Header */}
            <Header userInfo={userInfo} handleLogout={handleLogout} />
            <div className="container-fluid page-body-wrapper">
                {/* Sidebar */}
                <Sidebar/>
                <div className="main-panel">
                    <div className="content-wrapper">
                        <div className="row">
                            <div className="col-md-12 grid-margin">
                                <div className="row">
                                    <div className="col-12 col-xl-8 mb-4 mb-xl-0">
                                        <h3 className="font-weight-bold">Manage Device</h3>
                                    </div>
                                    <div className="col-12 col-xl-4">
                                        <div className="justify-content-end d-flex">
                                            <button type="button" className="btn btn-success" onClick={handleBack}>Back</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12 grid-margin stretch-card">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-md-12 grid-margin">
                                                <div className="row">
                                                    <div className="col-12 col-xl-12">
                                                        <div style={{textAlign:'center'}}>
                                                            <h4 className="card-title" style={{paddingTop:'10px'}}>Device all list</h4>  
                                                            <hr></hr>
                                                        </div>
                                                    </div>
                                                    <div style={gridContainerStyle}>
                                                        <div style={gridItemStyle}>Charger ID: <span style={{fontWeight:'normal'}}>{dataItem.charger_id}</span></div>
                                                        <div style={gridItemStyle}>Model: <span style={{fontWeight:'normal'}}>{dataItem.model}</span></div>
                                                        <div style={gridItemStyle}>Type: <span style={{fontWeight:'normal'}}>{dataItem.type}</span></div>
                                                        <div style={gridItemStyle}>Vendor: <span style={{fontWeight:'normal'}}>{dataItem.vendor}</span></div>   
                                                        <div style={gridItemStyle}>Gun Connetor: <span style={{fontWeight:'normal'}}>{dataItem.gun_connector}</span></div>   
                                                        <div style={gridItemStyle}>Max Current: <span style={{fontWeight:'normal'}}>{dataItem.max_current}</span></div> 
                                                        <div style={gridItemStyle}>Max Power: <span style={{fontWeight:'normal'}}>{dataItem.max_power}</span></div>
                                                        <div style={gridItemStyle}>Socket Count: <span style={{fontWeight:'normal'}}>{dataItem.socket_count}</span></div>
                                                        <div style={gridItemStyle}>Current or Active User: <span style={{fontWeight:'normal'}}>{dataItem.current_active_user}</span></div>
                                                        <div style={gridItemStyle}>IP: <span style={{fontWeight:'normal'}}>{dataItem.ip}</span></div>
                                                        <div style={gridItemStyle}>Lat: <span style={{fontWeight:'normal'}}>{dataItem.lat}</span></div>
                                                        <div style={gridItemStyle}>Long: <span style={{fontWeight:'normal'}}>{dataItem.long}</span></div>
                                                        <div style={gridItemStyle}>Short Description: <span style={{fontWeight:'normal'}}>{dataItem.short_description}</span></div>   
                                                        <div style={gridItemStyle}>Charger Accessibility: <span style={{fontWeight:'normal'}}>{dataItem.charger_accessibility}</span></div>   
                                                        <div style={gridItemStyle}>Unit Price: <span style={{fontWeight:'normal'}}>{dataItem.unit_price}</span></div> 
                                                        <div style={gridItemStyle}>Assigned User: <span style={{fontWeight:'normal'}}>{dataItem.assigned_user}</span></div>
                                                        <div style={gridItemStyle}>Wifi Password: <span style={{fontWeight:'normal'}}>{dataItem.wifi_password}</span></div>
                                                        <div style={gridItemStyle}>Created By: <span style={{fontWeight:'normal'}}>{dataItem.created_by}</span></div>
                                                        <div style={gridItemStyle}>Created Date: <span style={{fontWeight:'normal'}}>{formatTimestamp(dataItem.created_date)}</span></div>
                                                        <div style={gridItemStyle}>Modified By: <span style={{fontWeight:'normal'}}>{dataItem.modified_by}</span></div>
                                                        <div style={gridItemStyle}>Modified Date: <span style={{fontWeight:'normal'}}>{formatTimestamp(dataItem.modified_date)}</span></div>
                                                        <div style={gridItemStyle}>Status: <span style={{fontWeight:'normal'}}>{dataItem.status === true ? 'Active' : 'UnActive'}</span></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    {/* Footer */}
                    <Footer />
                </div>         
            </div>    
        </div>
    )
}   
                 
export default ViewManageDevice