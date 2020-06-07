package com.douzone.codingvirus19.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.douzone.codingvirus19.repository.AlarmRepository;
import com.douzone.codingvirus19.vo.AccptAlarmVo;
import com.douzone.codingvirus19.vo.AlarmVo;
import com.douzone.codingvirus19.vo.GroupUserVo;

@Service
public class AlarmService {

	@Autowired
	AlarmRepository alarmRepository;

	public List<Long> getGroupinUser(GroupUserVo groupUserVo) {
		List<Long> groupUserList = alarmRepository.getGroupinUser(groupUserVo);
 		return groupUserList;
	}

	public long addAlarm(AlarmVo alarmVo) {
		return alarmRepository.addAlarm(alarmVo);
	}

	public void insertAccptAlarm(Map<String, Object> pushSandUserMap) {
		alarmRepository.insertAccptAlarm(pushSandUserMap);
	}

	public List<AlarmVo> getAlarmReadList(AlarmVo vo) {
		List<AlarmVo> alarmList = alarmRepository.getAlarmReadList(vo);
		return alarmList;
	}

	public void readCheckUpdate(AlarmVo alarmVo) {
		alarmRepository.readCheckUpdate(alarmVo);
	}

	public List<AlarmVo> getAlarmContents(AlarmVo vo) {
		List<AlarmVo> alarmList = alarmRepository.getAlarmContents(vo);
		return alarmList;
	}

	public void chatReadCheckUpdate(AlarmVo alarmVo) {
		alarmRepository.chatReadCheckUpdate(alarmVo);
	}
	
}
