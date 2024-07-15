import React from "react";
import Footer from "../Footer";
import CustomNavbar from "../Navbar";
import Sidebar from "../SideBar";
import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import BoardCardLayout from "./BoardCardLayout";

const ContentLayout = () => {
  return (
      <div id="wrapper">
        <Sidebar />
        <div id="content-wrapper">
          <div id="content">
            <CustomNavbar />
            <Container fluid>
              <h1 className="h3 mb-2 text-gray-800">게시판</h1>
              <BoardCardLayout>
                <Outlet />
              </BoardCardLayout>
            </Container>
          </div>
          <Footer />
        </div>
      </div>
  );
};

export default ContentLayout;
