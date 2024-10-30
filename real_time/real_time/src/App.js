import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import VendorSignUp from './VendorSignUp';
import CustomerSignUp from './CustomerSignUp';
import './App.css';

const App = () => {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vendor" element={<VendorSignUp />} />
          <Route path="/customer" element={<CustomerSignUp />} />
          <Route path="*" element={<div>Page not found. Please check the URL.</div>} />
        </Routes>
      </Router>
  );
};

export default App;
