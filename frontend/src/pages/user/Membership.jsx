import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as Form from "../../components/Form/Form";
import * as UserForm from "../../components/Form/User/MembershipForm";
import callAxios from "../../services/axios";
import { convertFormToObject } from "../../utils/convertor";
import { checkFormInfo } from "../../utils/validator";
import { thrownHandler, ValidatorAlert } from "../../utils/ValidatorAlert";

function Membership() {
  const formRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const [isCheck, checkMsg, invalidTarget] = checkFormInfo(formRef.current);
      if (!isCheck) {
        throw new ValidatorAlert(checkMsg, invalidTarget);
      }
      const formData = convertFormToObject(formRef.current);

      const response = await callAxios.post("/users", formData);
      if (response.status === 200) {
        alert(response.data);
        navigate("/login");
      }
    } catch (thrown) {
      thrownHandler(thrown);
    }
  };
  return (
    <Form.Frame
      id="registerForm"
      className="user"
      expand
      onSubmit={handleSubmitForm}
      formRef={formRef}
      text="회원가입"
    >
      <UserForm.NameForm />
      <UserForm.EmailForm />
      <UserForm.PasswordForm />
      <UserForm.PhoneForm />
      <UserForm.AddressForm />
      <Form.Button isSubmit value="Register Account" />
      <hr />
      <Form.Link text="Already have an account? Login!" href="/login" />
    </Form.Frame>
  );
}

export default Membership;
