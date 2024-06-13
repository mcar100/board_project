import { useState } from "react";
import { CommentBtnHead, CommentContentHead } from "./CommentHead";
import CommentInput from "./CommentInput";
import {
  MODIFY,
  READ,
  REMOVED,
  REPLY,
  USER_COMMENTER,
  USER_NORMAL,
  USER_WRITER,
} from "../../../utils/constants";

function CommentItem({ isWriter, user = null, comment, parentName, load }) {
  const [content, setContent] = useState(comment.content);
  const [commentType, setCommentType] = useState(() => {
    if (comment.status !== "PUBLIC") return REMOVED;
    return READ;
  });
  const paddingDepth = comment.depth * 20;
  const userType =
    user && comment.userName === user.name
      ? USER_COMMENTER
      : isWriter
      ? USER_WRITER
      : USER_NORMAL;

  return (
    <li style={{ paddingLeft: paddingDepth, position: "relative" }}>
      {paddingDepth > 0 && <CommentReplyMark />}
      <div className="commentDiv" style={{ paddingLeft: "2rem" }}>
        <div className="commentHead">
          <CommentContentHead comment={comment} />
          {user && (
            <CommentBtnHead
              userType={userType}
              commentType={commentType}
              setCommentType={setCommentType}
              deleteInfo={{ id: comment.id }}
              callback={load}
            />
          )}
        </div>
        {commentType !== MODIFY ? (
          <div className="comment flex">
            {comment.parentId && (
              <span className="mr-2 text-primary">@{parentName}</span>
            )}
            {commentType !== REMOVED ? (
              <pre>{content}</pre>
            ) : (
              <p>삭제된 댓글입니다.</p>
            )}
          </div>
        ) : (
          <CommentInput
            callback={load}
            small
            updateInfo={{
              id: comment.id,
              defaultValue: content,
            }}
            setContent={setContent}
            setCommentType={setCommentType}
          />
        )}

        {commentType === REPLY && (
          <>
            <CommentReplyMark />
            <div className="commentDiv">
              <CommentInput
                callback={load}
                small
                parentInfo={{ id: comment.id, depth: comment.depth }}
                setCommentType={setCommentType}
              />
            </div>
          </>
        )}
      </div>
      <hr className="sidebar-divider d-md block w-100" />
    </li>
  );
}

export const CommentReplyMark = () => {
  return (
    <span
      className="border-left border-bottom"
      style={{ width: 18, height: 37, position: "absolute" }}
    ></span>
  );
};

export default CommentItem;