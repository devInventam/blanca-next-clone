import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { Controller } from "react-hook-form";
import Select from "react-select";
import { Country } from "country-state-city";
import InputField from "../../components/common/InputField/InputField";
import TextArea from "../../components/common/TextArea/TextArea";
import Dropdown from "../../components/common/Dropdown/Dropdown";
import Field from "../../components/common/Field/Field";

const AgencyForm = ({
  control,
  activeTab,
  setActiveTab,
  agentType,
  errors,
  trigger,
  individualAgentTypeLabel,
  isSubmitting,
  submitError,
}) => {
  const countryOptions = React.useMemo(
    () =>
      Country.getAllCountries().map((country) => ({
        label: country?.name,
        value: country?.name,
      })),
    [],
  );

  const handleNextStep = React.useCallback(async () => {
    const isValid = await trigger(["agentType", "fullname", "phone", "email"], {
      shouldFocus: true,
    });

    if (isValid) {
      setActiveTab("address-details");
    }
  }, [setActiveTab, trigger]);

  return (
    <>
      {/* ========================= */}
      {/* Tab 1: Personal Details */}
      {/* ========================= */}
      {activeTab === "personal-details" && (
        <div className="tab-content active">
          <div className="section-header"> Personal Details</div>

          <Row className="gx-4 gy-4 mb-4">
            <Col md={6}>
              <Controller
                name="agentType"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Dropdown
                    label="Real Estate Agent Type*"
                    placeholder="-- select one --"
                    name={field.name}
                    options={["Agency Registration", individualAgentTypeLabel]}
                    value={field.value}
                    onChange={(e) => field.onChange(e?.target?.value)}
                  />
                )}
              />
              {errors?.agentType && (
                <p className="text-danger small mt-1 mb-1">
                  {errors?.agentType?.message}
                </p>
              )}
              {agentType === individualAgentTypeLabel && (
                <p className="note-text mt-3">
                  Note: On reference you will get reward.
                </p>
              )}
            </Col>
            {agentType === "Agency Registration" && (
              <Col md={6}>
                <Controller
                  name="gstin"
                  control={control}
                  render={({ field }) => (
                    <InputField
                      label="GSTIN"
                      placeholder="GSTIN"
                      name={field.name}
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                      // extra={<Button type="button" className="validate-btn">Validate</Button>}
                    />
                  )}
                />
                {errors?.gstin && (
                  <p className="text-danger small mt-1 mb-1">
                    {errors?.gstin?.message}
                  </p>
                )}
              </Col>
            )}
          </Row>
          <Row className="gx-4 gy-4">
            <Col md={6}>
              <Controller
                name="agency_name"
                control={control}
                render={({ field }) => (
                  <InputField
                    label="Agency Name"
                    placeholder="Enter Agency Name"
                    name={field.name}
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                )}
              />
              {errors?.agency_name && (
                <p className="text-danger small mt-1 mb-1">
                  {errors?.agency_name?.message}
                </p>
              )}
            </Col>
            <Col md={6}>
              <Controller
                name="fullname"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <InputField
                    label="Name *"
                    placeholder="Enter Name"
                    name={field.name}
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    required
                  />
                )}
              />
              {errors?.fullname && (
                <p className="text-danger small mt-1 mb-1">
                  {errors?.fullname?.message}
                </p>
              )}
            </Col>
            <Col md={6}>
              <Controller
                name="phone"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <InputField
                    label="Mobile Number *"
                    placeholder="Enter Mobile Number"
                    name={field.name}
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    required
                    type="number"
                    // extra={<Button type="button" className="otp-btn">Send OTP</Button>}
                  />
                )}
              />
              {errors?.phone && (
                <p className="text-danger small mt-1 mb-1">
                  {errors?.phone?.message}
                </p>
              )}
            </Col>
            <Col md={6}>
              <Controller
                name="reraNo"
                control={control}
                render={({ field }) => (
                  <InputField
                    label="RERA Registration No."
                    placeholder="Enter RERA Number"
                    name={field.name}
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                )}
              />
              {errors?.reraNo && (
                <p className="text-danger small mt-1 mb-1">
                  {errors?.reraNo?.message}
                </p>
              )}
            </Col>
            <Col md={6}>
              <Controller
                name="email"
                control={control}
                rules={{
                  required: true,
                  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                }}
                render={({ field }) => (
                  <InputField
                    type="email"
                    label="Email *"
                    placeholder="Enter Email"
                    name={field.name}
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    required
                  />
                )}
              />
              {errors?.email && (
                <p className="text-danger small mt-1 mb-1">
                  {errors?.email?.message}
                </p>
              )}
            </Col>
            <Col md={6}>
              <Controller
                name="pan"
                control={control}
                render={({ field }) => (
                  <InputField
                    label="PAN"
                    placeholder="Enter PAN Number"
                    name={field.name}
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                )}
              />
              {errors?.pan && (
                <p className="text-danger small mt-1 mb-1">
                  {errors?.pan?.message}
                </p>
              )}
            </Col>

            {/* {formData.agentType === "Individual Registration" && (
                            <Col md={12}>
                                <div className="aadhaar-group mt-2">
                                    <Button type="button" className="aadhaar-btn">Verify Aadhaar</Button>
                                    <Button type="button" className="check-status-btn">Check Status</Button>
                                </div>
                            </Col>
                        )} */}
          </Row>

          <div className="tab-nav-btns mt-5">
            <Button
              type="button"
              className="theme-btn"
              onClick={handleNextStep}
            >
              Next: Address
            </Button>
          </div>
        </div>
      )}

      {/* ========================= */}
      {/* Tab 2: Address */}
      {/* ========================= */}
      {activeTab === "address-details" && (
        <div className="tab-content active">
          <div className="section-header">Address Details</div>

          <Row className="gx-4 gy-4">
            <Col md={6}>
              <Controller
                name="country"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Field label="Country *">
                    <div className="glass-input-wrapper overflow-visible">
                      <Select
                        {...field}
                        className="registration-country-select"
                        classNamePrefix="registration-country-select"
                        options={countryOptions}
                        value={
                          countryOptions.find(
                            (option) => option?.value === field?.value,
                          ) || null
                        }
                        onChange={(option) =>
                          field?.onChange(option ? option?.value : "")
                        }
                        placeholder="-- select one --"
                        menuPortalTarget={
                          typeof window !== "undefined" ? document.body : null
                        }
                        menuPosition="fixed"
                      />
                    </div>
                  </Field>
                )}
              />
              {errors?.country && (
                <p className="text-danger small mt-1 mb-1">
                  {errors.country.message}
                </p>
              )}
            </Col>
            <Col md={6}>
              <Controller
                name="pinCode"
                control={control}
                render={({ field }) => (
                  <InputField
                    label="PinCode"
                    placeholder="Enter PinCode"
                    name={field.name}
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                )}
              />
              {errors?.pinCode && (
                <p className="text-danger small mt-1 mb-1">
                  {errors?.pinCode?.message}
                </p>
              )}
              <p className="note-text mt-2">
                Note*:Please enter 0 in PinCode if you don't have Pincode
              </p>
            </Col>
            <Col md={12}>
              <Controller
                name="address"
                control={control}
                render={({ field }) => (
                  <TextArea
                    label="Address *"
                    placeholder="Enter Address"
                    name={field.name}
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                )}
              />
              {errors?.address && (
                <p className="text-danger small mt-1 mb-1">
                  {errors?.address?.message}
                </p>
              )}
            </Col>
          </Row>

          {submitError ? (
            <div className="mt-3">
              <p className="text-danger mb-0">{submitError}</p>
            </div>
          ) : null}

          <div className="tab-nav-btns d-flex justify-content-between">
            <Button
              type="button"
              className="theme-btn"
              onClick={() => setActiveTab("personal-details")}
              disabled={isSubmitting}
            >
              Previous
            </Button>

            <Button
              type="submit"
              className="theme-btn bs-font-montserrat"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Register Now"}
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default AgencyForm;
