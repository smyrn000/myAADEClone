import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Header from './Header';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async () => {
        const response = await fetch('http://localhost:5000/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });
        if (response.ok) {
            alert('Registration successful');
            navigate('/');
        } else {
            alert('Registration failed');
        }
    };

    return (
        <div className="form-container">
            <Header />
            <div>
                <br></br>
                <Link to="/" className="nav-link">
                    Go Back
                </Link>
            </div>                  
            <h1>Register</h1>
            <form>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="form-input"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-input"
                />
                <button type="button" onClick={handleRegister} className="form-button">
                    Register
                </button>
            </form>
        </div>
    );
}

export default Register;
