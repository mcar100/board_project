import callAxios from "./axios";
import { downloadFile } from "../utils/fileHandler";

export const getFile = async (oname, uname) => {
  try {
    const response = await callAxios.get("/files", {
      params: { originalName: oname, uploadedName: uname },
      responseType: "blob",
    });
    if (response.status === 200) {
      downloadFile(response);
    }
    console.log(response);
  } catch (thrown) {
    console.log(thrown);
    return null;
  }
};

export const updateFile = async (fileRef, boardId) => {
  let requestOne = null;
  let requestTwo = null;
  const { newFiles, originIdList } = fileRef.current;

  try {
    if (newFiles.length > 0) {
      const formData = new FormData();
      newFiles.forEach((file) => formData.append("formData", file));
      requestOne = callAxios.post(`/files/${boardId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    }

    if (originIdList.length > 0) {
      requestTwo = callAxios.delete(`/files/${boardId}`, {
        data: { fileIdList: originIdList },
      });
    }

    const [responseOne, responseTwo] = await Promise.all([
      requestOne,
      requestTwo,
    ]);
    if (responseOne && responseOne.status !== 200) {
      throw new Error("파일 등록 실패");
    }
    if (requestTwo && responseTwo.status !== 200) {
      throw new Error("파일 삭제 실패");
    }
    console.log(requestOne, requestTwo, responseOne, responseTwo);
    return { success: true, message: "파일 등록에 성공했습니다." };
  } catch (thrown) {
    console.log(thrown);
    return { success: false, message: "파일 등록에 실패했습니다." };
  }
};
