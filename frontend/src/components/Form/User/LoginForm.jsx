import { useState } from "react";
import * as Form from "../../../components/Form/Form";
import cookies from "react-cookies";
import ReCAPTCHA from "react-google-recaptcha";

function CookieFormInput({
  type,
  title,
  name,
  placeholder,
  cookieId,
  ...otherProps
}) {
  const cookieValue = cookies.load(cookieId);
  return (
    <Form.Input
      type={type}
      name={name}
      title={title}
      placeholder={placeholder}
      defaultValue={cookieValue}
      {...otherProps}
    />
  );
}

function CookieFormCheckBox({ name, className, text, cookieId }) {
  const isCookie = cookies.load(cookieId) ? true : false;
  return (
    <Form.CheckBox
      name={name}
      className={className}
      text={text}
      defaultValue={isCookie}
    />
  );
}

function RecaptchaForm({ setIsVerify }) {
  const siteKey = "6Lf3CtopAAAAAGgqtQkIPw6l2pY16WmfgpgenWtb";
  const handleChange = () => {
    setIsVerify(true);
  };
  const handleExpired = () => {
    setIsVerify(false);
  };

  return (
    <Form.Group className="form-group flex justify-content-center">
      <ReCAPTCHA
        sitekey={siteKey}
        onChange={handleChange}
        onExpired={handleExpired}
      />
    </Form.Group>
  );
}

export {
  CookieFormInput as Input,
  CookieFormCheckBox as CheckBox,
  RecaptchaForm as Recaptcha,
};
