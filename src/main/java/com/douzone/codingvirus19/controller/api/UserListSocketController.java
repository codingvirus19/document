package com.douzone.codingvirus19.controller.api;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import com.douzone.codingvirus19.vo.UserVo;

@Controller
public class UserListSocketController {

	@Autowired
	private SimpMessagingTemplate webSocket;

	static ArrayList<String> getUserSession = new ArrayList<String>();
	static ArrayList<String> getUserSession2 = new ArrayList<String>();

	@MessageMapping("/userlist/{userno}")
	public void userSessionList(@DestinationVariable Long userno) throws Exception {
//		System.out.println(getUserSession2);
		System.out.println(userno+"fawfawfawf");
		webSocket.convertAndSend("/api/userlist/" + userno, getUserSession2);
	}
	// --------------------------------------------------------접속한 유저 Session 가져오기
	@EventListener
	public void handleWebSocketConnectListener(SessionConnectedEvent event) {
		String username = event.getUser().getName();
		UserVo uservo = new UserVo();

		getUserSession.add(username);

		for (int i = 0; i < getUserSession.size(); i++) {
			if (!getUserSession2.contains(getUserSession.get(i))) {
				getUserSession2.add(getUserSession.get(i));
			}
		}
		if (getUserSession2.get(0) != null) {
			System.out.println(getUserSession2.get(0));
			for (int i = 0; i < getUserSession2.size(); i++) {
				uservo.setId(getUserSession2.get(i));

			}
		}
	}

	@EventListener
	public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
		String username = event.getUser().getName();
		if (getUserSession.indexOf(username) >= 0) {
			getUserSession2.remove(getUserSession2.indexOf(username));
		}
	}
}
