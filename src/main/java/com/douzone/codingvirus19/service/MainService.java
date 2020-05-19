package com.douzone.codingvirus19.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.douzone.codingvirus19.repository.MainRepository;
import com.douzone.codingvirus19.vo.MemoVo;
import com.douzone.codingvirus19.vo.UserVo;

@Service
public class MainService {

	@Autowired
	private MainRepository mainRepository;
	
	public List<MemoVo> findAllMemo(UserVo authUser) {
		List<MemoVo> memoList = mainRepository.findAllMemo(authUser);
		return memoList;
	}

	

}
