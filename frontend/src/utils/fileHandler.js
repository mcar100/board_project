import {
  FILE_MAX_COUNT as fMaxCount,
  FILENAME_MAX_LENGTH as fNameMaxLength,
  FILE_HEAD_LIMIT as fHeadLimit,
} from "./constants";

const uploadList = [];
const originNameList = [];
const removeIdList = [];

function downloadFile(response) {
  const blob = new Blob([response.data]);
  const fileObjectUrl = window.URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = fileObjectUrl;
  link.style.display = "none";

  link.download = extractDownloadFilename(response);
  console.log(link);
  document.body.appendChild(link);
  link.click();
  link.remove();

  window.URL.revokeObjectURL(fileObjectUrl);
}

function extractDownloadFilename(response) {
  const disposition = response.headers["content-disposition"];
  if (!disposition) return response.config.params.originalName;
  const fname = decodeURI(
    disposition
      .match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/)[1]
      .replace(/['"]/g, "")
  );
  return fname;
}

function loadOriginFiles() {
  $("#fileOriginNameList > li").each(function () {
    const originfName = $(this).data("name");
    originNameList.push(originfName);
    $(this).html(
      processFileName(originfName) +
        '<span class="position-absolute text-bold text-dark" style="bottom: 5px; cursor: pointer">x</span>'
    );
  });
  $("#fileOriginNameList > li > span").on("click", removeFile);
}

function addFile(target) {
  const inputfCount = $(target)[0].files.length;
  const totalfCount = getFileCount();
  if (totalfCount >= fMaxCount) {
    throw new Error(`파일은 최대 ${fMaxCount}개까지만 등록 가능합니다.`);
  }

  if (fMaxCount - totalfCount - inputfCount < 0) {
    throw new Error(`총 등록할 수 있는 파일 수는 ${fMaxCount}개입니다.`);
  }
  uploadList.push.apply(uploadList, $(target)[0].files);
  printFile();
}

function removeFile() {
  if (!confirm("등록한 파일을 삭제하시겠습니까?")) {
    return;
  }
  const index = $(this).parent().index();
  const fType = $(this).parent().data("type");

  // 파일 타입에 따른 삭제
  if (fType === "upload") {
    uploadList.splice(index, 1);
  } else if (fType === "origin") {
    const originFileId = $(this).parent().data("id");
    originNameList.splice(index, 1);
    removeIdList.push(originFileId);
  }
  $(this).parent().remove();

  // 파일 수 없데이트
  $("#fileCount")[0].innerText = `파일 ${getFileCount()}개`;
}

function printFile() {
  const liClass = "mr-4 position-relative";
  const spanClass = "position-absolute text-bold text-dark";
  const spanStyle = "bottom: 5px; cursor: pointer";

  // 파일 이름 표시
  $("#fileNameList").empty();
  if (uploadList.length > 0) {
    for (let i = 0; i < uploadList.length; i++) {
      const finalFullName = processFileName(uploadList[i].name);
      $("#fileNameList").append(`<li class="${liClass}" data-type="upload">
							${finalFullName} 
							<span class="${spanClass}" style="${spanStyle}">x</span>
						</li>`);
    }
  }

  $("#fileNameList > li > span").on("click", removeFile);

  // 파일 수 없데이트
  $("#fileCount")[0].innerText = `파일 ${getFileCount()}개`;
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

function getUploadList() {
  return uploadList;
}

function getRemovedIdList() {
  return removeIdList;
}

function getFileCount() {
  return originNameList.length + uploadList.length;
}

export {
  downloadFile,
  loadOriginFiles,
  addFile,
  removeFile,
  getUploadList,
  getRemovedIdList,
  processFileName,
};
