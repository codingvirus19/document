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
import com.douzone.codingvirus19.vo.MemoVo;
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
		List<GroupVo> returnValue = mainService.getGroupByAuth(userVo);
		return JsonResult.success(returnValue);
	}

	
 	@PostMapping("/memoList")
 	public JsonResult contents(@AuthUser SecurityUser securityUser, @RequestBody GroupVo vo) {
 		MemoVo memoVo = new MemoVo();
 		// uNo와 gNo를 memoVo에 담아서 전달
 		memoVo.setuNo(securityUser.getNo());
 		memoVo.setgNo(vo.getNo());
 		if(vo.getNo() == null) {
 			System.out.println("null 입니다.");
 			List<MemoVo> nlllist = mainService.memoAtNull();
 			return JsonResult.success(nlllist);
 		}
 		else {
 			System.out.println("값이 있습니다.");
 			List<MemoVo> list = mainService.findAllMemo(memoVo);
 			return JsonResult.success(list);
 		}
	}


 	
 	@PostMapping("/addGroup")
	public JsonResult addGroup(@RequestBody GroupVo vo) {
		mainService.addGroup(vo);
		return JsonResult.success(vo);
	}
 	
}
