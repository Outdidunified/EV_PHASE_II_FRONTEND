import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import Swal from 'sweetalert2';

const EditManageReseller = ({ userInfo, handleLogout }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const dataItem = location.state?.newUser || JSON.parse(localStorage.getItem('editDeviceData'));
    localStorage.setItem('editDeviceData', JSON.stringify(dataItem));
    
    const [errorMessage, setErrorMessage] = useState('');
    const [selectStatus, setSelectedStatus] = useState(dataItem?.status ? 'true' : 'false');

    // Edit manage device
    const [reseller_name, setResellerName] = useState(dataItem?.reseller_name || '');
    const [reseller_phone_no, setResellerPhoneNumber] = useState(dataItem?.reseller_phone_no || '');
    const [reseller_email_id, setEmilaID] = useState(dataItem?.reseller_email_id || '');
    const [reseller_address, setResellerAddress] = useState(dataItem?.reseller_address || '');
    

    // Selected status
    const handleStatusChange = (e) => {
        setSelectedStatus(e.target.value);
    };

    // Back view manage reseller
    const backManageReseller = () => {
        navigate('/superadmin/ViewManageReseller');
    };

    // Edit back manage reseller
    const EditBackManageResellers = () => {
        navigate('/superadmin/ManageReseller');
    };

    // Update manage reseller
    const editManageReseller = async (e) => {
        e.preventDefault();

        const phoneRegex = /^\d{10}$/;
        if (!reseller_phone_no || !phoneRegex.test(reseller_phone_no)) {
            setErrorMessage('Phone number must be a 10-digit number.');
            return;
        }

        try {
            const updatedReseller = {
                reseller_id: dataItem?.reseller_id,
                reseller_name:reseller_name,
                reseller_phone_no: parseInt(reseller_phone_no),
                status: selectStatus === 'true',
                reseller_address:reseller_address,
                modified_by: userInfo.data.username,
            };
            const response = await fetch('/superadmin/UpdateReseller', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedReseller),
            });

            if (response.ok) {
                Swal.fire({
                    title: 'Reseller updated successfully',
                    icon: 'success',
                });
                EditBackManageResellers();
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'Failed to update reseller',
                    icon: 'error',
                });
            }
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'An error occurred while updating the reseller',
                icon: 'error',
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
                                        <h3 className="font-weight-bold">Edit Manage Reseller</h3>
                                    </div>
                                    <div className="col-12 col-xl-4">
                                        <div className="justify-content-end d-flex">
                                            <button type="button" className="btn btn-success" onClick={backManageReseller}>Back</button>
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
                                                    <h4 className="card-title">Manage Reseller</h4>
                                                    <form className="form-sample" onSubmit={editManageReseller}>
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-3 col-form-label">Reseller Name</label>
                                                                    <div className="col-sm-9">
                                                                        <input type="text" className="form-control" value={reseller_name} onChange={(e) => setResellerName(e.target.value )}required />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-3 col-form-label">Phone Number</label>
                                                                    <div className="col-sm-9">
                                                                        <input type="text" className="form-control" value={reseller_phone_no} onChange={(e) => setResellerPhoneNumber(e.target.value )} required />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-3 col-form-label">Email ID</label>
                                                                    <div className="col-sm-9">
                                                                        <input type="email" className="form-control" value={reseller_email_id} onChange={(e) => setEmilaID(e.target.value )}readOnly required />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-3 col-form-label">Address</label>
                                                                    <div className="col-sm-9">
                                                                        <textarea type="text" className="form-control" value={reseller_address} maxLength={150} onChange={(e) => setResellerAddress(e.target.value )}required />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-3 col-form-label">Status</label>
                                                                    <div className="col-sm-9">
                                                                        <select className="form-control" value={selectStatus} onChange={handleStatusChange} required >
                                                                            <option value="true">Active</option>
                                                                            <option value="false">Deactive</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {errorMessage && <div className="text-danger">{errorMessage}</div>}
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

export default EditManageReseller;
