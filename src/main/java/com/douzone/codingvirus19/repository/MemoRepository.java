package com.douzone.codingvirus19.repository;


import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.douzone.codingvirus19.vo.MemoVo;



@Repository
public class MemoRepository {

	@Autowired
	private SqlSession sqlSession;
	
	public List<MemoVo> findAllMemo(MemoVo memoVo) {
		return sqlSession.selectList("memo.findAllMemo", memoVo);
	}

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
	
	public int changeColor(MemoVo vo) {
		int asyncTest = sqlSession.delete("memo.changeColor",vo);
		return asyncTest;
	}

	public boolean memoInsert(MemoVo vo) {
		int i = sqlSession.insert("memo.insertMemo",vo);
		if(i==0)return false;
		else return true;
	}

	public int chageMemoListNo(MemoVo memoVo) {
		return sqlSession.update("memo.chageMemoListNo", memoVo);
	}
}
