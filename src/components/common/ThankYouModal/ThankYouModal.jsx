import React from 'react';
import Modal from '../Modal/Modal';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import './ThankYouModal.css';

const ThankYouModal = ({
    isOpen,
    onClose,
    title = "Submission Successful",
    message = "Thank you! Your submission has been received successfully.",
    buttonText = "Done"
}) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} size="md" showHeader={false}>
            <div className="thank-you-modal-content">
                <motion.div
                    className="success-icon-wrapper"
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        delay: 0.1
                    }}
                >
                    <Icon icon="lucide:check-circle-2" />
                </motion.div>

                <motion.h3
                    className="thank-you-title uppercase-text"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    {title}
                </motion.h3>

                <motion.p
                    className="thank-you-message"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    {message}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <button
                        className="theme-btn modal-action-btn"
                        onClick={onClose}
                    >
                        {buttonText}
                    </button>
                </motion.div>
            </div>
        </Modal>
    );
};

export default ThankYouModal;
