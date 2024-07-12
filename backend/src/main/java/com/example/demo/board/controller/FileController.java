package com.example.demo.board.controller;

import java.nio.charset.StandardCharsets;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.util.UriUtils;

import com.example.demo.board.model.FileIdRequest;
import com.example.demo.board.service.FileService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@PropertySource(value="classpath:application.properties",encoding="UTF-8")
public class FileController {
	
	@Autowired
	private FileService fileService;
	@Value("${upload.path}")
	private String uploadPath;
	
	@PostMapping("files/{boardId}")
	public ResponseEntity<Boolean> uploadFile(@PathVariable("boardId") Integer boardId, @RequestPart("formData") MultipartFile[] files, HttpServletRequest request) throws Exception {
		log.info(request.getMethod()+" "+request.getRequestURI()+"");
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
			log.info("upload file");
			return ResponseEntity.ok().body(true);
			
		}
		catch(Exception e) {
			log.error(e.getMessage()+"");
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(false);
		}
	}
	
	@DeleteMapping("files/{boardId}")
	public ResponseEntity<Boolean> deleteFile(@PathVariable("boardId") Integer boardId, @RequestBody FileIdRequest fileIdRequest, HttpServletRequest request) throws Exception {
		log.info(request.getMethod()+" "+request.getRequestURI()+"");
		try {
			if(boardId==null||fileIdRequest==null) {
				throw new Exception("요청된 정보가 없습니다.");
			}
			
			boolean result = fileService.deleteFilesInfoById(boardId, fileIdRequest.getFileIdList());
			
			if(!result) {
				throw new Exception("Board Service 에러");
			}
			return ResponseEntity.ok().body(true);
		}
		catch(Exception e) {
			log.error(e.getMessage()+"");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(false);
		}
	}
	
	@GetMapping("files")
	public ResponseEntity<UrlResource> downloadFile(@RequestParam("uploadedName") String uploadedName, @RequestParam("originalName") String originalName, HttpServletRequest request ) throws Exception{
		log.info(request.getMethod()+" "+request.getRequestURI()+" originalName:"+originalName);
		try {
			if(uploadedName==null||originalName==null) {
				throw new Exception("요청된 정보가 없습니다.");
			}
			
			UrlResource resource = new UrlResource("file:"+uploadPath+uploadedName);
			String encodedName = UriUtils.encode(originalName, StandardCharsets.UTF_8);
			String contentDisposition = "attachment;filename=\""+encodedName+"\"";

			return ResponseEntity.ok()
						.header(HttpHeaders.CONTENT_DISPOSITION, contentDisposition)
						.body(resource);
		}
		catch(Exception err) {
			log.error("file download failed "+err.getMessage());
			return null;
		}
	}
}
