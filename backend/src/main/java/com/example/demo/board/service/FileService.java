package com.example.demo.board.service;

import org.springframework.web.multipart.MultipartFile;

import com.example.demo.board.model.FileDTO;

public interface FileService {
	boolean insertFileInfo(MultipartFile multipartFile, Integer boardId) throws Exception;
	boolean insertFileInfo(MultipartFile[]  multipartFiles, Integer boardId) throws Exception;
	FileDTO[] getFileInfo(Integer boardId) throws Exception;
	boolean deleteFileInfo(Integer boardId) throws Exception;
	boolean deleteFilesInfoById(Integer boardId, Integer[] fileIdList) throws Exception;
}
