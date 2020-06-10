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
import com.douzone.codingvirus19.vo.AlarmVo;
import com.douzone.codingvirus19.vo.GroupUserVo;

@Controller
public class AlarmSocketController {

	@Autowired
	private SimpMessagingTemplate webSocket;
	
	@Autowired
	private AlarmService alarmService;
	
	@MessageMapping("/alarm/{userno}")
	public void alarmMessage(AlarmVo alarmVo, @DestinationVariable Long userno) throws Exception {
		System.out.println("알람 소켓 들어 왔습니다.");
		AlarmVo alarmChak = new AlarmVo();
		
//		alarmChak.setReadCheck(false);기본알람
//		alarmChak.setType(false);채팅알람
		alarmVo.setuNo(userno);
		if(alarmVo.isAddgroup() == true && alarmVo.isReadCheck() == true && alarmVo.isType() == true) {
			System.out.println("그룹초대 알람 들어왔습니다.");
			System.out.println(alarmVo);
			webSocket.convertAndSend("/api/alarm/" + userno, alarmVo);
			return;
		}
		if(alarmVo.getgNo() == null) {
			if(alarmVo.isReadCheck() == false && alarmVo.isType() == true) {
				System.out.println("여긴 기본 알람 읽음 처리부분입니당");
				alarmService.readCheckUpdate(alarmVo);
				webSocket.convertAndSend("/api/alarm/" + userno, alarmVo);
				return;
			}
			return;
		}
		if(alarmVo.isReadCheck() == false && alarmVo.isType() == false) {
			System.out.println("여긴 채팅 알람 읽음 처리부분입니당");
			alarmService.chatReadCheckUpdate(alarmVo);
			webSocket.convertAndSend("/api/alarm/" + userno, alarmVo);
			return;
		}
		
		GroupUserVo groupUserVo = new GroupUserVo();
		groupUserVo.setuNo(userno);
		groupUserVo.setgNo(alarmVo.getgNo());
		
		alarmService.addAlarm(alarmVo);
		Long no = alarmVo.getNo();
		alarmChak.setgNo(alarmVo.getgNo());
		List<Long> list  = alarmService.getGroupinUser(groupUserVo);
		Long[] array =  new Long[list.size()];
		int size = 0;
		for(Long temp : list){
			array[size++] = temp;
		}
//==========================DBinsert
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
//============================chatting alarm
		
		Map<String, Integer> alarmlist = new HashMap<>();
		alarmlist.put("gNo", alarmVo.getgNo().intValue());
		if(alarmVo.isType()== false){//채팅 알람 여부 확인
			alarmlist.put("chatting",1);
			
		}else if(alarmVo.isType()== true) {
			alarmlist.put("basic",1);
		}
		
		for(int j = 0; j < list.size(); j++){
			webSocket.convertAndSend("/api/alarm/" + array[j], alarmlist);
		}
	}
}
