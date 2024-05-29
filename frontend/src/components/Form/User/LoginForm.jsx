import * as Form from "../../../components/Form/Form";
import cookies from "react-cookies";

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

export { CookieFormInput as Input, CookieFormCheckBox as CheckBox };
