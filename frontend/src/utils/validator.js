// import {
//   VALIDATE_MAP as validateMap,
//   PREVENT_INPUT_MAP as preventInputMap,
// } from "./constants";
const validateMap = {
  name: {
    regex: /^(?=.*[a-zA-Z])(?=.*[0-9]){1,10}.+$/,
    hint: "(영어+숫자 조합, 10자리 이하)",
  },
  email: {
    regex: /^[a-zA-Z0-9_]+@[a-zA-Z0-9_]+\.[a-zA-Z_.]{2,}$/,
    hint: "(영어+숫자+특수문자(._@) 조합)",
  },
  password: {
    regex: /^[a-zA-Z!@#$%^&*()_+=-]{8,15}$/,
    //  regex: /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_+=-])[a-zA-Z!@#$%^&*()_+=-]{8,15}$/,
    hint: "(영어+특수문자 조합, 8~15자리)",
  },
  phone: {
    regex: /(^01[0-9])-([0-9]{3,4})-([0-9]{4})$/,
    hint: "(01x-xxxx-xxxx)",
  },
  passwordCheck: {
    hint: "비밀번호와 일치하지 않습니다.",
  },
};

const preventInputMap = {
  name: /[^a-zA-Z0-9]/gi,
  email: /[^a-zA-Z_.@0-9]/gi,
  password: /[0-9ㄱ-힣]/g,
  phone: /[^0-9]/gi,
};

const replaceInputMap = {
  phone: {
    in: /([0-9]{2,3})([0-9]{3,4})([0-9]{4})/g,
    out: "$1-$2-$3",
  },
};

function validator(target) {
  const { name, value } = target;
  const title = target.dataset.title;
  const vm = validateMap[name];

  if (!vm) {
    return;
  }

  const regex = vm.regex;
  if (!regex) {
    return [true, ""];
  }

  if (regex.test(value)) {
    return [true, getValidateMessage(title, "correct")];
  } else {
    return [false, getValidateMessage(title, "error", vm.hint)];
  }
}

function preventInputs(type, value) {
  const regex = preventInputMap[type];
  if (!regex) return value;
  return value.replace(regex, "");
}

function replaceInputs(type, value) {
  const regex = replaceInputMap[type];
  if (!regex) return value;
  return value.replace(regex.in, regex.out);
}

function checkFormInfo(formInfo) {
  if (!formInfo) {
    return [false, "formInfo가 없습니다.", null];
  }

  for (const [key, value] of Object.entries(formInfo)) {
    if (!isNotBlank(value)) {
      return [false, getValidateMessage(key, "blank"), key];
    }

    const vm = validateMap[key];
    if (!vm) {
      continue;
    }

    if (vm.regex && !vm.regex.test(value)) {
      return [false, getValidateMessage(key, "error", vm.hint), key];
    }
  }
  return [true, null, null];
}

function checkFormInfoBlank(formInfo) {
  for (const info of formInfo) {
    const infoValue = info.value;
    const infoTitle = info.dataset.title;
    if (!isNotBlank(infoValue)) {
      return [false, getValidateMessage(infoTitle, "blank"), info];
    }
  }
  return [true, "", null];
}

function isNotBlank(content) {
  const regex = /\s/g;
  const noSpaceContent = content.replace(regex, "");
  if (noSpaceContent.length === 0) {
    return false;
  }
  return true;
}

function getValidateMessage(title = "", type = "correct", hint = "") {
  if (type === "correct") {
    return `사용 가능한 ${title}입니다.`;
  } else if (type === "error") {
    return `${title}이(가) 올바르지 않습니다. ` + hint;
  } else if (type === "blank") {
    return `입력된 ${title} 정보가 없습니다.`;
  }
}

export {
  validateMap,
  validator,
  preventInputs,
  replaceInputs,
  checkFormInfo,
  checkFormInfoBlank,
  isNotBlank,
};
