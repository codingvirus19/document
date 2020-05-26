package com.douzone.codingvirus19.Handler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import com.douzone.codingvirus19.vo.ChatVo;

// 밑의 @Component 어노테이션을 통해서 Class를 Bean으로 등록 해 줌
@Component
public class SocketHandler {

	@Autowired
	private SimpMessageSendingOperations messagingTemplate;

	@EventListener
	public void handleWebSocketConnectListener(SessionConnectedEvent event) {
		System.out.println(event.getUser().getName());
	}

	@EventListener
	public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
		StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
		System.out.println("disconnect");
		String username = (String) headerAccessor.getSessionAttributes().get("username");
		if (username != null) {
////	            logger.info("User Disconnected : " + username);
			ChatVo chatMessage = new ChatVo();
//
//			messagingTemplate.convertAndSend("/topic/public", chatMessage);
//	        }
		}
	}
}
