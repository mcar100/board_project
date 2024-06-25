package com.example.demo.user.mapper;


import org.apache.ibatis.annotations.Mapper;

import com.example.demo.user.model.User;

@Mapper
public interface UserMapper { 
	public User selectUserDataByEmailAndPassword(String email, String encryptedPassword);
	public String selectUserPasswordByEmail(String email);
	public User selectUserById(Integer userId);
	public void insertUserData(User user);
	public Integer countDuplicatedUserName(String value);
	public Integer countDuplicatedUserEmail(String value);
	public Integer updateUserLastLoginById(Integer userId);

}
