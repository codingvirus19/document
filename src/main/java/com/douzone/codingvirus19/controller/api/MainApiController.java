package com.douzone.codingvirus19.controller.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.douzone.codingvirus19.dto.JsonResult;
import com.douzone.codingvirus19.security.AuthUser;
import com.douzone.codingvirus19.security.SecurityUser;
import com.douzone.codingvirus19.service.MainService;
import com.douzone.codingvirus19.vo.GroupVo;

@RestController
@RequestMapping("/api")
public class MainApiController {
 	@Autowired
 	private MainService mainService;
	
 	@PostMapping("/container")
 	public JsonResult login(@AuthUser SecurityUser securityUser) {
 		List<GroupVo> list = null;
//		System.out.println(securityUser);
		System.out.println(list);
 		return JsonResult.success(list);
	}
	
	@PostMapping("/addGroup")
	public JsonResult addGroup(@RequestBody GroupVo vo) {
		System.out.println(vo);
		
		return JsonResult.success(true);
	}
}
