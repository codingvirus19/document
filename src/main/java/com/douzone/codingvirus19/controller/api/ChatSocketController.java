package com.douzone.codingvirus19.controller.api;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import com.douzone.codingvirus19.service.AlarmService;
import com.douzone.codingvirus19.service.ChatService;
import com.douzone.codingvirus19.vo.AlarmVo;
import com.douzone.codingvirus19.vo.ChatVo;
import com.douzone.codingvirus19.vo.GroupUserVo;

@Controller
public class ChatSocketController {
	@Autowired
	private SimpMessagingTemplate webSocket;

	@Autowired
	private ChatService chatService;
	
	@Autowired
	private AlarmService alarmService;

	@MessageMapping("/chat/{room}")
	public void sendMessage(ChatVo chatVo, @DestinationVariable String room) throws Exception {
		System.out.println("웹 소켓 controller 들어 왔습니다.");
		System.out.println(room);
		System.out.println(chatVo);

		chatService.addChatting(chatVo);
		
		webSocket.convertAndSend("/api/chat/" + room, chatVo);
//			webSocket.setUserDestinationPrefix("dd");
//			webSocket.convertAndSend("/api/chat/"+room, chatMessage);
	}
	
	@MessageMapping("/alarm/{userno}")
	public void alarmMessage(AlarmVo alarmVo, @DestinationVariable Long userno) throws Exception {
		System.out.println("알람 소켓 들어 왔습니다.");
		
		alarmVo.setuNo(userno);
		if(alarmVo.getgNo() == null) {
			if(alarmVo.isReadCheck() == false && alarmVo.isType() == true) {
				System.out.println("여긴 기본 알람 읽음 처리부분입니당");
				alarmService.readCheckUpdate(alarmVo);
				alarmVo.setReadCheck(false);
				alarmVo.setType(true);
				webSocket.convertAndSend("/api/alarm/" + userno, alarmVo);
			}
			return;
		}
		GroupUserVo groupUserVo = new GroupUserVo();
		groupUserVo.setuNo(userno);
		groupUserVo.setgNo(alarmVo.getgNo());
		
		alarmService.addAlarm(alarmVo);
		Long no = alarmVo.getNo();
		
		List<Long> list  = alarmService.getGroupinUser(groupUserVo);
		Long[] array =  new Long[list.size()];
		int size = 0;
		for(Long temp : list){
			array[size++] = temp;
		}

		Map<String, Object> SandUserMap = new HashMap<String, Object>();
		Map<String, Object> pushSandUserMap = null;
		List<Map<String, Object>> pushSandUserList = new ArrayList<Map<String, Object>>();
		
		if(list.size() == 0) return;
		
		for(int i = 0; i < list.size(); i++) {
			pushSandUserMap = new HashMap<String, Object>();
			pushSandUserMap.put("read_check", true);
			pushSandUserMap.put("noti_no", alarmVo.getNo());
			pushSandUserMap.put("u_no", array[i]);
			pushSandUserList.add(pushSandUserMap);
		}
		SandUserMap.put("pushSandUserList", pushSandUserList);
		alarmService.insertAccptAlarm(SandUserMap);
		alarmVo.setReadCheck(true);
		System.out.println(alarmVo);
		
		for(int j = 0; j < list.size(); j++){
			webSocket.convertAndSend("/api/alarm/" + array[j], alarmVo);
		}
	}
}
