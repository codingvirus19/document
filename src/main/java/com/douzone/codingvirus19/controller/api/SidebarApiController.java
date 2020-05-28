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
import com.douzone.codingvirus19.service.SidebarService;
import com.douzone.codingvirus19.vo.GroupVo;
import com.douzone.codingvirus19.vo.HashVo;
import com.douzone.codingvirus19.vo.MemoVo;

@RestController
@RequestMapping("/api")
public class SidebarApiController {
	@Autowired
	SidebarService sidebarService;
	
	@PostMapping("/getHashListByGroup")
	public JsonResult getHashListByGroup(@AuthUser SecurityUser securityUser, @RequestBody GroupVo groupVo) {
		MemoVo memoVo = new MemoVo();
		memoVo.setuNo(securityUser.getNo());
		memoVo.setgNo(groupVo.getNo());
		List<HashVo> hashListByGroup = sidebarService.getHashListByGroup(memoVo);
		return JsonResult.success(hashListByGroup);
	}

}
