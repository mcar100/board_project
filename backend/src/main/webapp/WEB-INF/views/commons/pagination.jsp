<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%
	String link = request.getParameter("link");
	int pageSize = Integer.parseInt(request.getParameter("pageSize"));
	int currentPageNo = Integer.parseInt(request.getParameter("pageNo"));
	int lastPageNo = Integer.parseInt(request.getParameter("lastPageNo"));
	int range = (int)Math.ceil((double)currentPageNo/(double)pageSize);
	int startNo = (range-1)*pageSize+1;
	int endNo = range*pageSize;
	if(endNo>lastPageNo){
		endNo = lastPageNo;
	}
%>
<div class="container my-auto">
	<ul class="pagination justify-content-center">
		<li><button class="page-link" onclick="decreasePageNo()">◀</button></li>
		<%
			for(int i=startNo; i<=endNo; i++){
				if(i==currentPageNo){
				%>
					<li><a class="page-link bg-gradient-primary text-white" href="/?pageNo=<%=i%>"><%=i %></a></li>
				<%
				}
				else{
				%>
					<li><a class="page-link" href="/?pageNo=<%=i%>"><%=i %></a></li>
				<%} 
			}
			%>
		<li><button class="page-link" onclick="increasePageNo()">▶</button></li>
	</ul>
</div>
<script>
    function decreasePageNo() {
    	
        let currentPageNo = <%= currentPageNo %>
        if (currentPageNo > 1) {
            let newPageNo = currentPageNo - 1;
            window.location.href = "/?pageNo=" + newPageNo;
        }
    }

    function increasePageNo() {
        let currentPageNo = <%= currentPageNo %>
        if(currentPageNo < <%= lastPageNo %>){
            let newPageNo = currentPageNo + 1;
            window.location.href = "/?pageNo=" + newPageNo;	
        }
    }
</script>
