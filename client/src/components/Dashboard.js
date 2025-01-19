import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';

function Dashboard() {

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('user');
    } ;

    return (
        <div className="dashboard">
            <Header />
            <div>
                    <br></br>
                    <Link onClick={handleLogout} to="/" className="nav-link">
                      Logout
                    </Link>
                  </div>
            <h1>Dashboard</h1>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <nav>
                <ul>
                    <li>
                        <Link to="/clients" className="nav-link">
                            Manage Clients
                        </Link>
                    </li>
                    <li>
                        <Link to="/products" className="nav-link">
                            Manage Products
                        </Link>
                    </li>
                    <li>
                        <Link to="/invoices" className="nav-link">
                            Manage Invoices
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Dashboard;
