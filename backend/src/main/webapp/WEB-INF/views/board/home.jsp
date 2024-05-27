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

    <title>SB Admin 2 - Home</title>

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
          <div class="container-fluid">
            <!-- Page Heading -->
            <h1 class="h3 mb-2 text-gray-800">게시판</h1>

            <!-- DataTales Example -->
            <div class="card shadow mb-4">
              <div class="card-body">
                <div class="table-responsive">
                  <table
                    class="table table-bordered"
                    id=""
                    width="100%"
                    cellspacing="0"
                  >
                    <colgroup>
                      <col width="7%" />
                      <col width="18%" />
                      <col width="38%" />
                      <col width="30%" />
                      <col width="7%" />
                    </colgroup>

                    <thead>
                      <tr>
                       	<th class="text-center">번호</th>
                        <th>닉네임</th>
                        <th>제목</th>
                        <th>날짜</th>
                        <th class="text-center">댓글</th>
                      </tr>
                    </thead>
                    <tbody>
                    <c:forEach items="${boardList}" var="board">
                    	<tr>
                    		<td class="text-center">${board['rowNum']}</td>
                        	<td>${board['userName']}</td>
                        	<td><a href="/board/detail/${board['boardId']}">${board['title']}</a></td>
                        	<td>${board['createdAt']}</td>
                        	<td class="text-center">${board['commentsCount']}</td> 
                    	</tr>
                    </c:forEach>
                    </tbody>
                  </table>
                  <%
                  	if(userId==null){
                  %>
				<a 
					data-toggle="modal"
                    data-target="#customModal"
                    ><button
                      type="button"
                      class="btn btn-primary btn float-right"
                      
                    >
                      게시글 작성
                    </button></a
                  >
                  <% 		
                  	}
                  	else{
                  %>
                  <a href="/board"
                    ><button
                      type="button"
                      class="btn btn-primary btn float-right"  
                    >
                      게시글 작성
                    </button></a
                  >                  
                  <%	
                  	}
                  %>

                </div>
                <jsp:include page="../commons/pagination.jsp">
                	<jsp:param name="link" value="/"/>
                	<jsp:param name="pageSize" value="${pageSize}"/>
     				<jsp:param name="pageNo" value="${pageNo}" />
     				<jsp:param name="lastPageNo" value="${lastPageNo}"/>
                </jsp:include>
              </div>
            </div>
          </div>
          <!-- /.container-fluid -->
        </div>
        
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
