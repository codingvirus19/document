package com.douzone.codingvirus19.repository;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.douzone.codingvirus19.vo.AccptAlarmVo;
import com.douzone.codingvirus19.vo.AlarmVo;
import com.douzone.codingvirus19.vo.GroupUserVo;

@Repository
public class AlarmRepository {
	
	@Autowired
	private SqlSession sqlSession;

	public List<Long> getGroupinUser(GroupUserVo groupUserVo) {
		List<Long> groupUserList = sqlSession.selectList("groupuser.getGroupinUser", groupUserVo);
		return groupUserList;
		
	}

	public long addAlarm(AlarmVo alarmVo) {
		return sqlSession.insert("alarm.addAlarm", alarmVo);
	}

	public void insertAccptAlarm(Map<String, Object> pushSandUserMap) {
		sqlSession.insert("alarm.insertAccptAlarm", pushSandUserMap);
	}

	public List<AlarmVo> getAlarmList(AlarmVo vo) {
		List<AlarmVo> alarmList = sqlSession.selectList("alarm.getAlarmList", vo);
		return alarmList;
	}

	public List<AlarmVo> getSocketAlarmList(AlarmVo vo) {
		List<AlarmVo> alarmList = sqlSession.selectList("alarm.getSocketAlarmList", vo);
		return alarmList;
	}

}
