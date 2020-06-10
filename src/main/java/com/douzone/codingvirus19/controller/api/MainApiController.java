package com.douzone.codingvirus19.controller.api;

import java.util.ArrayList;
import java.util.List;

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
import com.douzone.codingvirus19.service.MainService;
import com.douzone.codingvirus19.vo.GroupUserVo;
import com.douzone.codingvirus19.vo.GroupVo;
import com.douzone.codingvirus19.vo.MemoVo;
import com.douzone.codingvirus19.vo.UserVo;

@RestController
@RequestMapping("/api")
public class MainApiController {

	@Autowired
	private MainService mainService;

	static ArrayList<String> getUserSession = new ArrayList<String>();
	static ArrayList<String> getUserSession2 = new ArrayList<String>();
	
	@PostMapping("/container")
	public JsonResult getGroupList(@AuthUser SecurityUser securityUser) {
		UserVo userVo = new UserVo();
		userVo.setNo(securityUser.getNo());
		List<GroupVo> returnValue = mainService.getGroupByAuth(userVo);
		return JsonResult.success(returnValue);
	}
	@PostMapping("/outGroup")
	public JsonResult outGroup(@AuthUser SecurityUser securityUser, @RequestBody GroupVo vo ) {
		System.out.println(vo);
		boolean asyncTest = mainService.outGroup(vo);
//		UserVo userVo = new UserVo();
		
//		userVo.setNo(securityUser.getNo());
//		List<GroupVo> returnValue = mainService.getGroupByAuth(userVo);
		return JsonResult.success(asyncTest);
	}

	@PostMapping("/groupsession")
	public void groupSession(@RequestBody GroupUserVo groupuserVo) {
		List<UserVo> list = mainService.getGroupinUserSession(groupuserVo);
		System.out.println(list);
	}
	
	@PostMapping("/memoList")
	public JsonResult contents(@AuthUser SecurityUser securityUser, @RequestBody GroupVo vo) {
		MemoVo memoVo = new MemoVo();
		// uNo와 gNo를 memoVo에 담아서 전달
		memoVo.setuNo(securityUser.getNo());
		memoVo.setgNo(vo.getNo());
		List<MemoVo> list = mainService.findAllMemo(memoVo);
		return JsonResult.success(list);
	}
	
	@PostMapping("/memoListByHash")
	public JsonResult memoListByHash(@AuthUser SecurityUser securityUser, @RequestBody MemoVo memoVo) {
		System.out.println(memoVo);
		memoVo.setuNo(securityUser.getNo());
		List<MemoVo> list = mainService.memoListByHash(memoVo);
		return JsonResult.success(list);
	}

	@PostMapping("/getUserSession")
	public JsonResult getUserSession(@AuthUser SecurityUser securityUser) {
		//		System.out.println(securityUser);
		return JsonResult.success(securityUser);
	}

	@PostMapping("/addGroup")
	public JsonResult addGroup(@AuthUser SecurityUser securityUser, @RequestBody GroupVo groupVo) {
		mainService.insertGroup(groupVo);

		GroupUserVo groupUservo = new GroupUserVo();
		groupUservo.setuNo(securityUser.getNo());
		groupUservo.setgNo(groupVo.getNo());
		groupUservo.setaNo((long) 1);
		mainService.insertGroupUser(groupUservo);

		return JsonResult.success(groupVo);
	}

<<<<<<< HEAD
	//아직 프론트에서 안씀
	@PostMapping("/deleteGroup")
	public JsonResult deleteGroup(@RequestBody GroupVo groupVo){
		boolean result = mainService.deleteGroup(groupVo.getNo());
		return JsonResult.success(result);
	}
	
//	@PostMapping("/addUserToGroup")
//	public JsonResult addUserToGroup() {
//		boolean result = mainService.addUserToGroup();
//		return JsonResult.success(result);
//	}

//--------------------------------------------------------접속한 유저 Session 가져오기	
	@EventListener
	public void handleWebSocketConnectListener(SessionConnectedEvent event) {
		String username = event.getUser().getName();
		UserVo uservo = new UserVo();
		
		getUserSession.add(username);
		
		for(int i = 0; i < getUserSession.size(); i ++) {
			if(!getUserSession2.contains(getUserSession.get(i))) {
				getUserSession2.add(getUserSession.get(i));
			}
		}
		if(getUserSession2.get(0) != null) {
			System.out.println(getUserSession2.get(0));
			for(int i = 0; i < getUserSession2.size(); i++) {
				uservo.setId(getUserSession2.get(i));
				
			}
		}
		
		System.out.println(getUserSession2 + "접속 하였습니다.");
	}

	@EventListener
	public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
		String username = event.getUser().getName();
		if(getUserSession.indexOf(username)>=0) {
			getUserSession.remove(getUserSession.indexOf(username));
		}
		if (username != null) {
			System.out.println(username + "나갔습니다.");
			System.out.println("현재 남아 있는 인원" + getUserSession);
		}
	}
=======
>>>>>>> f5515c6139d684f7f1a62014d2f63c4f62ae7c24
}
