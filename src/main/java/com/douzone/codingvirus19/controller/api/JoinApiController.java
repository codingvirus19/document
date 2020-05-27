package com.douzone.codingvirus19.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.douzone.codingvirus19.dto.JsonResult;
import com.douzone.codingvirus19.service.UserService;
import com.douzone.codingvirus19.vo.UserVo;

@RestController
@RequestMapping("/api")
public class JoinApiController {
	
	@Autowired
	private UserService userService;
	
	@PostMapping("/join")
	public JsonResult Join(@RequestBody UserVo userVo) {
		if(userService.hasId(userVo.getId())) {
			return JsonResult.fail("id중복");
		}
		else if(userService.hasEmail(userVo.getEmail())) {
			return JsonResult.fail("email중복");
		}
		userVo.setImage("/assets/images/defaultUser.webp");
		System.out.println(userVo);
		userService.join(userVo);
		return JsonResult.success(userVo);
	}

}
