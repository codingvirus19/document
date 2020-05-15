package com.douzone.codingvirus19.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.douzone.codingvirus19.repository.MainRepository;
import com.douzone.codingvirus19.vo.MemoVo;

@Service
public class MainService {

	@Autowired
	private MainRepository mainRepository;
	
	public List<MemoVo> findAllMemo(MemoVo vo) {
		List<MemoVo> memoList = mainRepository.findAllMemo(vo);
		return memoList;
	}

	

}
