package com.douzone.codingvirus19.vo;

public class AuthVo {
	private Long no;
	private int grade;
	public Long getNo() {
		return no;
	}
	public void setNo(Long no) {
		this.no = no;
	}
	public int getGrade() {
		return grade;
	}
	public void setGrade(int grade) {
		this.grade = grade;
	}
	@Override
	public String toString() {
		return "AuthVo [no=" + no + ", grade=" + grade + "]";
	}
}
