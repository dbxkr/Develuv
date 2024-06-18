import React, { useState, useEffect } from "react";
import ProgressBar from "./ProgressBar";
import Quiz from "./Quiz";
import SignupStep2 from "./SignupStep2";
import Regi3Form from "./Register3/Regi3Form";
import Nbti from "./Nbti";
import Regi5Form from "./Register5/Regi5Form";
import "./register.css";
import { redirect, useLocation } from "react-router-dom";

function RegisterPage() {
  const [progress, setProgress] = useState(1);
  const [formData, setFormData] = useState({
    user_id: "",
    user_pw: "",
    user_pw_confirm: "",
    user_email: "",
    verification_code: "",
    user_name: "",
    user_birth: "",
    user_phone: "",
    user_gender: "",
    user_profile: "",
    user_provider_id: "",
    user_heart: "",
    user_code: "",
    user_job: "",
    user_address: "",
    user_nbti: "",
  });

  const [formErrors, setFormErrors] = useState({
    user_id: "",
    user_pw: "",
    user_pw_confirm: "",
    user_email: "",
    verification_code: "",
    user_name: "",
    user_birth: "",
    user_phone: "",
  });

  const [fieldTouched, setFieldTouched] = useState({
    user_id: false,
    user_pw: false,
    user_pw_confirm: false,
    user_email: false,
    verification_code: false,
    user_name: false,
    user_birth: false,
    user_phone: false,
  });

  const { state } = useLocation();

  return (
    <div>
      <ProgressBar progress={progress} />
      {progress == 1 && <Quiz setProgress={setProgress} />}
      {progress == 2 && (
        <SignupStep2
          progress={progress}
          setProgress={setProgress}
          formData={formData}
          setFormData={setFormData}
          state={state}
          formErrors={formErrors}
          setFormErrors={setFormErrors}
          fieldTouched={fieldTouched}
          setFieldTouched={setFieldTouched}
        />
      )}
      {progress == 3 && (
        <Regi3Form
          progress={progress}
          setProgress={setProgress}
          formData={formData}
          setFormData={setFormData}
          state={state}
          formErrors={formErrors}
          setFormErrors={setFormErrors}
          fieldTouched={fieldTouched}
          setFieldTouched={setFieldTouched}
        />
      )}
      {progress == 4 && (
        <Nbti
          progress={progress}
          setProgress={setProgress}
          formData={formData}
          setFormData={setFormData}
          state={state}
          formErrors={formErrors}
          setFormErrors={setFormErrors}
          fieldTouched={fieldTouched}
          setFieldTouched={setFieldTouched}
        />
      )}
      {progress == 5 && (
        <Regi5Form
          progress={progress}
          setProgress={setProgress}
          formData={formData}
          setFormData={setFormData}
          state={state}
          formErrors={formErrors}
          setFormErrors={setFormErrors}
          fieldTouched={fieldTouched}
          setFieldTouched={setFieldTouched}
        />
      )}
      {(progress < 1 || progress > 5) && <redirect to="/" />}
    </div>
  );
}

export default RegisterPage;
