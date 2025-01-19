import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';

function Clients() {
    const [clients, setClients] = useState([]);
    const [name, setName] = useState('');
    const [contactInfo, setContactInfo] = useState('');
    const [feedback, setFeedback] = useState('');

    useEffect(() => {
        fetch('http://localhost:5000/api/clients')
            .then((response) => response.json())
            .then((data) => setClients(data))
            .catch((error) => console.error('Error fetching clients:', error));
    }, []);

    const addClient = () => {
        if (!name || !contactInfo) {
            setFeedback('Name and Contact Info are required.');
            return;
        }

        fetch('http://localhost:5000/api/clients', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, contact_info: contactInfo }),
        })
            .then((response) => response.json())
            .then((newClient) => {
                setClients([...clients, newClient]);
                setName('');
                setContactInfo('');
                setFeedback('Client added successfully!');
            })
            .catch((error) => {
                console.error('Error adding client:', error);
                setFeedback('Failed to add client.');
            });
    };

    return (        
        <div className="list-container">    
            <Header />
            <div>
                <br></br>
                <Link to="/dashboard" className="nav-link">
                    Return to Dashboard
                </Link>
            </div>            
            <h2>Add New Client</h2>
            {feedback && <p className="feedback">{feedback}</p>}
            <form>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-input"
                />
                <input
                    type="text"
                    placeholder="Contact Info"
                    value={contactInfo}
                    onChange={(e) => setContactInfo(e.target.value)}
                    className="form-input"
                />
                <button type="button" onClick={addClient} className="form-button">
                    Add Client
                </button>
            </form>
            <h1>Clients</h1>
            <ul className="list">
                {clients.map((client) => (
                    <li key={client.id} className="list-item">
                        <div className='title'>{client.name}</div> <div className='description'>{client.contact_info}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Clients;
