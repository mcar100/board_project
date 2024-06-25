import { useRef } from "react";
import * as Form from "../../components/Form/Form";
import * as UserForm from "../../components/User/MembershipForm";
import { checkFormInfo } from "../../utils/validator";
import { thrownHandler, ValidatorAlert } from "../../utils/ValidatorAlert";
import { register } from "../../services/UserApi";
import { useLinkNavigate } from "../../context/NavigationContext";

function Membership() {
  const formRef = useRef(null);
  const navigate = useLinkNavigate();

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const [isCheck, checkMsg, invalidTarget] = checkFormInfo(formRef.current);
      if (!isCheck) {
        throw new ValidatorAlert(checkMsg, invalidTarget);
      }
      const result = await register(formRef);
      if (result) {
        alert(result.message);
        navigate(result.url);
      }
    } catch (thrown) {
      thrownHandler(thrown);
    }
  };
  return (
    <Form.AuthFrame
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
    </Form.AuthFrame>
  );
}

export default Membership;
