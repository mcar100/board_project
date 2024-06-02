import { useState, useEffect } from "react";
import BoardTable from "../../components/Board/BoardTable";
import Pagination from "../../components/Common/Pagination";
import { getBoardList } from "../../services/BoardApi";

function Home() {
  const [pageInfo, setPageInfo] = useState({
    pageNo: 1,
    pageSize: 10,
    lastPageNo: 1,
  });
  const [tableList, setTableList] = useState();

  useEffect(() => {
    async function load() {
      const result = await getBoardList(pageInfo.pageNo);
      if (result) {
        setTableList(result.boardList);
        setPageInfo((prev) => ({
          ...prev,
          pageNo: result.pageNo,
          lastPageNo: result.lastPageNo,
          pageSize: result.pageSize,
        }));
      }
    }
    load();
  }, [pageInfo.pageNo]);

  return (
    <>
      <BoardTable data={tableList} />
      <Pagination
        pageSize={pageInfo.pageSize}
        currentPageNo={pageInfo.pageNo}
        lastPageNo={pageInfo.lastPageNo}
        setPageInfo={setPageInfo}
      />
    </>
  );
}

export default Home;
