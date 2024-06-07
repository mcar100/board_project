import { useEffect, useState } from "react";
import CommentItem from "./CommentItem";
import CommentInput from "./CommentInput";
import { getComments } from "../../../services/commentApi";
import { thrownHandler } from "../../../utils/ValidatorAlert";

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
      <ul style={{ maxHeight: 500, overflowY: "scroll", overflowX: "hidden" }}>
        {commentList.map((comment) => (
          <CommentItem
            key={`comment-${comment.id}`}
            comment={comment}
            parentName={nameTable[comment.parentId]}
            load={load}
          />
        ))}
      </ul>

      <CommentInput callback={load} />
    </>
  );
}

export default CommentDetail;
