package com.douzone.codingvirus19.controller.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.douzone.codingvirus19.dto.JsonResult;
import com.douzone.codingvirus19.service.MainService;
import com.douzone.codingvirus19.vo.MemoVo;

@RestController
@RequestMapping("/api")
public class MainApiController {
	@Autowired
	private MainService mainService;
	
	@PostMapping("/memo")
	public JsonResult getMemo(Model model,@RequestBody MemoVo vo) {
		System.out.println(vo);
		List<MemoVo> memoList = mainService.findAllMemo(vo);
		System.out.println(memoList);
		return JsonResult.success(memoList);
	}
}
