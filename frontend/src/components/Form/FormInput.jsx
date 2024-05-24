import { Form } from "react-bootstrap";

function FormInput({
  type,
  id,
  className,
  title,
  name,
  value,
  onChange,
  placeholder,
  ...otherProps
}) {
  const handleChangeInput = (e) => {
    onChange(e);
  };

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
        value={value}
        {...otherProps}
      ></Form.Control>
    </Form.Group>
  );
}

export default FormInput;
