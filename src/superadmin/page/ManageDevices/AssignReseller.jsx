import React, { useState, useEffect} from 'react';
import axios from 'axios';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const AssignReseller = ({ userInfo, handleLogout }) => {
    const navigate = useNavigate();
    
    const backManageDevice = () => {
        navigate('/superadmin/ManageDevice');
    };

    const [chargers, setChargers] = useState([]);
    const [resellers, setResellers] = useState([]);

    const [reseller_id, setSelectedReseller] = useState('');
    const [charger_ids, setSelectedChargers] = useState([]);

    useEffect(() => {
        const url = '/superadmin/FetchResellers';
        axios.get(url)
            .then((res) => {
                setResellers(res.data.data);
            })
            .catch((err) => {
                console.error('Error fetching data:', err);
            });
    }, []);
    useEffect(() => {
        const url = '/superadmin/FetchUnallocatedCharger';
        axios.get(url)
            .then((res) => {
                setChargers(res.data.data);
            })
            .catch((err) => {
                console.error('Error fetching data:', err);
            });
    }, []);

    const handleResellerChange = (e) => {
        setSelectedReseller(e.target.value);
    };

    const handleChargerChange = (e) => {
        const value = e.target.value;
        setSelectedChargers(prevState =>
            prevState.includes(value)
                ? prevState.filter(charger => charger !== value)
                : [...prevState, value]
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        alert(`Selected Reseller: ${reseller_id}\nSelected Chargers: ${charger_ids.join(', ')}`);
        try {
            const response = await fetch('/superadmin/AssginChargerToReseller', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ reseller_id, charger_ids, modified_by: userInfo.data.username  }),
            });
            if (response.ok) {
                Swal.fire({
                    title: "Charger assigned successfully",
                    icon: "success"
                });
                backManageDevice();
            } else {
                Swal.fire({
                    title: "Error",
                    text: "Failed to assigned charger",
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
                                        <h3 className="font-weight-bold">Assign to Reseller</h3>
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
                                                <form className="form-sample" style={{ textAlign: 'center' }} onSubmit={handleSubmit}>
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="card-body">
                                                                <h4 className="card-title">Reseller ID</h4>
                                                                <div className="template-demo">
                                                                    <div className="form-group row">
                                                                        <div className="col-sm-9" style={{ margin: '0 auto' }}>
                                                                            <select className="form-control" value={reseller_id} onChange={handleResellerChange}>
                                                                                <option value="">Select Reseller</option>
                                                                                {resellers.map((roles, index) => (
                                                                                    <option key={index} value={roles.reseller_id}>{roles.reseller_name}</option>
                                                                                ))}
                                                                            </select>     
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="card-body">
                                                                <h4 className="card-title">Charger List</h4>
                                                                <div className="template-demo"  style={{paddingLeft:'50px'}}>
                                                                    <div className="form-group" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                                                                        {chargers.map((charger) => (
                                                                            <div className="form-check form-check-success" key={charger.charger_id}>
                                                                                <label className="form-check-label">
                                                                                    <input
                                                                                        style={{ textAlign: 'center' }}
                                                                                        type="checkbox"
                                                                                        className="form-check-input"
                                                                                        value={charger.charger_id}
                                                                                        onChange={handleChargerChange}
                                                                                    />
                                                                                    {charger.charger_id}
                                                                                    <i className="input-helper"></i>
                                                                                </label>
                                                                                <hr />
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div style={{ textAlign: 'center' }}>
                                                        <button type="submit" className="btn btn-primary mr-2">
                                                            Submit
                                                        </button>
                                                    </div>
                                                </form>
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
                 
export default AssignReseller