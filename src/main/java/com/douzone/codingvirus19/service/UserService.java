package com.douzone.codingvirus19.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.douzone.codingvirus19.repository.UserRepository;
import com.douzone.codingvirus19.vo.UserVo;


@Service
public class UserService {
	@Autowired
	UserRepository userRepository;
	
	public UserVo getProfile(UserVo userVo) {
		return userRepository.getProfile(userVo);
	}
	
	public UserVo findById(String id) {
		UserVo authUser = userRepository.findByName(id); 
		return authUser;
	}

	public boolean hasId(String Id) {
		return userRepository.hasId(Id);
	}
	public boolean hasEmail(String email) {
		return userRepository.hasEmail(email);
	}

	public boolean join(UserVo vo) {
		int count = userRepository.join(vo);
		return count == 1;
	}
	public void joinInsert(UserVo vo) {
		userRepository.joinInsert(vo);
	}

	public void modifyProfile(UserVo vo) {
		userRepository.modifyProfile(vo);
		
	}
}
