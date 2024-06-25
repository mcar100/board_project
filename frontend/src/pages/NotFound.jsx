import { Card } from "react-bootstrap";
import { Link } from "../components/Form/Form";

function NotFound() {
  return (
    <Card>
      <Card.Body>
        <div>
          <strong> Not Found {":("}</strong> <Link href={"/"} text="go home" />
        </div>
      </Card.Body>
    </Card>
  );
}

export default NotFound;
