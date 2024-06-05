import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { getComments } from "../../../services/commentApi";
import { thrownHandler } from "../../../utils/ValidatorAlert";
import CommentInput from "./CommentInput";
import CommentItem from "./CommentItem";

function CommentDetail({ boardId }) {
  const [commentList, setCommentlist] = useState([]);

  const nameTable = {};
  commentList.forEach((el) => {
    nameTable[el.id] = el.userName;
  });

  const load = async () => {
    try {
      const result = await getComments(boardId);
      setCommentlist(() => result);
    } catch (thrown) {
      thrownHandler(thrown);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <>
      <Form>
        <ul
          style={{ maxHeight: 500, overflowY: "scroll", overflowX: "hidden" }}
        >
          {commentList.map((comment) => (
            <CommentItem
              key={`comment-${comment.id}`}
              comment={comment}
              parentName={nameTable[comment.parentId]}
            />
          ))}
        </ul>
      </Form>
      <CommentInput boardId={boardId} load={load} />
    </>
  );
}

export default CommentDetail;
