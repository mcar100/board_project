import { Table, CardLink } from "react-bootstrap";

function TableLayout({ data }) {
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
          <th>댓글</th>
        </tr>
      </thead>
      <tbody>
        {data ? (
          data.map((el) => (
            <tr key={`table ${el.rowNum}`}>
              <td>{el.rowNum}</td>
              <td>{el.userName}</td>
              <td>
                <CardLink href={`/board/detail/${el.no}`}>{el.title}</CardLink>
              </td>
              <td>{el.createdAt}</td>
              <td>{el.commentsCount}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td className="text-center">0</td>
            <td>robot</td>
            <td>
              <CardLink href="/board/detail/1">default-title</CardLink>
            </td>
            <td>2024-2-29</td>
            <td className="text-center">0</td>
          </tr>
        )}
      </tbody>
    </Table>
  );
}

export default TableLayout;
