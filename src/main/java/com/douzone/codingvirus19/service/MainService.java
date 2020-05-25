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

	public List<MemoVo> findAllMemo(GroupVo vo) {
 		List<MemoVo> memoList = mainRepository.findAllMemo(vo);
 		return memoList;
	}
	public List<GroupVo> findByGroupList(UserVo vo) {
		List<GroupVo> list = mainRepository.findByGroupList(vo);
		return list;
	}

	public boolean insertGroup(GroupVo vo) {
		int count = mainRepository.insertGroup(vo); //유저 시큐리티도 같이		
		return count == 1;
	}
	public boolean insertAuth() {
		int count = mainRepository.insertAuth();
		return count == 1;
	}
	public int findLatestAuthNo() {
		return mainRepository.findLatestAuthNo();
		
	}
	public boolean insertGroupUser() {
		int count = mainRepository.insertGroupUser();
		return count == 1;
		
	}
}

