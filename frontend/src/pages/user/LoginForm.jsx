import { useState } from "react";
import { Form } from "react-bootstrap";
import CardLayout from "../../components/Layout/CardLayout";
import FormInput from "../../components/Form/FormInput";
import FormCheckBox from "../../components/Form/FormCheckBox";

function LoginForm() {
  const [user, setUser] = useState({
    email: "",
    password: "",
    isCheck: false,
  });

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  return (
    <CardLayout>
      <Form id="loginForm" className="user">
        <FormInput
          data-title="이메일"
          type="email"
          name="email"
          onChange={handleChangeInput}
          placeholder="Enter Email Address..."
          aria-describedby="emailHelp"
          value={user.email}
        />
        <FormInput
          data-title="비밀번호"
          type="password"
          name="password"
          autoComplete="current-password"
          onChange={handleChangeInput}
          placeholder="Enter Password..."
        />
        <FormCheckBox id="emailCheck" name="emailCheck" text="Remember Me" />
        <FormInput
          id="loginBtn"
          type="submit"
          className="btn btn-primary btn-user btn block"
          value="로그인"
          disabled
        />
        <div class="text-center">
          <a class="small" href="/membership">
            Create an Account!
          </a>
        </div>
        <div class="text-center">
          <a class="small" href="/">
            Home
          </a>
        </div>
      </Form>
    </CardLayout>
  );
}

export default LoginForm;
