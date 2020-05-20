package com.douzone.codingvirus19.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import com.douzone.codingvirus19.vo.ChatMessageVo;

@Controller
public class ChatApiController {
	@Autowired
	private SimpMessagingTemplate webSocket;

	@MessageMapping("/chat/{room}")
	public void sendMessage(ChatMessageVo message, @DestinationVariable String room) throws Exception{
		System.out.println("접속");
		System.out.println(message.getGroup_no());
		System.out.println(message.getNickname());
		System.out.println(message.getMessage());
		System.out.println("웹 소켓 controller 들어 왔습니다.");
		System.out.println(room);
		
		webSocket.convertAndSend("/api/chat/"+room, message);
	}
}
