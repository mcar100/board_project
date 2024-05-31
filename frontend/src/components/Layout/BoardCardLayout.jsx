import { Card, CardBody } from "react-bootstrap";

function BoardCardLayout({ children }) {
  return (
    <Card className="shadow mb-4">
      <CardBody>{children}</CardBody>
    </Card>
  );
}

export default BoardCardLayout;
