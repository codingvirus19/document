package com.douzone.codingvirus19.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import com.douzone.codingvirus19.vo.EditorVo;

@Controller
public class MemoApiController {
	@Autowired
	private SimpMessagingTemplate webSocket;
	
	@MessageMapping("/memo/{memo}")
	@SendTo("192.168.1.27:8090/codingvirus19/api/{memo}")
	public void sendmemo(EditorVo message, @DestinationVariable String memo) throws Exception {
		System.out.println(message);
		System.out.println(memo);

		webSocket.convertAndSend("/api/memo/" + memo, message);
	}
}
