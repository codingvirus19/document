package com.douzone.codingvirus19.controller.api;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.douzone.codingvirus19.dto.JsonResult;
import com.douzone.codingvirus19.security.AuthUser;
import com.douzone.codingvirus19.security.SecurityUser;
import com.douzone.codingvirus19.service.MemoService;
import com.douzone.codingvirus19.vo.EditorVo;
import com.douzone.codingvirus19.vo.HashVo;
import com.douzone.codingvirus19.vo.MemoVo;

@RestController
public class MemoApiController {

	@Autowired
	private SimpMessagingTemplate webSocket;
	
	@Autowired
	private MemoService memoService;

	static ArrayList<Long> version = new ArrayList<>();
	static String str = "";

	@PostMapping("/api/memo/shareMemo")
	public void shareMemo(@AuthUser SecurityUser securityUser, @RequestBody MemoVo vo) {
		System.out.println(vo);
//		vo.setuNo(securityUser.getNo());
//		System.out.println("/api/memo/delete"+vo);
//		if(vo.getgNo() == null) {
//			memoService.personDeleteMemo(vo);
//			return;
//		}else {
//			memoService.peopleDeleteMemo(vo);
//			return;
//		}
	}
	
	@PostMapping("/api/memo/delete")
	public void deleteMemo(@AuthUser SecurityUser securityUser, @RequestBody MemoVo vo) {
		vo.setuNo(securityUser.getNo());
		System.out.println("/api/memo/delete"+vo);
		if(vo.getgNo() == null) {
			memoService.personDeleteMemo(vo);
			return;
		}else {
			memoService.peopleDeleteMemo(vo);
			return;
		}
	}
	
	@MessageMapping("/memo/{memo}")
	public void sendmemo(EditorVo message, @DestinationVariable String memo) throws Exception {
		ArrayList<String> arrData = new ArrayList<String>();
		Collections.addAll(arrData, str.split(""));
		if (version.size() > 0) {
			if (message.getVersion() < version.get(version.size() - 1)) {
				message.setType("error");
				str = String.join("", arrData);
				message.setKey(str);
				message.setVersion(version.get(version.size()-1)+1);
				webSocket.convertAndSend("/api/memo/" + memo, message);
				return;
			}
		}
		version.add(message.getVersion());
		message.setVersion(message.getVersion() + 1L);
		if (message.getType().equals("basic")) {
			// 기본 입력
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
		} else if (message.getType().equals("boldevent1")) {
			arrData.add(0, message.getKey());
			arrData.add(message.getInputIndex()-1, message.getKey());
		} else if (message.getType().equals("boldevent2")) {
			arrData.add(message.getInputIndex(), message.getKey());
			arrData.add(message.getSize().intValue()+1, message.getKey());
		}
		System.out.println(message);
		str = String.join("", arrData);
		System.out.println(str);
		
		webSocket.convertAndSend("/api/memo/" + memo, message);
	}
	
	@PostMapping("/api/getHashListByMemo")
	public JsonResult getHashListByMemo(@RequestBody MemoVo vo){
		List<HashVo> HashListByMemo = memoService.getHashListByMemo(vo);
		return JsonResult.success(HashListByMemo);
	}

}
