import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Profile = ({ userInfo, handleLogout }) => {
    const navigate = useNavigate();
    const [resellerDetails, setResellerDetails] = useState({
        username: '',
        email: '',
        phoneNo: '',
        address:'',
    });
    const [userDetails, setUserDetails] = useState({
        username: '',
        email: '',
        phoneNo: '',
        pass:'',
    });

    // Define fetchResellerUserDetails using useCallback to memoize it
    const fetchResellerUserDetails = useCallback(async () => {
        try {
            const response = await axios.post('/reselleradmin/FetchUserProfile', {
                user_id: userInfo.data.user_id,
            });
            const resedeta = response.data.data;

            if (resedeta.reseller_details && resedeta.reseller_details.length > 0) {
                const reseller = resedeta.reseller_details[0];
                setResellerDetails({
                    username: reseller.reseller_name,
                    email: reseller.reseller_email_id,
                    phoneNo: reseller.reseller_phone_no,
                    address: reseller.reseller_address
                });
            }

            setUserDetails({
                username: resedeta.username,
                email: resedeta.email_id,
                phoneNo: resedeta.phone_no,
                pass: resedeta.password,
            });

        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    }, [userInfo.data.user_id]); // Memoize fetchResellerUserDetails with userInfo.data.user_id

    useEffect(() => {
        fetchResellerUserDetails();
    }, [fetchResellerUserDetails]); // Include fetchResellerUserDetails in the dependency array

    const handleUserFormSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/reselleradmin/UpdateUserProfile', {
                user_id: userInfo.data.user_id,
                username: userDetails.username,
                phone_no: parseInt(userDetails.phoneNo),
                password: userDetails.pass
            });

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

    const handleResellerFormSubmit = async (e) => {
        e.preventDefault();
        try {
             await axios.post('/reselleradmin/UpdateResellerProfile', {
                reseller_id: userInfo.data.reseller_id,
                modified_by: resellerDetails.username,
                reseller_phone_no: parseInt(resellerDetails.phoneNo),
                reseller_address: resellerDetails.address,
            });

            // Show success message
            Swal.fire({
                title: 'Success!',
                text: 'Reseller profile updated successfully.',
                icon: 'success',
                confirmButtonText: 'OK'
            });

        } catch (error) {
            console.error('Error updating reseller profile:', error);

            // Show error message
            Swal.fire({
                title: 'Error!',
                text: 'An error occurred while updating reseller profile. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK'
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
                                        <form className="forms-sample" onSubmit={handleResellerFormSubmit}>
                                            <div className="form-group" style={{ display: 'flex', justifyContent: 'center' }}>
                                                <h3>RESELLER DETAILS</h3>
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="exampleInputUsername1">Reseller Name</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="exampleInputUsername1"
                                                    placeholder="Username"
                                                    value={resellerDetails.username}
                                                    onChange={(e) => setResellerDetails({ ...resellerDetails, username: e.target.value })}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">Email address</label>
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    id="exampleInputEmail1"
                                                    placeholder="Email"
                                                    value={resellerDetails.email}
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
                                                    value={resellerDetails.phoneNo}
                                                    onChange={(e) => setResellerDetails({ ...resellerDetails, phoneNo: e.target.value })}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="address"> Address</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="address"
                                                    placeholder="Address"
                                                    value={resellerDetails.address}
                                                    onChange={(e) => setResellerDetails({ ...resellerDetails, address: e.target.value })}
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
                    {/* Footer */}
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default Profile;
