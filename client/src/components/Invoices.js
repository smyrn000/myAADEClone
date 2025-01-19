
import React, { useState, useEffect } from 'react';

function Invoices() {
    const [invoices, setInvoices] = useState([]);
    const [clientId, setClientId] = useState('');
    const [date, setDate] = useState('');
    const [total, setTotal] = useState('');
    const [clients, setClients] = useState([]);

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
            })
            .catch((error) => console.error('Error adding invoice:', error));
    };

    return (
        <div>
            <h1>Invoices</h1>
            <ul>
                {invoices.map((invoice) => (
                    <li key={invoice.id}>
                        {invoice.client_name} - {invoice.date} - ${invoice.total}
                    </li>
                ))}
            </ul>
            <h2>Add New Invoice</h2>
            <select value={clientId} onChange={(e) => setClientId(e.target.value)}>
                <option value="">Select Client</option>
                {clients.map((client) => (
                    <option key={client.id} value={client.id}>{client.name}</option>
                ))}
            </select>
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />
            <input
                type="number"
                placeholder="Total"
                value={total}
                onChange={(e) => setTotal(e.target.value)}
            />
            <button onClick={addInvoice}>Add Invoice</button>
        </div>
    );
}

export default Invoices;
    