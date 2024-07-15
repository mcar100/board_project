import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import BoardTable from "../../components/Board/BoardTable";
import Pagination from "../../components/Common/Pagination";
import { getBoardList } from "../../services/BoardApi";
import usePagination from "../../hooks/usePagination";
import { useLinkNavigate } from "../../context/NavigationContext";
import { useSelector } from "react-redux";

function Home() {
  const { pageInfo, setPagination, setPageNo } = usePagination();

  const [tableList, setTableList] = useState();
  const user = useSelector((state)=>state.user);
  const isLogin = user.isLogin;
  const navigate = useLinkNavigate();

  useEffect(() => {
    const load = async () => {
      const result = await getBoardList(pageInfo.pageNo);
      if (result) {
        setTableList(result.boardList);
        setPagination(result);
      }
    };
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

      <Pagination pageInfo={pageInfo} setPageNo={setPageNo} />
    </>
  );
}

export default Home;
