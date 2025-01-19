import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Clients from './components/Clients';
import Products from './components/Products';
import Invoices from './components/Invoices';

// Locate the root DOM element
const container = document.getElementById('root');
if (!container) {
    throw new Error("No root element found. Ensure index.html contains a <div id='root'></div>.");
}

// Render the React application
const root = ReactDOM.createRoot(container);
root.render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/clients" element={<Clients />} />
                <Route path="/products" element={<Products />} />
                <Route path="/invoices" element={<Invoices />} />
            </Routes>
        </Router>
    </React.StrictMode>
);
