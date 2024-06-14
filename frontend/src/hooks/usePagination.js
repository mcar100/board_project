import { useState } from "react";

function usePagination() {
  const [pageInfo, setPageInfo] = useState({
    pageNo: 1,
    pageSize: 10,
    lastPageNo: 1,
  });

  const setPagination = (result) => {
    setPageInfo((prev) => ({
      ...prev,
      pageNo: result.pageNo,
      lastPageNo: result.lastPageNo,
      pageSize: result.pageSize,
    }));
  };

  const setPageNo = (n) => {
    setPageInfo((prev) => ({
      ...prev,
      pageNo: n,
    }));
  };

  return { pageInfo, setPagination, setPageNo };
}

export default usePagination;
