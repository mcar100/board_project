import Footer from "../Footer";
import CustomNavbar from "../Navbar";
import Sidebar from "../SideBar";
import { Outlet } from "react-router-dom";
import { UserProvider } from "../../context/UserContext";
import { Container } from "react-bootstrap";
import BoardCardLayout from "./BoardCardLayout";

export function ContentLayout() {
  return (
    <UserProvider>
      <div id="wrapper">
        <Sidebar />
        <div id="content-wrapper">
          <div id="content">
            <CustomNavbar />
            <Container fluid>
              <h1 className="h3 mb-2 text-gray-800">게시판</h1>
              <BoardCardLayout>{<Outlet />}</BoardCardLayout>
            </Container>
          </div>
          <Footer />
        </div>
      </div>
    </UserProvider>
  );
}

export default ContentLayout;
