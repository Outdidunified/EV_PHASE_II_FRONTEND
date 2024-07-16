import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import Swal from 'sweetalert2';

const EditManageReseller = ({ userInfo, handleLogout }) => {
    const location = useLocation();
    const navigate = useNavigate();
    
    const [editReseller, setEditReseller] = useState({
        reseller_name: '', reseller_phone_no: '', reseller_email_id: '', reseller_address: '', reseller_id: '', status: '', _id: '',
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [selectStatus, setSelectedStatus] = useState(editReseller.status ? 'true' : 'false');

    useEffect(() => {
        const { dataItem } = location.state || {};
        if (dataItem) {
            setEditReseller({
                reseller_name: dataItem.reseller_name || '', reseller_phone_no: dataItem.reseller_phone_no || '', reseller_email_id: dataItem.reseller_email_id || '', reseller_address: dataItem.reseller_address || '', reseller_id: dataItem.reseller_id || '', status: dataItem.status || '', _id: dataItem._id || '',
            });
            setSelectedStatus(dataItem.status ? 'true' : 'false');
            // Save to localStorage
            localStorage.setItem('editResellerData', JSON.stringify(dataItem));
        } else {
            // Load from localStorage if available
            const savedData = JSON.parse(localStorage.getItem('editResellerData'));
            if (savedData) {
                setEditReseller(savedData);
                setSelectedStatus(savedData.status ? 'true' : 'false');
            }
        }
    }, [location]);

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
        if (!editReseller.reseller_phone_no || !phoneRegex.test(editReseller.reseller_phone_no)) {
            setErrorMessage('Phone number must be a 10-digit number.');
            return;
        }

        try {
            const updatedReseller = {
                reseller_id: editReseller.reseller_id,
                reseller_name: editReseller.reseller_name,
                reseller_phone_no: parseInt(editReseller.reseller_phone_no),
                status: selectStatus === 'true',
                reseller_address: editReseller.reseller_address,
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
                                                                        <input type="text" className="form-control" value={editReseller.reseller_name} onChange={(e) => setEditReseller({ ...editReseller, reseller_name: e.target.value })}required />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-3 col-form-label">Phone Number</label>
                                                                    <div className="col-sm-9">
                                                                        <input type="text" className="form-control" value={editReseller.reseller_phone_no} onChange={(e) => setEditReseller({ ...editReseller, reseller_phone_no: e.target.value })} required />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-3 col-form-label">Email ID</label>
                                                                    <div className="col-sm-9">
                                                                        <input type="email" className="form-control" value={editReseller.reseller_email_id} readOnly required />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-3 col-form-label">Address</label>
                                                                    <div className="col-sm-9">
                                                                        <textarea type="text" className="form-control" value={editReseller.reseller_address} maxLength={150} onChange={(e) => setEditReseller({ ...editReseller, reseller_address: e.target.value })}required />
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
