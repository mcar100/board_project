package com.example.demo.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.example.demo.interceptor.AuthInterceptor;
import com.example.demo.interceptor.LoginInterceptor;

@Configuration
public class LoginConfig implements WebMvcConfigurer {
	
	@Override
	public void addInterceptors(InterceptorRegistry registry) {	
		registry.addInterceptor(new LoginInterceptor())
			.order(1)
			.addPathPatterns("/login","/membership");
		registry.addInterceptor(new AuthInterceptor())
			.order(2)
			.addPathPatterns("/board","/board/modify/*", "/profile");

		
	}
}
