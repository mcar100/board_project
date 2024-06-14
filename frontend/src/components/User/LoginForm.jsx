import * as Form from "../../components/Form/Form";
import ReCAPTCHA from "react-google-recaptcha";
import { getCookie } from "../../utils/cookies";

function CookieFormInput({
  type,
  title,
  name,
  placeholder,
  cookieId,
  ...otherProps
}) {
  const cookieValue = getCookie(cookieId);
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
  const isCookie = getCookie(cookieId) ? true : false;
  return (
    <Form.CheckBox
      name={name}
      className={className}
      text={text}
      defaultValue={isCookie}
    />
  );
}

function RecaptchaForm({ verifyOn, verifyOff }) {
  const siteKey = "6Lf3CtopAAAAAGgqtQkIPw6l2pY16WmfgpgenWtb";
  const handleChange = () => {
    verifyOn();
  };
  const handleExpired = () => {
    verifyOff();
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
