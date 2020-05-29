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

	public void personDeleteMemo(MemoVo vo) {
		sqlSession.delete("memo.memoHashDeleteMemo",vo);
		sqlSession.delete("memo.personDeleteMemo",vo);
	}

	public void peopleDeleteMemo(MemoVo vo) {
		sqlSession.delete("memo.peopleDeleteMemo",vo);
		
	}

//

	
}
