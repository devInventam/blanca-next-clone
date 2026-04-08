import React, { useEffect } from "react";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import "./Modal.css";

const Modal = ({ isOpen, onClose, title, children, size = "md", showHeader = true }) => {
    // Prevent scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="common-modal-overlay">
                    <motion.div
                        className="modal-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />
                    <motion.div
                        className={`modal-container modal-size-${size}`}
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
                    >
                        <div className="modal-content glass-card">
                            {showHeader && (
                                <div className="modal-header">
                                    {title && <h3 className="modal-title">{title}</h3>}
                                    <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
                                        <Icon icon="lucide:x" />
                                    </button>
                                </div>
                            )}
                            <div className="modal-body">
                                {children}
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default Modal;
