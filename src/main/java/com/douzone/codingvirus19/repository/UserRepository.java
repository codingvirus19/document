package com.douzone.codingvirus19.repository;

import java.util.List;

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
		return sqlSession.selectOne("user.login", vo);
	}

	public void joinInsert(UserVo vo) {
		sqlSession.insert("user.joinInsert", vo);
	}

	public UserVo findByName(String name) {
		return sqlSession.selectOne("user.findById", name);
	}

	public boolean hasId(String id) {
		int count = sqlSession.selectOne("user.hasId", id);
		return count == 1;
	}
	
	public boolean hasEmail(String email) {
		int count = sqlSession.selectOne("user.hasEmail", email);
		return count == 1;
	}
	
	public void modifyProfile(UserVo vo) {
		sqlSession.update("user.modifyProfile",vo);
	}

	public int join(UserVo vo) {
		return sqlSession.insert("user.join", vo);
	}
	
	public List<UserVo> getUserList(Long no) {
		return sqlSession.selectList("user.getUserList", no);
	}

	public List<UserVo> getUserListNotInGroup(Long no) {
		return sqlSession.selectList("user.getUserListNotInGroup", no);
	}
	
	public List<UserVo> getUserListByGroup(Long no) {
		return sqlSession.selectList("user.getUserListByGroup", no);
	}

	public String getUser(Long no) {
		return sqlSession.selectOne("user.getUser",no);
	}

}
