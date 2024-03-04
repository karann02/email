// src/components/Contact.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import data from '../contacts.json'
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './contact.css'
import Popup from './Popup';

const Contact = () => {
    const [contacts, setContacts] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [editSection, setEditSection] = useState(false);
    const [newContact, setNewContact] = useState({
        name: '',
        email: '',
        mobile: '',
        date: '',
    });
    const [editContact, setEditContact] = useState({
        name: '',
        email: '',
        mobile: '',
        date: '',
        id: ''
    });

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {

        const data = await axios.get('http://localhost:5000/contact')
        console.log(data)
        if (data.data.success) {
            setContacts(data.data.data)
        }
    }

    const handleDelete = async (id) => {
        const data = await axios.delete(`http://localhost:5000/delete/${id}`)
        console.log(data.data.success)
        if (data.data.success) {
            getData();
            alert(data.data.message)
        }
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        const data = await axios.put('http://localhost:5000/update', editContact);
        console.log(data);
        if (data.data.success) {
            getData();
            alert(data.data.message);
            // Close the popup
            handlePopupClose();
        }
    };

    const handleEditInputChange = async (e) => {
        const { name, value } = e.target;
        console.log(e.target)
        setEditContact((prevContact) => ({
            ...prevContact,
            [name]: value,
        }));
    }
    const handleEdit = (data) => {
        setPopupOpen(true);
        setEditSection(true)
        setEditContact(data)
    }

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key) {
            direction = sortConfig.direction === 'asc' ? 'desc' : 'asc';
        }
        setSortConfig({ key, direction });

        const newContacts = [...contacts];
        newContacts.sort((a, b) => {
            if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
            if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
            return 0;
        });
        setContacts(newContacts);
    };

    const handlePopupOpen = () => {
        setPopupOpen(true);
    };

    const handlePopupClose = () => {
        setNewContact({
            name: '',
            email: '',
            mobile: '',
            date: '',
        });
        setEditContact({
            name: '',
            email: '',
            mobile: '',
            date: '',
            id: ''
        });
        setPopupOpen(false);
        setEditSection(false);
    };



    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log(e.target)
        setNewContact((prevContact) => ({
            ...prevContact,
            [name]: value,
        }));

    };

    const handleAddContact = async (e) => {
        e.preventDefault()
        const updatedContacts = [...contacts, newContact];
        setContacts(updatedContacts);
        handlePopupClose();
        const data = await axios.post('http://localhost:5000/contact', newContact)
        console.log(data)
        if (data.data.success) {
            getData();
            alert(data.data.message)
        }
        // Clear the form
        setNewContact({
            name: '',
            email: '',
            mobile: '',
            date: '',
        });

        // Close the popup
        handlePopupClose();
    };

    const getArrow = (key) => {
        if (sortConfig.key === key) {
            return sortConfig.direction === 'asc' ? ' ▲▼' : ' ▼▲';
        }
        return '';
    };

    const thStyle = {
        backgroundColor: '#F5F8FA',
        cursor: 'pointer',
    };

    const tableContainerStyle = {
        overflowX: 'auto',
        paddingTop: '40px',
        paddingLeft: '30px',
        paddingRight: '30px',
        display: 'flex',
        justifyContent: 'space-between', // Align items on the right side
    };


    return (
        <>
            <button className="btn btn-primary" onClick={handlePopupOpen}>
                Add Contacts
            </button>
            <div style={tableContainerStyle}>
                <table className="table">
                    <thead style={{ backgroundColor: '#F5F8FA' }}>
                        <tr>
                            <th onClick={() => handleSort('name')} style={thStyle}>
                                Name{getArrow('name')}
                            </th>
                            <th onClick={() => handleSort('email')} style={thStyle}>
                                Email{getArrow('email')}
                            </th>
                            <th onClick={() => handleSort('mobile')} style={thStyle}>
                                Phone Number{getArrow('mobile')}
                            </th>
                            <th onClick={() => handleSort('date')} style={thStyle}>
                                Create Date{getArrow('date')}
                            </th>
                            <th style={thStyle}>
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts?.map((contact, index) => (
                            <tr key={index}>
                                <td>{contact.name}</td>
                                <td>{contact.email}</td>
                                <td>{contact.mobile}</td>
                                <td>{contact.date}</td>
                                <td>
                                    <button className='btn btn-edit' onClick={() => handleEdit(contact)}>Edit</button>
                                    <button className='btn btn-delete' onClick={() => handleDelete(contact._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Popup for adding a new contact using Bootstrap modal */}
            <div className="modal" style={{ display: isPopupOpen ? 'block' : 'none' }}>
                {isPopupOpen && (
                    <Popup
                        handlePopupClose={handlePopupClose}
                        handleInputChange={editSection ? handleEditInputChange : handleInputChange}
                        handleAddContact={editSection ? handleUpdate : handleAddContact}
                        newContact={editSection ? editContact : newContact}
                    />
                )}
            </div>
        </>
    );
};

export default Contact;
