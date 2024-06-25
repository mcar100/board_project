import { deleteComment } from "../../../services/commentApi";
import { thrownHandler } from "../../../utils/ValidatorAlert";
import {
  MODIFY,
  READ,
  REMOVED,
  REPLY,
  USER_COMMENTER,
  USER_NORMAL,
} from "../../../utils/constants";

const CommentContentHead = ({ comment }) => {
  return (
    <div className="commentHead1">
      <div className="commentName mr-1">{comment.userName}</div>
      <div className="commentDate">{comment.createdAt}</div>
      {comment.modifyAt && <div className="small pl-1">(수정)</div>}
    </div>
  );
};

function CommentBtnHead({
  userType,
  commentType,
  setCommentType,
  deleteInfo = null,
}) {
  const handleReplyBtn = () => {
    setCommentType(() => REPLY);
  };
  const handleModifyBtn = () => {
    setCommentType(() => MODIFY);
  };
  const handleCancleBtn = () => {
    setCommentType(() => READ);
  };
  const handleRemoveBtn = async () => {
    if (!deleteInfo) return;
    if (!confirm("댓글을 삭제하시겠습니까?")) return;
    try {
      const result = await deleteComment(deleteInfo.id);
      if (result) {
        setCommentType(() => REMOVED);
      }
    } catch (thrown) {
      thrownHandler(thrown);
    }
  };
  return (
    <div className="commentHead2">
      {" "}
      {commentType !== REPLY ? (
        <div className="commentReply" onClick={handleReplyBtn}>
          답글
        </div>
      ) : (
        <div className="commentCancle" onClick={handleCancleBtn}>
          취소
        </div>
      )}
      {commentType !== MODIFY ? (
        <div
          className={
            userType === USER_COMMENTER && commentType !== REMOVED
              ? "commentModify"
              : "visually-hidden"
          }
          onClick={handleModifyBtn}
        >
          수정
        </div>
      ) : (
        <div className="commentCancle" onClick={handleCancleBtn}>
          취소
        </div>
      )}
      {userType !== USER_NORMAL && commentType !== REMOVED && (
        <div className={"commentRemove"} onClick={handleRemoveBtn}>
          삭제
        </div>
      )}
    </div>
  );
}

export { CommentContentHead, CommentBtnHead };
