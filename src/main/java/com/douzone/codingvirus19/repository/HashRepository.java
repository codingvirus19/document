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

	public int deleteHash(HashVo vo) {
		if(vo.getNo() != null) {
			//no로 지움
			return sqlSession.delete("hash.deleteHash",vo);
		}
		else {
			//gNo, mNo, name으로 지움
			return sqlSession.delete("hash.deleteHash2",vo);
		}
	}

}
