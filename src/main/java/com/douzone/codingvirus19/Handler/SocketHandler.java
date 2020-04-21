package com.douzone.codingvirus19.Handler;

import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

public class SocketHandler extends TextWebSocketHandler {

	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		String payload = message.getPayload();
		System.out.println(payload);
		System.out.println("message");
		session.sendMessage(new TextMessage("Hi " + payload + " how may we help you?"));
	}
	

}
