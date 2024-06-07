import { convertFormToObject } from "../utils/convertor";
import callAxios from "./axios";

export const getComments = async (boardId) => {
  const response = await callAxios.get(`comments/${boardId}`);
  if (!response.data) {
    return null;
  }
  return response.data;
};

export const createComment = async (formRef, boardId) => {
  const formData = convertFormToObject(formRef.current);
  const response = await callAxios.post(`/comments`, {
    ...formData,
    boardId,
  });

  if (!response.data) {
    throw new Error("댓글 등록 실패");
  }
  return response.data;
};

export const updateComment = async (formRef, commentId) => {
  const formData = convertFormToObject(formRef.current);
  const response = await callAxios.put(`/comments/${commentId}`, formData);
  if (!response.data) {
    throw new Error("댓글 수정 실패");
  }
  return response.data;
};

export const deleteComment = async (commentId) => {
  const response = await callAxios.delete(`/comments/${commentId}`);
  if (!response.data) {
    throw new Error("댓글 삭제 실패");
  }
  return response.data;
};
