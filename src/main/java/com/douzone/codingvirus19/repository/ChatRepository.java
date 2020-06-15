package com.douzone.codingvirus19.repository;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.douzone.codingvirus19.vo.AlarmVo;
import com.douzone.codingvirus19.vo.ChatVo;
import com.douzone.codingvirus19.vo.UserVo;

@Repository
public class ChatRepository {

	@Autowired
	private SqlSession sqlSession;
	
	public List<ChatVo> chattingList(ChatVo chatVo) {
		List<ChatVo> list = sqlSession.selectList("chat.chattingList", chatVo);
		return list;
	}

	public int addChatting(ChatVo chatVo) {
		return sqlSession.insert("chat.insert", chatVo);
	}

	public List<AlarmVo> chatListGroup(AlarmVo vo) {
		return sqlSession.selectList("chat.chatListGroup", vo);
	}

}
