import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BoardDetail from "../../components/Board/BoardDetail";
import BoardWrite from "../../components/Board/BoardWrite";
import { getBoardData } from "../../services/BoardApi";
import { READ, WRITE, MODIFY } from "../../utils/constants";

function Board() {
  const params = useParams();
  const boardId = params.id;
  const [pageType, setPageType] = useState(() => {
    return boardId ? READ : WRITE;
  });
  const [boardData, setBoardData] = useState({
    title: "제목",
    writer: "이름",
    content: "내용",
  });
  const [fileDataList, setFileDataList] = useState([]);

  if (pageType !== WRITE) {
    useEffect(() => {
      const load = async () => {
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
      };
      load();
    }, []);
  }

  return (
    <>
      {pageType === READ && (
        <BoardDetail
          boardId={boardId}
          boardData={boardData}
          fileDataList={fileDataList}
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
