import {
  faFolder,
  faLaughWink,
  faTable,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import callAxios from "../services/axios";

function Sidebar() {
  const userId = null;
  const navigate = useNavigate();
  const handleLinkClick = (e, link) => {
    e.preventDefault();
    navigate(link);
  };
  const handleLogoutClick = async (e) => {
    e.preventDefault();
    try {
      if (!confirm("로그아웃하시겠습니까?")) {
        return;
      }
      const response = await callAxios.get("/auth/logout");
      if (response.status === 200) {
        alert(response.data);
        navigate("/login");
      }
    } catch (thrown) {
      alert("로그아웃에 실패했습니다.");
    }
  };
  return (
    <Navbar
      id="accordionSidebar"
      className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion flex-column"
    >
      <Nav className="flex-column ml-auto">
        <Navbar.Brand
          href="/"
          className="sidebar-brand d-flex align-items-center justify-content-center"
        >
          <div className="sidebar-brand-icon rotate-n-15">
            <FontAwesomeIcon icon={faLaughWink} size="2x"></FontAwesomeIcon>
          </div>
          <div className="sidebar-brand-text mx-3">게시판</div>
        </Navbar.Brand>
        <hr className="sidebar-divider my-0" />

        <Nav className="nav-item">
          <NavDropdown
            title={
              <span>
                <FontAwesomeIcon icon={faFolder} /> Pages
              </span>
            }
            id="basic-dropdown"
          >
            <h6 className="dropdown-header">Login Screens:</h6>
            {userId == null ? (
              <>
                <NavDropdown.Item
                  href="#"
                  onClick={(e) => {
                    handleLinkClick(e, "/login");
                  }}
                >
                  Login
                </NavDropdown.Item>
                <NavDropdown.Item
                  href="#"
                  onClick={(e) => {
                    handleLinkClick(e, "/membership");
                  }}
                >
                  Membership
                </NavDropdown.Item>
              </>
            ) : (
              <NavDropdown.Item
                href="#"
                onClick={(e) => {
                  handleLogoutClick(e);
                }}
              >
                Logout
              </NavDropdown.Item>
            )}
          </NavDropdown>
        </Nav>

        <li className="nav-item active">
          <a className="nav-link" href="/">
            <FontAwesomeIcon fixedWidth icon={faTable}></FontAwesomeIcon>
            <span>Tables</span>
          </a>
        </li>

        <hr className="sidebar-divider d-none d-md-block" />

        <div className="text-center d-none d-md-inline">
          <button
            className="rounded-circle border-0"
            id="sidebarToggle"
          ></button>
        </div>
      </Nav>
    </Navbar>
  );
}

export default Sidebar;
