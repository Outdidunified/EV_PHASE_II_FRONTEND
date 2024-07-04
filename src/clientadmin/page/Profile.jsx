import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Profile = ({ userInfo, handleLogout }) => {
    const navigate = useNavigate();
    const [clientDetails, setClientDetails] = useState({
        username: '',
        email: '',
        phoneNo: '',
        address: '',
    });
    const [userDetails, setUserDetails] = useState({
        username: '',
        email: '',
        phoneNo: '',
        pass: '',
    });

    const fetchClientUserDetails = useCallback(async () => {
        try {
            const response = await axios.post('/clientadmin/FetchUserProfile', {
                user_id: userInfo.data.user_id,
            });
            const clientdata = response.data.data;

            if (clientdata.client_details && clientdata.client_details.length > 0) {
                const client = clientdata.client_details[0];
                setClientDetails({
                    username: client.client_name,
                    email: client.client_email_id,
                    phoneNo: client.client_phone_no,
                    address: client.client_address,
                });
            }

            setUserDetails({
                username: clientdata.username,
                email: clientdata.email_id,
                phoneNo: clientdata.phone_no,
                pass: clientdata.password, // Assuming password is not returned in response for security reasons
            });

        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    }, [userInfo.data.user_id]);

    useEffect(() => {
        fetchClientUserDetails();
    }, [fetchClientUserDetails]); // Include fetchClientUserDetails in the dependency array

    const handleUserFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/clientadmin/UpdateUserProfile', {
                user_id: userInfo.data.user_id,
                username: userDetails.username,
                phone_no: parseInt(userDetails.phoneNo),
                password: userDetails.pass,
            });

            console.log('User profile updated successfully:', response.data);

            // Show success message
            Swal.fire({
                title: 'Success!',
                text: 'User profile updated successfully.',
                icon: 'success',
                confirmButtonText: 'OK'
            });

        } catch (error) {
            console.error('Error updating user profile:', error);

            // Show error message
            Swal.fire({
                title: 'Error!',
                text: 'An error occurred while updating user profile. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    const goBack = () => {
        navigate(-1);
    };

    const handleClientFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/clientadmin/UpdateClientProfile', {
                client_id: userInfo.data.reseller_id,
                modified_by: clientDetails.username,
                client_phone_no: parseInt(clientDetails.phoneNo),
                client_address: clientDetails.address,
            });

            console.log('Client profile updated successfully:', response.data);

            // Show success message
            Swal.fire({
                title: 'Success!',
                text: 'Client profile updated successfully.',
                icon: 'success',
                confirmButtonText: 'OK'
            });

        } catch (error) {
            console.error('Error updating client profile:', error);

            // Show error message
            Swal.fire({
                title: 'Error!',
                text: 'An error occurred while updating client profile. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
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
                                        <h3 className="font-weight-bold">Profile</h3>
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
                            <div className="col-lg-6">
                                <div className="card">
                                    <div className="card-body">
                                        <form className="forms-sample" onSubmit={handleClientFormSubmit}>
                                            <div className="form-group" style={{ display: 'flex', justifyContent: 'center' }}>
                                                <h3>CLIENT DETAILS</h3>
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="exampleInputUsername1">Client name</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="exampleInputUsername1"
                                                    placeholder="Username"
                                                    value={clientDetails.username}
                                                    onChange={(e) => setClientDetails({ ...clientDetails, username: e.target.value })}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">Email address</label>
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    id="exampleInputEmail1"
                                                    placeholder="Email"
                                                    value={clientDetails.email}
                                                    readOnly
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="exampleInputPhoneNo1">Phone Number</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="exampleInputPhoneNo1"
                                                    placeholder="Phone Number"
                                                    value={clientDetails.phoneNo}
                                                    onChange={(e) => setClientDetails({ ...clientDetails, phoneNo: e.target.value })}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="address">Address</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="address"
                                                    placeholder="Address"
                                                    value={clientDetails.address}
                                                    onChange={(e) => setClientDetails({ ...clientDetails, address: e.target.value })}
                                                />
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                <button type="submit" className="btn btn-primary mr-2">Update</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="card">
                                    <div className="card-body">
                                        <form className="forms-sample" onSubmit={handleUserFormSubmit}>
                                            <div className="form-group" style={{ display: 'flex', justifyContent: 'center' }}>
                                                <h3>USER DETAILS</h3>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="exampleInputUsername2">Username</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="exampleInputUsername2"
                                                    placeholder="Username"
                                                    value={userDetails.username}
                                                    onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail2">Email address</label>
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    id="exampleInputEmail2"
                                                    placeholder="Email"
                                                    value={userDetails.email}
                                                    readOnly
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="exampleInputPhoneNo2">Phone Number</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="exampleInputPhoneNo2"
                                                    placeholder="Phone Number"
                                                    value={userDetails.phoneNo}
                                                    onChange={(e) => setUserDetails({ ...userDetails, phoneNo: e.target.value })}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="exampleInputPassword2">Password</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="exampleInputPassword2"
                                                    placeholder="Password"
                                                    value={userDetails.pass}
                                                    onChange={(e) => setUserDetails({ ...userDetails, pass: e.target.value })}
                                                />
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                <button type="submit" className="btn btn-primary mr-2">Update</button>
                                            </div>
                                        </form>
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

export default Profile;
