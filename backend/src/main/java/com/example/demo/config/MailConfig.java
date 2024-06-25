package com.example.demo.config;

import java.util.Properties;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

@Configuration
public class MailConfig {

	@Value("${mail.username}")
	private String username;
	@Value("${mail.password}")
	private String password;
	
	@Bean
	public JavaMailSender mailService() {
		JavaMailSenderImpl javaMailSender = new JavaMailSenderImpl();
		
		javaMailSender.setHost("smtp.naver.com"); // smtp sever
		javaMailSender.setUsername(username);
		javaMailSender.setPassword(password);
		javaMailSender.setPort(587); // smtps port number
		javaMailSender.setJavaMailProperties(getMailProperties());
		
		return javaMailSender;
	}
	
	private Properties getMailProperties() {
		Properties properties = new Properties();
		properties.setProperty("mail.transport.protocol", "smtp"); // set protocol
		properties.setProperty("mail.smtp.auth", "true"); // smtp authentication
	    properties.setProperty("mail.smtp.starttls.enable", "true"); // smtp strattles -> encryption transport
	    properties.setProperty("mail.debug", "true"); // set debug
		return properties;
	}
	
	
	
}
