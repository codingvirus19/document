package com.douzone.codingvirus19.controller.api;

import java.util.List;

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

@RestController
@RequestMapping("/api")
public class AlarmApiController {

	@Autowired
	private AlarmService alarmService;
	
	@PostMapping("/alarm")
	public JsonResult getAlarmList(@AuthUser SecurityUser securityUser) {
		AlarmVo vo = new AlarmVo();
		vo.setuNo(securityUser.getNo());
		List<AlarmVo> alarmList = alarmService.getAlarmList(vo);
		
		System.out.println(alarmList);
		
		return JsonResult.success(alarmList);
	}
}
