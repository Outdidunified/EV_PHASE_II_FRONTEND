import React, { useState, useEffect, useRef} from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

const Wallet = ({ userInfo, handleLogout }) => {
    const [data, setPosts] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const fetchWalletCalled = useRef(false); // Ref to track if fetchProfile has been called

    // get profile data
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch('/associationadmin/FetchCommissionAmtAssociation', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ user_id: userInfo.data.user_id }),
                });

                if (response.ok) {
                    const data = await response.json()
                    // console.log("Wallet res " , data)
                    setPosts(data);
                } else {
                    setErrorMessage('Failed to fetch wallet');
                    console.error('Failed to fetch profile:', response.statusText);
                }
            } catch (error) {
                setErrorMessage('An error occurred while fetching the wallet');
                console.error('Error:', error);
            }
        };

        if (!fetchWalletCalled.current && userInfo && userInfo.data && userInfo.data.user_id) {
            fetchProfile();
            fetchWalletCalled.current = true; // Mark fetchProfile as called
        }
    }, [userInfo]);

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
                                        <h3 className="font-weight-bold">Wallet</h3>
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
                                                        <h4 className="card-title" style={{paddingTop:'10px'}}>Wallet balance: {data ? data.data : 'Loading...'}</h4>  
                                                    </div>
                                                    {errorMessage && <div className="text-danger">{errorMessage}</div>}
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
                 
export default Wallet