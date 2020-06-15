package com.douzone.codingvirus19.controller.api;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import com.douzone.codingvirus19.dto.JsonResult;
import com.douzone.codingvirus19.service.UserService;

@Controller
public class UserListSocketController {

	@Autowired
	private SimpMessagingTemplate webSocket;

	@Autowired
	private UserService userService;

	static Map<Long, ArrayList<String>> userGroupList = new HashMap<>();
	static Map<Long, ArrayList<Long>> userGroupListNo = new HashMap<>();
	static ArrayList<String> AllUserList = new ArrayList<>();


	@MessageMapping("/userlist/connect/{groupno}")
	public void userConnect(@DestinationVariable Long groupno, Long no) throws Exception {
		ArrayList<String> userlist = new ArrayList<>();
		ArrayList<Long> userNolist = new ArrayList<>();
		if (userGroupList.get(groupno) != null) {
			userlist = userGroupList.get(groupno);
			userNolist = userGroupListNo.get(groupno);
		}
		String id = userService.getUser(no);
		if (userlist.contains(id))
			return;
		userlist.add(id);
		userNolist.add(no);

		for (int i = 0; i < userNolist.size(); i++) {
			if (!AllUserList.contains(userlist.get(i))) {
				userlist.remove(id);
				userNolist.remove(userNolist.get(i));
			}
		}
		userGroupList.put(groupno, userlist);
		userGroupListNo.put(groupno, userNolist);
		for (Long userNo : userNolist) {
			webSocket.convertAndSend("/api/alarm/" + userNo, userlist);
		}
	}

	@MessageMapping("/userlist/disconnect/{groupno}")
	public void userDisConnect(@DestinationVariable Long groupno, Long no) throws Exception {
		ArrayList<String> userlist = new ArrayList<>();
		ArrayList<Long> userNolist = new ArrayList<>();
		if (userGroupList.get(groupno) != null) {
			userlist = userGroupList.get(groupno);
			userNolist = userGroupListNo.get(groupno);
		}
		String id = userService.getUser(no);
		userlist.remove(id);
		userNolist.remove(no);
		for (Long userNo : userNolist) {
			if (userNo != no) {
				webSocket.convertAndSend("/api/alarm/" + userNo, userlist);
			}
		}
		userGroupList.put(groupno, userlist);
		userGroupListNo.put(groupno, userNolist);
	}
	
	@MessageMapping("/memo/update/{groupno}")
	public void memoChange(Map<String,String> map,@DestinationVariable Long groupno) throws Exception {
		ArrayList<Long> userNolist = new ArrayList<>();
			userNolist = userGroupListNo.get(groupno);
			map.put("gNo", groupno.toString());
			for (Long userNo : userNolist) {
				if (userNo != Long.parseLong(map.get("userNo"))) {
					webSocket.convertAndSend("/api/alarm/" + userNo, map);
				}
			}
	}
	

	@EventListener
	public void handleWebSocketConnectListener(SessionConnectedEvent event) {
		String username = event.getUser().getName();
		AllUserList.add(username);
	}

	@EventListener
	public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
		String username = event.getUser().getName();
		AllUserList.remove(AllUserList.lastIndexOf(username));
	}

}
