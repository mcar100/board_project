import { useContext } from "react";
import { Card, Button } from "react-bootstrap";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import FileDetail from "./File/FileDetail";
import CommentDetail from "./Comment/CommentDetail";
import { MODIFY } from "../../utils/constants";

function BoardDetail({
  boardData,
  fileDataList,
  commentDataList,
  setPageType,
}) {
  const userContext = useContext(UserContext);
  const username = userContext.userInfo ? userContext.userInfo.name : "";
  const navigate = useNavigate();

  const handleDeleteClick = () => {
    if (confirm("정말 삭제하시겠습니까?")) {
      alert("삭제되었습니다.");
      navigate("/");
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
      {commentDataList && (
        <Card.Footer>
          <CommentDetail commentList={commentDataList} />
        </Card.Footer>
      )}
    </Card>
  );
}

export default BoardDetail;
