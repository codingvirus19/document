package com.douzone.codingvirus19.service;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Calendar;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.douzone.codingvirus19.vo.FileUpLoadVo;

@Service
public class FileService {
	
	private static final String SAVE_PATH = "/Users/coding19/coding19-uploads";
//	private static final String SAVE_PATH = "/Users/R35/git/coding19-uploads";
	private static final String URL = "/api/images";
	
	public String upload(FileUpLoadVo vo) {
		String url = "";
		try {
			MultipartFile multipartFile = vo.getMultipartFile();
		if(multipartFile.isEmpty()) {
//			
			return url;
		}
		
		String originFilename = multipartFile.getOriginalFilename();
		String extName = originFilename.substring(originFilename.lastIndexOf('.') + 1);
		
		String saveFilename = generateSeaveFilename(extName);
		long fileSize = multipartFile.getSize();
		
	
		byte[] fileData = multipartFile.getBytes();
		OutputStream os = new FileOutputStream(SAVE_PATH + "/" + saveFilename);
		os.write(fileData);
		os.close();
		url = URL + "/" + saveFilename;
		
	}catch(IOException ex) {
		throw new RuntimeException("file upload error:" + ex);
	}
		return url;
}

	private String generateSeaveFilename(String extName) {
		String filename = "";
		Calendar calendar = Calendar.getInstance();
		filename += calendar.get(Calendar.YEAR);
		filename += calendar.get(Calendar.MONTH);
		filename += calendar.get(Calendar.DATE);
		filename += calendar.get(Calendar.HOUR);
		filename += calendar.get(Calendar.MINUTE);
		filename += calendar.get(Calendar.SECOND);
		filename += calendar.get(Calendar.MILLISECOND);
		filename += ("."+extName);
		return filename;
	}



}
