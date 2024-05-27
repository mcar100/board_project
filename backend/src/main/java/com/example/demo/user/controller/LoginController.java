package com.example.demo.user.controller;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.demo.config.RecaptchaConfig;
import com.example.demo.user.model.LoginFormat;
import com.example.demo.user.model.User;
import com.example.demo.user.service.UserService;
import com.example.demo.util.CookieHelper;

@Controller
@RequestMapping("/login")
public class LoginController {
    
	@Autowired
	private UserService userService;
	@Value("${recaptcha.secretkey}")
	private String secretKey;
	
    @GetMapping
    public String goLogin() {
		return "/account/login";
    }
    
    @PostMapping("/signin")
    @ResponseBody
    public boolean signIn(@RequestBody LoginFormat loginFormat, HttpServletRequest request, HttpServletResponse response) throws Exception {    	
    	try {
    		if(loginFormat==null) {
    			throw new Exception("RequestBody값이 없습니다.");
    		}
    		RecaptchaConfig.setSecretKey(secretKey);
    		
    		if(!RecaptchaConfig.verify(loginFormat.getRecaptcha())) {
    			throw new Exception("Recaptcha 에러");
    		}
    		
			User user = userService.getUserByEmailAndPassword(loginFormat.getEmail(), loginFormat.getPassword());
    		if(user == null) {
    			throw new Exception("User Service 에러");
    		}
    		
    		// session
    		request.getSession(false).invalidate();
    		HttpSession session = request.getSession(true);
    		session.setAttribute("user", user);
    		session.setAttribute("userId",user.getId());
    		session.setAttribute("username",user.getName());
    		session.setMaxInactiveInterval(1800*30);

    		if(loginFormat.getEmailCheck()!=null) {
    			Cookie emailCookie = CookieHelper.create("email",String.valueOf(loginFormat.getEmail()),3600*24*7);
    			response.addCookie(emailCookie);
    		}
    		else if(loginFormat.getEmailCheck()==null&&CookieHelper.isExist(request,"email")) {
    			CookieHelper.remove(response, "email");
    		}
    		
    		Cookie idCookie = CookieHelper.create("userId",String.valueOf(user.getId()),1800);
    		response.addCookie(idCookie);
    		return true;
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(e.getMessage());
			return false;
		}
	}
 
    @GetMapping("/signout")
    @ResponseBody
    public boolean signOut(HttpServletRequest request, HttpServletResponse response) {
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