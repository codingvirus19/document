package com.douzone.codingvirus19.vo;

public class EditorVo {
	@Override
	public String toString() {
		return "EditorVo [inputIndex=" + inputIndex + ", size=" + size + ", key=" + key + ", version=" + version + "]";
	}
	public Long getInputIndex() {
		return inputIndex;
	}
	public void setInputIndex(Long inputIndex) {
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
	private Long inputIndex;
	private Long size;
	private String key;
	private Long version;

}
