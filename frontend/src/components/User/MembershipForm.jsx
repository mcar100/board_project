import { useEffect, useState, useRef } from "react";
import { Row, Col } from "react-bootstrap";
import { useDaumPostcodePopup } from "react-daum-postcode";
import * as Form from "../../components/Form/Form";
import Timer from "../Common/Timer";
import { isNotBlank, validator } from "../../utils/validator";
import { thrownHandler, ValidatorAlert } from "../../utils/ValidatorAlert";
import { AxiosError } from "axios";
import {
  checkDuplicate,
  checkEmailVerification,
  sendEmailVerification,
} from "../../services/UserApi";
import { useCheck } from "../../hooks/useInput";

function NameForm() {
  const { isChecked, checkOn, checkOff } = useCheck();
  const [spanMsg, setSpanMsg] = useState("");
  const nameRef = useRef(null);
  const handleBlur = async () => {
    try {
      const [isValid, validateMsg] = validator(nameRef.current);

      if (!isValid) {
        throw new Error(validateMsg);
      }

      const result = await checkDuplicate(nameRef);
      if (result) {
        checkOn();
        setSpanMsg(result.message);
      }
    } catch (thrown) {
      checkOff();
      if (thrown instanceof AxiosError) {
        if (thrown.code === "ERR_NETWORK") {
          setSpanMsg("서버 에러");
          return;
        }
        setSpanMsg(thrown.response.data);
      } else if (thrown instanceof Error) {
        setSpanMsg(thrown.message);
      }
      nameRef.current.focus();
    }
  };

  return (
    <>
      <Form.Group className="form-group">
        <Form.Input
          inputRef={nameRef}
          name="name"
          className={isChecked && "form-clear"}
          placeholder="이름"
          title="한글+특수문자 불가, 10자 이하"
          data-title="이름"
          data-valid={isChecked}
          maxLength="10"
          onBlur={handleBlur}
        />
        {spanMsg && (
          <Form.Text
            className={isChecked ? "form-msg-clear" : "form-msg-error"}
          >
            {spanMsg}
          </Form.Text>
        )}
      </Form.Group>
    </>
  );
}

function EmailForm() {
  const [email, setEmail] = useState("");
  const [isVerify, setIsVerify] = useState(false);
  const emailRef = useRef();

  const handleBtnClick = async () => {
    try {
      const [isValid, validateMsg] = validator(emailRef.current);
      if (!isValid) {
        throw new Error(validateMsg);
      }

      const result = await checkDuplicate(emailRef);
      if (result) {
        setEmail(result.value);
        setIsVerify(false);
        alert("사용가능한 이메일입니다.");
      }
    } catch (thrown) {
      setEmail("");
      setIsVerify(false);
      thrownHandler(thrown);
      emailRef.current.focus();
    }
  };
  return (
    <>
      <Row>
        <Col sm={9}>
          <Form.Input
            inputRef={emailRef}
            name="email"
            placeholder="이메일주소"
            className={isVerify && "form-clear"}
            data-title="이메일"
            data-valid={isVerify && email}
            disabled={isVerify}
          />
        </Col>
        <Col sm={3}>
          <Form.Button
            value="중복 확인"
            onClick={handleBtnClick}
            className={isVerify && "form-disabled"}
            disabled={isVerify}
          />
        </Col>
      </Row>
      {email && !isVerify && (
        <EmailAuthForm
          email={email}
          isVerify={isVerify}
          setIsVerify={setIsVerify}
        />
      )}
    </>
  );
}

function EmailAuthForm({ email, isVerify, setIsVerify }) {
  const [isSend, setIsSend] = useState(false);
  const emailAuthRef = useRef();

  useEffect(() => {
    setIsSend(false);
  }, [email]);

  const handleSendAuthBtnClick = async () => {
    try {
      const result = await sendEmailVerification(email);
      if (result) {
        setIsSend(true);
        alert(result.message);
      }
    } catch (thrown) {
      setIsSend(false);
      thrownHandler(thrown);
    }
  };
  const handleCheckAuthBtnClick = async () => {
    try {
      const userCode = emailAuthRef.current.value;
      const result = await checkEmailVerification(userCode);
      if (result) {
        setIsVerify(true);
        alert(result.message);
      }
    } catch (thrown) {
      if (thrown instanceof AxiosError && thrown.response.status === 404) {
        setIsVerify(false);
        setIsSend(false);
      }
      thrownHandler(thrown);
    }
  };
  return (
    <>
      <Row>
        <Col sm={6}>
          <Form.Input
            inputRef={emailAuthRef}
            name="emailAuth"
            placeholder="인증번호"
            className={isVerify && "form-clear"}
            data-title="이메일 인증"
            disabled={isVerify}
          />
          {isSend && !isVerify && <Timer />}
        </Col>
        <Col sm={4}>
          {!isSend ? (
            <Form.Button
              value="인증번호 전송"
              onClick={handleSendAuthBtnClick}
            />
          ) : (
            <Form.Button
              value="이메일 인증"
              onClick={handleCheckAuthBtnClick}
              className={isVerify && "form-disabled"}
              disabled={isVerify}
            />
          )}
        </Col>
      </Row>
    </>
  );
}

function PasswordForm() {
  const { isChecked, checkOn, checkOff } = useCheck(false);
  const [passwordForm, setPasswordForm] = useState({
    password: "",
    passwordCheck: "",
  });

  const passwordRef = useRef(null);

  const handleBlur = (e) => {
    if (!isNotBlank(e.target.value)) {
      return;
    }
    if (passwordForm[e.target.name] === e.target.value) {
      return;
    }
    try {
      setPasswordForm((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
      if (e.target.name === "password") {
        checkPassword(e.target);
      } else if (e.target.name === "passwordCheck") {
        checkPasswordConfirm(e.target);
      }
    } catch (thrown) {
      thrownHandler(thrown);
    }
  };

  const checkPassword = (target) => {
    const [isValid, validateMsg] = validator(target);

    if (!isValid) {
      checkOff();
      throw new ValidatorAlert(validateMsg, target);
    } else {
      checkOn();
      throw new ValidatorAlert(validateMsg);
    }
  };

  const checkPasswordConfirm = (target) => {
    if (!isChecked) {
      throw new ValidatorAlert(
        "먼저 사용 가능한 비밀번호를 입력하세요.",
        passwordRef.current
      );
    }

    if (passwordForm.password === target.value) {
      throw new ValidatorAlert("비밀번호가 일치합니다.");
    } else {
      throw new ValidatorAlert("비밀번호가 일치하지 않습니다.", target);
    }
  };

  useEffect(() => {
    if (isChecked && passwordForm.password === passwordForm.passwordCheck) {
      setPasswordForm((prev) => ({
        ...prev,
        ["passwordCheck"]: "",
      }));
    }
  }, [isChecked]);

  const isPasswordCheck =
    passwordForm.password &&
    passwordForm.password === passwordForm.passwordCheck;
  return (
    <>
      <Row>
        <Col>
          {" "}
          <Form.Input
            inputRef={passwordRef}
            type="password"
            name="password"
            className={isPasswordCheck && "form-clear"}
            placeholder="비밀번호"
            title="영어+특수문자만 입력가능, 8~15자"
            data-title="비밀번호"
            data-valid={isPasswordCheck}
            maxLength="15"
            onBlur={handleBlur}
          />
        </Col>
        <Col>
          {" "}
          <Form.Input
            type="password"
            name="passwordCheck"
            className={isPasswordCheck && "form-clear"}
            data-title="비밀번호 확인"
            placeholder="비밀번호 확인"
            defaultValue={""}
            onBlur={handleBlur}
          />
        </Col>
      </Row>
    </>
  );
}

function PhoneForm() {
  const [phone, setPhone] = useState("");
  const { isChecked, checkOff, checkOn } = useCheck(false);
  const phoneRef = useRef(null);
  const handleBlur = (e) => {
    if (!isNotBlank(e.target.value)) {
      return;
    }
    if (phone === e.target.value) {
      return;
    }
    try {
      setPhone(e.target.value);
      const [isValid, validateMsg] = validator(e.target);
      if (!isValid) {
        checkOff();
        throw new ValidatorAlert(validateMsg, e.target);
      } else {
        checkOn();
        throw new ValidatorAlert(validateMsg);
      }
    } catch (thrown) {
      thrownHandler(thrown);
    }
  };
  return (
    <Form.Input
      inputRef={phoneRef}
      type="tel"
      name="phone"
      className={isChecked && "form-clear"}
      data-title="휴대폰번호"
      placeholder="휴대폰번호"
      maxLength="13"
      onBlur={handleBlur}
    />
  );
}

function AddressForm() {
  const [addressForm, setAddressForm] = useState({
    address: "",
    details: "",
    zipCode: "",
  });
  const { isChecked, checkReverse, checkOff } = useCheck();

  useEffect(() => {
    checkOff();
  }, [addressForm]);

  const open = useDaumPostcodePopup();
  const handleBtnClick = () => {
    if (isChecked) return;
    checkReverse();
    open({
      onComplete: handleComplete,
      onClose: () => {
        checkOff();
      },
    });
  };
  const handleComplete = (data) => {
    if (!data) {
      return;
    }
    setAddressForm((prev) => ({
      ...prev,
      address: data.address,
      zipCode: data.zonecode,
      details: data.buildingName ? data.buildingName : "없음",
    }));
  };

  return (
    <>
      <Row>
        <Col sm={9}>
          <Form.Input
            name="address1"
            className={addressForm.address && "form-clear"}
            data-title="주소"
            placeholder="주소"
            defaultValue={addressForm.address}
            disabled={addressForm.address ? true : false}
          />
        </Col>
        <Col sm={3}>
          <Form.Button value="주소찾기" onClick={handleBtnClick} />
        </Col>
      </Row>
      <Form.Input
        name="address2"
        data-title="상세주소"
        placeholder="상세주소"
      />
      <Row>
        <Col>
          {" "}
          <Form.Input
            name="zipCode"
            className={addressForm.zipCode && "form-clear"}
            data-title="우편번호"
            placeholder="우편번호"
            defaultValue={addressForm.zipCode}
            disabled={addressForm.zipCode ? true : false}
          />
        </Col>
        <Col>
          {" "}
          <Form.Input
            name="details"
            className={addressForm.details && "form-clear"}
            data-title="참고사항"
            placeholder="참고사항"
            defaultValue={addressForm.details}
            disabled={addressForm.details ? true : false}
          />
        </Col>
      </Row>
    </>
  );
}

export { NameForm, EmailForm, PasswordForm, PhoneForm, AddressForm };
