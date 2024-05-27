package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.boot.CommandLineRunner;

@RestController
@SpringBootApplication
public class myApplication implements CommandLineRunner {

	
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		SpringApplication.run(myApplication.class,args);
	}

	
	@Override
	public void run(String... args) throws Exception {
		// TODO Auto-generated method stub
		System.out.println("Hello World");
	}
}
