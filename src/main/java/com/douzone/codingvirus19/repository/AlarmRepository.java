package com.douzone.codingvirus19.repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

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

	public List<AlarmVo> getAlarmReadList(AlarmVo vo) {
		List<AlarmVo> alarmList = sqlSession.selectList("alarm.getAlarmReadList", vo);
		return alarmList;
	}

	public void readCheckUpdate(AlarmVo alarmVo) {
		sqlSession.update("alarm.readCheckUpdate", alarmVo);
	}

	public List<AlarmVo> getAlarmContents(AlarmVo vo) {
		List<AlarmVo> alarmList = sqlSession.selectList("alarm.getAlarmContents", vo);
		return alarmList;
	}

	public void chatReadCheckUpdate(AlarmVo alarmVo) {
		sqlSession.update("alarm.chatReadCheckUpdate", alarmVo);
	}

	public void alarmGroupJoin(GroupUserVo groupuserVo) {
		sqlSession.insert("groupuser.alarmGroupJoin", groupuserVo);
	}

}
