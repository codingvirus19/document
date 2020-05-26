package com.douzone.codingvirus19.repository;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.douzone.codingvirus19.vo.UserVo;


@Repository
public class UserRepository {

	@Autowired
	private SqlSession sqlSession;
	
	public UserVo getProfile(UserVo userVo) {
		return sqlSession.selectOne("user.getProfile", userVo);
	}
	
	public boolean login(UserVo vo) { 
		return  sqlSession.selectOne("user.login",vo);
	}

	public void joinInsert(UserVo vo) {
		sqlSession.insert("user.joinInsert", vo);
		
	}

	public UserVo findByName(String name) {
		return sqlSession.selectOne("user.findById", name);
	}

	
	

}
