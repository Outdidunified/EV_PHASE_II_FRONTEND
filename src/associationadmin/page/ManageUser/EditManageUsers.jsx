import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import Swal from 'sweetalert2';

const EditManageUsers = ({ userInfo, handleLogout }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const [editUser, setEditUser] = useState({
        username: '', email_id: '', password: '', phone_no: '', user_id: '', status: '',
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [selectStatus, setSelectedStatus] = useState(editUser.status ? 'true' : 'false');

    // User data
    useEffect(() => {
        const { dataItem } = location.state || {};
        if (dataItem) {
            setEditUser({
                username: dataItem.username || '', email_id: dataItem.email_id || '', password: dataItem.password || '', phone_no: dataItem.phone_no || '', user_id: dataItem.user_id || '', status: dataItem.status || '',
            });
            setSelectedStatus(dataItem.status ? 'true' : 'false');
            localStorage.setItem('editUserData', JSON.stringify(dataItem));
        } else {
            const savedData = JSON.parse(localStorage.getItem('editUserData'));
            if (savedData) {
                setEditUser(savedData);
                setSelectedStatus(savedData.status ? 'true' : 'false');
            }
        }
    }, [location]);

    /// Selected status
    const handleStatusChange = (e) => {
        setSelectedStatus(e.target.value);
    };

    // Back Manage user page 
    const backManageUser = () => {
        navigate('/associationadmin/ManageUsers');
    };

    // Update manage user
    const editManageUser = async (e) => {
        e.preventDefault();

        const phoneRegex = /^\d{10}$/;
        if (!editUser.phone_no || !phoneRegex.test(editUser.phone_no)) {
            setErrorMessage('Phone number must be a 10-digit number.');
            return;
        }

        const passwordRegex = /^\d{4}$/;
        if (!editUser.password || !passwordRegex.test(editUser.password)) {
            setErrorMessage('Password must be a 4-digit number.');
            return;
        }

        try {
            const updatedUser = {
                user_id: editUser.user_id,
                username: editUser.username,
                phone_no: parseInt(editUser.phone_no),
                password: parseInt(editUser.password),
                status: selectStatus === 'true',
                wallet_bal: parseInt(editUser.wallet_bal),
                modified_by: userInfo.data.association_name,
            };
            const response = await fetch('/associationadmin/UpdateUser', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedUser),
            });

            if (response.ok) {
                Swal.fire({
                    title: 'User updated successfully',
                    icon: 'success',
                });
                backManageUser();
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'Failed to update user',
                    icon: 'error',
                });
            }
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'An error occurred while updating the user',
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
                                        <h3 className="font-weight-bold">Edit User List</h3>
                                    </div>
                                    <div className="col-12 col-xl-4">
                                        <div className="justify-content-end d-flex">
                                            <button type="button" className="btn btn-success" onClick={backManageUser}>
                                                Back
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
                                                    <h4 className="card-title">Manage User</h4>
                                                    <form className="form-sample" onSubmit={editManageUser}>
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-3 col-form-label">User Name</label>
                                                                    <div className="col-sm-9">
                                                                        <input type="text" className="form-control" value={editUser.username} onChange={(e) => setEditUser({ ...editUser, username: e.target.value })} required/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-3 col-form-label">Phone Number</label>
                                                                    <div className="col-sm-9">
                                                                        <input type="text" className="form-control" value={editUser.phone_no} onChange={(e) => setEditUser({ ...editUser, phone_no: e.target.value })} required/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-3 col-form-label">Email ID</label>
                                                                    <div className="col-sm-9">
                                                                        <input type="email" className="form-control" value={editUser.email_id} readOnly required/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-3 col-form-label">Password</label>
                                                                    <div className="col-sm-9">
                                                                        <input type="text" className="form-control" value={editUser.password} onChange={(e) => setEditUser({ ...editUser, password: e.target.value })} required />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-3 col-form-label">Status</label>
                                                                    <div className="col-sm-9">
                                                                        <select className="form-control" value={selectStatus} onChange={handleStatusChange}  required >
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

export default EditManageUsers;
