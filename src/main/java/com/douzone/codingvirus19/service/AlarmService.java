package com.douzone.codingvirus19.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.douzone.codingvirus19.repository.AlarmRepository;
import com.douzone.codingvirus19.vo.GroupUserVo;

@Service
public class AlarmService {

	@Autowired
	AlarmRepository alarmRepository;

	public List<GroupUserVo> getGroupinUser(GroupUserVo groupUserVo) {
		List<GroupUserVo> groupUserList = alarmRepository.getGroupinUser(groupUserVo);
 		return groupUserList;
	}
	
}
