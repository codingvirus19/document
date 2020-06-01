package com.douzone.codingvirus19.repository;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.douzone.codingvirus19.vo.GroupUserVo;
import com.douzone.codingvirus19.vo.MemoVo;

@Repository
public class AlarmRepository {
	
	@Autowired
	private SqlSession sqlSession;

	public List<GroupUserVo> getGroupinUser(GroupUserVo groupUserVo) {
		List<GroupUserVo> groupUserList = sqlSession.selectList("groupuser.getGroupinUser", groupUserVo);
		
		return groupUserList;
	}

}
