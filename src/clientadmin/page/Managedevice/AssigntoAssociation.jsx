import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const AssigntoAssociation = ({ userInfo, handleLogout }) => {
    const [client, setClient] = useState('');
    const [charger, setCharger] = useState('');
    const [association_id, setAssociationId] = useState(null); // State for association ID

    const navigate = useNavigate();

    // State to hold fetched clients and unallocated chargers
    const [clientsList, setClientsList] = useState([]);
    const [unallocatedChargers, setUnallocatedChargers] = useState([]);

    useEffect(() => {
        const fetchass = async () => {
            try {
                const response = await axios.post('/clientadmin/FetchAssociationUser', {
                    client_id: userInfo.data.client_id
                });
                setClientsList(response.data.data || []);
            } catch (error) {
                console.error('Error fetching clients:', error);
                setClientsList([]);
            }
        };

        const fetchUnAllocatedChargerDetails = async () => {
            try {
                const response = await axios.post('/clientadmin/FetchUnAllocatedCharger', {
                    client_id: userInfo.data.client_id,
                });
            
                setUnallocatedChargers(response.data.data || []);
            } catch (error) {
                console.error('Error fetching unallocated charger details:', error);
                setUnallocatedChargers([]);
            }
        };

        fetchass(); // Fetch clients on component mount or when userInfo changes
        fetchUnAllocatedChargerDetails(); // Fetch unallocated chargers on component mount
    }, [userInfo]);

    const handleClientChange = (e) => {
        const selectedClient = e.target.value;
        setClient(selectedClient);

        // Find the selected client object to get association_id
        const selectedClientObj = clientsList.find(clientObj => clientObj.client_id === parseInt(selectedClient));
        if (selectedClientObj) {
            setAssociationId(selectedClientObj.association_id);
        } else {
            setAssociationId(null); // Reset association_id if no client is selected
        }
    };

    const handleChargerChange = (e) => {
        setCharger(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        Submitassign(); // Call Submitassign function on form submit
    };

    const goBack = () => {
        navigate(-1); // Assuming `navigate` is imported or defined somewhere for navigation
    };

    const Submitassign = async () => {
        try {
            const response = await axios.post('/clientadmin/AssginChargerToAssociation', {
                association_id: association_id, // Use the selected association_id
                charger_id: charger,
                modified_by: userInfo.data.client_name,
            });
            // Log response data to inspect its structure

            // Assuming the response structure includes a 'status' field
            if (response.data.status === 'Success') {
                Swal.fire({
                    icon: 'success',
                    title: 'Charger Assigned Successfully',
                    timer: 2000,
                    timerProgressBar: true,
                    onClose: () => {
                        navigate(-1);
                    }
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Charger Not Assigned',
                    text: 'Please try again.',
                    timer: 2000,
                    timerProgressBar: true
                });
            }
        } catch (error) {
            console.error('Error assigning charger:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error assigning charger',
                text: 'Please try again later.',
                timer: 2000,
                timerProgressBar: true
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
                                        <h3 className="font-weight-bold">Assign Chargers to Association</h3>
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
                                        <div className="col-12 grid-margin">
                                            <div className="card">
                                                <div className="card-body">
                                                    <h2 className="card-title">Enter Details</h2>
                                                    <form onSubmit={handleSubmit} className="form-sample">
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-3 col-form-label">Select Association</label>
                                                                    <div className="col-sm-9">
                                                                        <select
                                                                            className="form-control"
                                                                            value={client}
                                                                            onChange={handleClientChange}
                                                                        >
                                                                            <option value="">Select Association</option>
                                                                            {clientsList.map((clientObj) => (
                                                                                <option key={clientObj.client_id} value={clientObj.client_id}>
                                                                                    {clientObj.association_name}
                                                                                </option>
                                                                            ))}
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-group row">
                                                                    <label className="col-sm-3 col-form-label">Select Charger</label>
                                                                    <div className="col-sm-9">
                                                                        <select
                                                                            className="form-control"
                                                                            value={charger}
                                                                            onChange={handleChargerChange}
                                                                        >
                                                                            <option value="">Select Charger</option>
                                                                            {unallocatedChargers.map((chargerObj) => (
                                                                                <option key={chargerObj.charger_id} value={chargerObj.charger_id}>
                                                                                    {chargerObj.charger_id}
                                                                                </option>
                                                                            ))}
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div style={{ textAlign: 'center' }}>
                                                            <button type="submit" className="btn btn-primary mr-2">Submit</button>
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
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default AssigntoAssociation;
