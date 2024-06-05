import { useRef } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { updateBoard, writeBoard } from "../../services/BoardApi";
import { updateFile } from "../../services/FileApi";
import { DETAIL } from "../../utils/constants";
import { checkFormInfoBlank } from "../../utils/validator";
import { thrownHandler, ValidatorAlert } from "../../utils/ValidatorAlert";
import * as Form from "../Form/Form";
import FileWrite from "./File/FileWrite";

function BoardWrite({ boardId, boardData, fileDataList, setPageType }) {
  const formRef = useRef(null);
  const fileRef = useRef({
    originIdList: [],
    newFiles: [],
  });
  const navigate = useNavigate();

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    if (!confirm(boardData ? "수정하시겠습니까?" : "작성하시겠습니까?")) return;

    try {
      const [isCheck, checkMsg, invalidTarget] = checkFormInfoBlank(
        formRef.current
      );
      if (!isCheck) {
        throw new ValidatorAlert(checkMsg, invalidTarget);
      }

      let boardResult;
      if (boardData && boardId) {
        boardResult = await updateBoard(formRef, boardId);
      } else {
        boardResult = await writeBoard(formRef);
      }

      if (!boardResult.success) {
        throw new ValidatorAlert(boardResult.message);
      }
      const resultId = boardResult.boardId;
      const fileResult = await updateFile(fileRef, resultId);
      if (!fileResult.success) {
        throw new ValidatorAlert(fileResult.message);
      }
      alert(boardResult.message);
      navigate(boardResult.url);
    } catch (thrown) {
      thrownHandler(thrown);
    }
  };

  return (
    <Form.Frame
      className="h-100"
      formRef={formRef}
      onSubmit={handleCreateSubmit}
    >
      <Card className="shadow mb-4 h-100">
        <Card.Header className="py-3 h-25">
          <Row>
            <Col sm={10} className="float-left">
              <Form.Input
                name="title"
                className="mt-3"
                data-title="제목"
                placeholder="제목"
                defaultValue={boardData && boardData.title}
              />
            </Col>
            <Col col={2} className="float-right">
              <Form.Button
                className="mt-3"
                isSubmit
                value={boardData ? "수정 완료" : "작성 완료"}
              />
            </Col>
          </Row>
        </Card.Header>
        <Card.Body style={{ minHeight: 290, height: 300 }}>
          <Form.Textarea
            name="content"
            className="h-100"
            data-title="내용"
            defaultValue={boardData && boardData.content}
            cols={30}
          />
        </Card.Body>
        <Card.Body>
          <FileWrite originFiles={fileDataList} fileRef={fileRef} />
        </Card.Body>
      </Card>
    </Form.Frame>
  );
}

export default BoardWrite;
