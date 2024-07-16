import React, {useState, useEffect, useRef} from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const ManageDevice = ({ userInfo, handleLogout }) => {    
    const navigate = useNavigate();

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filteredData] = useState([]);
    const [posts, setPosts] = useState([]);
    const [updateTrigger, setUpdateTrigger] = useState(false);
    const fetchMangeCalled = useRef(false);
    
    // View manage device
    const handleViewManageDevice = (dataItem) => {
        navigate('/associationadmin/ViewManageDevice', { state: { dataItem } });
    };
    
    // Get Allocated charger data
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch('/associationadmin/FetchAllocatedChargerByClientToAssociation', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ association_id: userInfo.data.association_id }),
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log('Response datasss:', data); 
                    setData(data.data);
                    setLoading(false);
                } else {
                    setError('Failed to fetch profile');
                    console.error('Failed to fetch profile:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Error fetching data. Please try again.');
                setLoading(false);
            }
        };

        if (!fetchMangeCalled.current && userInfo && userInfo.data && userInfo.data.user_id) {
            fetchProfile();
            fetchMangeCalled.current = true;
        }
    }, [userInfo, updateTrigger]);
   

    // Search data 
    const handleSearchInputChange = (e) => {
        const inputValue = e.target.value.toUpperCase();
        if (Array.isArray(data)) {
            const filteredData = data.filter((item) =>
                item.charger_id.toUpperCase().includes(inputValue)
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

    // DeActive
    const changeDeActivate = async (e, charger_id) => {
        e.preventDefault();
        try {
            const response = await fetch('/associationadmin/DeActivateOrActivateCharger', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ charger_id, status:false, modified_by: userInfo.data.association_name }),
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

    // Active
    const changeActivate = async (e, charger_id) => {
        e.preventDefault();
        try {
            const response = await fetch('/associationadmin/DeActivateOrActivateCharger', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ charger_id, status:true, modified_by: userInfo.data.association_name }),
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
                                        <h3 className="font-weight-bold">Manage Device</h3>
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
                                                        <h4 className="card-title" style={{paddingTop:'10px'}}>List Of Chargers</h4>  
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
                                        <div className="table-responsive" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                            <table className="table table-striped">
                                                <thead style={{ textAlign: 'center', position: 'sticky', tableLayout: 'fixed', top: 0, backgroundColor: 'white', zIndex: 1 }}>
                                                    <tr> 
                                                        <th>Sl.No</th>
                                                        <th>Charger ID</th>
                                                        <th>Model</th>
                                                        <th>Charger Type</th>
                                                        <th>Gun Connetor</th>
                                                        <th>Max Current</th>
                                                        <th>Status</th>
                                                        <th>Active/DeActive</th>
                                                        <th>Option</th>
                                                    </tr>
                                                </thead>
                                                <tbody style={{textAlign:'center'}}>
                                                    {loading ? (
                                                        <tr>
                                                        <td colSpan="9" style={{ marginTop: '50px', textAlign: 'center' }}>Loading...</td>
                                                        </tr>
                                                    ) : error ? (
                                                        <tr>
                                                        <td colSpan="9" style={{ marginTop: '50px', textAlign: 'center' }}>Error: {error}</td>
                                                        </tr>
                                                    ) : (
                                                        Array.isArray(posts) && posts.length > 0 ? (
                                                            posts.map((dataItem, index) => (
                                                            <tr key={index}>
                                                                <td>{index + 1}</td>
                                                                <td>{dataItem.charger_id ? dataItem.charger_id : '-'}</td>
                                                                <td>{dataItem.model ? dataItem.model : '-'}</td>
                                                                <td>{dataItem.type ?  dataItem.type : '-'}</td>
                                                                <td>{dataItem.gun_connector ? dataItem.gun_connector : '-'}</td>
                                                                <td>{dataItem.max_current ? dataItem.max_current : '-'}</td>
                                                                <td>{dataItem.status===true ? <span className="text-success">Active</span> : <span className="text-danger">DeActive</span>}</td>
                                                                <td>
                                                                    <div className='form-group' style={{paddingTop:'13px'}}> 
                                                                        {dataItem.status===true ?
                                                                            <div className="form-check form-check-danger">
                                                                                <label className="form-check-label"><input type="radio" className="form-check-input" name="optionsRadios1" id="optionsRadios2" value={false} onClick={(e) => changeDeActivate(e, dataItem.charger_id)}/>DeActive<i className="input-helper"></i></label>
                                                                            </div>
                                                                        :
                                                                            <div className="form-check form-check-success">
                                                                                <label className="form-check-label"><input type="radio" className="form-check-input" name="optionsRadios1" id="optionsRadios1" value={true} onClick={(e) => changeActivate(e, dataItem.charger_id)}/>Active<i className="input-helper"></i></label>
                                                                            </div>
                                                                        }
                                                                    </div>
                                                                </td>  
                                                                <td>
                                                                    <button type="button" className="btn btn-outline-success btn-icon-text"  onClick={() => handleViewManageDevice(dataItem)} style={{marginBottom:'10px', marginRight:'10px'}}><i className="mdi mdi-eye"></i>View</button> 
                                                                </td>   
                                                            </tr>
                                                        ))
                                                        ) : (
                                                        <tr>
                                                            <td colSpan="9" style={{ marginTop: '50px', textAlign: 'center' }}>No devices found</td>
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
    );
};  
                 
export default ManageDevice