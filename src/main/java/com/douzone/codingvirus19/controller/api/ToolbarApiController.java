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
import com.douzone.codingvirus19.service.ToolbarService;
import com.douzone.codingvirus19.vo.HashVo;

@RestController
@RequestMapping("/api")
public class ToolbarApiController {
	@Autowired
	ToolbarService toolbarService;
	
	
	@PostMapping("/getHashListByUser")
	public JsonResult getHashListByUser(@AuthUser SecurityUser securityUser) {
		List<HashVo> hashListByUser = toolbarService.getHashListByUser(securityUser.getNo());
		System.out.println(hashListByUser);
		return JsonResult.success(hashListByUser);
	}
	
	@PostMapping("/addHash")
	public JsonResult addHash(@AuthUser SecurityUser securityUser, @RequestBody HashVo hashVo) {
		toolbarService.addHash(hashVo);
		return JsonResult.success(hashVo);
	}

}
