package com.douzone.codingvirus19.repository;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.douzone.codingvirus19.vo.GroupUserVo;
import com.douzone.codingvirus19.vo.UserVo;

@Repository
public class GroupuserRepository {

	@Autowired
	private SqlSession sqlSession;

	public int insertGroupUser(GroupUserVo groupUservo) {
		return sqlSession.insert("groupuser.insert", groupUservo);
	}

	public List<UserVo> getGroupinUserSession(GroupUserVo groupuserVo) {
		List<UserVo> list = sqlSession.selectList("groupuser.getGroupinUserSession", groupuserVo);
		return list;
	}

}
