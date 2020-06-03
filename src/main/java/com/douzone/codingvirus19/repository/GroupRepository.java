package com.douzone.codingvirus19.repository;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.douzone.codingvirus19.vo.GroupVo;
import com.douzone.codingvirus19.vo.UserVo;

@Repository
public class GroupRepository {

	@Autowired
	private SqlSession sqlSession;

	public List<GroupVo> getGroupByAuth(UserVo userVo) {
		return sqlSession.selectList("groups.getGroupByAuth", userVo);
	}

	public int insertGroup(GroupVo vo) {
		return sqlSession.insert("groups.insert", vo);
	}

	public int deleteGroup(Long no) {
		return sqlSession.delete("groups.deleteGroup", no);
	}

}
