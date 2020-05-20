package com.douzone.codingvirus19.controller.api;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.douzone.codingvirus19.dto.JsonResult;
import com.douzone.codingvirus19.service.MainService;
import com.douzone.codingvirus19.vo.GroupVo;
import com.douzone.codingvirus19.vo.UserVo;

@RestController
@RequestMapping("/api")
public class MainApiController {
 	@Autowired
 	private MainService mainService;
 	
 	@PostMapping("/container")
 	public JsonResult login(HttpSession httpSession, @RequestBody UserVo authUser) {
 		System.out.println(authUser);
 		System.out.println(httpSession);
 	
 		List<GroupVo> list = mainService.findByGroupList(authUser);
 
 		return JsonResult.success(list);
	}
}
