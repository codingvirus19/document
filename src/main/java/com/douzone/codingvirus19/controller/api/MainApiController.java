package com.douzone.codingvirus19.controller.api;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.douzone.codingvirus19.dto.JsonResult;
import com.douzone.codingvirus19.service.MainService;
import com.douzone.codingvirus19.vo.MemoVo;
import com.douzone.codingvirus19.vo.UserVo;
import com.douzone.codingvirus19.vo.GroupVo;

@RestController
@RequestMapping("/api")
public class MainApiController {
	@Autowired
	private MainService mainService;
	
	@PostMapping("/main")
	public JsonResult getMemo(HttpSession httpSession, Model model,@RequestBody MemoVo vo) {
		UserVo authUser = (UserVo) httpSession.getAttribute("SecurityUser");
		System.out.println("[authUser]"+authUser);
//		System.out.println(vo);
//		System.out.println(authUser.getId());
		UserVo userVo = new UserVo();
//		userVo.setId();
		
		
		List<MemoVo> memoList = mainService.findAllMemo(authUser);
		System.out.println("[memoList]"+memoList);
		return JsonResult.success(memoList);

// 	@Autowired
// 	private MainService mainService;
	
// 	@PostMapping("/container")
// 	public JsonResult login(HttpSession httpSession) {
// 		System.out.println("test");

// 		List<GroupVo> list = mainService.findByGroupList();
// //		httpSession.setAttribute("authUser", authUser);
		
// 		return JsonResult.success(list);
	}
}
