import React, { useState, useEffect, useRef } from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';

const Asssigntoass = ({ userInfo, handleLogout }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const { client_id } = location.state || {};
        if (!fetchAsssigntoassDataCalled.current && client_id) {
            fetchAsssigntoassData(client_id);
            fetchAsssigntoassDataCalled.current = true;
        }
    }, [location]);


    const fetchAsssigntoassDataCalled = useRef(false); 

    const fetchAsssigntoassData = async (client_id) => {
        try {
            const response = await axios.post('/reselleradmin/FetchAssignedAssociation', {
                client_id: client_id
            });

            // Check if response status is success and data is present
            if (response.data.status === 'Success' && response.data.data.length > 0) {
                const fetchedData = response.data.data.map(item => ({
                    association_name: item.association_name,
                    charger_id: item.charger_id
                    // Add other fields you want to fetch from the response
                }));

                setData(fetchedData);
                setFilteredData(fetchedData);

            } else {
                console.log('No data available');
                setData([]); // Clear existing data
                setFilteredData([]); // Clear filtered data
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            // Handle error appropriately
        }
    };

   
    

    
    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        const filtered = data.filter(item =>
            item.association_name.toLowerCase().includes(query)
        );
        setFilteredData(filtered);
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
                                        <h3 className="font-weight-bold">Assigned Association</h3>
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
                                        <div className="col-md-12 grid-margin">
                                            <div className="row">
                                                <div className="col-4 col-xl-8">
                                                    <h4 className="card-title" style={{ paddingTop: '10px' }}>List Of Associations</h4>
                                                </div>
                                                <div className="col-12 col-xl-4">
                                                    <div className="input-group">
                                                        <div className="input-group-prepend hover-cursor" id="navbar-search-icon">
                                                            <span className="input-group-text" id="search">
                                                                <i className="icon-search"></i>
                                                            </span>
                                                        </div>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Search now"
                                                            value={searchQuery}
                                                            onChange={handleSearch}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="table-responsive">
                                            <table className="table table-striped">
                                                <thead style={{ textAlign: 'center' }}>
                                                    <tr>
                                                        <th>Sl.No</th>
                                                        <th>Association name</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {filteredData.length > 0 ? (
                                                        filteredData.map((item, index) => (
                                                            <tr key={index} style={{ textAlign: 'center' }}>
                                                                <td>{index + 1}</td>
                                                                <td>{item.association_name ? item.association_name : '-'}</td>
                                                            </tr>
                                                        ))
                                                    ) : (
                                                        <tr>
                                                            <td colSpan="2" className="text-center">No associations found.</td>
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

export default Asssigntoass;
