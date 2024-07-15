import { useCallback, useEffect, useMemo, useState } from "react";
import CommentItem from "./CommentItem";
import CommentInput from "./CommentInput";
import { getComments } from "../../../services/commentApi";
import { thrownHandler } from "../../../utils/ValidatorAlert";
import { getNameTable } from "../../../utils/convertor";
import { useSelector } from "react-redux";

function CommentDetail({ boardId, writer }) {
  const [commentList, setCommentlist] = useState([]);
  const user = useSelector(state=>state.user);
  const { isLogin, userInfo } = user;
  const isWriter = userInfo && userInfo.name === writer;

  const compareComment = useCallback(
    (oldLists, newLists) => {
      if (!oldLists.length) {
        return newLists;
      }

      if (oldLists.length === newLists.length) {
        return oldLists;
      }

      return newLists.map((newComment) => {
        const oldComment = oldLists.find((el) => el.id === newComment.id);
        if (!oldComment) {
          return newComment;
        }

        if (newComment.id === oldComment.id) {
          return oldComment;
        } else {
          return newComment;
        }
      });
    },
    [commentList]
  );

  const load = useCallback(async () => {
    try {
      const result = await getComments(boardId);
      setCommentlist((prev) => compareComment(prev, result));
    } catch (thrown) {
      thrownHandler(thrown);
    }
  }, [boardId]);

  useEffect(() => {
    load();
  }, []);

  const nameTable = useMemo(() => getNameTable(commentList), [commentList]);

  return (
    <>
      <ul style={{ maxHeight: 500, overflowY: "scroll", overflowX: "hidden" }}>
        {commentList.map((comment) => (
          <CommentItem
            isWriter={isWriter}
            user={userInfo}
            key={`comment-${comment.id}`}
            comment={comment}
            parentName={nameTable[comment.parentId]}
            load={load}
          />
        ))}
      </ul>
      {isLogin && <CommentInput callback={load} />}
    </>
  );
}

export default CommentDetail;
