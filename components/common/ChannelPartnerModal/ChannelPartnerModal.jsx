"use client";

import React, { useEffect } from 'react';
import { useRouter } from "next/navigation";
import { Icon } from '@iconify/react';
import './ChannelPartnerModal.css';
import ThemeBtn from '../Button/ThemeBtn';
const logo = "/images/logos/blanca-logo.png";
const leftBg = "/images/background/popup-left-bg.png";

const ChannelPartnerModal = ({ isOpen, onClose }) => {
    const router = useRouter();

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

    if (!isOpen) return null;

    const handleRegistration = (type) => {
        onClose();
        router.push(`/registration?agentType=${encodeURIComponent(type)}`);
    };

    return (
        <div className="cp-modal-overlay" onClick={onClose}>
            <div className="cp-modal-container" onClick={(e) => e.stopPropagation()}>
                <button className="cp-modal-close" onClick={onClose}>
                    <Icon icon="lucide:x" />
                </button>

                <div className="cp-modal-content">
                    {/* Left Side */}
                    <div
                        className="cp-modal-left"
                        style={{ backgroundImage: `url(${leftBg})` }}
                    >
                        <div className="cp-modal-left-overlay"></div>
                        <div className="cp-modal-left-inner">
                            <div className="cp-logo-wrapper">
                                <img src={logo} alt="Blanca Logo" className="cp-modal-logo" />
                            </div>
                            <h2 className="cp-modal-title">
                                BECOME A CHANNEL PARTNER <br />
                                AND JOIN OUR NETWORK
                            </h2>
                            <p className="cp-modal-description">
                                Are you an ambitious broker seeking new growth? Join
                                Blanca Developers and work with one of the region's most
                                trusted developers. Enjoy a dynamic environment, solid
                                support, and real opportunities to succeed.
                            </p>
                            <p className="cp-modal-description">
                                Our expert team equips you with the training and support to
                                succeed in a competitive market. Grow your career with
                                Blanca Developers and reach new heights.
                            </p>
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="cp-modal-right">
                        <div className="cp-modal-right-inner">
                            <div className="cp-modal-right-header">
                                <div className="cp-modal-indicator"></div>
                                <h3 className="cp-modal-right-title">
                                    Choose Options Below <br />
                                    For Registration
                                </h3>
                            </div>

                            <div className="cp-modal-actions">
                                <ThemeBtn
                                    className="w-100"
                                    style={{ justifyContent: "center" }}
                                    onClick={() => handleRegistration("Agency Registration")}
                                >
                                    AGENCY REGISTRATION
                                    <Icon icon="lucide:external-link" className="ms-2" />
                                </ThemeBtn>
                                <ThemeBtn
                                    className="w-100"
                                    style={{ justifyContent: "center" }}
                                    onClick={() => handleRegistration("Individual Registration")}
                                >
                                    INDIVIDUAL REGISTRATION
                                    <Icon icon="lucide:external-link" className="ms-2" />
                                </ThemeBtn>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChannelPartnerModal;
