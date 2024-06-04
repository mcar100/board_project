import { useRef } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { writeBoard } from "../../services/BoardApi";
import { DETAIL } from "../../utils/constants";
import { checkFormInfoBlank } from "../../utils/validator";
import { thrownHandler, ValidatorAlert } from "../../utils/ValidatorAlert";
import * as Form from "../Form/Form";

function BoardWrite({ boardData, fileDataList, setPageType }) {
  const formRef = useRef(null);
  const navigate = useNavigate();

  const handleModifySubmit = (e) => {
    e.preventDefault();
    if (boardData) {
      setPageType(DETAIL);
    }
  };
  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    console.log(formRef.current);
    if (!confirm("작성하시겠습니까?")) return;

    try {
      const [isCheck, checkMsg, invalidTarget] = checkFormInfoBlank(
        formRef.current
      );
      if (!isCheck) {
        throw new ValidatorAlert(checkMsg, invalidTarget);
      }
      const result = await writeBoard(formRef);
      if (result) {
        alert(result.message);
        navigate(result.url);
      }
    } catch (thrown) {
      thrownHandler(thrown);
    }
  };

  return (
    <Form.Frame
      className="h-100"
      formRef={formRef}
      onSubmit={boardData ? handleModifySubmit : handleCreateSubmit}
    >
      <Card className="shadow mb-4 h-100">
        <Card.Header className="py-3 h-25">
          <Row>
            <Col sm={10} className="float-left">
              <Form.Input
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
            className="h-100"
            data-title="내용"
            defaultValue={boardData && boardData.content}
            cols={30}
          />
        </Card.Body>
      </Card>
    </Form.Frame>
  );
}

export default BoardWrite;
