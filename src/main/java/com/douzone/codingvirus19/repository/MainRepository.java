package com.douzone.codingvirus19.repository;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.douzone.codingvirus19.vo.MemoVo;



@Repository
public class MainRepository {

	@Autowired
	private SqlSession sqlSession;

	public List<MemoVo> findAllMemo(MemoVo vo) {
		List<MemoVo> memoList = sqlSession.selectList("main.findAllMemo", vo);
		return memoList;
	}
	
//	public MainVo find() { 
//		return  sqlSession.selectOne("main.find");
//	}
//
//	public void update(MainVo vo) {
//		System.out.println("Repository"+vo);
//		sqlSession.update("main.update",vo);
//	}
//	

}
