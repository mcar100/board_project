package com.example.demo.user.controller;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.config.RecaptchaConfig;
import com.example.demo.user.model.LoginFormat;
import com.example.demo.user.model.User;
import com.example.demo.user.service.UserService;
import com.example.demo.util.CookieHelper;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
public class LoginController {
    
	@Autowired
	private UserService userService;
	@Value("${recaptcha.secretkey}")
	private String secretKey;
    
    @PostMapping("/auth/login")
    public ResponseEntity<String> login(
    		@RequestBody LoginFormat loginFormat, HttpServletRequest request, HttpServletResponse response) throws Exception {    	
    	try {
    		log.info(request.getRequestURI()+"");
    		
    		if(loginFormat==null) {
    			throw new Exception("요청된 정보가 없습니다.");
    		}
//    		RecaptchaConfig.setSecretKey(secretKey);
//    		
//    		if(!RecaptchaConfig.verify(loginFormat.getRecaptcha())) {
//    			throw new Exception("Recaptcha 에러");
//    		}
    		
    		log.info(loginFormat.getEmail() +" " +loginFormat.getPassword()+" "+loginFormat.getEmailCheck() +"");
			User user = userService.getUserByEmailAndPassword(loginFormat.getEmail(), loginFormat.getPassword());
    		if(user == null) {
    			throw new Exception("이메일 혹은 비밀번호가 틀렸습니다.");
    		}
    		
    		// session
    		if(request.getSession()!=null) {
    			request.getSession(false).invalidate();
    		}
    		HttpSession session = request.getSession(true);
    		session.setAttribute("user", user);
    		session.setAttribute("userId",user.getId());
    		session.setAttribute("username",user.getName());
    		session.setMaxInactiveInterval(1800*30);

    		if(loginFormat.getEmailCheck().equals("true")) {
    			Cookie emailCookie = CookieHelper.create("email",String.valueOf(loginFormat.getEmail()),"/login",3600*24*7);
    			response.addCookie(emailCookie);
    		}
    		else {
    			CookieHelper.remove(response, "email","/login");
    		}
    		
    		Cookie idCookie = CookieHelper.create("userId",String.valueOf(user.getId()),"/",1800);
    		response.addCookie(idCookie);
    		return ResponseEntity.ok().body("로그인되었습니다.");
		} catch (Exception e) {
			log.error(e.getMessage()+"");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
		}
	}
 
    @GetMapping("/auth/logout")
    public boolean logout(HttpServletRequest request, HttpServletResponse response) {
    	HttpSession session = request.getSession(false);
    	if(session != null) {
    		session.invalidate();
    	}
    	
    	Cookie idCookie = new Cookie("userId",null);
    	idCookie.setMaxAge(0);
    	response.addCookie(idCookie);
    	return true;
    }
    

}