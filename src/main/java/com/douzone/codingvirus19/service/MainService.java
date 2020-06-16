package com.douzone.codingvirus19.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.douzone.codingvirus19.repository.GroupRepository;
import com.douzone.codingvirus19.repository.GroupuserRepository;
import com.douzone.codingvirus19.repository.MemoRepository;
import com.douzone.codingvirus19.repository.UserRepository;
import com.douzone.codingvirus19.vo.GroupUserVo;
import com.douzone.codingvirus19.vo.GroupVo;
import com.douzone.codingvirus19.vo.MemoVo;
import com.douzone.codingvirus19.vo.UserVo;

@Service
public class MainService {

	@Autowired
	private GroupuserRepository groupuserRepository;
	@Autowired
	private GroupRepository groupRepository;
	@Autowired
	private MemoRepository memoRepository;
	@Autowired
	private UserRepository userRepository;
	
	public List<GroupVo> getGroupByAuth(UserVo userVo) {
		return groupRepository.getGroupByAuth(userVo);
	}

	public List<MemoVo> findAllMemo(MemoVo memoVo) {
 		 return memoRepository.findAllMemo(memoVo);
	}

	public boolean insertGroup(GroupVo vo) {
		return 1 == groupRepository.insertGroup(vo);		
	}
	
	public boolean insertGroupUser(GroupUserVo groupUservo) {
		return 1 == groupuserRepository.insertGroupUser(groupUservo); //유저 시큐리티도 같이		
	}


	public List<MemoVo> memoListByHash(MemoVo memoVo) {
		return memoRepository.memoListByHash(memoVo);
	}
	
	public List<MemoVo> searchMemoByHash(MemoVo memoVo) {
		return memoRepository.searchMemoByHash(memoVo);
	}

	public List<UserVo> getUserListByGroup(Long no) {
		return userRepository.getUserListByGroup(no);
}

	public List<UserVo> getGroupinUserSession(GroupUserVo groupuserVo) {
		List<UserVo> list = groupuserRepository.getGroupinUserSession(groupuserVo);
		return list;
	}
	
	public boolean outGroup(GroupVo vo) {
		int asyncTestCount = groupRepository.outGroup(vo);
		return asyncTestCount != -1;
	}

	public boolean outGroupAlone(GroupUserVo vo) {
		int asyncTestCount = groupRepository.outGroupAlone(vo);
		return asyncTestCount != -1;
	}	

}

