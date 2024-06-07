import { useRef } from "react";
import { useParams } from "react-router-dom";
import * as Form from "../../Form/Form";
import { createComment, updateComment } from "../../../services/commentApi";
import { READ } from "../../../utils/constants";
import { checkFormInfoBlank } from "../../../utils/validator";
import { thrownHandler, ValidatorAlert } from "../../../utils/ValidatorAlert";

function CommentInput({
  callback,
  small,
  updateInfo = null,
  parentInfo = null,
  setCommentType = null,
}) {
  const formRef = useRef(null);
  const params = useParams();
  const boardId = params.id;

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const [isCheck, checkMsg, invalidTarget] = checkFormInfoBlank(
        formRef.current
      );
      if (!isCheck) {
        throw new ValidatorAlert(checkMsg, invalidTarget);
      }

      let result = null;
      if (!updateInfo) {
        result = await createComment(formRef, boardId);
      } else {
        result = await updateComment(formRef, updateInfo.id);
      }
      if (result) {
        callback();
      }
      if (setCommentType) {
        setCommentType(READ);
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
      {parentInfo && (
        <>
          <Form.Input
            name={"parentId"}
            value={parentInfo.id}
            className="visually-hidden"
          />
          <Form.Input
            name={"depth"}
            value={parentInfo.depth + 1}
            className="visually-hidden"
          />
        </>
      )}
      <Form.Textarea
        style={{ width: small ? "80%" : "100%" }}
        name="content"
        className="h-100 mr-2"
        data-title="댓글"
        placeholder="댓글"
        defaultValue={updateInfo && updateInfo.defaultValue}
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
