import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as Form from "../../components/Form/Form";
import * as UserForm from "../../components/User/LoginForm";
import { checkFormInfoBlank } from "../../utils/validator";
import { thrownHandler, ValidatorAlert } from "../../utils/ValidatorAlert";
import { login } from "../../services/UserApi";

function Login() {
  const formRef = useRef(null);
  const [isVerify, setIsVerify] = useState(false);
  const navigate = useNavigate();

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const [isCheck, checkMsg, invalidTarget] = checkFormInfoBlank(
        formRef.current
      );

      if (!isCheck) {
        throw new ValidatorAlert(checkMsg, invalidTarget);
      }

      const result = await login(formRef);
      alert(result.message);
      if (result.success) {
        navigate(result.url);
      }
    } catch (thrown) {
      thrownHandler(thrown);
    }
  };

  return (
    <Form.AuthFrame
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
    </Form.AuthFrame>
  );
}

export default Login;
