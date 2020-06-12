package com.douzone.codingvirus19.controller.api;

import java.io.Console;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.douzone.codingvirus19.dto.JsonResult;
import com.douzone.codingvirus19.security.AuthUser;
import com.douzone.codingvirus19.security.SecurityUser;
import com.douzone.codingvirus19.service.ChatService;
import com.douzone.codingvirus19.vo.AlarmVo;
import com.douzone.codingvirus19.vo.ChatVo;
import com.douzone.codingvirus19.vo.UserVo;

@RestController
@RequestMapping("/api")
public class ChatApiController {

	@Autowired
	private ChatService chatService;
	
	@PostMapping("/chatlist")
	public JsonResult getChatList(@RequestBody ChatVo chatVo) {
		List<ChatVo> list = chatService.chattingList(chatVo);
		return JsonResult.success(list);
	}
	
	@PostMapping("/chatlistgroup")
	public JsonResult chatListGroup(@AuthUser SecurityUser SecurityUser) {
		AlarmVo vo = new AlarmVo();
		vo.setNo(SecurityUser.getNo());
		List<AlarmVo> list = chatService.chatListGroup(vo);
		return JsonResult.success(list);
	}
}
