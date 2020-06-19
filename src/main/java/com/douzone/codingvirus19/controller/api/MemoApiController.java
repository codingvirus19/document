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
	public JsonResult memoPosition(@RequestBody Map<String, Object> dragdrop) {
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
		for (i = 0; i < vo.size(); i++) {
			vo.get(i).setuNo(securityUser.getNo());
			memoService.shareMemo(vo.get(i));
			if (i == vo.size() - 1) {
				break;
			} else if (i != vo.size() - 1) {
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
		if (vo.getgNo() == null) {
			boolean asyncTest = memoService.personDeleteMemo(vo);
			return JsonResult.success(asyncTest);
		} else {
			boolean asyncTest = memoService.peopleDeleteMemo(vo);
			return JsonResult.success(asyncTest);
		}
	}

	@PostMapping("/api/upload")
	public JsonResult imgUpload(@AuthUser SecurityUser securityUser, FileUpLoadVo fileUpLoadVo) {
		return JsonResult.success(filesService.upload(fileUpLoadVo));
	}

	@MessageMapping("/memo/connect/{memo}")
	@SendTo("/api/memo/{memo}")
	public ArrayList<String> connect(String userName, @DestinationVariable Long memo) throws Exception {
		ArrayList<String> userList = new ArrayList<String>();
		if (memoUserList.containsKey(memo)) {
			userList = memoUserList.get(memo);
		}
		if (!userList.contains(userName)) {
			userList.add(userName);
		}
		memoUserList.put(memo, userList);
		return userList;
	}

	@MessageMapping("/memo/disconnect/{memo}")
	@SendTo("/api/memo/{memo}")
	public ArrayList<String> disconnect(String userName, @DestinationVariable Long memo) throws Exception {
		ArrayList<String> userList = new ArrayList<String>();
		if (memoUserList.containsKey(memo)) {
			userList = memoUserList.get(memo);
		}
		if (userList.contains(userName)) {
			userList.remove(userName);
		}
		memoUserList.put(memo, userList);
		return userList;
	}

	@MessageMapping("/memo/{memo}")
	@SendTo("/api/memo/{memo}")
	public EditorVo sendmemo(EditorVo message, @DestinationVariable Long memo) throws Exception {
//		System.out.println(message);
		ArrayList<String> arrData = new ArrayList<String>();
		ArrayList<String> messageKey = new ArrayList<String>();
		ArrayList<String> messageKeyTemp = new ArrayList<String>();
		ArrayList<EditorVo> messageList = new ArrayList<EditorVo>();
		ArrayList<Long> version = new ArrayList<Long>();
		String str = null;
		if (strList.get(memo) != null) {
			Collections.addAll(arrData, strList.get(memo).split(""));
			messageList = messageHistory.get(memo);
			version = versionList.get(memo);
		} else {
			MemoVo vo = memoService.memoFind(memo);
			Collections.addAll(arrData, vo.getContent().split(""));
			version.add(0L);
		}
		messageList.add(message);
		versionList.put(memo, version);
		messageHistory.put(memo, messageList);
		Collections.addAll(messageKey, message.getKey().split(""));
		str = String.join("", arrData);

		if (message.getType().equals("AllText")) {
			message.setVersion(version.get(version.size() - 1));
			message.setKey(str);
			return message;
		} else if (message.getType().equals("save")) {
			if (str == null)
				return null;
			MemoVo memoVo = new MemoVo();
			memoVo.setNo(memo);
			memoVo.setContent(str);
			memoVo.setColor(message.getKey());
			memoService.memoUpdate(memoVo);
			return message;
		}
		

		if (version.size() > 1) {
			if (message.getVersion() < version.get(version.size() - 1)) {
//				System.out.println("Sync 맞추기");
//				System.out.println(
//						message.getInputIndex() + "::::" + messageList.get(messageList.size() - 2).getInputIndex());
				if (message.getInputIndex() > messageList.get(messageList.size() - 2).getInputIndex()) {
					message.setInputIndex(
							(int) (message.getInputIndex() + messageList.get(messageList.size() - 2).getSize()));
				} else if (message.getInputIndex() == messageList.get(messageList.size() - 2).getInputIndex()) {
					if (message.getType().equals("basic")) {
						Collections.addAll(messageKeyTemp, messageList.get(messageList.size() - 2).getKey().split(""));
						messageKey.set(0, messageKeyTemp.get(1));
						message.setKey(String.join("", messageKey));
						message.setInputIndex(message.getInputIndex() + 1);
					} else {
						message.setInputIndex(message.getInputIndex() + message.getSize().intValue());
					}
				}
			}
		}

		version.add(message.getVersion());
		versionList.put(memo, version);
		switch (message.getType()) {
		case "basic":
			if (message.getSize() > 1l) {
				if (message.getInputIndex() < 1) {
					arrData.add(message.getInputIndex(), message.getKey());
				} else {
					arrData.set(message.getInputIndex() - 2, messageKey.get(0));
					arrData.add(message.getInputIndex() - 1, messageKey.get(1));
				}
			} else {
				arrData.add(message.getInputIndex() - message.getSize().intValue(), message.getKey());
			}
			break;
		case "korean":
			arrData.set(message.getInputIndex() - 1, message.getKey());
			break;
		case "copy":
			arrData.add(message.getInputIndex() - Math.abs(message.getSize().intValue()), message.getKey());
			break;
		case "delete":
			arrData.subList(message.getInputIndex(), message.getInputIndex() + Math.abs(message.getSize().intValue()))
					.clear();
			break;
		case "hevent":
			arrData.add(message.getInputIndex(), message.getKey());
			break;
		case "boldevent1":
			arrData.add(0, message.getKey());
			arrData.add(message.getInputIndex() - 1, message.getKey());
			break;
		case "boldevent2":
			arrData.add(message.getInputIndex(), message.getKey());
			arrData.add(message.getSize().intValue() + 1, message.getKey());
			break;
		}
		str = String.join("", arrData);
		strList.put(memo, str);

		return message;
	}

	// 프론트에서 안쓰는듯
	@PostMapping("/api/chageMemoListNo")
	public JsonResult chageMemoListNo(@RequestBody MemoVo memoVo) {
		boolean result = memoService.chageMemoListNo(memoVo);
		return JsonResult.success(result);
	}

	@PostMapping("/api/deleteHash")
	public JsonResult deleteHash(@RequestBody HashVo vo) {
		boolean result = memoService.deleteHash(vo);
		return JsonResult.success(result);
	}

}
