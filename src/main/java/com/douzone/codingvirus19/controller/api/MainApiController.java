package com.douzone.codingvirus19.controller.api;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpSession;

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
import com.douzone.codingvirus19.vo.MemoVo;
import com.douzone.codingvirus19.vo.UserVo;

@RestController
@RequestMapping("/api")
public class MainApiController {
	@Autowired
 	private MainService mainService;
	
 	@PostMapping("/memoList")
 	public JsonResult contents(@AuthUser SecurityUser securityUser, @RequestBody GroupVo vo) {
 		MemoVo memoVo = new MemoVo();
 		// uNo와 gNo를 memoVo에 담아서 전달
 		memoVo.setuNo(securityUser.getNo());
 		memoVo.setgNo(vo.getNo());
 		System.out.println(memoVo);
 		List<MemoVo> list= new ArrayList();
 		// 내일 할 것!!! 유저 세션과 g_no를 MemoVo에 넣어서 xml에 보낼 것!
 		if(memoVo.getgNo().equals(null)) {
 			list = mainService.findAllMemo(memoVo);
 			
 		}System.out.println(list);
 		return JsonResult.success(list);
	}


 	@PostMapping("/container")
	public JsonResult getGroupList(@AuthUser SecurityUser securityUser) {
		UserVo userVo = new UserVo();
		userVo.setNo(securityUser.getNo());
		List<GroupVo> returnValue = mainService.getGroupByAuth(userVo);
		System.out.println(returnValue);
		return JsonResult.success(returnValue);
	}

 	@PostMapping("/addGroup")
	public JsonResult addGroup(@RequestBody GroupVo vo) {
		mainService.addGroup(vo);
		return JsonResult.success(vo);
	}
 	
}
