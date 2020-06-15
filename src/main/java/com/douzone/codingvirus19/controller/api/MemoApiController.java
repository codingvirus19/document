package com.douzone.codingvirus19.controller.api;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.douzone.codingvirus19.dto.JsonResult;
import com.douzone.codingvirus19.security.AuthUser;
import com.douzone.codingvirus19.security.SecurityUser;
import com.douzone.codingvirus19.service.FileService;
import com.douzone.codingvirus19.service.MemoService;
import com.douzone.codingvirus19.service.UserService;
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
	private UserService userService;
	
	@Autowired
	private FileService filesService;

	static Map<Long, String> strList = new HashMap<>();
	static Map<Long, Boolean> booleanList = new HashMap<>();
	static Map<Long, ArrayList<Long>> versionList = new HashMap<>();
	static Map<Long, ArrayList<EditorVo>> messageHistory = new HashMap<>();
	static Map<Long, ArrayList<String>> memoUserList = new HashMap<>();
	static boolean first = true;
	
	@PostMapping("/api/memo/memoposition")
	public JsonResult memoPosition(@RequestBody Map<String,Object> dragdrop) {
		return JsonResult.success(memoService.memoPosition(dragdrop));
	}
	
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
		return JsonResult.success(memoService.insert(vo));
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
	
	@MessageMapping("/memo/connect/{memo}")
	@SendTo("/api/memo/{memo}")
	public ArrayList<String> connect(String userName, @DestinationVariable Long memo) throws Exception {
		ArrayList<String> userList = new ArrayList<String>();
		if(memoUserList.containsKey(memo)) {
			userList = memoUserList.get(memo);
		}
		if(!userList.contains(userName)) {
			userList.add(userName);
		}
		memoUserList.put(memo, userList);
		return userList;
	}
	
	@MessageMapping("/memo/disconnect/{memo}")
	@SendTo("/api/memo/{memo}")
	public ArrayList<String> disconnect(String userName, @DestinationVariable Long memo) throws Exception {
		ArrayList<String> userList = new ArrayList<String>();
		if(memoUserList.containsKey(memo)) {
			userList = memoUserList.get(memo);
		}
		if(userList.contains(userName)) {
			userList.remove(userName);
		}
		memoUserList.put(memo, userList);
		return userList;
	}
	
	
	
	@MessageMapping("/memo/{memo}")
	@SendTo("/api/memo/{memo}")
	public EditorVo sendmemo(EditorVo message, @DestinationVariable Long memo) throws Exception {
		ArrayList<String> arrData = new ArrayList<String>();
		ArrayList<EditorVo> messageList = new ArrayList<EditorVo>();
		ArrayList<Long> version = new ArrayList<Long>();
		String str = null;
		Boolean first = true;
		if(strList.get(memo) != null && versionList.get(memo) != null && booleanList.get(memo) != null) {
			Collections.addAll(arrData, strList.get(memo).split(""));
			version = versionList.get(memo);
			 str = strList.get(memo);
			 first = booleanList.get(memo);
			 messageList = messageHistory.get(memo);
		}
		
		messageList.add(message);
		
		if(message.getType().equals("save")) {
			if(str == null)return null;
			MemoVo memoVo = new MemoVo();
			memoVo.setNo(memo);
			memoVo.setContent(str);
			memoVo.setColor(message.getKey());
			memoService.memoUpdate(memoVo);
			return message;
		}
		if (message.getType().equals("allKey")&& first ) {
			Collections.addAll(arrData,message.getKey().split(""));
			str = message.getKey();
			first = false;
			version.add(message.getVersion());
			message.setVersion(message.getVersion()+1);
			strList.put(memo,str);
			versionList.put(memo,version);
			messageHistory.put(memo, messageList);
			booleanList.put(memo, first);
			return message;
		}else if(message.getType().equals("allKey")){
			message.setKey(str);
			message.setVersion(version.get(version.size()-1)+1);
			return message;
		}
		if(message.getType().equals("reClick")) {
			message.setVersion(version.get(version.size()-1));
			return message;
		}
		
		if (version.size() > 0 && arrData.size()+1 != message.getSize()) {
			if (message.getVersion() <= version.get(version.size() - 1)) {
					if(messageList.get(messageList.size()-1).getInputIndex() <= messageList.get(messageList.size()-2).getInputIndex()) {
						ArrayList<String> TempData = new ArrayList<String>();
						Collections.addAll(TempData, messageList.get(messageList.size()-1).getKey().split(""));
						arrData = memoChange(messageList.get(messageList.size()-1),arrData);
						str = String.join("", arrData);
						strList.put(memo,str);
						message.setVersion(version.get(version.size()-1)+1);
						message.setSize((long)TempData.size());
						message.setType("error1");
						message.setKey(str);
						return message; 
					}else if(messageList.get(messageList.size()-1).getInputIndex() > messageList.get(messageList.size()-2).getInputIndex()) {
						ArrayList<String> TempData = new ArrayList<String>();
						Collections.addAll(TempData, messageList.get(messageList.size()-1).getKey().split(""));
						//마지막 입력된 위치가더크다 
						message.setType("error2");
						message.setSize((long)TempData.size());
						arrData = memoChange(messageList.get(messageList.size()-1),arrData);
						str = String.join("", arrData);
						message.setKey(str);
						return message;
					}
				message.setType("error");
				str = String.join("", arrData);
				message.setKey(str);
				message.setVersion(version.get(version.size()-1)+1);
				return message;
			}
		}
		if(arrData.size() > 1 &&!message.getType().equals("korean") &&!message.getType().equals("delete") && arrData.size()+1 != message.getSize()) {
			message.setType("error3");
			str = String.join("", arrData);
			message.setKey(str);
			message.setVersion(version.get(version.size()-1)+1);
			return message;
		}
		version.add(message.getVersion());
		message.setVersion(message.getVersion() + 1L);
		
		arrData = memoChange(message,arrData);
		str = String.join("", arrData);
		strList.put(memo,str);
		messageHistory.put(memo,messageList);
		versionList.put(memo,version);
		booleanList.put(memo, first);
		return message;
	}
	
	public ArrayList<String> memoChange(EditorVo message,ArrayList<String> arrData) {
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
		return arrData;
	}
	
	// 프론트에서 안쓰는듯
	@PostMapping("/api/chageMemoListNo")
	public JsonResult chageMemoListNo(@RequestBody MemoVo memoVo) {
		boolean result = memoService.chageMemoListNo(memoVo);
		return JsonResult.success(result);
	}
	
	@PostMapping("/api/deleteHash")
	public JsonResult deleteHash(@RequestBody HashVo vo){
		boolean result = memoService.deleteHash(vo);
		return JsonResult.success(result);
	}

}
