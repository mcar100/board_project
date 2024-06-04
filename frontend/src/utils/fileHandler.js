import {
  FILE_MAX_COUNT as fMaxCount,
  FILENAME_MAX_LENGTH as fNameMaxLength,
  FILE_HEAD_LIMIT as fHeadLimit,
} from "./constants";

function downloadFile(response) {
  const blob = new Blob([response.data]);
  const fileObjectUrl = window.URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = fileObjectUrl;
  link.style.display = "none";

  link.download = _extractDownloadFilename(response);
  document.body.appendChild(link);
  link.click();
  link.remove();

  window.URL.revokeObjectURL(fileObjectUrl);
}

function _extractDownloadFilename(response) {
  const disposition = response.headers["content-disposition"];
  if (!disposition) return response.config.params.originalName;
  const fname = decodeURI(
    disposition
      .match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/)[1]
      .replace(/['"]/g, "")
  );
  return fname;
}

function addFile(target, setFileList, totalfCount) {
  const inputfCount = target.files.length;
  if (totalfCount >= fMaxCount) {
    throw new Error(`파일은 최대 ${fMaxCount}개까지만 등록 가능합니다.`);
  }

  if (fMaxCount - totalfCount - inputfCount < 0) {
    throw new Error(`총 등록할 수 있는 파일 수는 ${fMaxCount}개입니다.`);
  }
  setFileList((prev) => {
    const fList = [...prev];
    for (let i = 0; i < inputfCount; i++) {
      fList.push(target.files[i]);
    }
    return fList;
  });
}

function processFileName(fullName) {
  const fullNameArray = fullName.split(".");
  const ext = fullNameArray.pop();
  const fName = fullNameArray.join("");

  if (fName.length > fNameMaxLength) {
    const tailLimit = fName.length - fHeadLimit;
    return (
      fName.substr(0, fHeadLimit) +
      "..." +
      fName.substr(tailLimit + 1) +
      "." +
      ext
    );
  }
  return fName + "." + ext;
}

export { downloadFile, addFile, processFileName };
