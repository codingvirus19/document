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
import com.douzone.codingvirus19.service.UserService;
import com.douzone.codingvirus19.vo.UserVo;


@RestController
@RequestMapping("/api")
public class UserApiController {
	
	@Autowired
	private UserService userService;
	
	@PostMapping("/profile")
	public JsonResult profile(@AuthUser SecurityUser securityUser) {
		UserVo userVo = new UserVo();
		userVo.setNo(securityUser.getNo());
		UserVo profileValue = userService.getProfile(userVo);
		return JsonResult.success(profileValue);
	}
	
	@PostMapping("/profile/modify")
	public void profileInsert(@AuthUser SecurityUser securityUser, @RequestBody UserVo vo) {
		vo.setNo(securityUser.getNo());
		System.out.println(vo);
		userService.modifyProfile(vo);
	}
	
	@PostMapping("/getUserList")
	public JsonResult getUserList(@AuthUser SecurityUser securityUser) {
		List<UserVo> userList = userService.getUserList(securityUser.getNo());
		return JsonResult.success(userList);
	}
	
	
}
