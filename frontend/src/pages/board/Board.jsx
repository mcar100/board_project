import { useState } from "react";
import Detail from "../../components/Board/Detail";

const DETAIL = 1;

function Board() {
  const [pageType, setPageType] = useState(DETAIL);

  return <>{pageType === DETAIL && <Detail />}</>;
}

export default Board;
