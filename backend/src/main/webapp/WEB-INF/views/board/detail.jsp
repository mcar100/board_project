<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%> 
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page import="java.util.*" %>
<%@ page import="com.example.demo.board.model.FileDTO" %>
<%@ page import="com.example.demo.board.model.Comment" %>
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

    <title>SB Admin 2 - Board Detail</title>

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
	HashMap<String,Object> boardData = (HashMap<String,Object>)request.getAttribute("boardData");
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
                  <div class="card-header py-3">
                    <h6
                      class="m-0 font-weight-bold text-primary btn float-left"
                    >
                      ${boardData['boardTitle']}
                    </h6>
					<span class="m-0 text-gray btn small">
                     by ${boardData['userName']}
                    </span>
                    <%
                    	// big demical convert to int
                    	Integer boardUserId = Integer.parseInt(String.valueOf(boardData.get("userId")));
                    	if(boardUserId == userId){
                    %>
                    <a href="/board/modify/${boardData['boardId']}">
                    <button
                    	type="button"
                        class="btn btn-primary btn float-right ml-1"
                      >
                        수정
                      </button>
                    </a>
					<button
					  id="deleteBtn"
                      type="button"
                      class="btn btn-danger btn float-right"
                    >
                      삭제
                    </button>
                    <% 
                    }
                    %>
                  </div>
                  <pre
                    class="card-body navbar-nav-scroll"
                    style="height: 290px !important"
                  >${boardData['boardContent']}</pre>
				 <div class="card-body fileUpLoad flex">
                 <label class="fileUpLoadBtn mr-3">파일</label>
                 <div id="fileName" class="fileName">
                 	<c:forEach var="fileInfo" items="${filesData}">
                 		<c:url value="/file/download" var="url">
                 			<c:param name="uploadedName" value="${fileInfo.uploadedName}" />
                 			<c:param name="originalName" value="${fileInfo.originalName}" />
                 		</c:url>
                 		<a name="fileName" class="mr-3 small" href="${url}"><c:out value="${fileInfo.originalName}" /></a>
                 	</c:forEach>
                 </div>
               </div>
               	<!-- Comments -->
               	<div id="commentContent" class="card-footer">
      			<%@ include file="../board/comment.jsp" %>
      			</div>
      			<!--  End of the Comments -->
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
        
      </div>
      <!-- End of Content Wrapper -->
    </div>
    <!-- End of Page Wrapper -->

    <!-- Scroll to Top Button-->
    <a class="scroll-to-top rounded" href="#page-top">
      <i class="fas fa-angle-up"></i>
    </a>

	 <!-- Custom Modal-->
	<%@ include file="../commons/modal.jsp" %>

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
    
    <!--  custom scripts -->
    <script type="module" src="/resources/static/js/page/detail.js"></script>
  </body>
</html>