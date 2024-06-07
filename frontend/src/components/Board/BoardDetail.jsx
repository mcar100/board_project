import { useContext } from "react";
import { Card, Button } from "react-bootstrap";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import FileDetail from "./File/FileDetail";
import CommentDetail from "./Comment/CommentDetail";
import { MODIFY } from "../../utils/constants";
import { deleteBoard } from "../../services/BoardApi";

function BoardDetail({ boardId, boardData, fileDataList, setPageType }) {
  const userContext = useContext(UserContext);
  const username = userContext.userInfo ? userContext.userInfo.name : "";
  const navigate = useNavigate();

  const handleDeleteClick = async () => {
    if (!confirm("정말 삭제하시겠습니까?")) return;

    const result = await deleteBoard(boardId);
    if (result.success) {
      alert(result.message);
      navigate(result.url);
    } else {
      alert(result.message);
    }
  };

  const handleModifyBtnClick = () => {
    setPageType(MODIFY);
  };

  return (
    <Card className="shadow mb-4 h-100">
      <Card.Header className="py-3">
        <h3 className="m-0 font-weight-bold text-primary btn float-left">
          {boardData.title}
        </h3>
        <span className="m-0 text-gray btn small">by {boardData.writer}</span>
        {boardData.writer === username && (
          <>
            <Button
              variant="primary float-right ml-2"
              onClick={handleModifyBtnClick}
            >
              수정
            </Button>
            <Button variant="danger float-right" onClick={handleDeleteClick}>
              삭제
            </Button>
          </>
        )}
      </Card.Header>
      <Card.Body className="navbar-nav-scroll" style={{ minHeight: 290 }}>
        <pre>{boardData.content}</pre>
      </Card.Body>
      <FileDetail fileList={fileDataList} />

      <Card.Footer>
        <CommentDetail boardId={boardId} writer={boardData.writer} />
      </Card.Footer>
    </Card>
  );
}

export default BoardDetail;
