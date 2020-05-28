package com.douzone.codingvirus19.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.douzone.codingvirus19.repository.HashRepository;
import com.douzone.codingvirus19.vo.HashVo;
import com.douzone.codingvirus19.vo.MemoVo;

@Service
public class SidebarService {
	
	@Autowired
	private HashRepository hashRepository;
	
	public List<HashVo> getHashListByGroup(MemoVo memoVo) {
		return hashRepository.getHashListByGroup(memoVo);
	}
}
