import React, { useState, useRef } from 'react';
import axios from 'axios';

const Modal = ({ closeModal, children }) => {
    const [searchText, setSearchText] = useState('');
    const [contacts, setContacts] = useState([]);
    const timeoutRef = useRef(null);

    const handleSearch = async event => {
        setSearchText(event.target.value);
        clearTimeout(timeoutRef.current);

        timeoutRef.current = setTimeout(async () => {
            const res = await axios.get(`https://contact.mediusware.com/api/contacts/?search=${searchText}`);
            setContacts(res.data.results);
        }, 500);
    };

    const handleKeyDown = async event => {
        if (event.key === 'Enter') {
            clearTimeout(timeoutRef.current);
            const res = await axios.get(`https://contact.mediusware.com/api/contacts/?search=${searchText}`);
            setContacts(res.data.results);
        }
    };

    return (
        <div className="modal-backdrop" onClick={closeModal} style={{backgroundColor: "white"}}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <input type="text" placeholder="Search..." onChange={handleSearch} onKeyDown={handleKeyDown} />
                {children}
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Phone</th>
                            <th>Country</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.map(contact => (
                            <tr key={contact.id}>
                                <td>{contact.id}</td>
                                <td>{contact.phone}</td>
                                <td>{contact.country.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button 
                  className="modal-close-button" 
                  onClick={closeModal} 
                  style={{backgroundColor: "#46139f", color: "white"}}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default Modal;