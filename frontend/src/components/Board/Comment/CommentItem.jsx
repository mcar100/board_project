function CommentItem({ comment, parentName }) {
  const paddingDepth = comment.depth * 20;
  return (
    <li style={{ paddingLeft: paddingDepth, position: "relative" }}>
      {paddingDepth > 0 && <CommentReplyMark />}
      <div className="commentDiv" style={{ paddingLeft: "2rem" }}>
        <CommentHead comment={comment} />
        <div className="comment flex">
          {comment.parentId && (
            <span className="mr-2 text-primary">@{parentName}</span>
          )}
          {comment.status === "PUBLIC" ? (
            <pre>{comment.content}</pre>
          ) : (
            <p>삭제된 댓글입니다.</p>
          )}
        </div>
      </div>
      <hr className="sidebar-divider d-md block w-100" />
    </li>
  );
}

const CommentReplyMark = () => {
  return (
    <span
      className="border-left border-bottom"
      style={{ width: 18, height: 37, position: "absolute" }}
    ></span>
  );
};

const CommentHead = ({ comment }) => {
  return (
    <div className="commentHead">
      <div className="commentHead1">
        <div className="commentName mr-1">{comment.userName}</div>
        <div className="commentDate">{comment.createdAt}</div>
        {comment.modifyAt && <div className="small pl-1">(수정)</div>}
      </div>
      <div className="commentHead2">
        <div className="commentReply" data-activate="false">
          답글
        </div>
        <div className="commentCancle" style={{ display: "none" }}>
          취소
        </div>
        <div className="commentModify" data-activate="false">
          수정
        </div>
        <div className="commentRemove">삭제</div>
      </div>
    </div>
  );
};

export default CommentItem;
