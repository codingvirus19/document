package com.douzone.codingvirus19.vo;

public class ChatVo {
	private Long gNo;
	private Long uNo;
	private String nickname;
	private String message;
	private String date;
	private int aCount;

	public Long getgNo() {
		return gNo;
	}

	public void setgNo(Long gNo) {
		this.gNo = gNo;
	}

	public Long getuNo() {
		return uNo;
	}

	public void setuNo(Long uNo) {
		this.uNo = uNo;
	}

	public String getNickname() {
		return nickname;
	}

	public void setNickname(String nickname) {
		this.nickname = nickname;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public int getaCount() {
		return aCount;
	}

	public void setaCount(int aCount) {
		this.aCount = aCount;
	}

	@Override
	public String toString() {
		return "ChatVo [gNo=" + gNo + ", uNo=" + uNo + ", nickname=" + nickname + ", message=" + message + ", date="
				+ date + ", aCount=" + aCount + "]";
	}
}
