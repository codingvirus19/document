package com.douzone.codingvirus19.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.douzone.codingvirus19.repository.HashRepository;
import com.douzone.codingvirus19.vo.HashVo;

@Service
public class ToolbarService {

	@Autowired
	private HashRepository hashRepository;

//	public List<HashVo> getHashListByUser(Long no) {
//		return hashRepository.getHashListByUser(no);
//	}

	public boolean addHash(HashVo vo) {
		int count = hashRepository.insertHash(vo);		
		return count == 1;
	}

	public boolean deleteAllHash(HashVo vo) {
		return 1 == hashRepository.deleteAllHash(vo);
	}

}
