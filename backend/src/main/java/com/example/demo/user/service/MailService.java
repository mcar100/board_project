package com.example.demo.user.service;

public interface MailService {
	public boolean checkEmailVerification(String authNum, String userNum);
	public String sendEmail(String email) throws Exception;	
}
