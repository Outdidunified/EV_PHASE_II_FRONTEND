import React, {useState} from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';

const EditUserList = ({ userInfo, handleLogout }) => {
    const location = useLocation();
    const dataItem = location.state?.dataItem;    

    const navigate = useNavigate();
    
    const backManageDevice = () => {
        navigate('/associationadmin/ManageUsers');
    };
    
    const [selectStatus, setSelected] = useState(dataItem.status ? 'true' : 'false');

    const handleselection = (e) => {
        setSelected(e.target.value);
    };

    // Edit users
    const [username, setUserName] = useState(dataItem?.username || '');
    const [phone_no, setPhoneNumber] = useState(dataItem?.phone_no || '');
    const [email_id, setEmailID] = useState(dataItem?.email_id || '');
    const [password, setPassword] = useState(dataItem?.password || '');

    const editManageUser = async (e) => {
        e.preventDefault();
        try {
            const Password = parseInt(password);
            const PhoneNo = parseInt(phone_no);
            const Status = Boolean(selectStatus);

            const response = await fetch('/associationadmin/UpdateUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_id:dataItem.user_id, username, phone_no:PhoneNo, password:Password, status:Status, modified_by: userInfo.data.association_name }),
            });
            if (response.ok) {
                Swal.fire({
                    title: "Charger added successfully",
                    icon: "success"
                });
                setUserName(''); 
                setPhoneNumber(''); 
                setEmailID(''); 
                setPassword(''); 
                backManageDevice();
            } else {
                Swal.fire({
                    title: "Error",
                    text: "Failed to add charger",
                    icon: "error"
                });
            }
        }catch (error) {
            Swal.fire({
                title: "Error:", error,
                text: "An error occurred while adding the charger",
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
                                                                        <input type="text" className="form-control" placeholder="User Name" value={username}  onChange={(e) => setUserName(e.target.value)} required/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-3 col-form-label">Phone Number</label>
                                                                    <div className="col-sm-9">
                                                                        <input type="text" className="form-control" placeholder="Phone Number" pattern="[0-9]{10}" value={phone_no} onChange={(e) => setPhoneNumber(e.target.value)} required/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-3 col-form-label">Email ID</label>
                                                                    <div className="col-sm-9">
                                                                        <input type="email" className="form-control" placeholder="Email ID" value={email_id}  onChange={(e) => setEmailID(e.target.value)} readOnly required/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-3 col-form-label">Password</label>
                                                                    <div className="col-sm-9">
                                                                        <input type="text" className="form-control" placeholder="Password" value={password} maxLength={150} onChange={(e) => setPassword(e.target.value)} required/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-3 col-form-label">Status</label>
                                                                    <div className="col-sm-9">
                                                                        <div className="input-group">
                                                                            <select className="form-control" value={selectStatus} onChange={handleselection}>
                                                                                {dataItem.status ? (
                                                                                    <>
                                                                                        <option value="true">Active</option>
                                                                                        <option value="false">DeActive</option>
                                                                                    </>
                                                                                ) : (
                                                                                    <>
                                                                                        <option value="false">DeActive</option>
                                                                                        <option value="true">Active</option>
                                                                                    </>
                                                                                )}
                                                                            </select>                                                             
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div style={{textAlign:'center'}}>
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
                 
export default EditUserList