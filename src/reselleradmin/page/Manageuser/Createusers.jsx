import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Sidebar from '../../components/Sidebar';
import Swal from 'sweetalert2';

const CreateUsers = ({ userInfo, handleLogout }) => {
    const [newUser, setNewUser] = useState({
        username: '',
        phone_no: '',
        email_id: '',
        role_id: '',
        
        password: '',
        role_name: '', // New field for Role name
        client_name: '', // New field for Client name
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [userRoles, setUserRoles] = useState([]);
    const [clientNames, setClientNames] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchUserRoles();
        fetchClientNames();
    }, []);

    const fetchUserRoles = async () => {
        try {
            const response = await axios.get('/reselleradmin/FetchSpecificUserRoleForSelection');
            if (response.data.status === 'Success') {
                setUserRoles(response.data.data); // Set userRoles state to the array of roles
            } else {
                console.error('Failed to fetch user roles:', response.data.message);
            }
        } catch (error) {
            console.error('Error fetching user roles:', error);
        }
    };

    const fetchClientNames = async () => {
        try {
            const response = await axios.get('/reselleradmin/FetchClientForSelection');
            if (response.data.status === 'Success') {
                setClientNames(response.data.data); // Set clientNames state to the array of clients
            } else {
                console.error('Failed to fetch client names:', response.data.message);
            }
        } catch (error) {
            console.error('Error fetching client names:', error);
        }
    };

    const createUser = async (e) => {
        e.preventDefault();
        try {
            // Find the role_id based on selected role_name
            const selectedRole = userRoles.find(role => role.role_name === newUser.role_name);
            // Find the client_id based on selected client_name
            const selectedClient = clientNames.find(client => client.client_name === newUser.client_name);

            const formattedUserData = {
                username: newUser.username,
                phone_no: parseInt(newUser.phone_no),
                email_id: newUser.email_id,
                password: parseInt(newUser.password),
                role_id: selectedRole ? selectedRole.role_id : '',
                client_id: selectedClient ? selectedClient.client_id : '',
                
                created_by: userInfo.data.reseller_name,
                reseller_id: userInfo.data.reseller_id,
            };

            await axios.post(`/reselleradmin/CreateUser`, formattedUserData);
            Swal.fire({
                position: "center",
                icon: "success",
                title: "User created successfully",
                showConfirmButton: false,
                timer: 1500
            });
            navigate('/reselleradmin/ManageUsers');
           
        } catch (error) {
            console.error('Error creating user:', error);
            setErrorMessage('Failed to create user. Please try again.');
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
                                        <h3 className="font-weight-bold">Create User</h3>
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
                                                    <h4 className="card-title">Create Users</h4>
                                                    <form className="form-sample" onSubmit={createUser}>
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-3 col-form-label">User Name</label>
                                                                    <div className="col-sm-9">
                                                                        <input
                                                                            type="text"
                                                                            className="form-control"
                                                                            value={newUser.username}
                                                                            onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
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
                                                                            value={newUser.phone_no}
                                                                            onChange={(e) => setNewUser({ ...newUser, phone_no: e.target.value })}
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
                                                                            value={newUser.email_id}
                                                                            onChange={(e) => setNewUser({ ...newUser, email_id: e.target.value })}
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
                                                                            type="password"
                                                                            className="form-control"
                                                                            value={newUser.password}
                                                                            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                                                                            required
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-3 col-form-label">Role Name</label>
                                                                    <div className="col-sm-9">
                                                                        <select
                                                                            className="form-control"
                                                                            value={newUser.role_name}
                                                                            onChange={(e) => setNewUser({ ...newUser, role_name: e.target.value })}
                                                                            required
                                                                        >
                                                                            <option value="">Select Role</option>
                                                                            {userRoles.map(role => (
                                                                                <option key={role.role_id} value={role.role_name}>{role.role_name}</option>
                                                                            ))}
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-3 col-form-label">Client Name</label>
                                                                    <div className="col-sm-9">
                                                                        <select
                                                                            className="form-control"
                                                                            value={newUser.client_name}
                                                                            onChange={(e) => setNewUser({ ...newUser, client_name: e.target.value })}
                                                                            required
                                                                        >
                                                                            <option value="">Select Client</option>
                                                                            {clientNames.map(client => (
                                                                                <option key={client.client_id} value={client.client_name}>{client.client_name}</option>
                                                                            ))}
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            
                                                           
                                                        </div>
                                                        {errorMessage && <div className="text-danger">{errorMessage}</div>}
                                                        <div style={{ textAlign: 'center' }}>
                                                            <button type="submit" className="btn btn-primary mr-2">Create</button>
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

export default CreateUsers;
