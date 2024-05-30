import { Card, CardBody, Col, Container, Row } from "react-bootstrap";

function CardLayout({ children, title, expand }) {
  return (
    <Container fluid className="bg-gradient-primary">
      <Container>
        <Row className="justify-content-center">
          <Col xl={10} lg={12} md={expand ? 12 : 9}>
            <Card className="o-hidden border-0 shadow-lg my-5">
              <CardBody className="p-0">
                <Row>
                  <Col
                    lg={expand ? 5 : 6}
                    className={`d-none d-lg-block ${
                      expand ? "bg-register-image" : "bg-login-image"
                    }`}
                  ></Col>
                  <Col lg={expand ? 7 : 6}>
                    <div className="p-5">
                      <div className="text-center">
                        <h1 className="h4 text-gray-900 mb-4">{title}</h1>
                      </div>
                      {children}
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
export default CardLayout;
