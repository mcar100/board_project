// validator
export const VALIDATE_MAP = {
  name: {
    regex: /^(?=.*[a-zA-Z])(?=.*[0-9]){1,10}.+$/,
    hint: "(영어+숫자 조합, 10자리 이하)",
    validMsg: "이름 중복 검사를 진행해주세요.",
  },
  email: {
    regex: /^[a-zA-Z0-9_]+@[a-zA-Z0-9_]+\.[a-zA-Z_.]{2,}$/,
    hint: "(영어+숫자+특수문자(._@) 조합)",
    validMsg: "이메일 중복 검사와 인증을 진행해주세요.",
  },
  password: {
    regex: /^[a-zA-Z!@#$%^&*()_+=-]{8,15}$/,
    //  regex: /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_+=-])[a-zA-Z!@#$%^&*()_+=-]{8,15}$/,
    hint: "(영어+특수문자 조합, 8~15자리)",
    validMsg: "비밀번호가 일치하지 않습니다.",
  },
  phone: {
    regex: /(^01[0-9])-([0-9]{3,4})-([0-9]{4})$/,
    hint: "(01x-xxxx-xxxx)",
  },
  passwordCheck: {
    hint: "비밀번호와 일치하지 않습니다.",
  },
};

export const PREVENT_INPUT_MAP = {
  name: /[^a-zA-Z0-9]/gi,
  email: /[^a-zA-Z_.@0-9]/gi,
  password: /[0-9ㄱ-힣]/g,
  phone: /[^0-9]/gi,
};

export const REPLACE_INPUT_MAP = {
  phone: {
    in: /([0-9]{2,3})([0-9]{3,4})([0-9]{4})/g,
    out: "$1-$2-$3",
  },
};

// files
export const FILE_MAX_COUNT = 3;
export const FILENAME_MAX_LENGTH = 20;
export const FILE_HEAD_LIMIT = 8;
