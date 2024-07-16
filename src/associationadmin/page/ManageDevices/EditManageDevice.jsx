import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import Swal from 'sweetalert2';

const EditManageDevice = ({ userInfo, handleLogout }) => {
    const location = useLocation();
    const dataItem = location.state?.dataItem || JSON.parse(localStorage.getItem('editDeviceData'));
    const navigate = useNavigate();
    
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [wifiUsername, setWifiUsername] = useState('');
    const [wifiPassword, setWifiPassword] = useState('');
    const [selectStatus, setSelectedStatus] = useState('2');

    // Edit data
    useEffect(() => {
        if (dataItem) {
            setLatitude(dataItem.lat || '');
            setLongitude(dataItem.long || '');
            setWifiUsername(dataItem.wifi_username || '');
            setWifiPassword(dataItem.wifi_password || '');
            setSelectedStatus(dataItem.charger_accessibility ? '1' : '2');
            localStorage.setItem('editDeviceData', JSON.stringify(dataItem));
        }
    }, [dataItem]);

    // Selected status
    const handleStatusChange = (e) => {
        setSelectedStatus(e.target.value);
    };

    // Back view manage device
    const backManageDevice = () => {
        navigate('/associationadmin/ViewManageDevice');
    };

    // Back manage device
    const editBackManageDevice = () => {
        navigate('/associationadmin/ViewManageDevice');
    };

    // Update manage device
    const editManageDevice = async (e) => {
        e.preventDefault();
        try {
            const Status = parseInt(selectStatus);
            const response = await fetch('/associationadmin/UpdateDevice', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    charger_id: dataItem.charger_id,
                    charger_accessibility: Status,
                    lat: latitude,
                    long: longitude,
                    wifi_username: wifiUsername,
                    wifi_password: wifiPassword,
                    modified_by: userInfo.data.association_name
                }),
            });

            if (response.ok) {
                Swal.fire({
                    title: "Device updated successfully",
                    icon: "success"
                });
                setLatitude('');
                setLongitude('');
                setWifiUsername('');
                setWifiPassword('');
                editBackManageDevice();
            } else {
                Swal.fire({
                    title: "Error",
                    text: "Failed to update device",
                    icon: "error"
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "An error occurred while updating the device",
                icon: "error"
            });
        }
    };

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
                                        <h3 className="font-weight-bold">Edit Manage Device</h3>
                                    </div>
                                    <div className="col-12 col-xl-4">
                                        <div className="justify-content-end d-flex">
                                            <button type="button" className="btn btn-success" onClick={backManageDevice}>Back</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12 grid-margin stretch-card">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="col-12 grid-margin">
                                            <div className="card">
                                                <div className="card-body">
                                                    <h4 className="card-title">Manage Device</h4>
                                                    <form className="form-sample" onSubmit={editManageDevice}>
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-3 col-form-label">Public/Private</label>
                                                                    <div className="col-sm-9">
                                                                        <select className="form-control" value={selectStatus} onChange={handleStatusChange} required>
                                                                            <option value="1">Public</option>
                                                                            <option value="2">Private</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-3 col-form-label">Latitude</label>
                                                                    <div className="col-sm-9">
                                                                        <input type="text" className="form-control" value={latitude} onChange={(e) => setLatitude(e.target.value)} required />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-3 col-form-label">Longitude</label>
                                                                    <div className="col-sm-9">
                                                                        <input type="text" className="form-control" value={longitude} onChange={(e) => setLongitude(e.target.value)} required />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-3 col-form-label">Wifi Username</label>
                                                                    <div className="col-sm-9">
                                                                        <input type="text" className="form-control" value={wifiUsername} onChange={(e) => setWifiUsername(e.target.value)} required />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-3 col-form-label">Wifi Password</label>
                                                                    <div className="col-sm-9">
                                                                        <input type="text" className="form-control" value={wifiPassword} onChange={(e) => setWifiPassword(e.target.value)} required />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div style={{ textAlign: 'center' }}>
                                                            <button type="submit" className="btn btn-primary mr-2">Update</button>
                                                        </div>
                                                    </form>
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

export default EditManageDevice;
