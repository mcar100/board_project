const convertFormToObject = (form) => {
  const object = {};
  for (const { name, value } of form) {
    if (name && value) object[name] = value;
  }
  return object;
};

const convertStringToBytes = (content) => {
  const textEncoder = new TextEncoder();
  const byteSize = textEncoder.encode(content).byteLength;
  return byteSize;
};

const changeObjectKeyName = (object, prevName, afterName) => {
  if (object[prevName]) {
    object[afterName] = object[prevName];
    delete object[prevName];
  }
};

const getPathNameNumber = () => {
  return window.location.pathname.split("/").pop();
};

const padNumber = (number, length = 2) => String(number).padStart(length, "0");

const convertSecondToTimerFormat = (timer) => {
  if (timer < 60) {
    return [0, timer];
  }

  if (timer % 60 === 0) {
    return [timer / 60 - 1, 59];
  }
  return [Math.floor(timer / 60), timer % 60];
};

const getNameTable = (commentList) => {
  const nameTable = {};
  commentList.forEach((el) => {
    nameTable[el.id] = el.userName;
  });
  return nameTable;
};

export {
  convertFormToObject,
  convertStringToBytes,
  changeObjectKeyName,
  getPathNameNumber,
  padNumber,
  convertSecondToTimerFormat,
  getNameTable,
};
