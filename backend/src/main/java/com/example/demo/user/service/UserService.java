package com.example.demo.user.service;

import com.example.demo.user.model.InputFormat;
import com.example.demo.user.model.User;

public interface UserService {
	
	User getUserByEmailAndPassword(String email, String password) throws Exception;
	
	Integer getUserIdByEmailAndPassword(String email, String password) throws Exception;
	
	User getUserById(Integer userId) throws Exception;
	
	boolean insertUserInfo(User user) throws Exception;
	
	boolean checkDuplicatedUserInfo(InputFormat inputFormat) throws Exception;
}
