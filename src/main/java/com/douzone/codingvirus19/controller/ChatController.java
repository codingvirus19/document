package com.douzone.codingvirus19.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
public class ChatController {
	
	@RequestMapping({"/chat"})
	public String index(Model model) {
		return "main/chat";
	}
}
