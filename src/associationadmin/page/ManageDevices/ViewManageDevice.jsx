import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const ViewManageDevice = ({ userInfo, handleLogout }) => {
    const location = useLocation();
    const [deviceData, setDeviceData] = useState({
        charger_id: '', model: '', type: '', vendor: '', gun_connector: '',
        max_current: '', max_power: '', socket_count: '', current_active_user: '', client_commission: '',
        ip: '', lat: '', long: '', short_description: '', charger_accessibility: '',
        unit_price: '', assigned_user: '', wifi_password: '', created_by: '', created_date: '',
        modified_by: '', modified_date: '', status: '', _id: '',
    });

    useEffect(() => {
        const { dataItem } = location.state || {};
        if (dataItem) {
            setDeviceData({
                charger_id: dataItem.charger_id || '',
                model: dataItem.model || '',
                type: dataItem.type || '',
                vendor: dataItem.vendor || '',
                gun_connector: dataItem.gun_connector || '',
                max_current: dataItem.max_current || '',
                max_power: dataItem.max_power || '',
                socket_count: dataItem.socket_count || '',
                current_active_user: dataItem.current_active_user || '',
                client_commission: dataItem.client_commission || '',
                ip: dataItem.ip || '',
                lat: dataItem.lat || '',
                long: dataItem.long || '',
                short_description: dataItem.short_description || '',
                charger_accessibility: dataItem.charger_accessibility || '',
                unit_price: dataItem.unit_price || '',
                assigned_user: dataItem.assigned_user || '',
                wifi_password: dataItem.wifi_password || '',
                created_by: dataItem.created_by || '',
                created_date: dataItem.created_date || '',
                modified_by: dataItem.modified_by || '',
                modified_date: dataItem.modified_date || '',
                status: dataItem.status || '',
                _id: dataItem._id || '',
            });
            // Save to localStorage
            localStorage.setItem('deviceData', JSON.stringify(dataItem));
        } else {
            // Load from localStorage if available
            const savedData = JSON.parse(localStorage.getItem('deviceData'));
            if (savedData) {
                setDeviceData(savedData);
            }
        }
    }, [location]);

    const navigate = useNavigate();
    
    // Back manage device
    const handleBack = () => {
        navigate('/associationadmin/ManageDevice');
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
                <Sidebar />
                <div className="main-panel">
                    <div className="content-wrapper">
                        <div className="row">
                            <div className="col-md-12 grid-margin">
                                <div className="row">
                                    <div className="col-12 col-xl-8 mb-4 mb-xl-0">
                                        <h3 className="font-weight-bold">View Manage Device</h3>
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
                                                        <div style={{ textAlign: 'center' }}>
                                                            <h4 className="card-title" style={{ paddingTop: '10px' }}>Device all list</h4>
                                                            <hr></hr>
                                                        </div>
                                                    </div>
                                                    <div style={gridContainerStyle}>
                                                        <div style={gridItemStyle}>Charger ID: <span style={{ fontWeight: 'normal' }}>{deviceData.charger_id}</span></div>
                                                        <div style={gridItemStyle}>Model: <span style={{ fontWeight: 'normal' }}>{deviceData.model}</span></div>
                                                        <div style={gridItemStyle}>Type: <span style={{ fontWeight: 'normal' }}>{deviceData.type}</span></div>
                                                        <div style={gridItemStyle}>Vendor: <span style={{ fontWeight: 'normal' }}>{deviceData.vendor}</span></div>
                                                        <div style={gridItemStyle}>Gun Connector: <span style={{ fontWeight: 'normal' }}>{deviceData.gun_connector}</span></div>
                                                        <div style={gridItemStyle}>Max Current: <span style={{ fontWeight: 'normal' }}>{deviceData.max_current}</span></div>
                                                        <div style={gridItemStyle}>Max Power: <span style={{ fontWeight: 'normal' }}>{deviceData.max_power}</span></div>
                                                        <div style={gridItemStyle}>Socket Count: <span style={{ fontWeight: 'normal' }}>{deviceData.socket_count}</span></div>
                                                        <div style={gridItemStyle}>Current or Active User: <span style={{ fontWeight: 'normal' }}>{deviceData.current_active_user}</span></div>
                                                        <div style={gridItemStyle}>Client Commission: <span style={{ fontWeight: 'normal' }}>{deviceData.client_commission}</span></div>
                                                        <div style={gridItemStyle}>IP: <span style={{ fontWeight: 'normal' }}>{deviceData.ip}</span></div>
                                                        <div style={gridItemStyle}>Lat: <span style={{ fontWeight: 'normal' }}>{deviceData.lat}</span></div>
                                                        <div style={gridItemStyle}>Long: <span style={{ fontWeight: 'normal' }}>{deviceData.long}</span></div>
                                                        <div style={gridItemStyle}>Short Description: <span style={{ fontWeight: 'normal' }}>{deviceData.short_description}</span></div>
                                                        <div style={gridItemStyle}>Charger Accessibility: <span style={{ fontWeight: 'normal' }}>{deviceData.charger_accessibility}</span></div>
                                                        <div style={gridItemStyle}>Unit Price: <span style={{ fontWeight: 'normal' }}>{deviceData.unit_price}</span></div>
                                                        <div style={gridItemStyle}>Assigned User: <span style={{ fontWeight: 'normal' }}>{deviceData.assigned_user}</span></div>
                                                        <div style={gridItemStyle}>Wifi Password: <span style={{ fontWeight: 'normal' }}>{deviceData.wifi_password}</span></div>
                                                        <div style={gridItemStyle}>Created By: <span style={{ fontWeight: 'normal' }}>{deviceData.created_by}</span></div>
                                                        <div style={gridItemStyle}>Created Date: <span style={{ fontWeight: 'normal' }}>{formatTimestamp(deviceData.created_date)}</span></div>
                                                        <div style={gridItemStyle}>Modified By: <span style={{ fontWeight: 'normal' }}>{deviceData.modified_by}</span></div>
                                                        <div style={gridItemStyle}>Modified Date: <span style={{ fontWeight: 'normal' }}>{formatTimestamp(deviceData.modified_date)}</span></div>
                                                        <div style={gridItemStyle}>Status: <span style={{ fontWeight: 'normal' }}>{deviceData.status ? 'Active' : 'UnActive'}</span></div>
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
    );
};

export default ViewManageDevice;
