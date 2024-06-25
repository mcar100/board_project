import { Table, CardLink } from "react-bootstrap";
import { useLinkNavigate } from "../../context/NavigationContext";

function BoardTable({ data }) {
  const navigate = useLinkNavigate();
  return (
    <Table responsive bordered cellSpacing={0}>
      <colgroup>
        <col width="7%" />
        <col width="18%" />
        <col width="38%" />
        <col width="30%" />
        <col width="7%" />
      </colgroup>
      <thead>
        <tr>
          <th className="text-center">번호</th>
          <th>닉네임</th>
          <th>제목</th>
          <th>날짜</th>
          <th className="text-center">댓글</th>
        </tr>
      </thead>
      <tbody>
        {data ? (
          data.map((el) => (
            <tr key={`table ${el.rowNum}`}>
              <td className="text-center">{el.rowNum}</td>
              <td>{el.userName}</td>
              <td>
                <CardLink
                  href={`#`}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`/boards/${el.boardId}`);
                  }}
                >
                  {el.title}
                </CardLink>
              </td>
              <td>{el.createdAt}</td>
              <td className="text-center">{el.commentsCount}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td className="text-center">0</td>
            <td>robot</td>
            <td>
              <CardLink href="/boards/1">default-title</CardLink>
            </td>
            <td>2024-2-29</td>
            <td className="text-center">0</td>
          </tr>
        )}
      </tbody>
    </Table>
  );
}

export default BoardTable;
