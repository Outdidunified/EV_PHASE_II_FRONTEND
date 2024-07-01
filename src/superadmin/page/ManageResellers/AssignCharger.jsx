import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import { useNavigate, useLocation } from 'react-router-dom';

const AssignCharger = ({ userInfo, handleLogout }) => {
    const location = useLocation();
    const dataItem = location.state?.dataItem;

    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchAssignedClients = async () => {
            try {
                const response = await fetch('/superadmin/FetchChargerDetailsWithSession', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ reseller_id: dataItem.reseller_id }),
                });
                if (response.ok) {
                    const data = await response.json();
                    // console.log(data);
                    setData(data.data);
                    setPosts(data.data);
                } else {
                    console.error('Failed to fetch assigned chargers');
                }
            } catch (error) {
                console.error('An error occurred while fetching assigned chargers');
                console.error('Error:', error);
            }
        };
        if (dataItem?.reseller_id) {
            fetchAssignedClients();
        } else {
            console.error('Reseller ID not found in dataItem');
        }
    }, [dataItem?.reseller_id]);

    const navigate = useNavigate();

    const backManageReseller = () => {
        navigate('/superadmin/ManageReseller');
    };

    const handleSessionHistory = (dataItem, sessiondata) => {
        navigate('/superadmin/SessignHistory', { state: { dataItem, sessiondata } });
    };

    const handleSearchInputChange = (e) => {
        const inputValue = e.target.value.toUpperCase();
        if (Array.isArray(data)) {
            const filteredData = data.filter((item) =>
                item.chargerID.toUpperCase().includes(inputValue)
            );
            setFilteredData('');
            setPosts(filteredData);
        }
    };

    useEffect(() => {
        if (filteredData.length > 0) {
            setPosts(filteredData);
        } else {
            setPosts(data);
        }
    }, [data, filteredData]);

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
                                        <h3 className="font-weight-bold">Assign Chargers</h3>
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
                                        <div className="table-responsive">
                                            <table className="table table-striped">
                                                <thead style={{textAlign:'center'}}>
                                                    <tr> 
                                                        <th>Sl.No</th>
                                                        <th>Charger ID</th>
                                                        <th>Status</th>
                                                        <th>Option</th>
                                                    </tr>
                                                </thead>
                                                <tbody style={{textAlign:'center'}}>
                                                    {posts.length > 0 ? (
                                                        posts.map((post, index) => (
                                                            <tr key={index}>
                                                                <td>{index + 1}</td>
                                                                <td>{post.chargerID}</td>
                                                                <td>{post.status === true ? 'Active' : 'Deactive'}</td>
                                                                <td>
                                                                    <button type="button" className="btn btn-outline-success btn-icon-text" onClick={() => handleSessionHistory(dataItem, post.sessiondata)} style={{marginBottom:'10px', marginRight:'10px'}}>
                                                                        <i className="mdi mdi-eye"></i> Session History
                                                                    </button> 
                                                                </td>
                                                            </tr>
                                                        ))
                                                    ) : (
                                                        <tr>
                                                            <td colSpan="4" style={{ marginTop: '50px', textAlign: 'center' }}>No assigned chargers found</td>
                                                        </tr>
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
}

export default AssignCharger;
