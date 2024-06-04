import { useState, useEffect, useContext } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import BoardTable from "../../components/Board/BoardTable";
import Pagination from "../../components/Common/Pagination";
import { UserContext } from "../../context/UserContext";
import { getBoardList } from "../../services/BoardApi";

function Home() {
  const [pageInfo, setPageInfo] = useState({
    pageNo: 1,
    pageSize: 10,
    lastPageNo: 1,
  });
  const [tableList, setTableList] = useState();
  const userContext = useContext(UserContext);
  const isLogin = userContext.isLogin;
  const navigate = useNavigate();

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

  const handleBtnClick = () => {
    if (isLogin) {
      navigate("/boards");
      return;
    }
    if (confirm("로그인 하시겠습니까?")) {
      navigate("/login");
    }
  };

  return (
    <>
      <BoardTable data={tableList} />

      <Button
        className="float-right"
        variant="primary"
        onClick={handleBtnClick}
      >
        게시글 작성
      </Button>

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
