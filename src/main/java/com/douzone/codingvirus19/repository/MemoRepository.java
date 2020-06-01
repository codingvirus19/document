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
public class MemoRepository {

	@Autowired
	private SqlSession sqlSession;

	public int personDeleteMemo(MemoVo vo) {
		sqlSession.delete("memo.memoHashDeleteMemo",vo);
		int asyncTest = sqlSession.delete("memo.personDeleteMemo",vo);
		return asyncTest;
	}



	public int peopleDeleteMemo(MemoVo vo) {
		int asyncTest = sqlSession.delete("memo.peopleDeleteMemo",vo);
		return asyncTest;
	}

	public void memoUpdate(MemoVo vo) {
		sqlSession.update("memo.memoUpdate",vo);
		
	}



	public void shareMemo(MemoVo memoVo) {
		sqlSession.insert("memo.shareMemo",memoVo);
	}
}
