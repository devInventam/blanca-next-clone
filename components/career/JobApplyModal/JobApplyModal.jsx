import React, { useEffect } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { Icon } from "@iconify/react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Modal from "../../common/Modal/Modal";
import "./JobApplyModal.css";
import InputField from "../../common/InputField/InputField";
import PhoneInput from "../../common/PhoneInput/PhoneInput";
import Dropdown from "../../common/Dropdown/Dropdown";
import MediaDropzone from "../../common/MediaDropzone/MediaDropzone";
import TextArea from "../../common/TextArea/TextArea";
import ThemeButton from "../../common/Button/ThemeBtn";
import ThankYouModal from "../../common/ThankYouModal/ThankYouModal";
import { jobApplySchema } from "../../../schema/validationSchema";
import { useApplyCareer } from "../../../hooks/useCareers";
import { acceptedDocsExtensions } from "../../../utils/constant";
import { useDocumentUploader } from "../../../utils/useDocumentUploader";

const defaultValues = {
  fullName: "",
  email: "",
  phoneNumber: "",
  position: "",
  currentCtc: "",
  expectedCtc: "",
  experience: "",
  joiningPreference: "",
  resume: "",
  description: "",
};

const JobApplyModal = ({ isOpen, onClose, job, categories }) => {
  const [showThankYou, setShowThankYou] = React.useState(false);
  const { mutate: applyCareer, isPending } = useApplyCareer();
  const { removeUploadedFile } = useDocumentUploader();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm({
    resolver: yupResolver(jobApplySchema),
    mode: "onChange",
    defaultValues,
  });

  useEffect(() => {
    if (!isOpen) return;
    // From a specific card: pre-select that job's category (e.g. Sale). Quick Apply: job is null, leave position empty.
    const positionValue =
      job && typeof job === "object" && job.parent_category_id
        ? String(job.parent_category_id)
        : "";
    reset({
      ...defaultValues,
      position: positionValue,
    });
  }, [isOpen, job, reset]);

  const positionOptions = React.useMemo(
    () =>
      (categories || []).map((cat) => ({
        label: cat.career_category_name,
        value: String(cat.career_category_career_category_id ?? ""),
      })),
    [categories],
  );
  const joiningPreferenceOptions = React.useMemo(
    () => [
      { label: "Immediate Joiner", value: "immediate_joiner" },
      { label: "Notice Period", value: "notice_period" },
    ],
    [],
  );

  const onSubmit = React.useCallback(
    async (data) => {
      const payload = {
        career_category_id: data.position,
        fullname: data.fullName,
        email: data.email,
        phone_number: data.phoneNumber,
        current_ctc: data.currentCtc,
        expected_ctc: data.expectedCtc,
        experience: data.experience,
        priority_for_joining: data.joiningPreference,
        resume: data.resume,
        pitch: data.description,
      };

      applyCareer(payload, {
        onSuccess: () => {
          setShowThankYou(true);
          reset(defaultValues);
        },
        onError: () => {
          alert("Something went wrong. Please try again.");
        },
      });
    },
    [applyCareer, reset],
  );

  const handleClose = React.useCallback(() => {
    const resumePath = getValues("resume");
    if (resumePath) {
      removeUploadedFile(resumePath).catch(() => {});
    }
    reset(defaultValues);
    onClose();
  }, [getValues, removeUploadedFile, reset, onClose]);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        title="Apply For Position"
        size="lg"
      >
        <Form onSubmit={handleSubmit(onSubmit)} className="job-apply-form">
          <Row>
            <Col md={6} className="mb-3">
              <Controller
                name="fullName"
                control={control}
                render={({ field }) => (
                  <InputField
                    {...field}
                    label="Full Name"
                    placeholder="Full Name"
                  />
                )}
              />
              {errors.fullName && (
                <p className="text-danger small mt-1 mb-1">
                  {errors.fullName.message}
                </p>
              )}
            </Col>
            <Col md={6} className="mb-3">
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <InputField
                    {...field}
                    type="email"
                    label="Email Address"
                    placeholder="Email Address"
                  />
                )}
              />
              {errors.email && (
                <p className="text-danger small mt-1 mb-1">
                  {errors.email.message}
                </p>
              )}
            </Col>
            <Col md={6} className="mb-3">
              <Controller
                name="phoneNumber"
                control={control}
                render={({ field }) => (
                  <PhoneInput {...field} label="PHONE NUMBER" />
                )}
              />
              {errors.phoneNumber && (
                <p className="text-danger small mt-1 mb-1">
                  {errors.phoneNumber.message}
                </p>
              )}
            </Col>
            <Col md={6} className="mb-3">
              <Controller
                name="position"
                control={control}
                render={({ field }) => (
                  <Dropdown
                    label="What position are you interested in?"
                    placeholder="Select Position or Role"
                    name="position"
                    options={positionOptions}
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                )}
              />
              {errors.position && (
                <p className="text-danger small mt-1 mb-1">
                  {errors.position.message}
                </p>
              )}
            </Col>
            <Col md={12} className="mb-3">
              <Controller
                name="resume"
                control={control}
                render={({ field }) => (
                  <MediaDropzone
                    label="Upload Resume"
                    value={field.value}
                    onChange={field.onChange}
                    uploadType="resume"
                    acceptExtensions={acceptedDocsExtensions}
                    maxSize={{ size: 2, type: "MB" }}
                    noteMsg="PDF or DOC/DOCX only."
                    errorMsg={errors.resume?.message}
                  />
                )}
              />
              {errors.resume && (
                <p className="text-danger small mt-1 mb-1">
                  {errors.resume.message}
                </p>
              )}
            </Col>
            <Col md={6} className="mb-3">
              <Controller
                name="currentCtc"
                control={control}
                render={({ field }) => (
                  <InputField
                    {...field}
                    type="text"
                    label="Current CTC"
                    placeholder="Current CTC"
                  />
                )}
              />
              {errors.currentCtc && (
                <p className="text-danger small mt-1 mb-1">
                  {errors.currentCtc.message}
                </p>
              )}
            </Col>
            <Col md={6} className="mb-3">
              <Controller
                name="expectedCtc"
                control={control}
                render={({ field }) => (
                  <InputField
                    {...field}
                    type="text"
                    label="Expected CTC"
                    placeholder="Expected CTC"
                  />
                )}
              />
              {errors.expectedCtc && (
                <p className="text-danger small mt-1 mb-1">
                  {errors.expectedCtc.message}
                </p>
              )}
            </Col>
            <Col md={6} className="mb-3">
              <Controller
                name="experience"
                control={control}
                render={({ field }) => (
                  <InputField
                    {...field}
                    type="text"
                    label="Experience"
                    placeholder="Experience (e.g. 3.5 years)"
                  />
                )}
              />
              {errors.experience && (
                <p className="text-danger small mt-1 mb-1">
                  {errors.experience.message}
                </p>
              )}
            </Col>
            <Col md={6} className="mb-3">
              <Controller
                name="joiningPreference"
                control={control}
                render={({ field }) => (
                  <Dropdown
                    label="Joining Preference"
                    placeholder="Select Joining Type"
                    name="joiningPreference"
                    options={joiningPreferenceOptions}
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                )}
              />
              {errors.joiningPreference && (
                <p className="text-danger small mt-1 mb-1">
                  {errors.joiningPreference.message}
                </p>
              )}
            </Col>
            <Col md={12} className="mb-3">
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <TextArea
                    {...field}
                    label="What makes you a great fit?"
                    name="description"
                    rows={3}
                    placeholder="Describe your experience and why you are interested..."
                  />
                )}
              />
              {errors.description && (
                <p className="text-danger small mt-1 mb-1">
                  {errors.description.message}
                </p>
              )}
            </Col>
          </Row>
          <div className="apply-for-position-btn">
            <ThemeButton type="submit" className="py-3" disabled={isPending}>
              {isPending ? "Sending..." : "Submit Application"}
              <Icon icon="lucide:send" className="ms-2" />
            </ThemeButton>
          </div>
        </Form>
      </Modal>
      <ThankYouModal
        isOpen={showThankYou}
        onClose={() => {
          setShowThankYou(false);
          handleClose();
        }}
        title="Application Sent"
        message="Thank you for applying! Our HR team will review your profile and get in touch if your qualifications match our requirements."
      />
    </>
  );
};

export default JobApplyModal;
