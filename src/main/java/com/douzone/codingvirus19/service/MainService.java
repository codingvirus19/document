package com.douzone.codingvirus19.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.douzone.codingvirus19.repository.GroupRepository;
import com.douzone.codingvirus19.repository.MainRepository;
import com.douzone.codingvirus19.vo.GroupUserVo;
import com.douzone.codingvirus19.vo.GroupVo;
import com.douzone.codingvirus19.vo.MemoVo;
import com.douzone.codingvirus19.vo.UserVo;

@Service
public class MainService {

	@Autowired
	private MainRepository mainRepository;
	@Autowired
	private GroupRepository groupRepository;
	
	public List<GroupVo> getGroupByAuth(UserVo userVo) {
		return groupRepository.getGroupByAuth(userVo);
	}

	public List<MemoVo> findAllMemo(MemoVo memoVo) {
 		List<MemoVo> memoList = mainRepository.findAllMemo(memoVo);
 		return memoList;
	}

	public boolean insertGroup(GroupVo vo) {
		return 1 == groupRepository.insertGroup(vo);		
	}

	public List<MemoVo> memoAtNull(MemoVo memoVo) {
		List<MemoVo> memoList = mainRepository.memoAtNull(memoVo);
		return memoList;
	}
	
	public boolean insertGroupUser(GroupUserVo groupUservo) {
		return 1 == mainRepository.insertGroupUser(groupUservo); //유저 시큐리티도 같이		
	}

	public boolean deleteGroup(Long no) {
		return 1 == groupRepository.deleteGroup(no);
	}	

}

