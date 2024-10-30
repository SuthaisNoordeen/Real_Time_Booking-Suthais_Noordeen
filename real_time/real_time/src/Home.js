import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="home-container">
            <h2>Sign Up As</h2>
            <div className="button-group">
                <button onClick={() => navigate('/vendor')}>Vendor</button>
                <button onClick={() => navigate('/customer')}>Customer</button>
            </div>
        </div>
    );
};

export default Home;
