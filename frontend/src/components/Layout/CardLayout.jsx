import { Card, CardBody, Col, Container, Row } from "react-bootstrap";

function CardLayout({ children }) {
  return (
    <Container fluid className="bg-gradient-primary vh-100">
      <Container>
        <Row className="justify-content-center">
          <Col xl={10} lg={12} md={9}>
            <Card className="o-hidden border-0 shadow-lg my-5">
              <CardBody className="p-0">
                <Row>
                  <Col
                    lg={6}
                    className="d-none d-lg-block bg-login-image"
                  ></Col>
                  <Col lg={6}>
                    <div className="p-5">
                      <div className="text-center">
                        <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
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