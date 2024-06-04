import { convertFormToObject } from "../utils/convertor";
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

export const getBoardData = async (boardId) => {
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

export const writeBoard = async (formRef) => {
  try {
    const formData = convertFormToObject(formRef.current);

    const response = await callAxios.post("/boards", formData);
    if (response.status === 200) {
      return {
        success: true,
        boardId: response.data,
        message: "게시글이 등록되었습니다.",
        url: "/",
      };
    }
  } catch (thrown) {
    console.log(thrown);
    return {
      success: false,
      message: "게시글 등록에 실패했습니다.",
    };
  }
};

export const updateBoard = async (formRef, boardId) => {
  try {
    const formData = convertFormToObject(formRef.current);

    const response = await callAxios.put(`/boards/${boardId}`, formData);
    if (response.status === 200) {
      return {
        success: true,
        boardId: boardId,
        message: "게시글이 수정되었습니다.",
        url: "/",
      };
    }
  } catch (thrown) {
    console.log(thrown);
    return {
      success: false,
      message: "게시글 수정에 실패했습니다.",
    };
  }
};

export const deleteBoard = async (boardId) => {
  try {
    const response = await callAxios.delete(`/boards/${boardId}`);
    if (response.status === 200) {
      return {
        success: true,
        message: "게시글이 삭제되었습니다.",
        url: "/",
      };
    }
  } catch (thrown) {
    return {
      success: false,
      message: "게시글 삭제에 실패했습니다.",
    };
  }
};
