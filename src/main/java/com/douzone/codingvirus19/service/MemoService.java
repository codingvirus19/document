package com.douzone.codingvirus19.service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.douzone.codingvirus19.repository.HashRepository;
import com.douzone.codingvirus19.repository.MemoRepository;
import com.douzone.codingvirus19.vo.HashVo;
import com.douzone.codingvirus19.vo.MemoVo;

@Service
public class MemoService {

	@Autowired
	private MemoRepository memoRepository;
	@Autowired
	private HashRepository hashRepository;

	public void personDeleteMemo(MemoVo vo) {
		memoRepository.personDeleteMemo(vo);
		
	}

	public void peopleDeleteMemo(MemoVo vo) {
		memoRepository.peopleDeleteMemo(vo);
		
	}

	public List<HashVo> getHashListByMemo(MemoVo vo) {
		return hashRepository.getHashListByMemo(vo);
	}

	public void deleteHash(Long no) {
		hashRepository.deleteHash(no);
	}
}

