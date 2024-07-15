import {
  faBars,
  faSignOutAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback } from "react";
import { Button, Nav, Navbar, Dropdown, Image, Form } from "react-bootstrap";
import { useLinkNavigate } from "../context/NavigationContext";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/modules/user";
import { logout as logoutApi } from "../services/UserApi";
import Report from "./Common/Report";

function CustomNavbar() {
  const navigate = useLinkNavigate();
  const user = useSelector(state=>state.user);
  const dispatch = useDispatch();

  const handleLogoutClick = useCallback(async (e) => {
    e.preventDefault();
    try {
      if (!confirm("로그아웃하시겠습니까?")) {
        return;
      }

      const result = await logoutApi();
      if (result) {
        alert(result.message);
        dispatch(logout())
        navigate(result.url);
       
      }
    } catch (thrown) {
      console.log(thrown);
      alert("로그아웃에 실패했습니다.");
    }
  }, []);

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
                {user && user.userInfo == null ? "게스트" : user.userInfo.name}
              </span>
              <Image
                className="img-profile rounded-circle"
                src="/images/undraw_profile.svg"
                alt="Profile"
                roundedCircle
              />
            </Dropdown.Toggle>

            {user && user.isLogin && (
              <Dropdown.Menu
                className="dropdown-menu-right shadow animated--grow-in"
                aria-labelledby="userDropdown"
              >
                <Dropdown.Item
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/profile");
                  }}
                >
                  <FontAwesomeIcon
                    icon={faUser}
                    size="sm"
                    fixedWidth
                    className="mr-2 text-gray-400"
                  ></FontAwesomeIcon>
                  Profile
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleLogoutClick}>
                  <FontAwesomeIcon
                    icon={faSignOutAlt}
                    size="sm"
                    fixedWidth
                    className="mr-2 text-gray-400"
                  ></FontAwesomeIcon>
                  Logout
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item>
                  <Report />
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
