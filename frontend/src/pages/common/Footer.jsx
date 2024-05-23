import { Container } from "react-bootstrap";

function Footer() {
  return (
    <footer className="sticky-footer bg-white">
      <Container className="my-auto">
        <div className="copyright text-center my-auto">
          <span>Copyright &copy; Your Website 2020</span>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
