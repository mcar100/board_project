import { Form } from "react-bootstrap";

function FormCheckBox({ id, name, value, text }) {
  return (
    <Form.Group className="mb-3">
      <div className="custom-control custom-checkbox small">
        <input
          id={id}
          name={name}
          className="custom-control-input"
          size={"sm"}
        ></input>
        <label className="custom-control-label" htmlFor={name}>
          {text}
        </label>
      </div>
    </Form.Group>
  );
}

export default FormCheckBox;
