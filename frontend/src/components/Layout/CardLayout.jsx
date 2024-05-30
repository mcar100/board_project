import { Card, CardBody, Col, Container, Row } from "react-bootstrap";

function CardLayout({ children, title, expand }) {
  const mediumSize = expand ? 12 : 9;
  const contentSize = expand ? 7 : 6;
  const imageSize = expand ? 5 : 6;
  return (
    <Container fluid className="bg-gradient-primary vh-100">
      <Container>
        <Row className="justify-content-center">
          <Col xl={10} lg={12} md={mediumSize}>
            <Card className="o-hidden border-0 shadow-lg my-5">
              <CardBody className="p-0">
                <Row>
                  <Col
                    lg={imageSize}
                    className={`d-none d-lg-block ${
                      expand ? "bg-register-image" : "bg-login-image"
                    }`}
                  ></Col>
                  <Col lg={contentSize}>
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
