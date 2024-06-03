import {
  VALIDATE_MAP as validateMap,
  PREVENT_INPUT_MAP as preventInputMap,
  REPLACE_INPUT_MAP as replaceInputMap,
} from "./constants";

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

  for (const info of formInfo) {
    const { name, value } = info;
    const title = info.dataset.title;
    const valid = info.dataset.valid;
    if (!isNotBlank(value)) {
      return [false, getValidateMessage(title, "blank"), info];
    }

    const vm = validateMap[name];
    if (!vm) {
      continue;
    }

    if (vm.regex && !vm.regex.test(value)) {
      return [false, getValidateMessage(title, "error", vm.hint), info];
    }

    if (vm.validMsg && valid === "false") {
      return [false, vm.validMsg, info];
    }
  }
  return [true, null, null];
}

function checkFormInfoBlank(formInfo) {
  for (const info of formInfo) {
    const value = info.value;
    const title = info.dataset.title;
    if (!isNotBlank(value)) {
      return [false, getValidateMessage(title, "blank"), info];
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
  validator,
  preventInputs,
  replaceInputs,
  checkFormInfo,
  checkFormInfoBlank,
  isNotBlank,
};
