package com.douzone.codingvirus19.controller.api;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

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
	
	static Map<String, Long> userGroup = new HashMap<>();
	static ArrayList<String> usersessionlist = new ArrayList<>();
	
	@PostMapping("/profile")
	public JsonResult profile(@AuthUser SecurityUser securityUser) {
		UserVo userVo = new UserVo();
		userVo.setNo(securityUser.getNo());
		UserVo profileValue = userService.getProfile(userVo);
		return JsonResult.success(profileValue);
	}
	
	@PostMapping("/profile/modify")
	public JsonResult profileInsert(@AuthUser SecurityUser securityUser, @RequestBody UserVo vo) {
		vo.setNo(securityUser.getNo());
		boolean asyncTest = userService.modifyProfile(vo);
		return JsonResult.success(asyncTest);
	}
	
	
	@PostMapping("/getUserList")
	public JsonResult getUserList(@RequestBody GroupVo vo) {
		List<UserVo> userList = userService.getUserList(vo.getNo());
		return JsonResult.success(userList);
	}
	
	@PostMapping("/getUserListNotInGroup")
	public JsonResult getUserListNotInGroup(@RequestBody GroupVo vo, UserVo uservo) {
		
		Map<String, Object> sessionUserMap = new HashMap<String, Object>();
		List<Map<String, Object>> userSession = new ArrayList<Map<String, Object>>();
		Map<String, Object> pushSessionUserMap = null;
		
		List<UserVo> userList = userService.getUserListNotInGroup(vo.getNo());
		
		for(int i = 0; i < userList.size(); i++ ) {
			
			if(usersessionlist.contains(userList.get(i).getId().toString())) {
				pushSessionUserMap = new HashMap<String, Object>();
				
				pushSessionUserMap.put("user_id", userList.get(i).getId().toString());
				userSession.add(pushSessionUserMap);
			}
		}
		
		if(userSession.size() != 0) {
			sessionUserMap.put("userSession", userSession);
		
			List<UserVo> sessionlist = userService.getUserSessionNotInGroup(sessionUserMap);
			return JsonResult.success(sessionlist);
		}
		return JsonResult.success(null);
	}
	
	@EventListener
	public void handleWebSocketConnectListener(SessionConnectedEvent event) {
		String username = event.getUser().getName();
		if (!usersessionlist.contains(username)) {
			usersessionlist.add(username);
		}
	}

	@EventListener
	public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
		String username = event.getUser().getName();
		if (usersessionlist.lastIndexOf(username) >= 0) {
			usersessionlist.remove(usersessionlist.lastIndexOf(username));

		}
	}
	
	@PostMapping("/getUserListInGroupByUser")
	public JsonResult getUserListInGroupByUser(@RequestBody UserVo userVo) {
		List<UserVo> list = userService.getUserListInGroupByUser(userVo.getNo());
		return JsonResult.success(list);
	}
}
