import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import Swal from 'sweetalert2';

const EditUserList = ({ userInfo, handleLogout }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const dataItem = location.state?.newUser || JSON.parse(localStorage.getItem('editDeviceData'));
    localStorage.setItem('editDeviceData', JSON.stringify(dataItem));

    // Edit manage device
    const [username, setUsername] = useState(dataItem?.username || '');
    const [email_id, setEmailId] = useState(dataItem?.email_id || '');
    const [passwords, setPassword] = useState(dataItem?.password || '');
    const [phone_no, setPhoneNo] = useState(dataItem?.phone_no || '');
    const [wallet_bal, setWalletBal] = useState(dataItem?.wallet_bal || '');
    const [errorMessage, setErrorMessage] = useState('');
    const [selectStatus, setSelectStatus] = useState(dataItem?.status ? 'true' : 'false');

    // Select status
    const handleStatusChange = (e) => {
        setSelectStatus(e.target.value);
    };

    // Back view manage user
    const backManageDevice = () => {
        navigate('/superadmin/ViewUserList');
    };

    // Back view manage user
    const editBackManageDevice = () => {
        navigate('/superadmin/ManageUsers');
    };

    // Update manage user
    const editManageUser = async (e) => {
        e.preventDefault();
    
        // Validate phone number
        const phoneRegex = /^\d{10}$/;
        if (!phone_no || !phoneRegex.test(phone_no)) {
            setErrorMessage('Phone number must be a 10-digit number.');
            return;
        }
    
        // Validate password
        if (passwords) {
            const passwordRegex = /^\d{4}$/;
            if (!passwordRegex.test(passwords)) {
                setErrorMessage('Password must be a 4-digit number.');
                return;
            }
        }
    
        try {
            const response = await fetch('/superadmin/UpdateUser', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_id: dataItem?.user_id,
                    username: username,
                    phone_no: phone_no,
                    password: passwords,
                    status: selectStatus === 'true',
                    wallet_bal: parseInt(wallet_bal),
                    modified_by: userInfo.data.username}),
            });
    
            if (response.ok) {
                Swal.fire({
                    title: 'User updated successfully',
                    icon: 'success',
                });
                editBackManageDevice();
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
                                                    <h4 className="card-title">Manage User</h4>
                                                    <form className="form-sample" onSubmit={editManageUser}>
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-3 col-form-label">User Name</label>
                                                                    <div className="col-sm-9">
                                                                        <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} required />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-3 col-form-label">Phone Number</label>
                                                                    <div className="col-sm-9">
                                                                        <input
                                                                            type="text"
                                                                            className="form-control"
                                                                            value={phone_no}
                                                                            onChange={(e) => setPhoneNo(e.target.value)}
                                                                            required
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-3 col-form-label">Email ID</label>
                                                                    <div className="col-sm-9">
                                                                        <input
                                                                            type="email"
                                                                            className="form-control"
                                                                            value={email_id}
                                                                            onChange={(e) => setEmailId(e.target.value)}
                                                                            readOnly
                                                                            required
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-3 col-form-label">Password</label>
                                                                    <div className="col-sm-9">
                                                                        <input
                                                                            type="text"
                                                                            className="form-control"
                                                                            value={passwords}
                                                                            onChange={(e) => setPassword(e.target.value)}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-3 col-form-label">Wallet</label>
                                                                    <div className="col-sm-9">
                                                                        <input
                                                                            type="text"
                                                                            className="form-control"
                                                                            value={wallet_bal}
                                                                            onChange={(e) => setWalletBal(e.target.value)}
                                                                            required
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-3 col-form-label">Status</label>
                                                                    <div className="col-sm-9">
                                                                        <select className="form-control" value={selectStatus} onChange={handleStatusChange} required>
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

export default EditUserList;
