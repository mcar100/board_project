import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, CardLink } from "react-bootstrap";
import { preventInputs, replaceInputs } from "../../utils/validator";
import AuthCardLayout from "../Layout/AuthCardLayout";

function FormFrame({ children, formRef, className, onSubmit, text, expand }) {
  return (
    <AuthCardLayout title={text} expand={expand ? true : false}>
      {" "}
      <Form className={className} onSubmit={onSubmit} ref={formRef}>
        {children}
      </Form>
    </AuthCardLayout>
  );
}

function FormGroup({ className = "", children }) {
  return <Form.Group className={className}>{children}</Form.Group>;
}

function FormText({ className = "", children }) {
  return <Form.Text className={`form-msg ${className}`}>{children}</Form.Text>;
}

function FormInput({
  inputRef,
  type,
  className = "",
  title,
  name,
  placeholder,
  defaultValue,
  ...otherProps
}) {
  const [inputValue, setInputValue] = useState("");
  const handleChangeInput = (e) => {
    if (!inputRef) {
      setInputValue(e.target.value);
      return;
    }
    const preventedValue = preventInputs(inputRef.current.name, e.target.value);
    const replacedValue = replaceInputs(inputRef.current.name, preventedValue);
    setInputValue(replacedValue);
  };

  useEffect(() => {
    if (!defaultValue) return;
    setInputValue(defaultValue);
  }, [defaultValue]);

  return (
    <Form.Group className="mb-3">
      <Form.Control
        ref={inputRef}
        type={type ? type : "text"}
        className={`form-control-user ${className}`}
        title={title}
        name={name}
        placeholder={placeholder ? placeholder : "내용을 입력해주세요."}
        onChange={handleChangeInput}
        value={inputValue}
        {...otherProps}
      ></Form.Control>
    </Form.Group>
  );
}

function FormButton({
  isSubmit,
  className = "",
  onClick,
  value,
  ...otherProps
}) {
  return (
    <Form.Group className="mb-3">
      <Form.Control
        type={isSubmit ? "submit" : "button"}
        className={`btn-primary btn-user btn-block h-100 ${className}`}
        value={value}
        onClick={onClick}
        {...otherProps}
      ></Form.Control>
    </Form.Group>
  );
}

function FormCheckBox({ name, className = "", text, defaultValue }) {
  const [isChecked, setIsChecked] = useState(defaultValue);
  const handleCheckBox = () => {
    setIsChecked(!isChecked);
  };
  return (
    <Form.Group className="mb-3">
      <div className="custom-control custom-checkbox small">
        <input
          id={name}
          name={name}
          type="checkbox"
          className={`custom-control-input ${className}`}
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

function FormLink({ href, className = "", text }) {
  const navigate = useNavigate();
  const handleLinkClick = (e) => {
    e.preventDefault();
    navigate(href);
  };
  return (
    <div className={`text-center ${className}`} onClick={handleLinkClick}>
      <CardLink className="small" href={"#"}>
        {text}
      </CardLink>
    </div>
  );
}

export {
  FormFrame as Frame,
  FormText as Text,
  FormGroup as Group,
  FormInput as Input,
  FormButton as Button,
  FormCheckBox as CheckBox,
  FormLink as Link,
};
