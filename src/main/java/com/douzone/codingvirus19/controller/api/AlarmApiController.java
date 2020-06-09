package com.douzone.codingvirus19.controller.api;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.douzone.codingvirus19.dto.JsonResult;
import com.douzone.codingvirus19.security.AuthUser;
import com.douzone.codingvirus19.security.SecurityUser;
import com.douzone.codingvirus19.service.AlarmService;
import com.douzone.codingvirus19.vo.AlarmVo;
import com.douzone.codingvirus19.vo.GroupUserVo;

@RestController
@RequestMapping("/api")
public class AlarmApiController {

	@Autowired
	private AlarmService alarmService;
	
	@PostMapping("/alarmCheck")
	public JsonResult getAlarmCheckList(@AuthUser SecurityUser securityUser) {
		AlarmVo vo = new AlarmVo();
		vo.setuNo(securityUser.getNo());
		List<AlarmVo> alarmReadCheck = alarmService.getAlarmReadList(vo);
		Map<String, Boolean> alarmlist = new HashMap<>();
		alarmlist.put("basic",false);
		alarmlist.put("chatting",false);
		//기본값 셋팅
		if(alarmReadCheck.size() == 0) {
			return JsonResult.success(alarmlist);
		}
		for(int i=0; i<alarmReadCheck.size(); i++) {
			if(alarmReadCheck.get(i).isType()) {
				alarmlist.put("basic",alarmReadCheck.get(i).isReadCheck());
				//기본 알람
			}else {
				alarmlist.put("chatting",alarmReadCheck.get(i).isReadCheck());
				//채팅알람	
			}
		}
		return JsonResult.success(alarmlist);
	}
	
	@PostMapping("/alarmList")
	public JsonResult getAlarmList(@AuthUser SecurityUser securityUser) {
		AlarmVo vo = new AlarmVo();
		vo.setuNo(securityUser.getNo());
		
		List<AlarmVo> alarmList = alarmService.getAlarmContents(vo);
		return JsonResult.success(alarmList);
	}
	
	@PostMapping("/alarmGroupJoin")
	public JsonResult AlarmGroupJoin(@RequestBody GroupUserVo groupuserVo, @AuthUser SecurityUser securityUser) {
		System.out.println(groupuserVo);
		groupuserVo.setuNo(securityUser.getNo());
		alarmService.alarmGroupJoin(groupuserVo);
		return null;
	}
}
