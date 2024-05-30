import { useEffect, useState, useRef } from "react";
import * as Form from "../../components/Form/Form";
import * as UserForm from "../../components/Form/User/LoginForm";
import { checkFormInfoBlank } from "../../utils/validator";
import {
  convertFormToObject,
  changeObjectKeyName,
} from "../../utils/convertor";
import { thrownHandler, ValidatorAlert } from "../../utils/ValidatorAlert";
import callAxios from "../../services/axios";

function Login() {
  const formRef = useRef(null);
  const [isVerify, setIsVerify] = useState(false);

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const [isCheck, checkMsg, invalidTarget] = checkFormInfoBlank(
        formRef.current
      );
      if (!isCheck) {
        throw new ValidatorAlert(checkMsg, invalidTarget);
      }
      const formData = convertFormToObject(formRef.current);
      changeObjectKeyName(formData, "g-recaptcha-response", "recaptcha");

      const response = await callAxios.post("/auth/login", formData);
      if (response.status === 200) {
        alert(response.data);
        location.href = "/";
      }
    } catch (thrown) {
      thrownHandler(thrown);
    }
  };

  return (
    <Form.Frame
      className="user"
      onSubmit={handleSubmitForm}
      formRef={formRef}
      text="Welcome Back!"
    >
      <UserForm.Input
        data-title="이메일"
        type="email"
        name="email"
        cookieId="email"
        placeholder="Enter Email Address..."
        aria-describedby="emailHelp"
      />
      <Form.Input
        data-title="비밀번호"
        type="password"
        name="password"
        placeholder="Enter Password..."
        autoComplete="current-password"
      />
      <UserForm.CheckBox
        name="emailCheck"
        text="Remember Me"
        cookieId="email"
      />
      <UserForm.Recaptcha setIsVerify={setIsVerify} />
      <Form.Button
        isSubmit
        value="로그인"
        className={!isVerify && "form-disabled"}
        disabled={!isVerify && "disabled"}
      />
      <hr />
      <Form.Link text="Create an Account!" href="/membership" />
      <Form.Link text="Home" href="/" />
    </Form.Frame>
  );
}

export default Login;
