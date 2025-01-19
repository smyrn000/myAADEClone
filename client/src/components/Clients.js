
import React, { useState, useEffect } from 'react';

function Clients() {
    const [clients, setClients] = useState([]);
    const [name, setName] = useState('');
    const [contactInfo, setContactInfo] = useState('');

    useEffect(() => {
        fetch('http://localhost:5000/api/clients')
            .then((response) => response.json())
            .then((data) => setClients(data))
            .catch((error) => console.error('Error fetching clients:', error));
    }, []);

    const addClient = () => {
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
            })
            .catch((error) => console.error('Error adding client:', error));
    };

    return (
        <div>
            <h1>Clients</h1>
            <ul>
                {clients.map((client) => (
                    <li key={client.id}>{client.name} - {client.contact_info}</li>
                ))}
            </ul>
            <h2>Add New Client</h2>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Contact Info"
                value={contactInfo}
                onChange={(e) => setContactInfo(e.target.value)}
            />
            <button onClick={addClient}>Add Client</button>
        </div>
    );
}

export default Clients;
    