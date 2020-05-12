package com.douzone.codingvirus19.controller.api;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.douzone.codingvirus19.dto.JsonResult;
import com.douzone.codingvirus19.vo.UserVo;


@RestController
@RequestMapping("/api")
public class LoginApiController {
	
	
	@PostMapping("/login")
	public JsonResult addCategory(@RequestBody UserVo vo) {
		System.out.println(vo);
		return JsonResult.success(true);
	}
	
	
	
}
