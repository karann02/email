// Popup.js
import React from 'react';

const Popup = ({ handlePopupClose, handleInputChange, handleAddContact, newContact }) => {
    console.log(newContact);

    const popupStyle = {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    };

    const labelStyle = {
        color: 'black',
        textAlign: 'left',
        fontSize: '14px',
        marginBottom: '5px',
        display: 'block',
    };

    const inputStyle = {
        width: '100%',
    };

    const modalTitleStyle = {
        color: 'black',  // Set text color to black
    };

    return (
        <div className="modal-dialog">
            <div className="modal-content" style={popupStyle}>
                <div className="modal-header">
                    <h5 className="modal-title" style={modalTitleStyle}>Add New Contact</h5>
                </div>
                <div className="modal-body">
                    <form>
                        <div className="form-group">
                            <label htmlFor="name" style={labelStyle}>Name:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                style={inputStyle}
                                value={newContact.name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email" style={labelStyle}>Email:</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                style={inputStyle}
                                value={newContact.email}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="mobile" style={labelStyle}>Phone Number:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="mobile"
                                name="mobile"
                                style={inputStyle}
                                value={newContact.mobile}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="date" style={labelStyle}>Create Date:</label>
                            <input
                                type="date"
                                className="form-control"
                                id="date"
                                name="date"
                                style={inputStyle}
                                value={newContact.date}
                                onChange={handleInputChange}
                            />
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleAddContact}
                    >
                        Submit
                    </button>
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={handlePopupClose}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Popup;
