package com.douzone.codingvirus19.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import com.douzone.codingvirus19.security.AuthUser;
import com.douzone.codingvirus19.security.SecurityUser;
import com.douzone.codingvirus19.vo.ChatVo;

@Controller
public class ChatApiController {
	@Autowired
	private SimpMessagingTemplate webSocket;
	
	@MessageMapping("/chat/{room}")
	public void sendMessage(ChatVo chatVo, @DestinationVariable String room) throws Exception{
		System.out.println(chatVo);
		System.out.println("웹 소켓 controller 들어 왔습니다.");
		System.out.println(room);
		webSocket.setUserDestinationPrefix("dd");
		webSocket.convertAndSend("/api/chat/"+room, chatVo);
	}
}
