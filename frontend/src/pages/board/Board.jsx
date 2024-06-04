import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BoardDetail from "../../components/Board/BoardDetail";
import BoardWrite from "../../components/Board/BoardWrite";
import { getBoardData } from "../../services/BoardApi";
import { DETAIL, WRITE, MODIFY } from "../../utils/constants";

function Board() {
  const params = useParams();
  const boardId = params.id;
  const [pageType, setPageType] = useState(() => {
    return boardId ? DETAIL : WRITE;
  });
  const [boardData, setBoardData] = useState({
    title: "제목",
    writer: "이름",
    content: "내용",
  });
  const [fileDataList, setFileDataList] = useState([]);
  const [commentDataList, setCommentDataList] = useState([]);

  if (pageType !== WRITE) {
    useEffect(() => {
      async function load() {
        const result = await getBoardData(boardId);
        if (result) {
          const boardInfo = result.boardInfo;
          setBoardData((prev) => ({
            ...prev,
            title: boardInfo.boardTitle,
            content: boardInfo.boardContent,
            writer: boardInfo.userName,
          }));
        }
        if (result && result.filesInfo.length > 0) {
          setFileDataList(result.filesInfo);
        }
        if (pageType === DETAIL && result && result.commentsInfo.length > 0) {
          setCommentDataList(result.commentsInfo);
        }
      }
      load();
    }, []);
  }

  return (
    <>
      {pageType === DETAIL && (
        <BoardDetail
          boardId={boardId}
          boardData={boardData}
          fileDataList={fileDataList}
          commentDataList={commentDataList}
          setPageType={setPageType}
        />
      )}
      {pageType === WRITE && <BoardWrite />}
      {pageType === MODIFY && (
        <BoardWrite
          boardId={boardId}
          boardData={boardData}
          fileDataList={fileDataList}
          setPageType={setPageType}
        />
      )}
    </>
  );
}

export default Board;
