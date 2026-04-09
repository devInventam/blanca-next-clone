"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Row, Col, Form } from "react-bootstrap";
import { useForm, Controller, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Icon } from "@iconify/react";
import Modal from "../Modal/Modal";
import InputField from "../InputField/InputField";
import PhoneInput from "../PhoneInput/PhoneInput";
import Checkbox from "../Checkbox/Checkbox";
import ThankYouModal from "../ThankYouModal/ThankYouModal";
import Field from "../Field/Field";
import { useContactModal } from "../../../context/ContactModalContext";
import { Country } from "country-state-city";
import Select from "react-select";
import { useContactUs } from "../../../hooks/useContactUs";
import { contactModalSchema } from "../../../schema/validationSchema";
import "./ContactModal.css";
import ThemeButton from "../../common/Button/ThemeBtn";

const ContactModal = () => {
  const { isOpen, closeContactModal } = useContactModal();
  const [showThankYou, setShowThankYou] = useState(false);
  const { mutate: sendContact, isPending } = useContactUs();

  const countryOptions = Country.getAllCountries().map((c) => ({
    label: c.name,
    value: c.isoCode.toLowerCase(),
    isoCode: c.isoCode.toLowerCase(),
    phoneCode: `+${c.phonecode}`,
  }));

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(contactModalSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      country: "ae",
      message: "",
      privacyPolicy: false,
    },
  });

  const selectedCountryCode = useWatch({
    control,
    name: "country",
    defaultValue: "ae",
  });

  const onSubmit = (data) => {
    const selectedCountry = countryOptions.find(
      (c) => c.value === data.country,
    );
    const phoneWithCountryCode = selectedCountry?.phoneCode
      ? `${selectedCountry.phoneCode}${data.phone}`
      : data.phone;

    const payload = {
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      phone_number: phoneWithCountryCode,
      message: data.message,
      is_notified: false,
      notification_mode: "",
    };

    sendContact(payload, {
      onSuccess: () => {
        setShowThankYou(true);
        closeContactModal();
        reset();
      },
      onError: () => {
        alert("Something went wrong. Please try again.");
      },
    });
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={closeContactModal}
        size="lg"
        showHeader={false}
      >
        <div className="contact-modal-inner">
          <div className="modal-header-custom">
            <div className="title-with-blue-bar">
              <span className="blue-bar"></span>
              <h2>Contact Us</h2>
            </div>
            <button className="close-btn" onClick={closeContactModal}>
              <Icon icon="material-symbols:close" />
            </button>
          </div>

          <Form
            onSubmit={handleSubmit(onSubmit)}
            className="contact-modal-form"
          >
            <Row className="g-3">
              <Col md={6}>
                <Controller
                  name="firstName"
                  control={control}
                  render={({ field }) => (
                    <InputField
                      {...field}
                      label="FIRST NAME"
                      placeholder="FIRST NAME"
                    />
                  )}
                />
                {errors.firstName && (
                  <p className="text-danger small mt-1 mb-1">
                    {errors.firstName.message}
                  </p>
                )}
              </Col>
              <Col md={6}>
                <Controller
                  name="lastName"
                  control={control}
                  render={({ field }) => (
                    <InputField
                      {...field}
                      label="LAST NAME"
                      placeholder="LAST NAME"
                    />
                  )}
                />
                {errors.lastName && (
                  <p className="text-danger small mt-1 mb-1">
                    {errors.lastName.message}
                  </p>
                )}
              </Col>
              <Col md={6}>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <InputField
                      {...field}
                      type="email"
                      label="EMAIL"
                      placeholder="YOUR EMAIL"
                    />
                  )}
                />
                {errors.email && (
                  <p className="text-danger small mt-1 mb-1">
                    {errors.email.message}
                  </p>
                )}
              </Col>
              <Col md={6}>
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <PhoneInput
                      {...field}
                      label="PHONE NUMBER"
                      selectedCountryCode={selectedCountryCode}
                      onCountryChange={(isoCode) =>
                        setValue("country", isoCode)
                      }
                    />
                  )}
                />
                {errors.phone && (
                  <p className="text-danger small mt-1 mb-1">
                    {errors.phone.message}
                  </p>
                )}
              </Col>
              <Col md={12}>
                <Controller
                  name="country"
                  control={control}
                  render={({ field }) => (
                    <Field label="COUNTRY">
                      <div className="glass-input-wrapper overflow-visible">
                        <Select
                          {...field}
                          className="contact-country-select"
                          classNamePrefix="contact-country-select"
                          options={countryOptions}
                          value={
                            countryOptions.find(
                              (option) => option.value === field.value,
                            ) || null
                          }
                          onChange={(option) =>
                            field.onChange(option ? option.value : "")
                          }
                          placeholder="-- select one --"
                        />
                      </div>
                    </Field>
                  )}
                />
                {errors.country && (
                  <p className="text-danger small mt-1 mb-1">
                    {errors.country.message}
                  </p>
                )}
              </Col>
              <Col md={12}>
                <Controller
                  name="message"
                  control={control}
                  render={({ field }) => (
                    <InputField
                      {...field}
                      as="textarea"
                      rows={4}
                      label="MESSAGE"
                      placeholder="YOUR MESSAGE"
                    />
                  )}
                />
                {errors.message && (
                  <p className="text-danger small mt-1 mb-1">
                    {errors.message.message}
                  </p>
                )}
              </Col>
              <Col md={12}>
                <Controller
                  name="privacyPolicy"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      {...field}
                      label={
                        <>
                          I've read and agree to the{" "}
                          <Link href="/privacy-policy" className="privacy-link">
                            Privacy Policy
                          </Link>
                        </>
                      }
                      checked={field.value}
                    />
                  )}
                />
                {errors.privacyPolicy && (
                  <p className="text-danger small mt-1 mb-1">
                    {errors.privacyPolicy.message}
                  </p>
                )}
              </Col>
            </Row>

            <div className="modal-submit-container">
              <ThemeButton type="submit" disabled={isPending}>
                {isPending ? "Sending..." : "Submit"}
              </ThemeButton>
            </div>
          </Form>
        </div>
      </Modal>

      <ThankYouModal
        isOpen={showThankYou}
        onClose={() => setShowThankYou(false)}
        message="Thank you for reaching out! We’ve received your details and a Blanca representative will get in touch with you shortly to discuss your requirements."
      />
    </>
  );
};

export default ContactModal;
