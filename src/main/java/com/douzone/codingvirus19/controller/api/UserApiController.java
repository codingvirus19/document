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
import com.douzone.codingvirus19.vo.GroupVo;
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
		userService.modifyProfile(vo);
	}
	
	@PostMapping("/getUserListByGroup")
	public JsonResult getUserList(@RequestBody GroupVo vo) {
		List<UserVo> userList = userService.getUserListByGroup(vo.getNo());
		return JsonResult.success(userList);
	}
	
	@PostMapping("/countUserByGroup")
	public JsonResult countUserByGroup(@RequestBody GroupVo vo) {
		int countUser = userService.countUserByGroup(vo.getNo());
		return JsonResult.success(countUser);
	}
	
}
