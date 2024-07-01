import React, { useState, useEffect} from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import Swal from 'sweetalert2';

const Profile = ({ userInfo, handleLogout }) => {
    const [data, setPosts] = useState({});
    const [username, setUserUname] = useState('');
    const [email_id, setUserEmail] = useState('');
    const [phone_no, setUserPhone] = useState('');
    const [password, setUserPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [dataAss, setPostsAss] = useState({});
    const [association_name, setUpdateUname] = useState('');
    const [association_email_id, setUpdateEmail] = useState('');
    const [association_phone_no, setUpdatePhone] = useState('');
    const [association_address, setUpdateAddress] = useState('');

    // get profile data
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch('/associationadmin/FetchUserProfile', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ user_id: userInfo.data.user_id }),
                });

                if (response.ok) {
                    const data = await response.json();
                    setPosts(data.data);
                     // Assuming `association_details` is an array with one object
                     const associationDetails = data.data.association_details[0] || {};
                     setPostsAss(associationDetails);
                } else {
                    setErrorMessage('Failed to fetch profile');
                    console.error('Failed to fetch profile:', response.statusText);
                }
            } catch (error) {
                setErrorMessage('An error occurred while fetching the profile');
                console.error('Error:', error);
            }
        };

        if (userInfo.data.user_id) {
            fetchProfile();
        } else {
            console.error('User ID not found in userInfo');
        }
    }, [userInfo.data.user_id]);
   
    // Association profile
    useEffect(() => {
        if (dataAss) {
            setUpdateUname(dataAss.association_name || '');
            setUpdateEmail(dataAss.association_email_id || '');
            setUpdatePhone(dataAss.association_phone_no || '');
            setUpdateAddress(dataAss.association_address || '');
        }
    }, [dataAss]);

    const addAssProfileUpdate = async (e) => {
        e.preventDefault();
        try {
            const phoneNos = parseInt(association_phone_no);
            const response = await fetch('/associationadmin/UpdateAssociationProfile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ association_id: userInfo.data.association_id, association_address, association_phone_no: phoneNos, modified_by: userInfo.data.association_name}),});
            if (response.ok) {
                Swal.fire({
                    title: "User profile updated successfully",
                    icon: "success"
                });               
            } else {
                Swal.fire({
                    title: "Error",
                    text: "Failed to update user profile",
                    icon: "error"
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Error:", error,
                text: "An error occurred while updating the user profile",
                icon: "error"
            });
        }
    };

   // User profile update
    useEffect(() => {
        if (data) {
            setUserUname(data.username || '');
            setUserEmail(data.email_id || '');
            setUserPhone(data.phone_no || '');
            setUserPassword(data.password || '');
        }
    }, [data]);

    const addUserProfileUpdate = async (e) => {
        e.preventDefault();
        try {
            const phoneNo = parseInt(phone_no);
            const Password = parseInt(password);
            const response = await fetch('/associationadmin/UpdateUserProfile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user_id: userInfo.data.user_id, username, phone_no: phoneNo, password: Password}),});
            if (response.ok) {
                Swal.fire({
                    title: "User profile updated successfully",
                    icon: "success"
                });               
            } else {
                Swal.fire({
                    title: "Error",
                    text: "Failed to update user profile",
                    icon: "error"
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Error:", error,
                text: "An error occurred while updating the user profile",
                icon: "error"
            });
        }
    };
    
    return (
        <div className='container-scroller'>
            {/* Header */}
            <Header userInfo={userInfo} handleLogout={handleLogout}/>
            <div className="container-fluid page-body-wrapper">
                {/* Sidebar */}
                <Sidebar/>
                <div className="main-panel">
                    <div className="content-wrapper">
                        <div className="row">
                            <div className="col-md-12 grid-margin">
                                <div className="row">
                                    <div className="col-12 col-xl-8 mb-4 mb-xl-0">
                                        <h3 className="font-weight-bold">Profile</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 grid-margin stretch-card">
                                <div className="card">
                                    <div className="card-body">
                                        <div style={{textAlign:'center'}}>
                                            <h4 className="card-title">Association Profile</h4>
                                        </div> 
                                        <form className="forms-sample" onSubmit={addAssProfileUpdate}>
                                            <div className="form-group">
                                                <label htmlFor="exampleInputUsername1">Username</label>
                                                <input type="text" className="form-control" placeholder="Username" value={association_name} onChange={(e) => setUpdateUname(e.target.value)} required/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">Email address</label>
                                                <input type="email" className="form-control" placeholder="Email" value={association_email_id} onChange={(e) => setUpdateEmail(e.target.value)} readOnly required/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="exampleInputPassword1">Phone Number</label>
                                                <input type="text" className="form-control" placeholder="Phone Number" value={association_phone_no} onChange={(e) => setUpdatePhone(e.target.value)} required/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="exampleInputConfirmPassword1">Address</label>
                                                <textarea type="password" className="form-control" placeholder="Address" value={association_address} onChange={(e) => setUpdateAddress(e.target.value)} required/>
                                            </div>
                                            {errorMessage && <div className="text-danger">{errorMessage}</div>}
                                            <div style={{textAlign:'center'}}>
                                                <button type="submit" className="btn btn-primary mr-2">Update</button>
                                            </div> 
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 grid-margin stretch-card">
                                <div className="card">
                                    <div className="card-body">
                                        <div style={{textAlign:'center'}}>
                                            <h4 className="card-title">User Profile</h4>
                                        </div> 
                                        <form className="forms-sample" onSubmit={addUserProfileUpdate}>
                                            <div className="form-group">
                                                <label htmlFor="exampleInputUsername1">Username</label>
                                                <input type="text" className="form-control" placeholder="Username" value={username} onChange={(e) => setUserUname(e.target.value)} required/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">Email address</label>
                                                <input type="email" className="form-control" placeholder="Email" value={email_id} onChange={(e) => setUserEmail(e.target.value)} readOnly required/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="exampleInputConfirmPassword1">Phone Number</label>
                                                <input type="text" className="form-control" pattern="[0-9]{10}" placeholder="Phone Number" value={phone_no} onChange={(e) => setUserPhone(e.target.value)} required/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="exampleInputPassword1">Password</label>
                                                <input type="text" className="form-control" pattern="[0-9]{4}" placeholder="Password" value={password} onChange={(e) => setUserPassword(e.target.value)} required/>
                                            </div>
                                            {errorMessage && <div className="text-danger">{errorMessage}</div>}
                                            <div style={{textAlign:'center'}}>
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
                 
export default Profile