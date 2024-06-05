import { useRef } from "react";
import { createComment } from "../../../services/commentApi";
import { checkFormInfoBlank } from "../../../utils/validator";
import { thrownHandler, ValidatorAlert } from "../../../utils/ValidatorAlert";
import * as Form from "../../Form/Form";

function CommentInput({ boardId, load, parentData = null, defaultValue }) {
  const formRef = useRef(null);
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const [isCheck, checkMsg, invalidTarget] = checkFormInfoBlank(
        formRef.current
      );
      if (!isCheck) {
        throw new ValidatorAlert(checkMsg, invalidTarget);
      }

      const result = await createComment(formRef, boardId, parentData);
      if (result) {
        load();
      }
    } catch (thrown) {
      thrownHandler(thrown);
    }
  };

  return (
    <Form.Frame
      formRef={formRef}
      className="flex py-2 px-2"
      onSubmit={handleFormSubmit}
    >
      {" "}
      <Form.Textarea
        name="content"
        className="h-100 mr-2"
        data-title="댓글"
        placeholder="댓글"
        defaultValue={defaultValue}
        cols={30}
      />
      <div style={{ width: "10%" }}>
        <Form.Button
          isSubmit
          className="w-100"
          value="등록"
          style={{ marginTop: "0.75rem", minHeight: 50 }}
        ></Form.Button>
      </div>
    </Form.Frame>
  );
}

export default CommentInput;
