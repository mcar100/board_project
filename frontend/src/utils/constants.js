export const VALIDATE_MAP = {
  name: {
    regex: /^[a-zA-Z0-9]{1,10}$/,
    hint: "(영어+숫자 조합, 10자리 이하)",
  },
  email: {
    regex: /^[a-zA-Z0-9_]+@[a-zA-Z0-9_]+\.[a-zA-Z_.]{2,}$/,
    hint: "(영어+숫자+특수문자(._@) 조합)",
  },
  password: {
    regex: /^[^0-9]{8,15}$/,
    hint: "(문자+특수문자 조합, 8~15자리)",
  },
  phone: {
    regex: /(^01[0-9])-([0-9]{3,4})-([0-9]{4})$/,
    replaceRegex: /([0-9]{2,3})([0-9]{3,4})([0-9]{4})/g,
    hint: "(01x-xxxx-xxxx)",
  },
  passwordCheck: {
    hint: "비밀번호와 일치하지 않습니다.",
  },
};

export const PREVENT_INPUT_MAP = {
  name: /[^a-zA-Z0-9]/gi,
  email: /[^a-zA-Z_.@0-9]/gi,
  phone: /[^0-9]/gi,
};
