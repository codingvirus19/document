package com.douzone.codingvirus19.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.douzone.codingvirus19.repository.MainRepository;
import com.douzone.codingvirus19.vo.MemoVo;
import com.douzone.codingvirus19.vo.UserVo;
import com.douzone.codingvirus19.vo.GroupUserVo;
import com.douzone.codingvirus19.vo.GroupVo;
import com.douzone.codingvirus19.vo.HashVo;

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

	public boolean insertGroup(GroupVo vo) {
		int count = mainRepository.insertGroup(vo);		
		return count == 1;
	}

	public List<MemoVo> memoAtNull(MemoVo memoVo) {
		List<MemoVo> memoList = mainRepository.memoAtNull(memoVo);
		return memoList;
	}
	
	public boolean insertGroupUser(GroupUserVo groupUservo) {
		int count = mainRepository.insertGroupUser(groupUservo); //유저 시큐리티도 같이		
		return count == 1;
	}

	public List<HashVo> getHashListByGroup(MemoVo memoVo) {
		return mainRepository.getHashListByGroup(memoVo);
	}
	

}

