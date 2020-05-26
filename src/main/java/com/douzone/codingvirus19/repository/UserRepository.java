package com.douzone.codingvirus19.repository;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.douzone.codingvirus19.vo.UserVo;


@Repository
public class UserRepository {

	@Autowired
	private SqlSession sqlSession;

	public boolean login(UserVo vo) { 
		return  sqlSession.selectOne("user.login",vo);
	}

	//	public void update(MainVo vo) {
	//		System.out.println("Repository"+vo);
	//		sqlSession.update("main.update",vo);
	//	}

	public UserVo findByIdAndPassword(UserVo vo) {
		UserVo authUser = sqlSession.selectOne("user.findByIdAndPassword", vo);
		return authUser;
	}

	public UserVo findByName(String name) {
		return sqlSession.selectOne("user.findById", name);
	}

	public boolean hasId(String id) {
		int count = sqlSession.selectOne("user.hasId", id);
		return count == 1;
	}
	public boolean hasEmail(String email) {
		int count = sqlSession.selectOne("user.hasEmail", email);
		return count == 1;
	}
	

	public int join(UserVo vo) {
		return sqlSession.insert("user.join", vo);

	}


}
