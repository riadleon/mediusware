import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from './Modal';
import { debounce } from 'lodash';

const Problem2 = () => {
    const [contacts, setContacts] = useState([]);
    const [selectedContacts, setSelectedContacts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [modalType, setModalType] = useState(null);

    useEffect(() => {
        axios.get("https://contact.mediusware.com/api/contacts/").then(res => {
            setContacts(res.data.results);
        });
    }, []);

    const showAllContacts = () => {
        setModalType('all');
        setSelectedContacts(contacts);
        setShowModal(true);
        window.history.pushState({}, null, "/all");
    };

    const showUsContacts = () => {
        setModalType('us');
        setSelectedContacts(contacts.filter(contact => contact.country.name === "United States"));
        setShowModal(true);
        window.history.pushState({}, null, "/us");
    };

    const closeModal = () => {
        setShowModal(false);
        window.history.pushState({}, null, "/");
    };

    const handleSearch = (event) => {
        const searchTerm = event.target.value;
        setSearchTerm(searchTerm);

        setTimeout(() => {
            if (modalType === 'all') {
                setSelectedContacts(contacts.filter(contact =>
                    contact.phone.includes(searchTerm) || contact.country.name.includes(searchTerm)
                ));
            } else if (modalType === 'us') {
                setSelectedContacts(contacts.filter(contact =>
                    (contact.phone.includes(searchTerm) || contact.country.name.includes(searchTerm)) &&
                    contact.country.name === "United States"
                ));
            }
        }, 500);
    };

    const handleEnter = (event) => {
        if (event.key === 'Enter') {
            if (modalType === 'all') {
                setSelectedContacts(contacts.filter(contact =>
                    contact.phone.includes(searchTerm) || contact.country.name.includes(searchTerm)
                ));
            } else if (modalType === 'us') {
                setSelectedContacts(contacts.filter(contact =>
                    (contact.phone.includes(searchTerm) || contact.country.name.includes(searchTerm)) &&
                    contact.country.name === "United States"
                ));
            }
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

                <div className="d-flex justify-content-center gap-3">
                    <button
                        className="btn btn-lg btn-outline-primary"
                        type="button"
                        onClick={showAllContacts}
                    >
                        All Contacts
                    </button>
                    <button
                        className="btn btn-lg btn-outline-warning"
                        type="button"
                        onClick={showUsContacts}
                    >
                        US Contacts
                    </button>
                </div>
                <div className="form-group search-box mt-5">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search contacts..."
                        onChange={debounce(handleSearch, 300)}
                        onKeyPress={handleEnter}
                    />
                </div>
                {showModal && (
                    <Modal closeModal={closeModal}>
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Phone</th>
                                    <th>Country</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedContacts.map(contact => (
                                    <tr key={contact.id}>
                                        <td>{contact.id}</td>
                                        <td>{contact.phone}</td>
                                        <td>{contact.country.name}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Modal>
                )}
            </div>
        </div>
    );
};

export default Problem2;