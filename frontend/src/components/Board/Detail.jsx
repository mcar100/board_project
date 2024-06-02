import { useEffect, useState } from "react";
import { Card, CardHeader, CardBody } from "react-bootstrap";
import { getBoardDetail } from "../../services/BoardApi";

function Detail() {
  const [boardData, setBoardData] = useState();
  useEffect(() => {
    async function load() {
      const result = await getBoardDetail(1);
      if (result && result.data) {
        setBoardData();
      }
    }
    load();
  }, []);

  return (
    <Card className="shadow mb-4 h-100">
      <CardHeader className="py-3">
        <h3 className="m-0 font-weight-bold text-primary btn float-left">
          제목
        </h3>
        <span className="m-0 text-gray btn small">by 이름</span>
      </CardHeader>
      <CardBody
        as={"pre"}
        className="navbar-nav-scroll"
        style={{ minHeight: 290 }}
      >
        내용
      </CardBody>
      <CardBody>파일</CardBody>
    </Card>
  );
}

export default Detail;
