package com.douzone.codingvirus19.repository;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.douzone.codingvirus19.vo.MemoVo;
import com.douzone.codingvirus19.vo.UserVo;
import com.douzone.codingvirus19.vo.GroupUserVo;
import com.douzone.codingvirus19.vo.GroupVo;
import com.douzone.codingvirus19.vo.HashVo;



@Repository
public class MainRepository {

	@Autowired
	private SqlSession sqlSession;

	public List<GroupVo> getGroupByAuth(UserVo userVo) {
		return sqlSession.selectList("groups.getGroupByAuth", userVo);
	}

	public List<MemoVo> findAllMemo(MemoVo memoVo) {
		List<MemoVo> memoList = sqlSession.selectList("main.findAllMemo", memoVo);
		return memoList;
	}


	public int insertGroup(GroupVo vo) {
		return sqlSession.insert("groups.insert", vo);
	}

	public List<MemoVo> memoAtNull(MemoVo memoVo) {
		List<MemoVo> memoList = sqlSession.selectList("main.memoAtNull",memoVo);
		return memoList;
	}

	public int insertGroupUser(GroupUserVo groupUservo) {
		return sqlSession.insert("groupuser.insert", groupUservo);
	}

	public List<HashVo> getHashListByGroup(MemoVo memoVo) {
		return sqlSession.selectList("hash.getHashListByGroup", memoVo);
	}


}
