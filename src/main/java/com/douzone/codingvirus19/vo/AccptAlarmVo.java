package com.douzone.codingvirus19.vo;

public class AccptAlarmVo {

	private boolean read;
	private Long notiNo;
	private Long uNo;
	public boolean isRead() {
		return read;
	}
	public void setRead(boolean read) {
		this.read = read;
	}
	public Long getNotiNo() {
		return notiNo;
	}
	public void setNotiNo(Long notiNo) {
		this.notiNo = notiNo;
	}
	public Long getuNo() {
		return uNo;
	}
	public void setuNo(Long uNo) {
		this.uNo = uNo;
	}
	@Override
	public String toString() {
		return "AccptAlarmVo [read=" + read + ", notiNo=" + notiNo + ", uNo=" + uNo + "]";
	}
}
