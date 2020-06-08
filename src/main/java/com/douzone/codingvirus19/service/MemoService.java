package com.douzone.codingvirus19.service;


import java.util.Map;

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

	public boolean deleteHash(HashVo vo) {
		return 1 == hashRepository.deleteHash(vo);
	}
	public boolean memoPosition(Map<String, Object> dragdrop) {
		return memoRepository.memoPosition(dragdrop);
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

	public boolean insert(MemoVo vo) {
		return memoRepository.memoInsert(vo);
	}

	public boolean chageMemoListNo(MemoVo memoVo) {
		return 1 == memoRepository.chageMemoListNo(memoVo);
	}
}

