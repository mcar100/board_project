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
    const response = await callAxios.get("/boards", { params: { boardId } });
    if (response.status === 200) {
      return response.data;
    }
  } catch (thrown) {
    console.log(thrown);
    return null;
  }
};
