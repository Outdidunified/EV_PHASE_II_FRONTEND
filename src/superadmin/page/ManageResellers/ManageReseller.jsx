import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const ManageReseller = ({ userInfo, handleLogout }) => { 
    const navigate = useNavigate();
    
    const handleAddReseller = () => {
        navigate('/superadmin/AddManageReseller');
    };

    const handleViewReseller = (dataItem) => {
        navigate('/superadmin/ViewManageReseller', { state: { dataItem } });
    };

    const handleEditReseller = (dataItem) => {
        navigate('/superadmin/EditManageReseller', { state: { dataItem } });
    };

    const handleAssignClient = (dataItem) => {
        navigate('/superadmin/AssignClient', { state: { dataItem } });
    };

    const handleAssignCharger = (dataItem) => {
        navigate('/superadmin/AssignCharger', { state: { dataItem } });
    };

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filteredData] = useState([]);
    const [posts, setPosts] = useState([]);
    const [updateTrigger, setUpdateTrigger] = useState(false);
    //const [errorMessage, setErrorMessage] = useState('');
    const FetchResellersCalled = useRef(false);

    // Get manage reseller data
    useEffect(() => {
        if (!FetchResellersCalled.current) {
            const url = `/superadmin/FetchResellers`;
            axios.get(url).then((res) => {
                setData(res.data.data); 
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching data:', err);
                setError('Error fetching data. Please try again.');
                setLoading(false);
            });
            FetchResellersCalled.current = true;
        }
    },  [updateTrigger]);

    // Search data 
    const handleSearchInputChange = (e) => {
        const inputValue = e.target.value.toUpperCase();
        if (Array.isArray(data)) {
            const filteredData = data.filter((item) =>
                item.reseller_name.toUpperCase().includes(inputValue)
            );
            setPosts(filteredData);
        }
    };

    // Update table data 'data', and 'filteredData' 
    useEffect(() => {
        switch (data) {
            case 'filteredData':
                setPosts(filteredData);
                break;
            default:
                setPosts(data);
                break;
        }
    }, [data, filteredData]);

    // Timestamp data 
    function formatTimestamp(originalTimestamp) {
        const date = new Date(originalTimestamp);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        
        let hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        hours = String(hours).padStart(2, '0');
    
        const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds} ${ampm}`;
        return formattedDate;
    } 

    const changeDeActivate = async (e, reseller_id) => {
        e.preventDefault();
        try {
            const response = await fetch('/superadmin/DeActivateOrActivateReseller', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ reseller_id, status:false, modified_by: userInfo.data.username }),
            });
            if (response.ok) {
                Swal.fire({
                    title: "DeActivate successfully",
                    icon: "success"
                });
                setUpdateTrigger((prev) => !prev);
            } else {
                Swal.fire({
                    title: "Error",
                    text: "Failed to DeActivate",
                    icon: "error"
                });
            }
        }catch (error) {
            Swal.fire({
                title: "Error:", error,
                text: "An error occurred while updating user status.",
                icon: "error"
            });
        }
    };

    const changeActivate = async (e, reseller_id) => {
        e.preventDefault();
        try {
            const response = await fetch('/superadmin/DeActivateOrActivateReseller', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ reseller_id, status:true, modified_by: userInfo.data.username }),
            });
            if (response.ok) {
                Swal.fire({
                    title: "Activate successfully",
                    icon: "success"
                });
                setUpdateTrigger((prev) => !prev);
            } else {
                Swal.fire({
                    title: "Error",
                    text: "Failed to Activate",
                    icon: "error"
                });
            }
        }catch (error) {
            Swal.fire({
                title: "Error:", error,
                text: "An error occurred while updating user status.",
                icon: "error"
            });
        }
    };

    return (
        <div className='container-scroller'>
            {/* Header */}
            <Header userInfo={userInfo} handleLogout={handleLogout} />
            <div className="container-fluid page-body-wrapper">
                {/* Sidebar */}
                <Sidebar/>
                <div className="main-panel">
                    <div className="content-wrapper">
                        <div className="row">
                            <div className="col-md-12 grid-margin">
                                <div className="row">
                                    <div className="col-12 col-xl-8 mb-4 mb-xl-0">
                                        <h3 className="font-weight-bold">Manage Reseller</h3>
                                    </div>
                                    <div className="col-12 col-xl-4">
                                        <div className="justify-content-end d-flex">
                                            <button type="button" className="btn btn-success" onClick={handleAddReseller}>Create</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12 grid-margin stretch-card">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-md-12 grid-margin">
                                                <div className="row">
                                                    <div className="col-4 col-xl-8">
                                                        <h4 className="card-title" style={{paddingTop:'10px'}}>List Of Reseller</h4>  
                                                    </div>
                                                    <div className="col-8 col-xl-4">
                                                        <div className="input-group">
                                                            <div className="input-group-prepend hover-cursor" id="navbar-search-icon">
                                                                <span className="input-group-text" id="search">
                                                                <i className="icon-search"></i>
                                                                </span>
                                                            </div>
                                                            <input type="text" className="form-control" placeholder="Search now" aria-label="search" aria-describedby="search" autoComplete="off" onChange={handleSearchInputChange}/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="table-responsive">
                                            <table className="table table-striped">
                                                <thead style={{textAlign:'center'}}>
                                                    <tr> 
                                                        <th>Sl.No</th>
                                                        <th>Reseller Name</th>
                                                        <th>Phone Number</th>
                                                        <th>Emial ID</th>
                                                        <th>Address</th>
                                                        <th>Created Date</th>
                                                        <th>Modified Date</th>
                                                        <th>Statussss</th>
                                                        <th>Active/DeActive</th>
                                                        <th>Option</th>
                                                        <th>Assign Client</th>
                                                        <th>Assign Charger</th>
                                                    </tr>
                                                </thead>
                                                <tbody style={{textAlign:'center'}}>
                                                    {loading ? (
                                                        <tr>
                                                            <td colSpan="12" style={{ marginTop: '50px', textAlign: 'center' }}>Loading...</td>
                                                        </tr>
                                                    ) : error ? (
                                                        <tr>
                                                            <td colSpan="12" style={{ marginTop: '50px', textAlign: 'center' }}>Error: {error}</td>
                                                        </tr>
                                                    ) : (
                                                        Array.isArray(posts) && posts.length > 0 ? (
                                                            posts.map((dataItem, index) => (
                                                            <tr key={index}>
                                                                <td>{index + 1}</td>
                                                                <td>{dataItem.reseller_name}</td>
                                                                <td>{dataItem.reseller_phone_no}</td>
                                                                <td>{dataItem.reseller_email_id}</td>
                                                                <td>{dataItem.reseller_address}</td>
                                                                <td>{formatTimestamp(dataItem.created_date)}</td>
                                                                <td>{formatTimestamp(dataItem.modified_date)}</td>
                                                                <td>{dataItem.status===true ? <span className="text-success">Active</span> : <span className="text-danger">DeActive</span>}</td>
                                                                <td>
                                                                    <div className='form-group' style={{paddingTop:'13px'}}> 
                                                                        {dataItem.status===true ?
                                                                            <div className="form-check form-check-danger">
                                                                                <label className="form-check-label"><input type="radio" className="form-check-input" name="optionsRadios1" id="optionsRadios2" value={false} onClick={(e) => changeDeActivate(e, dataItem.reseller_id)}/>DeActive<i className="input-helper"></i></label>
                                                                            </div>
                                                                        :
                                                                            <div className="form-check form-check-success">
                                                                                <label className="form-check-label"><input type="radio" className="form-check-input" name="optionsRadios1" id="optionsRadios1" value={true} onClick={(e) => changeActivate(e, dataItem.reseller_id)}/>Active<i className="input-helper"></i></label>
                                                                            </div>
                                                                        }
                                                                    </div>
                                                                </td>     
                                                                <td>
                                                                    <button type="button" className="btn btn-outline-success btn-icon-text" onClick={() => handleViewReseller(dataItem)} style={{marginBottom:'10px', marginRight:'10px'}}><i className="mdi mdi-eye"></i>View</button> 
                                                                    <button type="button" className="btn btn-outline-primary btn-icon-text" onClick={() => handleEditReseller(dataItem)} style={{marginBottom:'10px', marginRight:'10px'}}><i className="mdi mdi-pencil btn-icon-prepend"></i>Edit</button><br/>
                                                                </td>
                                                                <td style={{textAlign:'center'}}>
                                                                    <button type="button" className="btn btn-outline-warning btn-icon-text" onClick={() => handleAssignClient(dataItem)}><i className="ti-file btn-icon-prepend"></i>Client</button><br/>
                                                                </td>
                                                                <td style={{textAlign:'center'}}>
                                                                    <button type="button" className="btn btn-outline-warning btn-icon-text" onClick={() => handleAssignCharger(dataItem)}><i className="ti-file btn-icon-prepend"></i>Charger</button> 
                                                                </td>
                                                            </tr>
                                                        ))
                                                        ) : (
                                                        <tr>
                                                            <td colSpan="12" style={{ marginTop: '50px', textAlign: 'center' }}>No devices found</td>
                                                        </tr>
                                                        )
                                                    )}
                                                </tbody>
                                            </table>
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
    )
}   
                 
export default ManageReseller