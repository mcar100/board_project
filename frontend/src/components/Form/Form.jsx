import { useState, useEffect } from "react";
import { Form, CardLink } from "react-bootstrap";
import CardLayout from "../Layout/CardLayout";

function FormFrame({ children, formRef, className, onSubmit, text, expand }) {
  return (
    <CardLayout title={text} expand={expand ? true : false}>
      {" "}
      <Form className={className} onSubmit={onSubmit} ref={formRef}>
        {children}
      </Form>
    </CardLayout>
  );
}

function FormInput({
  inputRef,
  type,
  className,
  title,
  name,
  placeholder,
  defaultValue,
  ...otherProps
}) {
  const [inputValue, setInputValue] = useState("");
  const handleChangeInput = (e) => setInputValue(e.target.value);

  useEffect(() => {
    if (!defaultValue) return;
    setInputValue(defaultValue);
  }, []);

  return (
    <Form.Group className="mb-3">
      <Form.Control
        ref={inputRef}
        type={type ? type : "text"}
        className={
          className ? `${className} form-control-user` : "form-control-user"
        }
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

function FormButton({ isSubmit, className, onClick, value }) {
  return (
    <Form.Group className="mb-3">
      <Form.Control
        type={isSubmit ? "submit" : "button"}
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

function FormCheckBox({ name, className, text, defaultValue }) {
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
