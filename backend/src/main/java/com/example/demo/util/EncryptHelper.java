package com.example.demo.util;

import org.mindrot.jbcrypt.BCrypt;

public class EncryptHelper {
	
	private EncryptHelper() {}
	
	public static String encryptUserPassword(String password) {
		return BCrypt.hashpw(password, BCrypt.gensalt(11));
	}
	
	
	public static boolean checkUserPassword(String inputPassword, String encryptedPassword) {
		return BCrypt.checkpw(inputPassword, encryptedPassword);
	}
	
}
