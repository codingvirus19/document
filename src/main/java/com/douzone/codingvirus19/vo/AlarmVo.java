package com.douzone.codingvirus19.vo;


public class AlarmVo {
	private Long no;
	private Long gNo;
	private String chat;
	private String groupName;
	private String date;
	private boolean type;
	private boolean addgroup;
	private boolean readCheck;
	private Long notiNo;
	private Long uNo;
	
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
	public String getChat() {
		return chat;
	}
	public void setChat(String chat) {
		this.chat = chat;
	}
	public String getGroupName() {
		return groupName;
	}
	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public boolean isType() {
		return type;
	}
	public void setType(boolean type) {
		this.type = type;
	}
	public boolean isAddgroup() {
		return addgroup;
	}
	public void setAddgroup(boolean addgroup) {
		this.addgroup = addgroup;
	}
	public boolean isReadCheck() {
		return readCheck;
	}
	public void setReadCheck(boolean readCheck) {
		this.readCheck = readCheck;
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
		return "AlarmVo [no=" + no + ", gNo=" + gNo + ", chat=" + chat + ", groupName=" + groupName + ", date=" + date
				+ ", type=" + type + ", addgroup=" + addgroup + ", readCheck=" + readCheck + ", notiNo=" + notiNo
				+ ", uNo=" + uNo + "]";
	}
}
