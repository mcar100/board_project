package com.example.demo.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.example.demo.interceptor.AuthInterceptor;
import com.example.demo.interceptor.LoginInterceptor;

@Configuration
public class WebConfig implements WebMvcConfigurer {
	
	@Value("${client.url}")
	private String clientUrl;
	
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins(clientUrl)  // 실제 배포 도메인으로 설정
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowedHeaders("*")
                .exposedHeaders("Content-Disposition")
                .allowCredentials(true);
    }
	
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
