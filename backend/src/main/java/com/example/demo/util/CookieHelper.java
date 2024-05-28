package com.example.demo.util;

import java.net.URLEncoder;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class CookieHelper {
	
	private CookieHelper() {}

	public static boolean isExist(HttpServletRequest request, String cookieName) {
		boolean isExist = false;
		for(Cookie c:request.getCookies()) {
			if(c.getName().contains(cookieName)) {
				isExist = true;
			}
		}
		return isExist;
	}
	
	public static Cookie create(String cookieName, String cookieValue, String cookiePath, Integer cookieTimer) throws Exception{
		try {
			String encodedValue = URLEncoder.encode(cookieValue, "UTF-8");
			Cookie cookie = new Cookie(cookieName, encodedValue);
			cookie.setPath(cookiePath);
			cookie.setMaxAge(cookieTimer);
			return cookie;
		}
		catch(Exception e) {
			return null;
		}

	}
	
	public static void remove(HttpServletResponse response, String cookieName, String cookiePath) {
		Cookie cookie = new Cookie(cookieName, null);
		cookie.setPath(cookiePath);
		cookie.setMaxAge(0);
		response.addCookie(cookie);
	}
}
