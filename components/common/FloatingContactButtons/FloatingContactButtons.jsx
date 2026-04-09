import React from 'react';
import { Icon } from '@iconify/react';
import { useSetting } from '../../../hooks/useSetting';
import { useContactModal } from '../../../context/ContactModalContext';
import './FloatingContactButtons.css';

const FloatingContactButtons = () => {
    const { data: settingResponse } = useSetting({ show_on_home_page: true });
    const { openContactModal } = useContactModal();

    const settingRecord = React.useMemo(() => {
        const raw = settingResponse;
        const candidate =
            raw?.data

        if (Array.isArray(candidate)) return candidate[0] || null;
        return candidate || null;
    }, [settingResponse]);
    
    const phone = settingRecord?.setting_contact_number?.[0]?.number || "+91 7021913284"

    const normalizedDigits = String(phone).replace(/[^\d]/g, "");
    const normalizedTel = String(phone).trim().replace(/[^\d+]/g, "");

    return (
        <div className="floating-action-buttons" aria-label="Quick contact actions">
            <a className="fab-item fab-call" href={`tel:${normalizedTel || phone}`} aria-label="Call us">
                <Icon icon="lucide:phone" />
            </a>
            <a className="fab-item fab-whatsapp" href={`https://api.whatsapp.com/send/?phone=${normalizedDigits || phone}`} target="_blank" rel="noopener noreferrer"
                aria-label="WhatsApp">
                <Icon icon="ri:whatsapp-line" />
            </a>
            <a
                className="fab-item fab-inquiry"
                onClick={(e) => {
                    e.preventDefault();
                    openContactModal();
                }}
                aria-label="Inquiry"
            >
                <Icon icon="lucide:mail" />
            </a>
        </div>
    );
};

export default FloatingContactButtons;
