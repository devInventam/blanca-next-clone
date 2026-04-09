import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { Controller } from "react-hook-form";
import Dropdown from "../../components/common/Dropdown/Dropdown";
import InputField from "../../components/common/InputField/InputField";
import TextArea from "../../components/common/TextArea/TextArea";
import IndividualFields from "./IndividualFields";

const IndividualForm = ({
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
  // CHANGE: Individual form extracted into its own component.

  const handleNextStep = React.useCallback(async () => {
    const isValid = await trigger(
      ["agentType", "fullname", "phone", "email", "address"],  
      { shouldFocus: true },
    );

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
          <div className="section-header">Personal Details</div>

          <Row className="gx-4 gy-4 mb-3">
            <Col md={6}>
              <Controller
                name="agentType"
                control={control}
                render={({ field }) => (
                  <Dropdown
                    label="Real Estate Agent Type*"
                    placeholder="-- select one --"
                    name={field?.name}
                    options={["Agency Registration", individualAgentTypeLabel]}
                    value={field?.value}
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
            {/* CHANGE: moved Name field beside Real Estate Agent Type* */}
            <Col md={6}>
              <Controller
                name="fullname"
                control={control}
                render={({ field }) => (
                  <InputField
                    label="Name *"
                    placeholder="Enter Name"
                    name={field?.name}
                    value={field?.value}
                    onChange={(e) => field?.onChange(e?.target?.value)}
                  />
                )}
              />
              {errors?.fullname && (
                <p className="text-danger small mt-1 mb-1">
                  {errors?.fullname?.message}
                </p>
              )}
            </Col>
          </Row>

          {/* CHANGE: name is rendered above; exclude it here to avoid duplication */}
          <IndividualFields
            control={control}
            errors={errors}
            exclude={["fullname"]}
          />

          <div className="tab-nav-btns mt-4 mt-lg-5">
            <Button
              type="button"
              className="theme-btn"
              onClick={handleNextStep}
            >
              Next: Refer
            </Button>
          </div>
        </div>
      )}

      {/* ========================= */}
      {/* Tab 2: Refer */}
      {/* ========================= */}
      {activeTab === "address-details" && (
        <div className="tab-content active">
          <div className="section-header">Refer</div>

          {/* CHANGE: add spacing between refer inputs */}
          <Row className="gx-4 gy-4 mb-4">
            <Col md={6}>
              {/* CHANGE: "How did you hear about us?" dropdown for Individual only. */}
              <Controller
                name="heardAboutUs"
                control={control}
                render={({ field }) => (
                  <Dropdown
                    label="How did you hear about us? *"
                    placeholder="-- select one --"
                    name={field?.name}
                    options={["Friends", "Family", "Others"]}
                    value={field?.value}
                    onChange={(e) => field.onChange(e?.target?.value)}
                  />
                )}
              />
              {errors?.heardAboutUs && (
                <p className="text-danger small mt-1 mb-1">
                  {errors?.heardAboutUs?.message}
                </p>
              )}
            </Col>
            {/* CHANGE: keep Name beside Refer dropdown (same layout as Personal Details). */}
            <Col md={6}>
              <Controller
                name="referFullname"
                control={control}
                render={({ field }) => (
                  <InputField
                    label="Name *"
                    placeholder="Enter Name"
                    name={field?.name}
                    value={field?.value}
                    onChange={(e) => field?.onChange(e?.target?.value)}
                  />
                )}
              />
              {errors?.referFullname && (
                <p className="text-danger small mt-1 mb-1">
                  {errors?.referFullname?.message}
                </p>
              )}
            </Col>
          </Row>

          <Row className="gx-4 gy-4 mt-3">
            <Col md={6}>
              <Controller
                name="referPhone"
                control={control}
                render={({ field }) => (
                  <InputField
                    label="Mobile Number *"
                    placeholder="Enter Mobile Number"
                    name={field?.name}
                    value={field?.value}
                    onChange={(e) => field?.onChange(e?.target?.value)}
                  />
                )}
              />
              {errors?.referPhone && (
                <p className="text-danger small mt-1 mb-1">
                  {errors?.referPhone?.message}
                </p>
              )}
            </Col>

            <Col md={6}>
              <Controller
                name="referEmail"
                control={control}
                render={({ field }) => (
                  <InputField
                    type="email"
                    label="Email *"
                    placeholder="Enter Email"
                    name={field?.name}
                    value={field?.value}
                    onChange={(e) => field?.onChange(e?.target?.value)}
                  />
                )}
              />
              {errors?.referEmail && (
                <p className="text-danger small mt-1 mb-1">
                  {errors?.referEmail?.message}
                </p>
              )}
            </Col>

            <Col md={12}>
              <Controller
                name="referAddress"
                control={control}
                render={({ field }) => (
                  <TextArea
                    label="Address *"
                    placeholder="Enter Address"
                    name={field?.name}
                    value={field?.value}
                    onChange={(e) => field?.onChange(e?.target?.value)}
                  />
                )}
              />
              {errors?.referAddress && (
                <p className="text-danger small mt-1 mb-1">
                  {errors?.referAddress?.message}
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

export default IndividualForm;
