package com.example.demo.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.servlet.HandlerInterceptor;

public class LoginInterceptor implements HandlerInterceptor {
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		try {
			HttpSession session = request.getSession(false);
			if(session==null) {
				return true;
			}
			Object user = session.getAttribute("user");
			
			if(user!=null) {
				throw new Exception("already login");
			}
			return true;
		}
		catch(Throwable err) {
			System.out.println(err.toString());
			String beforeUrl = request.getHeader("Referer");
			response.sendRedirect("redirect:"+beforeUrl);
			return false;
		}
	};
}
