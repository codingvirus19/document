package com.douzone.codingvirus19.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.douzone.codingvirus19.repository.ChatRepository;
import com.douzone.codingvirus19.vo.ChatVo;
import com.douzone.codingvirus19.vo.UserVo;

@Service
public class ChatService {

	@Autowired
	private ChatRepository chatRepository;

	public List<ChatVo> chattingList(ChatVo chatVo) {
		List<ChatVo> list = chatRepository.chattingList(chatVo);
		return list;
	}

	public boolean addChatting(ChatVo chatVo) {
		int count = chatRepository.addChatting(chatVo);
		return count == 1;
	}
}
