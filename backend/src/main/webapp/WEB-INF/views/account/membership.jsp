<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
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

    <title>SB Admin 2 - Register</title>

    <!-- Custom fonts for this template-->
    <link
      href="resources/static/vendor/fontawesome-free/css/all.min.css"
      rel="stylesheet"
      type="text/css"
    />
    <link
      href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i"
      rel="stylesheet"
    />

    <!-- Custom styles for this template-->
    <link href="resources/static/css/sb-admin-2.min.css" rel="stylesheet" />
    
    <!--  My CSS Style -->
    <link href="resources/static/css/custom.css" rel="stylesheet" />
  </head>
  <body class="bg-gradient-primary">
    <div class="container">
      <div class="card o-hidden border-0 shadow-lg my-5">
        <div class="card-body p-0">
          <!-- Nested Row within Card Body -->
          <div class="row">
            <div class="col-lg-5 d-none d-lg-block bg-register-image"></div>
            <div class="col-lg-7">
              <div class="p-5">
                <div class="text-center">
                  <h1 class="h4 text-gray-900 mb-4">회원가입</h1>
                </div>
                <form id="registerForm" class="user">
                  <div class="form-group">
                    <input
                     data-title="이름"
                     name="name"
                     id="nameInput"
                     class="form-control form-control-user"
                     type="text"
                     title="한글+특수문자 불가, 10자 이하"
                     maxLength="10"
                     placeholder="이름"
                    />
                    <span id="name_msg" class="form-msg form-msg-hidden"></span>
                  </div>
                  <div class="form-group row">
                    <div class="col-sm-9 mb-3 mb-sm-0">
                      <input
                      	data-title="이메일"
                      	name="email"
                      	id="emailInput"
                      	class="form-control form-control-user"
                      	type="text"
                        placeholder="이메일주소"
                      />
                    </div>
                    <div class="col-sm-3">
                      <button
    					id="emailCheck"
                        class="btn btn-primary btn-user btn-block"
                      >
                        중복 확인
                      </button>
                    </div>
                  </div>
                 <div id="emailAuthForm" class="form-group row flex" style="display:none">
                    <div class="col-sm-6 mb-3 mb-sm-0">
                      <input
                      	data-title="이메일 인증"
                      	name="emailAuth"
                      	id="emailAuthInput"
                      	class="form-control form-control-user position-relative"
                      	type="text"
                        placeholder="인증번호"
                      />
                      <span id="authTimer" class="position-absolute small text-primary" style="right:30px; bottom:15px"></span>
                    </div>
                    <div class="col-sm-3">
                      <button
    					id="sendAuthBtn"
                        class="btn btn-primary btn-user btn-block mt-0"
                      >
                        인증번호 전송
                      </button>
					<button
    					id="checkAuthBtn"
                        class="btn btn-primary btn-user btn-block mt-0"
                        style="display:none"
                      >
                        이메일 인증
                      </button>
                    </div>
                  </div>
                  
                  <div class="form-group row">
                    <div class="col-sm-6 mb-3 mb-sm-0">
                      <input
                      	data-title="비밀번호"
                      	name="password"
                      	id="passwordInput"
                      	class="form-control form-control-user"
                        type="password"
                        title="영어+특수문자만 입력가능, 8~15자"
                        maxLength="15"
                        placeholder="비밀번호"
                      />
                    </div>
                    <div class="col-sm-6">
                      <input
                      	data-title="비밀번호 확인"
                      	name="passwordCheck"
                      	id="passwordCheckInput"
                        type="password"
                        class="form-control form-control-user"
                        placeholder="비밀번호 확인"
                      />
                    </div>
                  </div>
                  <div class="form-group">
                    <input
                      data-title="휴대폰번호"
                      name="phone"
                      id="phoneInput"
                      class="form-control form-control-user"
                      placeholder="휴대폰번호"
                      type="tel"
                      pattern="[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}"
                      maxLength="13"
                      />
                  </div>
                  <div class="form-group row">
                    <div class="col-sm-9 mb-3 mb-sm-0">
                      <input
                      	data-title="주소"
                      	name="address1"
                      	id="addressInput"
                      	class="form-control form-control-user"
                        type="text"
                        placeholder="주소"
                      />
                    </div>
                    <div class="col-sm-3">
                      <button
                      	id="addressBtn"
                        class="btn btn-primary btn-user btn-block"
                      >
                        주소찾기
                      </button>
                    </div>
                  </div>
                  <div class="form-group">
                    <input
                      data-title="상세주소"
                      name="address2"
                      id="detailAddressInput"
                      class="form-control form-control-user"
                      type="text"
                      placeholder="상세주소"
                    />
                  </div>
                  <div class="form-group row">
                    <div class="col-sm-6 mb-3 mb-sm-0">
                      <input
                      	data-title="우편번호"
                      	name="zipCode"
                      	id="zipCodeInput"
                      	class="form-control form-control-user"
                        type="text"
                        placeholder="우편번호"
                      />
                    </div>
                    <div class="col-sm-6">
                      <input
                      	data-title="참고사항"
                      	name="details"
                      	id="buildingNameInput"
                      	class="form-control form-control-user"
                        type="text"
                        placeholder="참고사항"
                      />
                    </div>
                  </div>

                  <input
                   	type="submit" 
                    class="btn btn-primary btn-user btn-block"
                  	value="Register Account"
                  />
                </form>
                <hr />
                <div class="text-center">
                  <a class="small" href="/login"
                    >Already have an account? Login!</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bootstrap core JavaScript-->
    <script src="resources/static/vendor/jquery/jquery.min.js"></script>
    <script src="resources/static/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

    <!-- Core plugin JavaScript-->
    <script src="resources/static/vendor/jquery-easing/jquery.easing.min.js"></script>

    <!-- Custom scripts for all pages-->
    <script src="resources/static/js/sb-admin-2.min.js"></script>
    <script type="module" src="resources/static/js/page/membership.js"></script>
    
    <!--  daum postcode api -->
   	<script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
  </body>
</html>