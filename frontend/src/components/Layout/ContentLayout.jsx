import Footer from "../Footer";
import CustomNavbar from "../Navbar";
import Sidebar from "../SideBar";

export function ContentLayout({ children }) {
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

export default ContentLayout;
