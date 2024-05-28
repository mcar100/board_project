import { useState } from "react";
import { Form, CardLink } from "react-bootstrap";
import CardLayout from "./Layout/CardLayout";
import cookies from "react-cookies";

function FormFrame({ children, formRef, id, className, onSubmit }) {
  return (
    <CardLayout>
      {" "}
      <Form id={id} className={className} onSubmit={onSubmit} ref={formRef}>
        {children}
      </Form>
    </CardLayout>
  );
}

function FormInput({
  type,
  id,
  className,
  title,
  name,
  placeholder,
  cookieId,
  ...otherProps
}) {
  const cookie = cookies.load(cookieId);
  const [inputValue, setInputValue] = useState(cookie ? cookie : "");
  const handleChangeInput = (e) => setInputValue(e.target.value);

  return (
    <Form.Group className="mb-3">
      <Form.Control
        type={type ? type : "text"}
        id={id}
        className={
          className ? `${className} form-control-user` : "form-control-user"
        }
        data-title={title}
        name={name}
        placeholder={placeholder ? placeholder : "내용을 입력해주세요."}
        onChange={handleChangeInput}
        value={inputValue}
        {...otherProps}
      ></Form.Control>
    </Form.Group>
  );
}

function FormButton({ isSubmit, id, className, onClick, value }) {
  return (
    <Form.Group className="mb-3">
      <Form.Control
        type={isSubmit ? "submit" : "button"}
        id={id}
        className={
          className
            ? `${className} btn-primary btn-user btn-block h-100`
            : "btn-primary btn-user btn-block h-100"
        }
        value={value}
        onClick={onClick}
      ></Form.Control>
    </Form.Group>
  );
}

function FormCheckBox({ id, name, className, text, cookieId }) {
  const isCookie = cookies.load(cookieId) ? true : false;
  const [isChecked, setIsChecked] = useState(isCookie);
  const handleCheckBox = () => {
    setIsChecked(!isChecked);
  };
  return (
    <Form.Group className="mb-3">
      <div className="custom-control custom-checkbox small">
        <input
          id={id}
          name={name}
          type="checkbox"
          className={
            className
              ? `${className} custom-control-input`
              : "custom-control-input"
          }
          size={"sm"}
          checked={isChecked}
          value={isChecked}
          onChange={handleCheckBox}
        ></input>
        <label className="custom-control-label" htmlFor={name}>
          {text}
        </label>
      </div>
    </Form.Group>
  );
}

function FormLink({ href, className, text }) {
  return (
    <div className={className ? `${className} text-center` : "text-center"}>
      <CardLink className="small" href={href}>
        {text}
      </CardLink>
    </div>
  );
}

export {
  FormFrame as Frame,
  FormButton as Button,
  FormInput as Input,
  FormCheckBox as CheckBox,
  FormLink as Link,
};
