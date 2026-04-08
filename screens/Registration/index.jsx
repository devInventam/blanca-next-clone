"use client";

import React, { useMemo, useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useSearchParams } from "next/navigation";
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { useRegisterChannelPartner } from '../../hooks/useChannelPartner';
import Preloader from '../../components/common/Preloader';
import Header from '../../components/layout/Header/Header';
import ScrollToTop from '../../components/common/ScrollToTop';
import SmallHeroBanner from '../../components/common/Small-hero-banner';
import ThankYouModal from "../../components/common/ThankYouModal/ThankYouModal";
import IndividualForm from "./IndividualForm";
import AgencyForm from "./AgencyForm";
import { channelPartnerSchema } from '../../schema/validationSchema';
import "./ragistration.css";
import Footer from '../../components/layout/Footer/Footer';
// import SEO from '../../components/common/Seo/Seo';

const RegistrationBg = "/images/background/registration-bg.png";

const INDIVIDUAL_AGENT_TYPE = "Individual Registration";

const Registration = () => {
    const searchParams = useSearchParams();
    const agentTypeFromUrl = searchParams.get("agentType");
    const [activeTab, setActiveTab] = useState("personal-details");
    const [showThankYou, setShowThankYou] = useState(false);
    const [submittedAgentType, setSubmittedAgentType] = useState("");
    const [submitError, setSubmitError] = useState("");

    const { mutateAsync: registerPartner, isPending: isSubmitting } =
        useRegisterChannelPartner();

    // CHANGE: moved default values inside component so it can read `location.state?.agentType` correctly.
    const defaultValues = useMemo(() => ({
        agentType: agentTypeFromUrl || INDIVIDUAL_AGENT_TYPE,
        gstin: "",
        fullname: "",
        agency_name: "",
        phone: "",
        reraNo: "",
        email: "",
        pan: "",
        country: "India",
        // state: "",
        // city: "",
        address: "",
        pinCode: "",
        heardAboutUs: "",
        referFullname: "",
        referPhone: "",
        referEmail: "",
        referAddress: "",
        // newsOffers: false,
        // privacyPolicy: false
    }), [agentTypeFromUrl]);

    const {
        control,
        handleSubmit,
        setValue,
        watch,
        reset,
        trigger,
        formState: { errors }
    } = useForm({
        defaultValues,
        mode: "onChange",
        resolver: yupResolver(channelPartnerSchema),
    });

    const agentType = watch("agentType");
    const isIndividual = agentType === INDIVIDUAL_AGENT_TYPE;

    const validateBeforeAddressTab = React.useCallback(async () => {
        const fieldsToValidate = isIndividual
            ? ["agentType", "fullname", "phone", "email", "address"]
            : ["agentType", "fullname", "phone", "email"];

        const isValid = await trigger(fieldsToValidate, { shouldFocus: true });
        if (isValid) {
            setActiveTab("address-details");
        }
    }, [isIndividual, trigger]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (agentTypeFromUrl) {
            setValue("agentType", agentTypeFromUrl, { shouldDirty: false });
        }
    }, [agentTypeFromUrl, setValue]);

    const onSubmit = async (data) => {
        setSubmitError("");

        const agent_type =
            data?.agentType === INDIVIDUAL_AGENT_TYPE
                ? "individual"
                : data?.agentType === "Agency Registration"
                    ? "agency"
                    : String(data?.agentType || "").toLowerCase();

        const payload =
            agent_type === "individual"
                ? {
                    fullname: data?.fullname || "",
                    agent_type,
                    phone_number: data?.phone || "",
                    email: data?.email || "",
                    country: data?.country || "",
                    // pincode: data.pinCode || "",
                    address: data?.address || "",
                    source_of_acknowledgement: data?.heardAboutUs || "",
                    referral_name: data?.referFullname || "",
                    referral_contact_number: data?.referPhone || "",
                    referral_email: data?.referEmail || "",
                    referral_address: data?.referAddress || "",
                }
                : {
                    fullname: data?.fullname || "",
                    agent_type,
                    phone_number: data?.phone || "",
                    email: data?.email || "",
                    country: data?.country || "",
                    pincode: data?.pinCode || 0,
                    address: data?.address || "",
                    gstin: data?.gstin || "",
                    agency_name: data?.agency_name || "",
                    rera_number: data?.reraNo || "",
                    pan_number: data?.pan || "",
                };

        try {
            await registerPartner(payload);
            setSubmittedAgentType(data?.agentType);
            setShowThankYou(true);
            reset();
            setActiveTab("personal-details");
        } catch (err) {
            const message =
                err?.response?.data?.message ||
                err?.response?.data?.error ||
                err?.message ||
                "Something went wrong. Please try again.";
            setSubmitError(message);
        }
    };


    return (
        <div className="registration-page">
            {/* <SEO /> */}
            <Preloader />
            <Header />
            <main>
                <SmallHeroBanner title="Channel Partner Registration" description="" image={RegistrationBg} showBackButton={true} />

                <section className="registration-form-section">
                    <Container>
                        <div className="registration-tab-wrapper">

                            {/* Sidebar Navigation */}
                            <div className="reg-sidebar">
                                <div
                                    className={`reg-tab-btn ${activeTab === "personal-details" ? "active" : ""
                                        }`}
                                    onClick={() => setActiveTab("personal-details")}
                                >
                                    <div className="tab-icon">
                                        <i className="fas fa-user"></i>
                                    </div>
                                    <div className="tab-text">
                                        <span className="tab-title">Personal Details</span>
                                        <span className="tab-sub">Enter Basic info</span>
                                    </div>
                                </div>

                                <div
                                    className={`reg-tab-btn ${activeTab === "address-details" ? "active" : ""
                                        }`}
                                    onClick={validateBeforeAddressTab}
                                >
                                    <div className="tab-icon">
                                        <i className="fas fa-map-marker-alt"></i>
                                    </div>
                                    <div className="tab-text">
                                        {/* CHANGE: Individual sidebar shows "Refer" instead of "Address". */}
                                        <span className="tab-title">{isIndividual ? "Refer" : "Address"}</span>
                                        <span className="tab-sub">{isIndividual ? "Add Refer" : "Add Address"}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Main Form Area */}
                            <div className="reg-main-content">
                                <Form className="registration-form" onSubmit={handleSubmit(onSubmit)}>
                                    {/* CHANGE: split into two logical forms (Individual vs Agency) without changing shared wrappers/styles. */}
                                    {isIndividual ? (
                                        <IndividualForm
                                            control={control}
                                            activeTab={activeTab}
                                            setActiveTab={setActiveTab}
                                            agentType={agentType}
                                            errors={errors}
                                            trigger={trigger}
                                            isSubmitting={isSubmitting}
                                            submitError={submitError}
                                            individualAgentTypeLabel={INDIVIDUAL_AGENT_TYPE}
                                        />
                                    ) : (
                                        <AgencyForm
                                            control={control}
                                            activeTab={activeTab}
                                            setActiveTab={setActiveTab}
                                            agentType={agentType}
                                            errors={errors}
                                            trigger={trigger}
                                            isSubmitting={isSubmitting}
                                            submitError={submitError}
                                            individualAgentTypeLabel={INDIVIDUAL_AGENT_TYPE}
                                        />
                                    )}
                                </Form>
                            </div>
                        </div>
                    </Container>
                </section>
            </main>
            <Footer />
            <ScrollToTop />
            <ThankYouModal
                isOpen={showThankYou}
                onClose={() => setShowThankYou(false)}
                title="Registration Successful"
                message={
                    submittedAgentType === INDIVIDUAL_AGENT_TYPE
                        ? "Thank you for registering as a Blanca Individual Channel Partner! Our team will review your application and get in touch with you shortly."
                        : "Thank you for registering as a Blanca Agency Channel Partner! Our team will review your application and get in touch with you shortly."
                }
            />
        </div>
    );
};

export default Registration;
