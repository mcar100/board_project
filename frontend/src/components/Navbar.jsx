import {
  faBars,
  faSignOutAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Nav, Navbar, Dropdown, Image, Form } from "react-bootstrap";

function CustomNavbar() {
  const username = null;
  return (
    <Navbar
      expand="lg"
      variant="light"
      bg="white"
      className="topbar mb-4 static-top shadow"
    >
      <Form className="form-inline">
        <Button
          id="sidebarToggleTop"
          color="white"
          className="btn-link d-md-none rounded-circle mr-3"
        >
          <FontAwesomeIcon color="white" icon={faBars}></FontAwesomeIcon>
        </Button>
      </Form>

      <Navbar.Collapse className="justify-content-end">
        <Nav className="ml-auto">
          <div className="topbar-divider d-none d-sm-block"></div>

          <Dropdown as={Nav.Item} className="no-arrow">
            <Dropdown.Toggle as={Nav.Link} id="userDropdown" role="button">
              <span className="mr-2 d-none d-lg-inline text-gray-600 small">
                {username == null ? "게스트" : username}
              </span>
              <Image
                className="img-profile rounded-circle"
                src="/images/undraw_profile.svg"
                alt="Profile"
                roundedCircle
              />
            </Dropdown.Toggle>

            {username && (
              <Dropdown.Menu
                className="dropdown-menu-right shadow animated--grow-in"
                aria-labelledby="userDropdown"
              >
                <Dropdown.Item href="/profile">
                  <FontAwesomeIcon
                    icon={faUser}
                    size="sm"
                    fixedWidth
                    className="mr-2 text-gray-400"
                  ></FontAwesomeIcon>
                  Profile
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item data-toggle="modal" data-target="#customModal">
                  <FontAwesomeIcon
                    icon={faSignOutAlt}
                    size="sm"
                    fixedWidth
                    className="mr-2 text-gray-400"
                  ></FontAwesomeIcon>
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            )}
          </Dropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default CustomNavbar;
