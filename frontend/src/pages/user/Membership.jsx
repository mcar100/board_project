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
      <Form.Input
        name="name"
        placeholder="이름"
        data-title="이름"
        title="한글+특수문자 불가, 10자 이하"
        maxLength="10"
      />
      <UserForm.EmailForm />
      <UserForm.PasswordForm />
      <Form.Input
        type="tel"
        name="phone"
        data-title="휴대폰번호"
        placeholder="휴대폰번호"
        maxLength="13"
        pattern="[0-9]{2,3}-[0,9]{3,4}-[0-9]{4}"
      />
      <UserForm.AddressForm />
      <Form.Button isSubmit value="Register Account" />
      <hr />
      <Form.Link text="Already have an account? Login!" href="/login" />
    </Form.Frame>
  );
}

export default Membership;
