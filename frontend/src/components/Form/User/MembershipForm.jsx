import { useEffect, useState, useRef } from "react";
import { Row, Col } from "react-bootstrap";
import { useDaumPostcodePopup } from "react-daum-postcode";
import * as Form from "../../../components/Form/Form";
import { isNotBlank, validator } from "../../../utils/validator";
import { thrownHandler, ValidatorAlert } from "../../../utils/ValidatorAlert";
import { convertSecondToTimerFormat } from "../../../utils/convertor";
import callAxios from "../../../services/axios";
import { AxiosError } from "axios";

function EmailForm() {
  const [email, setEmail] = useState("");
  const [isVerify, setIsVerify] = useState(false);
  const emailRef = useRef();

  const handleBtnClick = async () => {
    try {
      const response = await callAxios.get("/users/duplication", {
        params: {
          type: emailRef.current.name,
          value: emailRef.current.value,
        },
      });
      if (response.status === 200) {
        setEmail(emailRef.current.value);
        alert("사용가능한 이메일입니다.");
      }
    } catch (thrown) {
      setEmail("");
      thrownHandler(thrown);
    }
  };
  return (
    <>
      <Row>
        <Col sm={9}>
          <Form.Input
            inputRef={emailRef}
            data-title="이메일"
            name="email"
            placeholder="이메일주소"
            className={isVerify && "form-clear"}
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
      {email && (
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
  const handleSendAuthBtnClick = async () => {
    try {
      const response = await callAxios.post("/auth/email", { email: email });
      if (response.status === 200) {
        setIsSend(true);
        alert(response.data);
      }
    } catch (thrown) {
      setIsSend(false);
      thrownHandler(thrown);
    }
  };
  const handleCheckAuthBtnClick = async () => {
    try {
      const userNum = emailAuthRef.current.value;
      const response = await callAxios.post("/auth/verification", {
        userNum,
      });
      if (response.status === 200) {
        setIsVerify(true);
        alert(response.data);
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
            data-title="이메일 인증"
            name="emailAuth"
            placeholder="인증번호"
            className={isVerify && "form-clear"}
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

function Timer() {
  const [m, s] = convertSecondToTimerFormat(300); // 5분
  const [minute, setMinute] = useState(m);
  const [second, setSecond] = useState(s);
  const timerRef = useRef();

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setSecond((prevSec) => {
        if (prevSec > 0) {
          return prevSec - 1;
        } else {
          setMinute((prevMin) => {
            if (prevMin > 0) {
              return prevMin - 1;
            } else {
              clearInterval(timerRef.current);
              setSecond(0);
              return 0;
            }
          });
          return 59;
        }
      });
    }, 1000);
    return () => {
      clearInterval(timerRef.current);
    };
  }, []);

  return (
    <span className="position-absolute small text-primary timer-position">
      {`${minute}:${String(second).padStart(2, "0")}`}
    </span>
  );
}

function PasswordForm() {
  const [passwordForm, setPasswordForm] = useState({
    password: "",
    passwordCheck: "",
  });

  const currentFocus = useRef(null);
  const passwordRef = useRef(null);
  const passwordCheckRef = useRef(null);

  const handleBlur = (e) => {
    if (!isNotBlank(e.target.value)) {
      return;
    }
    if (currentFocus.current != null && e.target !== currentFocus.current) {
      currentFocus.current = null;
      return;
    }
    currentFocus.current = e.target;
    try {
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
      setPasswordForm((prev) => ({
        ...prev,
        password: "",
      }));
      throw new ValidatorAlert(validateMsg, passwordRef.current);
    } else {
      setPasswordForm((prev) => ({
        ...prev,
        password: target.value,
      }));
      throw new ValidatorAlert(validateMsg);
    }
  };

  const checkPasswordConfirm = (target) => {
    if (!isNotBlank(passwordForm.password)) {
      throw new ValidatorAlert(
        "먼저 사용 가능한 비밀번호를 입력하세요.",
        passwordRef.current
      );
    }

    if (passwordForm.password === target.value) {
      setPasswordForm((prev) => ({ ...prev, passwordCheck: target.value }));
      throw new ValidatorAlert("비밀번호가 일치합니다.");
    } else {
      setPasswordForm((prev) => ({ ...prev, passwordCheck: "" }));
      throw new ValidatorAlert("비밀번호가 일치하지 않습니다.");
    }
  };
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
            data-title="비밀번호"
            placeholder="비밀번호"
            title="영어+특수문자만 입력가능, 8~15자"
            maxLength="15"
            onBlur={handleBlur}
          />
        </Col>
        <Col>
          {" "}
          <Form.Input
            inputRef={passwordCheckRef}
            type="password"
            name="passwordCheck"
            className={isPasswordCheck && "form-clear"}
            data-title="비밀번호 확인"
            placeholder="비밀번호 확인"
            onBlur={handleBlur}
          />
        </Col>
      </Row>
    </>
  );
}

function AddressForm() {
  const [addressForm, setAddressForm] = useState({
    address: "",
    details: "",
    zipCode: "",
  });
  const [isOpen, setIsOpen] = useState();

  useEffect(() => {
    setIsOpen(false);
  }, [addressForm]);

  const open = useDaumPostcodePopup();
  const handleBtnClick = () => {
    if (isOpen) return;
    setIsOpen(!isOpen);
    open({
      onComplete: handleComplete,
      onClose: () => {
        setIsOpen(false);
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

export { EmailForm, PasswordForm, AddressForm };
