package com.douzone.codingvirus19.controller.api;


import java.util.ArrayList;
import java.util.Collections;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import com.douzone.codingvirus19.vo.ChatMessageVo;
import com.douzone.codingvirus19.vo.EditorVo;

@Controller
public class MemoApiController {
	
	@Autowired
	private SimpMessagingTemplate webSocket;
	
	static ArrayList<Long> version = new ArrayList<>();
	static String str = "";
	
	@MessageMapping("/memo/{memo}")
	public void sendmemo(EditorVo message, @DestinationVariable String memo) throws Exception {
		ArrayList<String> arrData = new ArrayList<String>();
		Collections.addAll(arrData, str.split(""));
		version.add(message.getVersion()+1);
		if(message.getType().equals("basic")) { 
			//기본입력
			arrData.add(message.getInputIndex()-1, message.getKey());
			
		}else if(message.getType().equals("korean")) {
			//한글입력
			arrData.set(message.getInputIndex()-1,message.getKey());
			
		}else if(message.getType().equals("copy")) {
			//복사
			System.out.println("복사");
			arrData.add(message.getInputIndex()-message.getSize().intValue(), message.getKey());
		}else if(message.getType().equals("delete")) {
			arrData.remove(message.getInputIndex());
			arrData.subList(message.getInputIndex(), message.getInputIndex()+message.getSize().intValue()).clear();
		}else if(message.getType().equals("hevent")) {
			arrData.add(message.getInputIndex(),message.getKey());
		}
		str = String.join("", arrData);
		System.out.println(str);
		System.out.println(message); 
		webSocket.convertAndSend("/api/memo/" + memo, message);
	}
	

}
