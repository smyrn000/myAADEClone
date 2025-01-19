
import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
    return (
        <div>
            <h1>Dashboard</h1>
            <nav>
                <ul>
                    <li><Link to="/clients">Manage Clients</Link></li>
                    <li><Link to="/products">Manage Products</Link></li>
                    <li><Link to="/invoices">Manage Invoices</Link></li>
                </ul>
            </nav>
        </div>
    );
}

export default Dashboard;
    