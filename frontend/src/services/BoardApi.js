import callAxios from "./axios";

export const getBoardList = async (pageNo) => {
  try {
    const response = await callAxios.get("/boards", { params: { pageNo } });
    if (response.status === 200) {
      console.log(response.data);
      return response.data;
    }
  } catch (thrown) {
    console.log(thrown);
    return null;
  }
};
