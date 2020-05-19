package com.douzone.codingvirus19.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

import com.douzone.codingvirus19.vo.ChatMessageVo;


@RestController
public class ChatController {
	
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
