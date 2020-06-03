package com.douzone.codingvirus19.repository;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.douzone.codingvirus19.vo.HashVo;
import com.douzone.codingvirus19.vo.MemoVo;

@Repository
public class HashRepository {
	
	@Autowired
	private SqlSession sqlSession;
	
	public List<HashVo> getHashListByGroup(MemoVo memoVo) {
		return sqlSession.selectList("hash.getHashListByGroup", memoVo);
	}
	
	public int insertHash(HashVo vo) {
		return sqlSession.insert("hash.insertHash", vo);
	}

	public List<HashVo> getHashListByMemo(MemoVo vo) {
		return sqlSession.selectList("hash.getHashListByMemo", vo);
	}

	public int deleteHash(Long no) {
		return sqlSession.delete("hash.deleteHash",no);
	}

}
