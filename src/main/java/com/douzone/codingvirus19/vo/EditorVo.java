package com.douzone.codingvirus19.vo;

public class EditorVo {
	private int inputIndex;
	private Long size;
	private String key;
	private Long version;
	private String type;

	
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public int getInputIndex() {
		return inputIndex;
	}
	public void setInputIndex(int inputIndex) {
		this.inputIndex = inputIndex;
	}
	public Long getSize() {
		return size;
	}
	public void setSize(Long size) {
		this.size = size;
	}
	public String getKey() {
		return key;
	}
	public void setKey(String key) {
		this.key = key;
	}
	public Long getVersion() {
		return version;
	}
	public void setVersion(Long version) {
		this.version = version;
	}
	@Override
	public String toString() {
		return "EditorVo [inputIndex=" + inputIndex + ", size=" + size + ", key=" + key + ", version=" + version
				+ ", type=" + type + "]";
	}
	

}
