import { useEffect, useRef } from "react";
import * as Form from "../../components/Form/Form";
import * as UserForm from "../../components/Form/User/MembershipForm";

function Membership() {
  const formRef = useRef(null);
  return (
    <Form.Frame
      id="registerForm"
      className="user"
      expand
      onSubmit={() => {
        console.log("submit");
      }}
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
