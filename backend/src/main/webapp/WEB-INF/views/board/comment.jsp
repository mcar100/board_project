<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%> 
<%@ page import="java.util.*" %>
<%@ page import="com.example.demo.board.model.Comment" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%
	ArrayList<Comment> commentsData = (ArrayList<Comment>)request.getAttribute("commentsData");
	HashMap<Integer,String> usernameList = new HashMap<>();
	for(Comment comment : commentsData){
		int id = comment.getId();
		if(!usernameList.containsKey(id)){
			usernameList.put(comment.getId(),comment.getUserName());	
		}
	}
	
%>
	<form action="#" id="replyForm" name="replyForm">
		<input type="hidden" name="boardNo" value="1">
		<input type="hidden" name="parentCommentNo" value="0">
		<input type="hidden" name="commentNo" value="0">
		<ul id="commentDiv" style="max-height: 500px; overflow-y: scroll;overflow-x: hidden;">
			<c:set var="sessionId" value="${userId}"/>
			<c:set var="isSession" value="${userId!=null? true: false}"/>
			<c:set var="writerId" value="${boardData.userId}"/>
			<c:forEach var="comment" items="${commentsData}">
				<c:set var="isPublic" value="${comment.status=='PUBLIC'? true:false }"/>
				<c:set var="paddingDepth" value="${comment.depth*20}" />
				<c:set var="parentId" value="${comment.parentId}" />
				<li 
					data-name="${comment.userName}" 
					data-depth="${comment.depth}" 
					data-id="${comment.id}"
					style="padding-left: ${paddingDepth}px; position: relative"
				>
				<c:if test="${paddingDepth > 0}">
				<span class="border-left border-bottom" style="width:15px; height:31px; position:absolute" ></span>
				</c:if>		
					<div class="commentDiv" style="padding-left: 2rem;">
						<div class="commentHead">
                        	<div class="commentHead1">
                           		<div class="commentName">${comment.userName}</div>
                           		<div class="commentDate">${comment.createdAt}</div>
                           		<c:if test="${comment.modifyAt!=null? true:false}">
                           		<div class="small pl-1">(수정)</div>
                           		</c:if>
                        	</div>
                        	<c:if test="${isSession&&isPublic}">
                        	<div class="commentHead2">
                           		<div class="commentReply" data-activate="false">답글</div>
                           		<div class="commentCancle" style="display:none;">취소</div>
                           		<c:if test="${sessionId==comment.usersId}">
                           		<div class="commentModify" data-activate="false">수정</div>
                           		</c:if>
                           		<c:if test="${sessionId == comment.usersId  or sessionId == writerId}">
                           		<div class="commentRemove">삭제</div>
                           		</c:if>
                        	</div>
                        	</c:if>
                     	</div>
                     	<div class="comment flex">
							<c:if test="${comment.parentId!=null}">
								<% Integer parentId = (Integer) pageContext.getAttribute("parentId"); %>
                     			<span class="mr-2 text-primary">@<%=usernameList.get(parentId)%></span>
                     		</c:if>
                     		<c:choose>
                     			<c:when test="${isPublic}">
                     				<pre>${comment.content}</pre>    
								</c:when>
								<c:otherwise>                     		
                     				<p>삭제된 댓글입니다.</p>   
                     			</c:otherwise>
							</c:choose>
						</div>
					</div>
					<hr class="sidebar-divider d-none d-md-block" style="width: 100%">
			</li>
			</c:forEach>
		</ul>
	</form>
	<c:if test="${isSession}">
	<form class="flex" id="commentForm" name="commentForm">
		<input type="hidden" name="boardNo" value="1">
		<textarea id="a3" cols="30" row="5" name="commentContent" class="form-control flex" style="width: 90%" placeholder="내용"></textarea>
			<a class="commentAdd flex" style="width: 9%">
				<button type="submit" class="btn btn-primary btn ml-1" style="margin-top: 0.75rem;width: 100%">등록</button>
			</a>
	</form>
	</c:if>
<script type="module" src="/resources/static/js/page/comment.js"></script>