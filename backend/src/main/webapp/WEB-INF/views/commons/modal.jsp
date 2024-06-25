<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<div
	class="modal fade"
	id="customModal"
	tabindex="-1"
	role="dialog"
	aria-labelledby="exampleModalLabel"
	aria-hidden="true"
>
	<div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
          <% 
          	if(userId==null){
          %>
          로그인
          <%
          	}
          	else{
          %>
		  로그아웃
          <%	
          	}
          %>
          </h5>
            <button
              class="close"
              type="button"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="modal-body">
          <% 
          	if(userId==null){
          %>
          로그인 하시겠습니까?
          <%
          	}
          	else{
          %>
		  로그아웃 하시겠습니까?
          <%	
          	}
          %>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-secondary"
              type="button"
              data-dismiss="modal"
            >
              Cancel
            </button>
		  <% 
          	if(userId==null){
          %>
       		 <a class="btn btn-primary" href="/login">Login</a>
          <%
          	}
          	else{
          %>
			<button id="signoutBtn" class="btn btn-primary">Logout</button>
          <%	
          	}
          %>
          </div>
        </div>
	</div>
</div>
<script type="module" src="/resources/static/js/page/login.js"></script>