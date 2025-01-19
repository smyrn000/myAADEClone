import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';

function Invoices() {
    const [invoices, setInvoices] = useState([]);
    const [clientId, setClientId] = useState('');
    const [date, setDate] = useState('');
    const [total, setTotal] = useState('');
    const [clients, setClients] = useState([]);
    const [feedback, setFeedback] = useState('');

    useEffect(() => {
        fetch('http://localhost:5000/api/invoices')
            .then((response) => response.json())
            .then((data) => setInvoices(data))
            .catch((error) => console.error('Error fetching invoices:', error));

        fetch('http://localhost:5000/api/clients')
            .then((response) => response.json())
            .then((data) => setClients(data))
            .catch((error) => console.error('Error fetching clients:', error));
    }, []);

    const addInvoice = () => {
        if (!clientId || !date || !total) {
            setFeedback('Client, Date, and Total are required.');
            return;
        }

        fetch('http://localhost:5000/api/invoices', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ client_id: parseInt(clientId), date, total: parseFloat(total) }),
        })
            .then((response) => response.json())
            .then((newInvoice) => {
                setInvoices([...invoices, newInvoice]);
                setClientId('');
                setDate('');
                setTotal('');
                setFeedback('Invoice added successfully!');
            })
            .catch((error) => {
                console.error('Error adding invoice:', error);
                setFeedback('Failed to add invoice.');
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
            <h2>Add New Invoice</h2>
            {feedback && <p className="feedback">{feedback}</p>}
            <form>
                <select
                    value={clientId}
                    onChange={(e) => setClientId(e.target.value)}
                    className="form-input"
                >
                    <option value="">Select Client</option>
                    {clients.map((client) => (
                        <option key={client.id} value={client.id}>
                            {client.name}
                        </option>
                    ))}
                </select>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="form-input"
                />
                <input
                    type="number"
                    placeholder="Total"
                    value={total}
                    onChange={(e) => setTotal(e.target.value)}
                    className="form-input"
                />
                <button type="button" onClick={addInvoice} className="form-button">
                    Add Invoice
                </button>
            </form>
            <h1>Invoices</h1>
            <ul className="list">
                {invoices.map((invoice) => (
                    <li key={invoice.id} className="list-item">
                        <div className='title'>{invoice.client_name}</div> <div className='description'>Date: {invoice.date}</div> <div className='description'>Total: ${invoice.total}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Invoices;
