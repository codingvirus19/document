package com.douzone.codingvirus19.repository;

import java.util.List;
import java.util.Map;

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
		sqlSession.delete("memo.memoHashDeleteMemo", vo);
		int asyncTest = sqlSession.delete("memo.personDeleteMemo", vo);
		return asyncTest;
	}

	public int peopleDeleteMemo(MemoVo vo) {
		int deleteHash = sqlSession.delete("memo.memoHashDeleteMemo", vo);
		if(deleteHash != -1) {
			int asyncTest = sqlSession.delete("memo.peopleDeleteMemo", vo);
			return asyncTest;
		}else {
			return 2;
		}
	}

	public void memoUpdate(MemoVo vo) {
		sqlSession.update("memo.memoUpdate", vo);
	}

	public void shareMemo(MemoVo memoVo) {
		sqlSession.insert("memo.shareMemo", memoVo);
	}

	public int changeColor(MemoVo vo) {
		int asyncTest = sqlSession.delete("memo.changeColor", vo);
		return asyncTest;
	}

	public boolean memoInsert(MemoVo vo) {
		int i = sqlSession.insert("memo.insertMemo", vo);
		if (i == 0)
			return false;
		else
			return true;
	}

	public boolean memoPosition(Map<String, Object> dragdrop) {
		int i = sqlSession.update("memo.positionone", dragdrop);
		int j = sqlSession.update("memo.positiontwo", dragdrop);
		return (i==1 && j==1)?true:false;
	}

	public int chageMemoListNo(MemoVo memoVo) {
		return sqlSession.update("memo.chageMemoListNo", memoVo);
	}

	public List<MemoVo> memoListByHash(MemoVo memoVo) {
		return sqlSession.selectList("memo.memoListByHash", memoVo);
	}
	
	public List<MemoVo> searchMemoByHash(MemoVo memoVo) {
		return sqlSession.selectList("memo.searchMemoByHash", memoVo);
	}
	public MemoVo memoFind(Long memo) {
		return sqlSession.selectOne("memo.memofind", memo);
	}
}
