import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        const response = await fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });
        if (response.ok) {
            navigate('/dashboard');
        } else {
            alert('Login failed');
        }
    };

    return (
        <div className="form-container">
            <Header />
            <h1>Login</h1>
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
                <button type="button" onClick={handleLogin} className="form-button">
                    Login
                </button>
            </form>
        </div>
    );
}

export default Login;
