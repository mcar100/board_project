package com.example.demo.board.controller;

import java.nio.charset.StandardCharsets;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.util.UriUtils;

import com.example.demo.board.service.FileService;

@Controller
@RequestMapping("/file")
public class FileController {
	
	@Autowired
	private FileService fileService;
	@Value("${upload.path}")
	private String uploadPath;
	
	@ResponseBody
	@PostMapping("/{boardId}")
	public boolean uploadFile(@PathVariable("boardId") Integer boardId, @RequestPart("formData") MultipartFile[] files) throws Exception {
		try {
			if(boardId==null||files==null) {
				throw new Exception("요청된 파일 정보가 없습니다.");
			}
			
			boolean result;
			if(files.length>1) {
				result = fileService.insertFileInfo(files, boardId);
			}
			else {
				result = fileService.insertFileInfo(files[0], boardId);
			}
			
			if(!result) {
				throw new Exception("File Service 에러");
			}
			return true;
			
		}
		catch(Exception err) {
			System.out.println(err.getMessage());
			err.printStackTrace();
			return false;
		}
	}
	
	@ResponseBody
	@DeleteMapping("/{boardId}")
	public boolean deleteFile(@PathVariable("boardId") Integer boardId, @RequestBody Integer[] fileIdList) throws Exception {
		try {
			if(boardId==null||fileIdList==null) {
				throw new Exception("요청된 정보가 없습니다.");
			}
			
			boolean result = fileService.deleteFilesInfoById(boardId, fileIdList);
			
			if(!result) {
				throw new Exception("Board Service 에러");
			}
			
			return true;
		}
		catch(Exception e) {
			System.out.println(e.getMessage());
			return false;
		}
	}
	
	@ResponseBody
	@RequestMapping("/download")
	public ResponseEntity<UrlResource> downloadFile(@RequestParam("uploadedName") String uploadedName, @RequestParam("originalName") String originalName) throws Exception{
		try {
			if(uploadedName==null||originalName==null) {
				throw new Exception("요청된 정보가 없습니다.");
			}
			
			UrlResource resource = new UrlResource("file:"+uploadPath+uploadedName);
			String encodedName = UriUtils.encode(originalName, StandardCharsets.UTF_8);
			String contentDisposition = "attachment; filename=\""+encodedName+"\"";
			return ResponseEntity.ok()
						.header(HttpHeaders.CONTENT_DISPOSITION, contentDisposition)
						.body(resource);
		}
		catch(Exception err) {
			System.out.println("다운로드 실패");
			return null;
		}
	}
}
