package com.douzone.codingvirus19.controller.api;

import java.util.ArrayList;
import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

import com.douzone.codingvirus19.vo.EditorVo;

@RestController
public class MemoApiController {

	@Autowired
	private SimpMessagingTemplate webSocket;

	static ArrayList<Long> version = new ArrayList<>();
	static String str = "";

	@MessageMapping("/memo/{memo}")
	public void sendmemo(EditorVo message, @DestinationVariable String memo) throws Exception {
		ArrayList<String> arrData = new ArrayList<String>();
		Collections.addAll(arrData, str.split(""));
		if (version.size() > 0) {
			if (message.getVersion() <= version.get(version.size() - 1)) {
				
				System.out.println(message.getVersion()+":"+version.get(version.size() - 1));
				message.setType("error");
				str = String.join("", arrData);
				message.setKey(str);
				message.setVersion(version.get(version.size()-1)+1);
				System.out.println(message.getVersion() +"::"+ version);
				System.out.println(version);
				webSocket.convertAndSend("/api/memo/" + memo, message);
				return;
			}
		}
		version.add(message.getVersion());
		message.setVersion(message.getVersion() + 1);

		if (message.getType().equals("basic")) {
			// 기본입력
			arrData.add(message.getInputIndex() - 1, message.getKey());
		} else if (message.getType().equals("korean")) {
			// 한글입력
			arrData.set(message.getInputIndex() - 1, message.getKey());
		} else if (message.getType().equals("copy")) {
			// 복사
			arrData.add(message.getInputIndex() - message.getSize().intValue(), message.getKey());
		} else if (message.getType().equals("delete")) {
			arrData.remove(message.getInputIndex());
			arrData.subList(message.getInputIndex(), message.getInputIndex() + message.getSize().intValue()).clear();
		} else if (message.getType().equals("hevent")) {
			arrData.add(message.getInputIndex(), message.getKey());
		}
//		System.out.println(message);
		str = String.join("", arrData);
//		System.out.println(str);
		webSocket.convertAndSend("/api/memo/" + memo, message);
	}

}
