function convertFormToObject(form) {
  const object = {};
  for (const { name, value } of form) {
    if (name && value) object[name] = value;
  }
  return object;
}

function convertStringToBytes(content) {
  const textEncoder = new TextEncoder();
  const byteSize = textEncoder.encode(content).byteLength;
  return byteSize;
}

function getPathNameNumber() {
  return window.location.pathname.split("/").pop();
}

// function convertApiDataFormat(
//   pathVar = null,
//   requestParams = null,
//   data = null,
//   type = "json"
// ) {
//   return {
//     pathVar: pathVar,
//     requestParams: requestParams,
//     data: data,
//     formatType: type,
//   };
// }

function convertSecondToTimerFormat(timer) {
  if (timer < 60) {
    return [0, timer];
  }

  if (timer % 60 === 0) {
    return [timer / 60 - 1, 59];
  }
  return [Math.floor(timer / 60), timer % 60];
}

function changeObjectKeyName(object, prevName, afterName) {
  if (object[prevName]) {
    object[afterName] = object[prevName];
    delete object[prevName];
  }
}

export {
  convertFormToObject,
  convertStringToBytes,
  getPathNameNumber,
  //  convertApiDataFormat,
  changeObjectKeyName,
  convertSecondToTimerFormat,
};
