import Footer from "../Footer";
import CustomNavbar from "../Navbar";
import Sidebar from "../SideBar";
import { Outlet } from "react-router-dom";
import { UserProvider } from "../../context/UserContext";

export function ContentLayout() {
  return (
    <UserProvider>
      <div id="wrapper">
        <Sidebar />
        <div id="content-wrapper">
          <div id="content">
            <CustomNavbar />
            {<Outlet />}
          </div>
          <Footer />
        </div>
      </div>
    </UserProvider>
  );
}

export default ContentLayout;
