package com.douzone.codingvirus19.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.douzone.codingvirus19.repository.MainRepository;
import com.douzone.codingvirus19.vo.MemoVo;
import com.douzone.codingvirus19.vo.UserVo;
import com.douzone.codingvirus19.vo.GroupVo;

@Service
public class MainService {

	@Autowired
	private MainRepository mainRepository;
	
	public List<GroupVo> getGroupByAuth(UserVo userVo) {
		return mainRepository.getGroupByAuth(userVo);
	}

	public List<MemoVo> findAllMemo(MemoVo memoVo) {
 		List<MemoVo> memoList = mainRepository.findAllMemo(memoVo);
 		return memoList;
	}

	public boolean addGroup(GroupVo vo) {
		int count = mainRepository.addGroup(vo);
		return count== 1;
	}

	public List<MemoVo> memoAtNull() {
		List<MemoVo> memoList = mainRepository.memoAtNull();
		return memoList;
	}
	
}

