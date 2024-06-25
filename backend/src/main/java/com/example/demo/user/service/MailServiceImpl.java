package com.example.demo.user.service;

import java.util.Random;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class MailServiceImpl implements MailService {

	@Autowired
	private JavaMailSender mailSender;
	@Value("${mail.sender}")
	private String sender;
	
	@Override
	public boolean checkEmailVerification(String authNum, String userNum) {
		if(userNum.equals(authNum)) {
			return true;
		}
		else {
			return false;
		}
	}

	private String makeRandomNumber() {
		Random random = new Random();
		String randNum = "";
		for(int i=0; i<6; i++) {
			randNum += Integer.toString(random.nextInt(10));
		}
		return randNum;
	}

	private MimeMessage createMessage(String email, String code) {
		MimeMessage message = mailSender.createMimeMessage();
		
		try {
			MimeMessageHelper helper = new MimeMessageHelper(message,true,"UTF-8");
			System.out.println("sender: "+sender);
			// 메일 양식
			helper.setFrom(sender);
			helper.setTo(email);
			helper.setSubject("회원가입 이메일 인증입니다.");
			helper.setText("회원가입 란에 다음 이메일 인증번호를 입력하세요.<br>인증번호: "+code,true);
		}
		catch(MessagingException e) {
			e.printStackTrace();
		}
		
        return message;
		
	}

	@Override
	public String sendEmail(String email) throws Exception {
		try {
			String code = makeRandomNumber();
			MimeMessage mimeMessage = createMessage(email, code);
			
			if(mimeMessage==null) {
				throw new Exception("Service: 이메일 생성에 실패했습니다.");
			}
			mailSender.send(mimeMessage);
			return code;
		} catch(MailException e) {
			e.printStackTrace();
			return null;
		}
	}

}
