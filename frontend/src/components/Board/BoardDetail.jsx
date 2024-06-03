import { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getBoardDetail } from "../../services/BoardApi";
import CommentDetail from "./Comment/CommentDetail";
import FileDetail from "./File/FileDetail";

function BoardDetail() {
  const [boardData, setBoardData] = useState({
    title: "제목",
    writer: "이름",
    content: "내용",
  });
  const [fileDataList, setFileDataList] = useState(null);
  const [commentDataList, setCommentDataList] = useState(null);
  const params = useParams();

  useEffect(() => {
    async function load() {
      if (!params) return;
      const result = await getBoardDetail(params.id);
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
      if (result && result.commentsInfo.length > 0) {
        setCommentDataList(result.commentsInfo);
      }

      console.log(result);
    }
    load();
  }, []);

  return (
    <Card className="shadow mb-4 h-100">
      <CardHeader className="py-3">
        <h3 className="m-0 font-weight-bold text-primary btn float-left">
          {boardData.title}
        </h3>
        <span className="m-0 text-gray btn small">by {boardData.writer}</span>
      </CardHeader>
      <CardBody className="navbar-nav-scroll" style={{ minHeight: 290 }}>
        <pre>{boardData.content}</pre>
      </CardBody>
      <FileDetail fileList={fileDataList} />
      {commentDataList && (
        <CardFooter>
          <CommentDetail commentList={commentDataList} />
        </CardFooter>
      )}
    </Card>
  );
}

export default BoardDetail;
