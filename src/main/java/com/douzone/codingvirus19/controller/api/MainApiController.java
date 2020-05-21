package com.douzone.codingvirus19.controller.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.douzone.codingvirus19.dto.JsonResult;
import com.douzone.codingvirus19.security.AuthUser;
import com.douzone.codingvirus19.security.SecurityUser;
import com.douzone.codingvirus19.service.MainService;
import com.douzone.codingvirus19.vo.GroupVo;
import com.douzone.codingvirus19.vo.UserVo;

@RestController
@RequestMapping("/api")
public class MainApiController {
	@Autowired
 	private MainService mainService;
 	
 	@PostMapping("/container")
 	public JsonResult getGroupList(@AuthUser SecurityUser securityUser) {
 		UserVo userVo = new UserVo();
 		userVo.setNo(securityUser.getNo());
 		List<GroupVo> list = mainService.findByGroupList(userVo);
 		return JsonResult.success(list);
	}

	@PostMapping("/addGroup")
	public JsonResult addGroup(@RequestBody GroupVo vo) {
		System.out.println(vo);
		mainService.addGroup(vo);
		return JsonResult.success(vo);
	}
}
