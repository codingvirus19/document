package com.douzone.codingvirus19.repository;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.douzone.codingvirus19.vo.MemoVo;
import com.douzone.codingvirus19.vo.UserVo;
import com.douzone.codingvirus19.vo.GroupUserVo;
import com.douzone.codingvirus19.vo.GroupVo;



@Repository
public class MainRepository {

	@Autowired
	private SqlSession sqlSession;

	public List<MemoVo> findAllMemo(GroupVo vo) {
		List<MemoVo> memoList = sqlSession.selectList("main.findAllMemo", vo);
		return memoList;
	}
	
 	public List<GroupVo> findByGroupList(UserVo vo) {
 		return sqlSession.selectList("groups.findByGroupList", vo);
 	}
 	
	public int insertGroup(GroupVo vo) {
		return sqlSession.insert("groups.insert", vo);
	}

	public int insertGroupUser(GroupUserVo groupUservo) {
		return sqlSession.insert("groupuser.insert", groupUservo);
	}

	public List<GroupVo> hasGroup(UserVo userVo) {
		return sqlSession.selectList("groupuser.hasGroup", userVo);
	}
}
