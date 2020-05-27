package com.douzone.codingvirus19.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.douzone.codingvirus19.repository.MemoRepository;
import com.douzone.codingvirus19.vo.MemoVo;

@Service
public class MemoService {

	@Autowired
	private MemoRepository memoRepository;

	public void personDeleteMemo(MemoVo vo) {
		memoRepository.personDeleteMemo(vo);
		
	}
	
//	
	

}
