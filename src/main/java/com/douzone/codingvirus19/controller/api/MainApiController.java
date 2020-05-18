package com.douzone.codingvirus19.controller.api;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.douzone.codingvirus19.dto.JsonResult;
import com.douzone.codingvirus19.service.MainService;
import com.douzone.codingvirus19.vo.UserVo;

@Controller
@RequestMapping("/api")
public class MainApiController {

	@Autowired
	private MainService mainService;
	
	@PostMapping("/container")
		
	public JsonResult login(HttpSession httpSession, @RequestBody UserVo vo) {

		System.out.println("Container vo" + vo);
//		GroupVo groupVo = mainService.findByGroupList(vo);
//		httpSession.setAttribute("authUser", authUser);
		
		return JsonResult.success(false);
	}
}
