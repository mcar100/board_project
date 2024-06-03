import { useState } from "react";
import BoardDetail from "../../components/Board/BoardDetail";

const DETAIL = 1;

function Board() {
  const [pageType, setPageType] = useState(DETAIL);

  return <>{pageType === DETAIL && <BoardDetail />}</>;
}

export default Board;
