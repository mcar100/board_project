package com.example.demo.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
public class AuthInterceptor implements HandlerInterceptor {
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler ) throws Exception {
		try {
			HttpSession session = request.getSession(false);
			Object user = session.getAttribute("user");

			if(user==null) {
				throw new Exception("there is no user Session");	
			}
			System.out.println("there is a session");
			return true;
		}
		catch(Throwable err) {
			System.out.println(err.getMessage());
			response.sendRedirect("/login");
			return false;
		}
	};
}
