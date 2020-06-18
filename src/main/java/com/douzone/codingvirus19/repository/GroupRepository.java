package com.douzone.codingvirus19.repository;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.douzone.codingvirus19.vo.GroupUserVo;
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

	public int outGroup(GroupVo vo) {
		int deleteGroupuser = sqlSession.delete("groups.deleteGroupuser", vo);
		int deleteChat = sqlSession.delete("groups.deleteChat", vo);
		int deleteHash = sqlSession.delete("groups.deleteHash", vo);
		
		System.out.println("deleteGroupuser : " +deleteGroupuser);
		System.out.println("deleteChat : " +deleteChat);
		System.out.println("deleteHash : " + deleteHash);
		System.out.println(deleteGroupuser != -1 && deleteChat != -1 && deleteHash != -1);
		
		// 세 개 모두 delete작업이 완료 되었을 경우 다음작업 진행
		if(deleteGroupuser != -1 && deleteChat != -1 && deleteHash != -1) {
			int deleteMemo = sqlSession.delete("groups.deleteMemo", vo);
			System.out.println("deleteMemo : " + deleteMemo);
			System.out.println(deleteMemo != -1);
			// deleteMemo의 delete작업이 완료 되었을 경우 다음작업 진행
			if(deleteMemo != -1) {
				int deleteAcceptalarm = sqlSession.delete("groups.deleteAcceptalarm", vo);
				System.out.println("deleteAcceptalarm : "+ deleteAcceptalarm);
				System.out.println(deleteAcceptalarm != -1);
				// deleteAcceptalarm의 delete작업이 완료 되었을 경우 다음작업 진행
				if(deleteAcceptalarm != -1) {
					int deleteAlarm = sqlSession.delete("groups.deleteAlarm", vo);
					System.out.println("deleteAlarm : " + deleteAlarm);
					System.out.println(deleteAlarm != -1);
					// deleteAlarm의 delete작업이 완료 되었을 경우 다음작업 진행
					if(deleteAlarm != -1) {
						int outGroup = sqlSession.delete("groups.outGroup", vo);
						System.out.println("outGroup : " + outGroup);
						System.out.println(outGroup!= -1);
						return outGroup;
					}else {
						return 2;
					}
				}else {
					return 2;
				}
			}else {
				return 2;
			}
		}else {
			return 2;
		}
	}

	public int outGroupAlone(GroupUserVo vo) {
		int deleteHash = sqlSession.delete("groups.outGroupAloneDeleteHash", vo);
		int deleteGroupuser = sqlSession.delete("groups.outGroupAloneDeleteGroupUser", vo);
		int deleteAcceptAlarm = sqlSession.delete("groups.outGroupAlonedeleteAcceptAlarm", vo);
		if(deleteHash != -1 && deleteGroupuser != -1 && deleteAcceptAlarm != -1  ) {
			int deleteMemo = sqlSession.delete("groups.outGroupAloneDeleteMemo", vo);
			return deleteMemo;
		}else {
			return 2;
		}
	}

	public GroupVo getGnameByGno(GroupVo groupVo) {
		return sqlSession.selectOne("groups.getGnameByGno", groupVo);
	}
}
