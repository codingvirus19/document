package com.douzone.codingvirus19.vo;

public class MemoVo {
	private Long no;
	private Long gNo;
	private Long uNo;
	private String content;
	private String color;
	private String date;
	private Long listNo;
	private String hash;	// db에는 없지만 hash 검색을 위해 넣음

	public Long getNo() {
		return no;
	}

	public void setNo(Long no) {
		this.no = no;
	}

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

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public Long getListNo() {
		return listNo;
	}

	public void setListNo(Long listNo) {
		this.listNo = listNo;
	}
	
	public String getHash() {
		return hash;
	}

	public void setHash(String hash) {
		this.hash = hash;
	}

	@Override
	public String toString() {
		return "MemoVo [no=" + no + ", gNo=" + gNo + ", uNo=" + uNo + ", content=" + content + ", color=" + color
				+ ", date=" + date + ", listNo=" + listNo + ", hash=" + hash + "]";
	}

}
