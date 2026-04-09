import React, { createContext, useContext, useState } from 'react';

const ContactModalContext = createContext();

export const ContactModalProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [modalData, setModalData] = useState(null);

    const openContactModal = (data = null) => {
        setModalData(data);
        setIsOpen(true);
    };

    const closeContactModal = () => {
        setIsOpen(false);
        setModalData(null);
    };

    return (
        <ContactModalContext.Provider value={{ isOpen, modalData, openContactModal, closeContactModal }}>
            {children}
        </ContactModalContext.Provider>
    );
};

export const useContactModal = () => {
    const context = useContext(ContactModalContext);
    if (!context) {
        throw new Error('useContactModal must be used within a ContactModalProvider');
    }
    return context;
};
