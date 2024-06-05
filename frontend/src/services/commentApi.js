import { convertFormToObject } from "../utils/convertor";
import callAxios from "./axios";

export const getComments = async (boardId) => {
  const response = await callAxios.get(`comments/${boardId}`);
  if (!response.data) {
    return null;
  }
  return response.data;
};

export const createComment = async (formRef, boardId, pData = null) => {
  const formData = convertFormToObject(formRef.current);
  const response = await callAxios.post(`/comments`, {
    ...formData,
    boardId,
    parentId: pData ? pData.id : null,
    depth: pData ? pData.depth + 1 : 0,
  });

  if (!response.data) {
    throw new Error("댓글 등록 실패");
  }
  return response.data;
};
