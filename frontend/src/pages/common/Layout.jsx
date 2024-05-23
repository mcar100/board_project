import Footer from "./Footer";
import CustomNavbar from "./Navbar";
import Sidebar from "./SideBar";

function Layout({ children }) {
  return (
    <div id="wrapper">
      <Sidebar />
      <div id="content-wrapper">
        <div id="content">
          <CustomNavbar />
          {children}
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
