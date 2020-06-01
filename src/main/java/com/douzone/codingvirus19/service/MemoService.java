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

	public boolean personDeleteMemo(MemoVo vo) {
		int asyncTestCount = memoRepository.personDeleteMemo(vo);
		return asyncTestCount == 1;
		
	}

	public boolean peopleDeleteMemo(MemoVo vo) {
		int asyncTestCount = memoRepository.peopleDeleteMemo(vo);
		return asyncTestCount == 1;
	}

	public List<HashVo> getHashListByMemo(MemoVo vo) {
		return hashRepository.getHashListByMemo(vo);
	}

	public void deleteHash(Long no) {
		hashRepository.deleteHash(no);
	}
	public void shareMemo(MemoVo memoVo) {
		memoRepository.shareMemo(memoVo);
	}

	public void memoUpdate(MemoVo vo) {
		memoRepository.memoUpdate(vo);

	}

	public boolean changeColor(MemoVo vo) {
		int asyncTestCount = memoRepository.changeColor(vo);
		return asyncTestCount == 1;
	}
}

