package com.douzone.codingvirus19.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import com.douzone.codingvirus19.service.ChatService;
import com.douzone.codingvirus19.vo.ChatVo;

@Controller
public class ChatSocketController {
	@Autowired
	private SimpMessagingTemplate webSocket;

	@Autowired
	private ChatService chatService;

	@MessageMapping("/chat/{room}")
	public void sendMessage(ChatVo chatVo, @DestinationVariable String room) throws Exception {
		System.out.println("웹 소켓 controller 들어 왔습니다.");
		System.out.println(room);
		System.out.println(chatVo);

		chatService.addChattin(chatVo);
		
		webSocket.convertAndSend("/api/chat/" + room, chatVo);
//			webSocket.setUserDestinationPrefix("dd");
//			webSocket.convertAndSend("/api/chat/"+room, chatMessage);
	}
}
