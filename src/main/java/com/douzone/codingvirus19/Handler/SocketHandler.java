package com.douzone.codingvirus19.Handler;

import java.util.HashMap;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

// 밑의 @Component 어노테이션을 통해서 Class를 Bean으로 등록 해 줌
@Component
public class SocketHandler extends TextWebSocketHandler {

	HashMap<String, WebSocketSession> sessionMap = new HashMap<>(); //웹소켓 세션을 담아둘 해시맵
	
	@Override
	public void handleTextMessage(WebSocketSession session, TextMessage message) {
		//메시지 발송
		String msg = message.getPayload();
		for(String key : sessionMap.keySet()) {
			//sessionMap.keySet()은 Map의 전체 값을 뽑아내기 위함 즉, sessionMap의 값만 뽑아내서 WebSocketSession에 담음.
			session = sessionMap.get(key);
			try {
				// 담은 세션에 msg를 담음 msg는 JS에서 보낸 (이름이나 채팅 내용 등, 전체 내용)String을 session을 통해 보냄
				session.sendMessage(new TextMessage(msg));
			}catch(Exception e) {
				e.printStackTrace();
			}
		}
	}
	
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		// 소켓 연결
		// Map에 session의 id와 시작 session 담기
		sessionMap.put(session.getId(), session);
	}
	
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		// 소켓 종료
		// Map에 session의 session 취소 시키기
		sessionMap.remove(session.getId());
	}
}
