import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Sidebar from '../../components/Sidebar';
import Swal from 'sweetalert2';

const UpdateClient = ({ userInfo, handleLogout }) => {
    const [newUser, setNewUser] = useState({
        _id: '',
        client_id: '',
        client_name: '',
        client_phone_no: '',
        client_email_id: '',
        client_address: '',
        status: true // Example boolean value
    });

    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const { user } = location.state || {};
        if (user) {
            setNewUser({
                _id: user._id || '',
                client_id: user.client_id || '',
                client_name: user.client_name || '',
                client_phone_no: user.client_phone_no || '',
                client_email_id: user.client_email_id || '',
                client_address: user.client_address || '',
                status: user.status || true // Example boolean value
            });
        }
    }, [location]);

    const updateClientUser = async (e) => {
        e.preventDefault();
        try {
            const formattedUserData = {
                client_id: newUser.client_id,
                client_name: newUser.client_name,
                client_phone_no: parseInt(newUser.client_phone_no),
                client_address: newUser.client_address,
                modified_by: userInfo.data.reseller_name,
                status: newUser.status // Assuming status is a boolean
            };

            await axios.post(`/reselleradmin/updateClient/`, formattedUserData);
            Swal.fire({
                position: "center",
                icon: "success",
                title: "User updated successfully",
                showConfirmButton: false,
                timer: 1500
            });
            navigate(-1);
        } catch (error) {
            console.error('Error updating user:', error);
            setErrorMessage('Failed to update user. Please try again.');
        }
    };

    const goBack = () => {
        navigate(-1);
    };

    return (
        <div className='container-scroller'>
            <Header userInfo={userInfo} handleLogout={handleLogout} />
            <div className="container-fluid page-body-wrapper">
                <Sidebar />
                <div className="main-panel">
                    <div className="content-wrapper">
                        <div className="row">
                            <div className="col-md-12 grid-margin">
                                <div className="row">
                                    <div className="col-12 col-xl-8 mb-4 mb-xl-0">
                                        <h3 className="font-weight-bold">Edit Client</h3>
                                    </div>
                                    <div className="col-12 col-xl-4">
                                        <div className="justify-content-end d-flex">
                                            <button
                                                type="button"
                                                className="btn btn-success"
                                                onClick={goBack}
                                                style={{ marginRight: '10px' }}
                                            >
                                                Go Back
                                            </button>
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
                                                    <h4 className="card-title">Update Client Users</h4>
                                                    <form className="form-sample" onSubmit={updateClientUser}>
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-3 col-form-label">Client Name</label>
                                                                    <div className="col-sm-9">
                                                                        <input
                                                                            type="text"
                                                                            className="form-control"
                                                                            value={newUser.client_name}
                                                                            onChange={(e) => setNewUser({ ...newUser, client_name: e.target.value })}
                                                                            required
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-3 col-form-label">Phone No</label>
                                                                    <div className="col-sm-9">
                                                                        <input
                                                                            type="number"
                                                                            className="form-control"
                                                                            value={newUser.client_phone_no}
                                                                            onChange={(e) => setNewUser({ ...newUser, client_phone_no: e.target.value })}
                                                                            required
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-3 col-form-label">Email ID</label>
                                                                    <div className="col-sm-9">
                                                                        <input
                                                                            type="email"
                                                                            className="form-control"
                                                                            value={newUser.client_email_id}
                                                                            readOnly
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-3 col-form-label">Address</label>
                                                                    <div className="col-sm-9">
                                                                        <input
                                                                            type="text"
                                                                            className="form-control"
                                                                            value={newUser.client_address}
                                                                            onChange={(e) => setNewUser({ ...newUser, client_address: e.target.value })}
                                                                            required
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-3 col-form-label">Status</label>
                                                                    <div className="col-sm-9">
                                                                        <select
                                                                            className="form-control"
                                                                            value={newUser.status}
                                                                            onChange={(e) => setNewUser({ ...newUser, status: e.target.value === 'true' })}
                                                                            required
                                                                        >
                                                                            <option value={true}>Active</option>
                                                                            <option value={false}>Inactive</option>
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
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default UpdateClient;
