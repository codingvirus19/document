package com.douzone.codingvirus19.controller;

import javax.servlet.http.HttpSession;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import com.douzone.codingvirus19.vo.UserVo;

@Controller
public class MainController implements ErrorController {

	@GetMapping({"/","/error"})
	public String index(HttpSession session) {
		Object auth = session.getAttribute("auth");
		if(auth == null) {
			return "main/index";
		}
		return "redirect:/main"; 
	}

	@Override
	public String getErrorPath() {
		return "/error";
	}

}
