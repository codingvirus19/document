package com.douzone.codingvirus19.controller.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.douzone.codingvirus19.dto.JsonResult;
import com.douzone.codingvirus19.service.ChatService;
import com.douzone.codingvirus19.vo.ChatVo;

@RestController
@RequestMapping("/api")
public class ChatApiController {

	@Autowired
	private ChatService chatService;
	
	@PostMapping("/chatlist")
	public JsonResult getChatList(@RequestBody ChatVo chatVo) {
		List<ChatVo> list = chatService.chattingList(chatVo);
		System.out.println(list);
		return JsonResult.success(list);
	}
}
