package com.example.demo.user.model;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class LoginResponse {
	private Integer userId;
	private String message;
	
	public LoginResponse() {
		
	}
	
	public LoginResponse(Integer userId, String message){
		this.userId = userId;
		this.message = message;
	}
	

}
