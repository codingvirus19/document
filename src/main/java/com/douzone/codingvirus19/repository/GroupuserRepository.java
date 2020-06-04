package com.douzone.codingvirus19.repository;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.douzone.codingvirus19.vo.GroupUserVo;

@Repository
public class GroupuserRepository {

	@Autowired
	private SqlSession sqlSession;

	public int insertGroupUser(GroupUserVo groupUservo) {
		return sqlSession.insert("groupuser.insert", groupUservo);
	}

}
