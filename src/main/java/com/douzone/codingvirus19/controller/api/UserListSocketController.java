package com.douzone.codingvirus19.controller.api;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import com.douzone.codingvirus19.service.UserService;

@Controller
public class UserListSocketController {

	@Autowired
	private SimpMessagingTemplate webSocket;

	@Autowired
	private UserService userService;

	static Map<String, Long> userGroup = new HashMap<>();
	static ArrayList<String> userlist = new ArrayList<>();

	@MessageMapping("/userlist/{groupno}")
	public void userSessionList(@DestinationVariable Long groupno, Long no) throws Exception {
		String id = userService.getUser(no);
		userGroup.put(id, groupno);

		webSocket.convertAndSend("/api/userlist/" + groupno, userlist);

	}

	// --------------------------------------------------------접속한 유저 Session 가져오기
	@EventListener
	public void handleWebSocketConnectListener(SessionConnectedEvent event) {
		String username = event.getUser().getName();
		if (!userlist.contains(username)) {
			userlist.add(username);
		}
	}

	@EventListener
	public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
		String username = event.getUser().getName();
		if (userGroup.containsKey(username) && userlist.lastIndexOf(username) >= 0) {
			userlist.remove(userlist.lastIndexOf(username));
			webSocket.convertAndSend("/api/userlist/" + userGroup.get(username), userlist);
		}
	}
}
