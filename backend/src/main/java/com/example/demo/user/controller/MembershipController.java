package com.example.demo.user.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
	
	@PostMapping("/users")
    public ResponseEntity<String> signUp(@RequestBody User user,HttpServletRequest request) throws Exception {
		log.info(request.getRequestURI()+"");
		try {
			if(user==null) {
				throw new Exception("요청된 정보가 올바르지 않습니다.");
			}
			
    		boolean result = userService.insertUserInfo(user);
    		if(!result) {
    			throw new Exception("회원가입에 실패했습니다.");
    		}
    		return ResponseEntity.ok().body("가입되었습니다.");
    	}
    	catch(Exception e) {
    		log.error(e.getMessage());
    		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    	}
    }

	@GetMapping("/users/duplication")
    public ResponseEntity<String> checkInfoDuplicate(@RequestParam Map<String, Object> map, HttpServletRequest request) throws Exception {
		try {
			log.info(request.getRequestURI()+"");
			if(map==null) {
				throw new Exception("요청된 정보가 올바르지 않습니다.");
			}
			log.info(map.get("type") +" " +map.get("value"));
			InputFormat inputFormat = new InputFormat();
			inputFormat.setType((String) map.get("type"));
			inputFormat.setValue((String) map.get("value"));
    		boolean check = userService.checkDuplicatedUserInfo(inputFormat);
    		if(check) {
    			throw new Exception("중복된 정보가 존재합니다.");
    		}
    		return ResponseEntity.ok().body("사용 가능한 정보입니다.");
    	}
    	catch(Exception e) {
    		log.error(e.getMessage()+"");
    		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    	}
    }
	
	@PostMapping("/auth/email")
	public ResponseEntity<String> sendEmailVerification(@RequestBody User user, HttpSession session, HttpServletRequest request) throws Exception {
		log.info(request.getRequestURI()+"");
		try {
			if(user==null||user.getEmail()==null) {
				throw new Exception("요청된 정보가 올바르지 않습니다.");
			}
			String authNum = mailService.sendEmail(user.getEmail());
			log.info("send authcode("+ authNum+") to "+user.getEmail());
			if(authNum==null) {
				throw new Exception("이메일 전송 실패");
			}
			session.setAttribute("emailAuthNum", authNum);
			session.setMaxInactiveInterval(300); // 5분 동안 유효
			return ResponseEntity.ok().body("인증번호가 전송되었습니다.");
		}
		catch(Exception e) {
			log.error(e.getMessage());
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("인증번호 전송에 실패했습니다.");
		}

	}
	
	@PostMapping("/auth/verification")
	@ResponseBody
	public ResponseEntity<String> verifyEmail(@RequestBody Map<String, Object> map, HttpSession session, HttpServletRequest request) throws Exception {
		log.info(request.getRequestURI()+"");
		try {
			String authNum = (String)session.getAttribute("emailAuthNum");
			if(authNum==null) {
				log.error("인증코드 만료됨");
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body("인증코드가 만료되었습니다. 다시 인증을 진행해주세요.");
			}
			
			String userNum = (String)map.get("userNum");
			if(userNum==null||userNum.length()==0) {
				throw new Exception("인증 코드를 입력해주세요.");
			}
			
			boolean verify = mailService.checkEmailVerification(authNum, userNum);
			if(!verify) {
				throw new Exception("잘못된 번호입니다. 올바른 인증코드를 입력해주세요.");
			}
			log.info("인증 완료");
			return ResponseEntity.ok().body("인증되었습니다.");
		}
		catch(Exception e) {
			log.error(e.getMessage());
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
		}

	}
}
