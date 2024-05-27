<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%> 
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, shrink-to-fit=no"
    />
    <meta name="description" content="" />
    <meta name="author" content="" />

    <title>SB Admin 2 - Profile</title>

    <!-- Custom fonts for this template -->
    <link
      href="/resources/static/vendor/fontawesome-free/css/all.min.css"
      rel="stylesheet"
      type="text/css"
    />
    <link
      href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i"
      rel="stylesheet"
    />

    <!-- Custom styles for this template -->
    <link href="/resources/static/css/sb-admin-2.min.css" rel="stylesheet" />

    <!-- Custom styles for this page -->
    <link
      href="/resources/static/vendor/datatables/dataTables.bootstrap4.min.css"
      rel="stylesheet"
    />
  </head>
  <%
	HttpSession userSession = request.getSession(false);
    Integer userId = (Integer)userSession.getAttribute("userId");
   	String username = (String)userSession.getAttribute("username");
  %>
  <body id="page-top">
    <!-- Page Wrapper -->
    <div id="wrapper">
    
      <!-- Sidebar -->
      <%@ include file="../commons/sidebar.jsp" %>
      <!--  End of the Sidebar -->
    
      <!-- Content Wrapper -->
      <div id="content-wrapper" class="d-flex flex-column">
        <!-- Main Content -->
        <div id="content">
        
		<!-- Topbar -->
		<%@ include file="../commons/navbar.jsp" %>
		<!-- End of Topbar -->
        
         <!-- Begin Page Content -->
          <div class="container-fluid h-100">
            <!-- Page Heading -->
            <h1 class="h3 mb-2 text-gray-800">게시판</h1>

            <!-- DataTales Example -->
            <div class="card shadow mb-4 h-75">
              <div class="card-body">
                <!-- Basic Card Example -->
                <div class="card shadow mb-4 h-100">
                  <div class="ml-4 flex">
                    <p class="mt-3 mr-2">닉네임</p>
                    <p class="ml-xl-5 mt-3 text-primary">${userData['name']}</p>
                  </div>
                  <hr class="sidebar-divider my-0" />
                  <div class="ml-4 flex">
                    <p class="mt-3 mr-2">이메일주소</p>
                    <p class="ml-xl-5 mt-3 text-primary">${userData['email']}</p>
                  </div>
                  <hr class="sidebar-divider my-0" />
                  <div class="ml-4 flex">
                    <p class="mt-3 mr-2">휴대폰번호</p>
                     <p class="ml-xl-5 mt-3 text-primary">${userData['phone']}</p>
                  </div>
                  <hr class="sidebar-divider my-0" />
                  <div class="form-group">
                    <div class="ml-4 flex">
                      <p class="mt-3 mr-2">주소</p>
                      <p class="ml-xl-5 mt-3 text-primary">${userData['address1']}</p>
                    </div>
                    <hr class="sidebar-divider my-0" />
                    <div class="ml-4 flex">
                      <p class="mt-3 mr-2">상세주소</p>
                      <p class="ml-xl-5 mt-3 text-primary">${userData['address2']}</p>
                    </div>
                  </div>
                  <hr class="sidebar-divider my-0" />
                  <div class="form-group row">
                    <div class="ml-4 col-sm-5 mb-3 mb-sm-0 flex">
                      <p class="mt-3 mr-2">우편번호</p>
                      <p class="ml-xl-5 mt-3 text-primary">${userData['zipCode']}</p>
                    </div>
                    <div class="ml-4 col-sm-5 flex">
                      <p class="mt-3 mr-2">참고사항</p>
                      <p class="ml-xl-5 mt-3 text-primary">${userData['details']}</p>
                    </div>
                  </div>
                  <hr class="sidebar-divider my-0" />
                </div>
              </div>
            </div>
          </div>
          <!-- /.container-fluid -->
        </div>
        <!-- End of Main Content -->
        
        <!-- Footer -->
        <%@ include file="../commons/footer.jsp" %>
        <!-- End of Footer -->
        
        <!-- End of Main Content -->
      </div>
      <!-- End of Content Wrapper -->
    </div>
    <!-- End of Page Wrapper -->

	 <!-- Custom Modal-->
	<%@ include file="../commons/modal.jsp" %>

    <!-- Scroll to Top Button-->
    <a class="scroll-to-top rounded" href="#page-top">
      <i class="fas fa-angle-up"></i>
    </a>

    <!-- Bootstrap core JavaScript-->
    <script src="/resources/static/vendor/jquery/jquery.min.js"></script>
    <script src="/resources/static/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

    <!-- Core plugin JavaScript-->
    <script src="/resources/static/vendor/jquery-easing/jquery.easing.min.js"></script>

    <!-- Custom scripts for all pages-->
    <script src="/resources/static/js/sb-admin-2.min.js"></script>

    <!-- Page level plugins -->
    <script src="/resources/static/vendor/datatables/jquery.dataTables.min.js"></script>
    <script src="/resources/static/vendor/datatables/dataTables.bootstrap4.min.js"></script>

    <!-- Page level custom scripts -->
    <script src="/resources/static/js/demo/datatables-demo.js"></script>
  </body>
</html>