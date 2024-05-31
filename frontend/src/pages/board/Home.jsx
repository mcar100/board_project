import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Pagination from "../../components/Common/Pagination";
import BoardCardLayout from "../../components/Layout/BoardCardLayout";
import TableLayout from "../../components/Layout/TableLayout";
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
    <Container fluid>
      <h1 className="h3 mb-2 text-gray-800">게시판</h1>
      <BoardCardLayout>
        <TableLayout data={tableList} />
        <Pagination
          pageSize={pageInfo.pageSize}
          currentPageNo={pageInfo.pageNo}
          lastPageNo={pageInfo.lastPageNo}
          setPageInfo={setPageInfo}
        />
      </BoardCardLayout>
    </Container>
  );
}

export default Home;
