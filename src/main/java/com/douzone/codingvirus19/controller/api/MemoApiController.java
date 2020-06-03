package com.douzone.codingvirus19.controller.api;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
import com.douzone.codingvirus19.service.FileService;
import com.douzone.codingvirus19.service.MemoService;
import com.douzone.codingvirus19.vo.EditorVo;
import com.douzone.codingvirus19.vo.FileUpLoadVo;
import com.douzone.codingvirus19.vo.HashVo;
import com.douzone.codingvirus19.vo.MemoVo;

@RestController
public class MemoApiController {

	@Autowired
	private SimpMessagingTemplate webSocket;
	
	@Autowired
	private MemoService memoService;
	
	@Autowired
	private FileService filesService;

	static Map<Long, String> strList = new HashMap<>();
	static Map<Long, ArrayList<Long>> versionList = new HashMap<>();
	static boolean first = true;
	
	@PostMapping("/api/memo/changeColor")
	public JsonResult changeColor(@AuthUser SecurityUser securityUser, @RequestBody MemoVo vo) {
		boolean asyncTest = memoService.changeColor(vo);
		return JsonResult.success(asyncTest);
	}
	
	@PostMapping("/api/memo/shareMemo")
	public JsonResult shareMemo(@AuthUser SecurityUser securityUser, @RequestBody List<MemoVo> vo) {
		int i;
		boolean asyncTest = true;
		for(i=0 ; i< vo.size(); i++) {
			vo.get(i).setuNo(securityUser.getNo());
			memoService.shareMemo(vo.get(i));
			if(i == vo.size()-1) {
				break;
			}else if(i != vo.size()-1) {
				continue;
			}
		}
		return JsonResult.success(asyncTest);
	}
	
	@PostMapping("/api/memo/save")
	public JsonResult saveMemo(@AuthUser SecurityUser securityUser, @RequestBody MemoVo vo) {
		vo.setuNo(securityUser.getNo());
		memoService.insert(vo);
		return JsonResult.success("ab");
	}
	
	@PostMapping("/api/memo/delete")
	public JsonResult deleteMemo(@AuthUser SecurityUser securityUser, @RequestBody MemoVo vo) {
		vo.setuNo(securityUser.getNo());
		if(vo.getgNo() == null) {
			boolean asyncTest = memoService.personDeleteMemo(vo);
			return JsonResult.success(asyncTest);
		}
		else {
			boolean asyncTest = memoService.peopleDeleteMemo(vo);
			return JsonResult.success(asyncTest);
		}
	}
	@PostMapping("/api/upload")
	public JsonResult imgUpload(@AuthUser SecurityUser securityUser,FileUpLoadVo fileUpLoadVo) {
		return JsonResult.success(filesService.upload(fileUpLoadVo));
	}
	
	@MessageMapping("/memo/{memo}")
	public void sendmemo(EditorVo message, @DestinationVariable Long memo) throws Exception {
		ArrayList<String> arrData = new ArrayList<String>();
		ArrayList<Long> version = new ArrayList<Long>();
		String str = null;
		if(strList.get(memo) != null && versionList.get(memo) != null) {
			Collections.addAll(arrData, strList.get(memo).split(""));
			version = versionList.get(memo);
			 str = strList.get(memo);
		}
		
		if(message.getType().equals("save")) {
			MemoVo memoVo = new MemoVo();
			memoVo.setNo(memo);
			memoVo.setContent(str);
			memoVo.setColor(message.getKey());
			memoService.memoUpdate(memoVo);
			return;
		}
		if (message.getType().equals("allKey")&& first) {
			Collections.addAll(arrData,message.getKey().split(""));
			str = message.getKey();
			first = false;
			strList.put(memo,str);
			versionList.put(memo,version);
			webSocket.convertAndSend("/api/memo/" + memo, message);
			return;
		}
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
		str = String.join("", arrData);
		strList.put(memo,str);
		versionList.put(memo,version);
		webSocket.convertAndSend("/api/memo/" + memo, message);
	}
	
// 이거 안씀 getHashListByGroup에서 filter처리함
	@PostMapping("/api/getHashListByMemo")
	public JsonResult getHashListByMemo(@RequestBody MemoVo vo){
		List<HashVo> HashListByMemo = memoService.getHashListByMemo(vo);
		return JsonResult.success(HashListByMemo);
	}
	
	
	@PostMapping("/api/deleteHash")
	public JsonResult deleteHash(@RequestBody HashVo vo){
		boolean result = memoService.deleteHash(vo.getNo());
		return JsonResult.success(result);
	}

}
