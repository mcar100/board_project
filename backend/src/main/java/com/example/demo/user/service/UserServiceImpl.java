package com.example.demo.user.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.user.mapper.UserMapper;
import com.example.demo.user.model.InputFormat;
import com.example.demo.user.model.User;
import com.example.demo.util.EncryptHelper;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserMapper userMapper;
	
	@Override
	public User getUserByEmailAndPassword(String email, String password) throws Exception {
		try {
			String encryptedPassword = userMapper.selectUserPasswordByEmail(email);
			if(encryptedPassword==null) {
				throw new Exception("Service: 입력된 정보(이메일)와 일치하는 사용자가 없습니다.");
			}

			boolean checkPassword = EncryptHelper.checkUserPassword(password, encryptedPassword);
			if(!checkPassword) {
				throw new Exception("Service: 비밀번호가 일치하지 않습니다.");
			}
			
			User user = userMapper.selectUserDataByEmailAndPassword(email, encryptedPassword);
			if(user==null) {
				throw new Exception("Service: 입력된 정보(이메일, 비밀번호)와 일치하는 사용자가 없습니다.");
			}
			
			Integer loginUpdate = userMapper.updateUserLastLoginById(user.getId());
			if(loginUpdate==null || loginUpdate==0) {
				throw new Exception("Service: 로그인 최신화를 위한 사용자를 찾을 수 없습니다.");
			}
			
			return user;
		}
    	catch(Exception e) {
    		System.out.println(e.getMessage());
    		return null;
    	}
	}

	@Override
	public Integer getUserIdByEmailAndPassword(String email, String password) throws Exception {
		try {
			User user = userMapper.selectUserDataByEmailAndPassword(email, password);
			if(user==null) {
				throw new Exception("Service: 입력된 정보(이메일,비밀번호)와 일치하는 사용자가 없습니다.");
			}
			return user.getId();
		}
    	catch(Exception e) {
    		System.out.println(e.getMessage());
    		return null;
    	}
	}
	
	@Override
	public User getUserById(Integer userId) throws Exception {
		try {
			User userData = userMapper.selectUserById(userId);
			if(userData==null) {
				throw new Exception("조회된 사용자가 없습니다");
			}
			return userData;
		}
		catch(Exception e) {
			System.out.println(e.getMessage());
			return null;
		}
	}
	
	@Override
	public boolean insertUserInfo(User user) throws Exception {
		try {
			String encryptedPassword = EncryptHelper.encryptUserPassword(user.getPassword());
			user.setPassword(encryptedPassword);
			
			// re: 후에 insert문 return 가입 추가 예정
			userMapper.insertUserData(user);
			return true;
		}
    	catch(Exception e) {
    		e.printStackTrace();
    		return false;
    	}
	}
	
	@Override
	public boolean checkDuplicatedUserInfo(InputFormat inputFormat) throws Exception{
		try {
			Integer count = 0;
			String inputType = inputFormat.getType();
			if(inputType.equals("name")) {
				count = userMapper.countDuplicatedUserName(inputFormat.getValue());
			}
			else if(inputType.equals("email")) {
				count = userMapper.countDuplicatedUserEmail(inputFormat.getValue());
			}
			if(count==0) {
				throw new Exception("Service: 입력된 정보와 일치하는 사용자가 없습니다.");
			}
			return true;
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return false;
		}
	}
}
