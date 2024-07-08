import React, {useState} from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';

const EditManageReseller = ({ userInfo, handleLogout }) => {
    const location = useLocation();
    // Check if location.state and dataItem exist
    const dataItem = location.state?.dataItem;    

    const navigate = useNavigate();
    
    const backManageReseller = () => {
        navigate('/superadmin/ManageReseller');
    };
    
    const [selectStatus, setSelected] = useState(dataItem.status ? 'true' : 'false');

    const handleselection = (e) => {
        setSelected(e.target.value);
        // alert(e.target.value); // Alert the selected value
    };

    // Edit reseller
    const [reseller_name, setResellerName] = useState(dataItem?.reseller_name || '');
    const [reseller_phone_no, setPhoneNumber] = useState(dataItem?.reseller_phone_no || '');
    const [reseller_email_id, setEmailID] = useState(dataItem?.reseller_email_id || '');
    const [reseller_address, setAddress] = useState(dataItem?.reseller_address || '');
    const [errorMessage, setErrorMessage] = useState('');

    const editManageReseller = async (e) => {
        e.preventDefault();
         // Validate phone number
         const phoneRegex = /^\d{10}$/;
         if (!reseller_phone_no) {
             setErrorMessage("Phone can't be empty.");
             return;
         }
         if (!phoneRegex.test(reseller_phone_no)) {
             setErrorMessage('Oops! Phone must be a 10-digit number.');
             return;
         }
        try {
            const resellerPhoneNo = parseInt(reseller_phone_no);
            const resellerID = parseInt(dataItem.reseller_id);
            const Status = Boolean(selectStatus);
            const response = await fetch('/superadmin/UpdateReseller', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ reseller_id: resellerID, reseller_name, reseller_phone_no: resellerPhoneNo, reseller_address, status: Status, modified_by: userInfo.data.username }),
            });
            if (response.ok) {
                Swal.fire({
                    title: "Reseller updated successfully",
                    icon: "success"
                });
                setResellerName('');
                setPhoneNumber('');
                setEmailID('');
                setAddress('');
                backManageReseller();
            } else {
                Swal.fire({
                    title: "Error",
                    text: "Failed to update reseller",
                    icon: "error"
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Error:", error,
                text: "An error occurred while updating the reseller",
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
                                                                        <input type="text" className="form-control" placeholder="Reseller Name" value={reseller_name}  onChange={(e) => setResellerName(e.target.value)} required/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-3 col-form-label">Phone Number</label>
                                                                    <div className="col-sm-9">
                                                                        <input type="text" className="form-control" placeholder="Phone Number" value={reseller_phone_no} onChange={(e) => setPhoneNumber(e.target.value)} required/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-3 col-form-label">Email ID</label>
                                                                    <div className="col-sm-9">
                                                                        <input type="email" className="form-control" placeholder="Email ID" value={reseller_email_id}  onChange={(e) => setEmailID(e.target.value)} readOnly required/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-3 col-form-label">Address</label>
                                                                    <div className="col-sm-9">
                                                                        <textarea type="text" className="form-control" placeholder="Address" value={reseller_address} maxLength={150} onChange={(e) => setAddress(e.target.value)} required/>
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
                 
export default EditManageReseller