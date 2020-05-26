package com.douzone.codingvirus19.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
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
		System.out.println(userVo);
		UserVo profileValue = userService.getProfile(userVo);
		System.out.println(profileValue);
		return JsonResult.success(profileValue);
	}
	
	
}
