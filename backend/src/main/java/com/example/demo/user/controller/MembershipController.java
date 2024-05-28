package com.example.demo.user.controller;

import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.user.model.InputFormat;
import com.example.demo.user.model.User;
import com.example.demo.user.service.MailService;
import com.example.demo.user.service.UserService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
public class MembershipController{
	
	@Autowired
	private UserService userService;
	@Autowired
	private MailService mailService;
	
	@PostMapping("/signup")
	@ResponseBody
    public boolean signUp(@RequestBody User user) throws Exception {
		try {
			if(user==null) {
				throw new Exception("요청된 정보가 없습니다.");
			}
			
    		boolean result = userService.insertUserInfo(user);
    		if(!result) {
    			throw new Exception("User Service 에러");
    		}
    		return true;
    	}
    	catch(Exception e) {
    		System.out.println(e.getMessage());
    		return false;
    	}
    }

	@GetMapping("/user")
	@ResponseBody
    public boolean checkNameDuplicate(@RequestParam Map<String, Object> map) throws Exception {
		try {
			if(map==null) {
				throw new Exception("요청된 정보가 없습니다.");
			}
			
			InputFormat inputFormat = new InputFormat();
			inputFormat.setType((String) map.get("type"));
			inputFormat.setValue((String) map.get("value"));
    		boolean check = userService.checkDuplicatedUserInfo(inputFormat);
    		if(check) {
    			throw new Exception("중복된 정보가 존재합니다.");
    		}
    		return false;
    	}
    	catch(Exception e) {
    		System.out.println(e.getMessage());
    		return true;
    	}
    }
	
	@PostMapping("/send")
	@ResponseBody
	public boolean sendEmailVerification(@RequestBody User user, HttpSession session) throws Exception {
		try {
			if(user==null||user.getEmail()==null) {
				throw new Exception("요청된 정보가 없습니다.");
			}
			
			String authNum = mailService.sendEmail(user.getEmail());
			System.out.println(authNum);
			if(authNum==null) {
				throw new Exception("이메일 전송 실패");
			}
			session.setAttribute("emailAuthNum", authNum);
			session.setMaxInactiveInterval(60*5); // 5분 동안 유효
			return true;
		}
		catch(Exception e) {
			System.out.println(e.getMessage());
			return false;
		}

	}
	
	@PostMapping("/verify")
	@ResponseBody
	public boolean verifyEmail(@RequestBody Map<String, Object> map, HttpSession session) throws Exception {
		try {
			String userNum = (String)map.get("userNum");
			if(userNum==null) {
				throw new Exception("잘못된 요청입니다.");
			}
			
			String authNum = (String)session.getAttribute("emailAuthNum");
			if(authNum==null) {
				throw new Exception("인증코드가 만료되었습니다.");
			}
			
			boolean verify = mailService.checkEmailVerification(authNum, userNum);
			if(!verify) {
				throw new Exception("잘못된 번호입니다. 올바른 인증코드를 입력해주세요.");
			}
			System.out.println("인증되었습니다.");
			return true;
		}
		catch(Exception e) {
			System.out.println(e.getMessage());
			return false;
		}

	}
}
