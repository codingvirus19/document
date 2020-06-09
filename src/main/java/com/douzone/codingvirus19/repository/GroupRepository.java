package com.douzone.codingvirus19.repository;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.douzone.codingvirus19.vo.GroupVo;
import com.douzone.codingvirus19.vo.UserVo;

@Repository
public class GroupRepository {

	@Autowired
	private SqlSession sqlSession;

	public List<GroupVo> getGroupByAuth(UserVo userVo) {
		return sqlSession.selectList("groups.getGroupByAuth", userVo);
	}

	public int insertGroup(GroupVo vo) {
		return sqlSession.insert("groups.insert", vo);
	}

//	public int deleteGroup(Long no) {
//		return sqlSession.delete("groups.deleteGroup", no);
//	}

	public int outGroup(GroupVo vo) {
		
		int asyncTest1 = sqlSession.delete("groups.deleteAlarm", vo);
		int asyncTest2 = sqlSession.delete("groups.deleteGroupuser", vo);
		int asyncTest3 = sqlSession.delete("groups.deleteChat", vo);
		int asyncTest4 = sqlSession.delete("groups.deleteMemo", vo);
		int asyncTest5 = sqlSession.delete("groups.deleteHash", vo);
		System.out.println(asyncTest1 +" : "+ asyncTest2+" : "+asyncTest3+" : "+asyncTest4+" : "+asyncTest5);
		if(asyncTest1 == 1 && asyncTest2 == 1 && asyncTest3 == 1 && asyncTest4 == 1 && asyncTest5 == 1) {
			int asyncTest6 = sqlSession.delete("groups.outGroup", vo);
			return asyncTest6;
		}else {
			return 2;
		}
		
	}

}
