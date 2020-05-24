package com.douzone.codingvirus19.vo;

public class GroupUserVo {

	private Long uNo;
	private Long gNo;
	private Long aNo;
	
	public Long getuNo() {
		return uNo;
	}
	public void setuNo(Long uNo) {
		this.uNo = uNo;
	}
	public Long getgNo() {
		return gNo;
	}
	public void setgNo(Long gNo) {
		this.gNo = gNo;
	}
	public Long getaNo() {
		return aNo;
	}
	public void setaNo(Long aNo) {
		this.aNo = aNo;
	}
	@Override
	public String toString() {
		return "GroupUserVo [uNo=" + uNo + ", gNo=" + gNo + ", aNo=" + aNo + "]";
	}
}
