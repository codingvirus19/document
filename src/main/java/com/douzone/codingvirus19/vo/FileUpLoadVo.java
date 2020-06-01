package com.douzone.codingvirus19.vo;

import org.springframework.web.multipart.MultipartFile;

public class FileUpLoadVo {
	private MultipartFile multipartFile;
	private Long uNo;

	public MultipartFile getMultipartFile() {
		return multipartFile;
	}

	public void setMultipartFile(MultipartFile multipartFile) {
		this.multipartFile = multipartFile;
	}

	public Long getuNo() {
		return uNo;
	}

	public void setuNo(Long uNo) {
		this.uNo = uNo;
	}

	@Override
	public String toString() {
		return "FileUpLoadVo [multipartFile=" + multipartFile + ", uNo=" + uNo + "]";
	}
	

}
