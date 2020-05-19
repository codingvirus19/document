package com.douzone.codingvirus19.controller;

import java.net.http.HttpResponse;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import com.douzone.codingvirus19.security.AuthUser;
import com.douzone.codingvirus19.security.SecurityUser;

@Controller
public class MainController implements ErrorController {

	@GetMapping({"/","/error"})
	public String index(@AuthUser SecurityUser securityUser) {
		System.out.println(securityUser);
		if(securityUser != null) {
			
		}
		return "main/index"; 
	}

	@Override
	public String getErrorPath() {
		return "/error";
	}
}
