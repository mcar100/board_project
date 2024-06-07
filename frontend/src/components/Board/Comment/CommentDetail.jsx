import { useContext, useEffect, useState } from "react";
import CommentItem from "./CommentItem";
import CommentInput from "./CommentInput";
import { getComments } from "../../../services/commentApi";
import { thrownHandler } from "../../../utils/ValidatorAlert";
import { UserContext } from "../../../context/UserContext";

function CommentDetail({ boardId, writer }) {
  const [commentList, setCommentlist] = useState([]);
  const userContext = useContext(UserContext);
  const { isLogin, userInfo } = userContext;
  const isWriter = userInfo && userInfo.name === writer;

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
