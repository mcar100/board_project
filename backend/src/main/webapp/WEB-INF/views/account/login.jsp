<%@page import="java.net.URLDecoder" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
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

    <title>SB Admin 2 - Login</title>

    <!-- Custom fonts for this template-->
    <link
      href="/resources/static/vendor/fontawesome-free/css/all.min.css"
      rel="stylesheet"
      type="text/css"
    />
    <link
      href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i"
      rel="stylesheet"
    />

    <!-- Custom styles for this template-->
    <link href="resources/static/css/sb-admin-2.min.css" rel="stylesheet" />
    <script src="https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit" async defer></script>
  </head>
  <%
  			String email = "";
    		for(Cookie c:request.getCookies()){
    			if(c.getName().contains("email")){
    				email = URLDecoder.decode(c.getValue(),"UTF-8");
    			}
   		}
  %>
  <body class="bg-gradient-primary">
    <div class="container">
      <!-- Outer Row -->
      <div class="row justify-content-center">
        <div class="col-xl-10 col-lg-12 col-md-9">
          <div class="card o-hidden border-0 shadow-lg my-5">
            <div class="card-body p-0">
              <!-- Nested Row within Card Body -->
              <div class="row">
                <div class="col-lg-6 d-none d-lg-block bg-login-image"></div>
                <div class="col-lg-6">
                  <div class="p-5">
                    <div class="text-center">
                      <h1 class="h4 text-gray-900 mb-4">Welcome Back!</h1>
                    </div>
                    <form id="loginForm" class="user">
                      <div class="form-group">
                        <input
                          data-title="이메일"
                          type="email"
                          name="email"
                          class="form-control form-control-user"
                          aria-describedby="emailHelp"
                          placeholder="Enter Email Address..."
                          value="<%= email%>"
                        />
                      </div>
                      <div class="form-group">
                        <input
                          data-title="비밀번호"
                          type="password"
                          name="password"
                          autocomplete="current-password"
                          class="form-control form-control-user"
                          placeholder="Password"
                        />
                      </div>
                      <div class="form-group">
                        <div class="custom-control custom-checkbox small">
                          <input
                          	id="emailCheck"
                            type="checkbox"
                            name="emailCheck"
                            class="custom-control-input"
                            <% 
                            if(email.length()>0){
                          		%>checked<%  	
                            }%>
                          />
                          <label class="custom-control-label" for="emailCheck">Remember Me</label>
                        </div>
                      </div>
					  <div class="form-group flex justify-content-center">
					  		<div id="loginRecaptcha" class=" g-recaptcha"></div>

                       	
                      </div>
                      <input
                      	id="loginBtn"
                        type="submit"
                        class="btn btn-primary btn-user btn-block"
                        value="로그인"
                        disabled
                      />
                      <hr />
                    <div class="text-center">
                      <a class="small" href="/membership"
                        >Create an Account!</a
                      >
                    </div>
					<div class="text-center">
                      <a class="small" href="/"
                        >Home</a
                      >
                    </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bootstrap core JavaScript-->
    <script src="/resources/static/vendor/jquery/jquery.min.js"></script>
    <script src="/resources/static/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

    <!-- Core plugin JavaScript-->
    <script src="/resources/static/vendor/jquery-easing/jquery.easing.min.js"></script>

    <!-- Custom scripts for all pages-->
    <script src="/resources/static/js/sb-admin-2.min.js"></script>
  
  	<!--  my script files -->
  	 <script type="module" src="/resources/static/js/page/login.js"></script>
  	 <script>
  	function onloadCallback(){
  		grecaptcha.render("loginRecaptcha",{
  			'sitekey': '6Lf3CtopAAAAAGgqtQkIPw6l2pY16WmfgpgenWtb',
  			'callback': recaptchaCallback,
  			'expired-callback' : expiredCallback,
  		})
  	}
  	 
  	function recaptchaCallback(response){
  		if(response){
  			$("#loginBtn").attr("disabled",false);	
  		}
  	}
  	
    function expiredCallback(response) {
        $("#loginBtn").addClass("disabled-btn");
        $("#loginBtn").attr("disabled", true);
      }

  	 </script>
  </body>
</html>