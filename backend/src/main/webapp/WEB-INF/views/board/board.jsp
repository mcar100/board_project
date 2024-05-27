<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page import="java.util.*" %>
<%@ page import="com.example.demo.board.model.FileDTO" %>
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

    <title>SB Admin 2 - Board</title>

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
   	HashMap<String, Object> boardData = (HashMap<String,Object>)request.getAttribute("boardData");
   	FileDTO[] filesData = (FileDTO[])request.getAttribute("filesData");
   	Integer fileCount = 0;
   	if(filesData!=null){
   		fileCount =	filesData.length;
   	}
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
		  <!--  Topbar -->
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
                <form id="boardForm" class="h-100">
                  <div class="card shadow mb-4 h-100">
                    <div class="card-header py-3">
                      <div class="col-sm-11 float-left">
                        <input
                          type="text"
                          id="boardTitle"
                          name="title"
                          class="form-control"
                          placeholder="제목"
                          value="${boardData['boardTitle']}"
                        />
                      </div>
                      	<%
                      	if(boardData==null){
                      	%>                    	
                        	<input id="formSubmitBtn" data-type="create" type="submit" class="btn btn-primary btn float-right ml-1" value="작성 완료"></input>
                        <% } 
                        else{%>
                        	<input id="formSubmitBtn" data-type="modify" type="submit" class="btn btn-primary btn float-right ml-1" value="수정 완료"></input>
						<% } %>
                    </div>
                    <div class="card-body h-100">
                      <textarea
                        id="boardContent"
                        name="content"
                        cols="30"
                        class="form-control h-75"
                        placeholder="내용"
                        style="resize: none"
                      >${boardData['boardContent']}</textarea>
						<div class="h-25 mt-3">
                    		<input type="file" name="files" id="boardFiles" multiple="multiple"
                    			style="display: none"
                    		/>
                    		<label class="btn-sm ml-1 btn-primary" for="boardFiles">파일 업로드</label>
                    		<span id="fileCount" class="ml-1 small">파일 <%=fileCount %>개</span>
                    		<ul id="fileOriginNameList" class="ml-1 small row">
                    		<c:forEach var="fileInfo" items="${filesData}">
                 				<li class="mr-4 position-relative" 
                 					data-id="${fileInfo.id}"
                 					data-name="${fileInfo.originalName}"
                 					data-type="origin"
                 				>
                 				<c:out value="${fileInfo.originalName}" />
                 				</li>
                 			</c:forEach>
                    		</ul>
                    		<ul id="fileNameList" class="ml-1 small row">
                    		</ul>
                    	</div>
                    </div>

                  </div>
                </form>
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
    
    <!--  my script files -->
  	<script type="module" src="/resources/static/js/page/board.js"></script>
  </body>
</html>
