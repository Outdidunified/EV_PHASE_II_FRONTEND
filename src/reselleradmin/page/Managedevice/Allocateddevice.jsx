import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';

const Allocateddevice = ({ userInfo, handleLogout }) => {
    const [allocatedChargers, setAllocatedChargers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    // Search function
    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const filterChargers = useCallback((chargers) => {
        return chargers.filter((charger) =>
            charger.charger_id.toString().toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery]);

    // View allocated page
    const navigateToViewChargerDetails = useCallback((charger) => {
        navigate('/reselleradmin/ViewAlloc', { state: { charger } });
    }, [navigate]);

    // Active and deactive charger
    const deactivateCharger = async (chargerId, status) => {
        try {
            const response = await axios.post('/reselleradmin/DeActivateOrActivateCharger', {
                charger_id: chargerId,
                modified_by: userInfo.data.reseller_name,
                status: !status // Toggle status
            });

            if (response.status === 200) {
                // Update the charger status in the state
                setAllocatedChargers(prevChargers =>
                    prevChargers.map(charger =>
                        charger.charger_id === chargerId ? { ...charger, status: !status } : charger
                    )
                );

                Swal.fire({
                    title: status ? "Deactivated!" : "Activated!",
                    icon: "success"
                });

                // Example: Perform an action after 10 seconds
                setTimeout(() => {
                    console.log('Timer finished after 10 seconds');
                    // Your action after 10 seconds, e.g., navigate, update state, or perform another action
                }, 10000); // 10000 milliseconds = 10 seconds
            } else {
                Swal.fire({
                    title: "Error",
                    text: "Failed to update charger status.",
                    icon: "error"
                });
            }
        } catch (error) {
            console.error('Error in updating charger status:', error);
            Swal.fire({
                title: "Error",
                text: "An error occurred while updating charger status.",
                icon: "error"
            });
        }
    };

    const fetchAllocatedChargerDetailsCalled = useRef(false); 

    // Fetch allocated charger details
    const fetchAllocatedChargerDetails = useCallback(async () => {
        try {
            const response = await axios.post('/reselleradmin/FetchAllocatedCharger', {
                reseller_id: userInfo.data.reseller_id,
            });
            console.log(response);

            setAllocatedChargers(response.data.data || []);
        } catch (error) {
            console.error('Error fetching allocated charger details:', error);
            // Handle error appropriately, such as showing an error message to the user
        }
    }, [userInfo.data.reseller_id]);

    useEffect(() => {
        if (!fetchAllocatedChargerDetailsCalled.current) {
            const fetchAllocatedChargers = async () => {
                await fetchAllocatedChargerDetails();
            };

            fetchAllocatedChargers();
            fetchAllocatedChargerDetailsCalled.current = true; // Mark fetchAllocatedChargerDetails as called
        }
    }, [fetchAllocatedChargerDetails]); // Include fetchAllocatedChargerDetails in the dependency array

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
                                        <h3 className="font-weight-bold">Manage Devices - Allocated</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12 grid-margin stretch-card">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-12 col-xl-8">
                                                <h4 className="card-title" style={{ paddingTop: '10px' }}>List Of Devices</h4>
                                            </div>
                                            <div className="col-12 col-xl-4">
                                                <div className="input-group">
                                                    <div className="input-group-prepend hover-cursor" id="navbar-search-icon">
                                                        <span className="input-group-text" id="search">
                                                            <i className="icon-search"></i>
                                                        </span>
                                                    </div>
                                                    <input type="text" className="form-control" placeholder="Search by Charger ID..." value={searchQuery} onChange={handleSearch} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="table-responsive">
                                            <table className="table table-striped">
                                                <thead style={{ textAlign: 'center' }}>
                                                    <tr>
                                                        <th>Sl.No</th>
                                                        <th>Charger Id</th>
                                                        <th>Model</th>
                                                        <th>Type</th>
                                                        <th>Gun Connector</th>
                                                        <th>Max Current</th>
                                                        <th>Assigned Client</th>
                                                        <th>Status</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody style={{ textAlign: 'center' }}>
                                                    {filterChargers(allocatedChargers).length > 0 ? (
                                                        filterChargers(allocatedChargers).map((charger, index) => (
                                                            <tr key={charger.charger_id}>
                                                                <td>{index + 1}</td>
                                                                <td>{charger.charger_id}</td>
                                                                <td>{charger.model}</td>
                                                                <td>{charger.type}</td>
                                                                <td>{charger.gun_connector}</td>
                                                                <td>{charger.max_current}</td>
                                                                <td>{charger.client_name}</td>
                                                                <td style={{ color: charger.status ? 'green' : 'red' }}>{charger.status ? 'Active' : 'Inactive'}</td>
                                                                <td>
                                                                    <button type="button" className="btn btn-outline-success btn-icon-text" onClick={() => navigateToViewChargerDetails(charger)} style={{ marginBottom: '10px', marginRight: '10px' }}>
                                                                        <i className="mdi mdi-eye btn-icon-prepend"></i>View
                                                                    </button>
                                                                    <button type="button" className={`btn btn-outline-${charger.status ? 'danger' : 'success'} btn-icon-text`} onClick={() => deactivateCharger(charger.charger_id, charger.status)} style={{ marginBottom: '10px', marginRight: '10px' }}>
                                                                        <i className={`mdi mdi-${charger.status ? 'delete' : 'check'} btn-icon-prepend`}></i>{charger.status ? 'DEACTIVATE' : 'ACTIVATE'}
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    ) : (
                                                        <tr className="text-center">
                                                            <td colSpan="10">No Record Found</td>
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
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default Allocateddevice;
