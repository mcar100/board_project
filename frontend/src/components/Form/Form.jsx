import { useEffect } from "react";
import { Form, CardLink } from "react-bootstrap";
import { useLinkNavigate } from "../../context/NavigationContext";
import { useInput, useCheck } from "../../hooks/useInput";
import AuthCardLayout from "../Layout/AuthCardLayout";

function AuthFormFrame({
  children,
  formRef,
  className,
  onSubmit,
  text,
  expand,
}) {
  return (
    <AuthCardLayout title={text} expand={expand ? true : false}>
      {" "}
      <Form className={className} onSubmit={onSubmit} ref={formRef}>
        {children}
      </Form>
    </AuthCardLayout>
  );
}

function FormFrame({ children, formRef, className, onSubmit }) {
  return (
    <Form className={className} onSubmit={onSubmit} ref={formRef}>
      {children}
    </Form>
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
  const { inputValue, handleChangeInput } = useInput(defaultValue, inputRef);

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

function FormTextarea({
  className = "",
  name,
  placeholder,
  defaultValue,
  submitDetected,
  setSubmitDetected,
  ...otherProps
}) {
  const { inputValue, handleChangeInput, resetInput } = useInput(defaultValue);

  useEffect(() => {
    if (submitDetected) {
      resetInput();
      setSubmitDetected(false);
    }
  }, [submitDetected]);

  return (
    <Form.Control
      as="textarea"
      name="content"
      className={className}
      placeholder={placeholder ? placeholder : "내용"}
      style={{ resize: "none" }}
      onChange={handleChangeInput}
      value={inputValue}
      {...otherProps}
    ></Form.Control>
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
  const { isChecked, checkReverse } = useCheck(defaultValue);
  const handleCheckBox = () => {
    checkReverse();
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
  const navigate = useLinkNavigate();
  return (
    <div
      className={`text-center ${className}`}
      onClick={(e) => {
        e.preventDefault();
        navigate(href);
      }}
    >
      <CardLink className="small" href={"#"}>
        {text}
      </CardLink>
    </div>
  );
}

export {
  AuthFormFrame as AuthFrame,
  FormFrame as Frame,
  FormText as Text,
  FormGroup as Group,
  FormInput as Input,
  FormTextarea as Textarea,
  FormButton as Button,
  FormCheckBox as CheckBox,
  FormLink as Link,
};
