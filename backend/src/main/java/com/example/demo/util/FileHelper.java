package com.example.demo.util;

import java.util.UUID;

public class FileHelper {
	
	private FileHelper() {}
	
	public static String createFileUploadedName(String originalName) {
		String uuid = UUID.randomUUID().toString();
		String ext = extractExt(originalName);
		return uuid+"."+ext;
	}
	
	private static String extractExt(String fileName) {
		int pos = fileName.lastIndexOf(".");
		return fileName.substring(pos+1);
	}
	
	public static String getFullPathName(String filePath, String fileName) {
		return filePath+fileName;
	}
	
}
