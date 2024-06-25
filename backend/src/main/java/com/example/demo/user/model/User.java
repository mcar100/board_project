package com.example.demo.user.model;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class User {
	private Integer id;
	private String name;
	private String email;
	private String password;
	private String phone;
	private String zipCode;
	private String address1;
	private String address2;
	private String details;
	private String createdAt;
	private String modifyAt;
	private String deletedAt;
	private String privilege;
}
