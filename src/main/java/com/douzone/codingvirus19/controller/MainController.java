package com.douzone.codingvirus19.controller;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import com.douzone.codingvirus19.security.AuthUser;
import com.douzone.codingvirus19.security.SecurityUser;

@Controller
public class MainController implements ErrorController {
	
	@GetMapping({"/","/error"})
	public String index(@AuthUser SecurityUser securityUser) {
		return "main/index"; 
	}
	
	@Override
	public String getErrorPath() {
		return "/error";
	}
}
