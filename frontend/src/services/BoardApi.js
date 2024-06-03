import { download, downloadFile } from "../utils/fileHandler";
import callAxios from "./axios";

export const getBoardList = async (pageNo) => {
  try {
    const response = await callAxios.get("/boards", { params: { pageNo } });
    if (response.status === 200) {
      return response.data;
    }
  } catch (thrown) {
    console.log(thrown);
    return null;
  }
};

export const getBoardDetail = async (boardId) => {
  try {
    const response = await callAxios.get(`/boards/${boardId}`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (thrown) {
    console.log(thrown);
    return null;
  }
};

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
