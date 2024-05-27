package com.example.demo.board.service;

import java.io.File;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.board.mapper.FileMapper;
import com.example.demo.board.model.FileDTO;
import com.example.demo.util.FileHelper;

@Service
public class FileServiecImpl implements FileService {
	
	@Autowired
	private FileMapper fileMapper;
	@Value("${upload.path}")
	private String uploadPath;
	
	@Override
	public boolean insertFileInfo(MultipartFile multipartFile, Integer boardId) throws Exception {
		try {
			FileDTO file = new FileDTO();
			file.setOriginalName(multipartFile.getOriginalFilename());
			file.setBoardId(boardId);			
			file.setUploadedName(FileHelper.createFileUploadedName(file.getOriginalName()));
			
			// 로컬 저장
			String fullPathName = FileHelper.getFullPathName(uploadPath, file.getUploadedName());
			multipartFile.transferTo(new File(fullPathName));	
			
			// DB 저장
			Integer result = fileMapper.insertFileData(file);
			if(result==null||result==0) {
				throw new Exception("Service: DB에 파일정보 저장 실패");
			}
			return true;
		}
		catch(Exception e) {
			if(e.getMessage()==null) {
				System.out.println("Service: 로컬 저장소 파일 저장 실패");
			}
			else {
				System.out.println(e.getMessage());
			}
			return false;
		}
	}

	@Override
	public boolean insertFileInfo(MultipartFile[] multipartFiles, Integer boardId) throws Exception {
		try {
			for(int i=0; i<multipartFiles.length; i++) {
				FileDTO file = new FileDTO();
				file.setOriginalName(multipartFiles[i].getOriginalFilename());
				file.setBoardId(boardId);			
				file.setUploadedName(FileHelper.createFileUploadedName(file.getOriginalName()));
				
				// 로컬 저장
				String fullPathName = FileHelper.getFullPathName(uploadPath, file.getUploadedName());
				multipartFiles[i].transferTo(new File(fullPathName));
				
				// DB 저장
				Integer result = fileMapper.insertFileData(file);
				if(result==null||result==0) {
					throw new Exception("Service: DB에 "+i+"번째 파일정보 저장 실패");
				}
			}
			return true;
		}
		catch(Exception e) {
			if(e.getMessage()==null) {
				System.out.println("Service: 로컬 저장소 파일 저장 실패");
			}
			else {
				System.out.println(e.getMessage());
			}
			return false;
		}
	}

	@Override
	public FileDTO[] getFileInfo(Integer boardId) throws Exception {
		try {
			FileDTO[] filesData = fileMapper.selectFileDataByBoardId(boardId);
			if(filesData==null) {
				throw new Exception("Service: 게시글에 조회된 파일 없음");			
			}
			return filesData;
		}
		catch(Exception e) {
			System.out.println(e.getMessage());
			return null;
		}
	}

	@Override
	public boolean deleteFileInfo(Integer boardId) throws Exception {
		try {
			FileDTO[] filesData = getFileInfo(boardId);
			// 삭제할 파일이 있는지 체크
			if(filesData!=null) {
				// 로컬 삭제
				for(FileDTO fileDTO: filesData) {
					File file = new File(uploadPath+fileDTO.getUploadedName());
					if(file.exists()&&file.delete()) {
						System.out.println("Service: "+fileDTO.getUploadedName()+"파일 삭제 성공");
					}
					else {
						throw new Error("Service: "+fileDTO.getUploadedName()+"파일 삭제 실패");
					}
				}
				
				// DB 삭제
				Integer deletedFiles = fileMapper.deleteFileDataByBoardId(boardId);
				if(deletedFiles==null||deletedFiles==0) {
					System.out.println("Service: 삭제할 파일이 없습니다.");
				}
			}
			return true;
		}
		catch(Exception e) {
			System.out.println(e.getMessage());
			return false;
		}
	}

	@Override
	public boolean deleteFilesInfoById(Integer boardId, Integer[] fileIdList) throws Exception {
		try {
			for(int i=0; i<fileIdList.length; i++) {
				Integer fileId = fileIdList[i];
				// 로컬 삭제
				FileDTO fileDTO = fileMapper.selectFileDataById(fileId);
				File file = new File(uploadPath+fileDTO.getUploadedName());
				if(file.exists()&&file.delete()) {
					System.out.println("Service: "+fileDTO.getUploadedName()+"파일 삭제 성공");
				}
				else {
					throw new Error("Service: "+fileDTO.getUploadedName()+"파일 삭제 실패");
				}
				
				// DB 삭제
				Integer deletedFiles = fileMapper.deleteFileDataById(fileId);
				if(deletedFiles==null||deletedFiles==0) {
					throw new Exception("Service: 삭제할 파일이 없습니다.");
				}
			}
			return true;
		}
		catch(Exception e){
			System.out.println(e.getMessage());
			return false;
		}
	}
}
