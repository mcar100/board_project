package com.example.demo.board.controller;

import java.util.ArrayList;
import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.board.model.Board;
import com.example.demo.board.model.BoardDetailResponse;
import com.example.demo.board.model.BoardListResponse;
import com.example.demo.board.model.FileDTO;
import com.example.demo.board.model.SearchDTO;
import com.example.demo.board.service.BoardService;
import com.example.demo.board.service.FileService;
import com.example.demo.util.PaginationHelper;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
public class BoardController {
	
	@Autowired
	BoardService boardService;
	@Autowired
	FileService fileService;
	
    @GetMapping("/boards")
    public ResponseEntity<BoardListResponse> getBoardList(@RequestParam(value="pageNo", required = true, defaultValue="1") int pageNo, HttpServletRequest request) throws Exception {
		try {
	 		log.info(request.getMethod()+" "+request.getRequestURI()+"");
			int boardCount = boardService.countBoardList();
			SearchDTO searchDTO = new SearchDTO(pageNo, 10,boardCount);
			int lastPageNo = PaginationHelper.getEndPageNo(searchDTO);
			
			
			ArrayList<HashMap<String,Object>> boardList = boardService.getBoardListInfo(searchDTO);
			if(boardList.size()==0) {
				throw new Exception("데이터가 없습니다. 더미데이터 반환");
			}
			
			BoardListResponse responseData = new BoardListResponse();
			responseData.setPageNo(pageNo);
			responseData.setLastPageNo(lastPageNo);
			responseData.setPageSize(10);
			responseData.setBoardList(boardList);

	 		log.info("get boardList page: "+pageNo);
	        return ResponseEntity.ok().body(responseData); 
		}
		catch(Exception e) {
			log.error(e.getMessage()+"");
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null); 
		}    	

    }

	@PostMapping("/boards")
	public ResponseEntity<Integer> createBoard(@RequestBody Board board, HttpServletRequest request) throws Exception{		
		try {
	 		log.info(request.getMethod()+" "+request.getRequestURI()+"");
			if(board==null) {
				throw new Exception("요청된 정보가 없습니다.");
			}
			
			HttpSession session = request.getSession(false);
			Integer userId = (Integer)session.getAttribute("userId");
			if(userId==null) {
				throw new Exception("Session 에러");
			}
			board.setUserId(userId);
			
			boolean result = boardService.insertBoardInfo(board);
			if(!result) {
				throw new Exception("Board Service 에러");
			}
	 		log.info("create board "+board.getId());
			return ResponseEntity.ok().body(board.getId());
		}
		catch(Exception e) {
			log.error(e.getMessage());
			return  ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
		}
	}
	
	@GetMapping("/boards/{boardId}")
    public ResponseEntity<BoardDetailResponse> goBoardDetail(@PathVariable("boardId") Integer boardId, HttpServletRequest request) throws Exception {
		try {
	 		log.info(request.getMethod()+" "+request.getRequestURI()+"");
			if(boardId==null) {
				throw new Exception("요청된 정보가 없습니다.");
			}
			
			// 상세 페이지 데이터 설정하기
			BoardDetailResponse boardDetailResponse = new BoardDetailResponse();
			
			// 게시글 정보 가져오기
			HashMap<String,Object> boardInfo = boardService.getBoardDetailInfo(boardId);
			if(boardInfo==null) {
				throw new Exception("Board Service 에러");
			}
			else if(!boardInfo.get("boardStatus").equals("PUBLIC")) {
				throw new Exception("삭제 혹은 비공개된 글입니다.");
			}
			boardDetailResponse.setBoardInfo(boardInfo);
			
			// 파일정보 가져오기
			FileDTO[] filesInfo = fileService.getFileInfo(boardId);
			if(filesInfo!=null) {
				boardDetailResponse.setFilesInfo(filesInfo);
			}
			
			log.info("get board details: "+boardId);
			return ResponseEntity.ok().body(boardDetailResponse);
		}
		catch(Exception e) {
			log.error(e.getMessage());
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
		}
    }
	
	@DeleteMapping("/boards/{boardId}")
	public ResponseEntity<Boolean> deleteBoard(@PathVariable("boardId") Integer boardId, HttpServletRequest request) throws Exception {
		try {
	 		log.info(request.getMethod()+" "+request.getRequestURI()+"");
			if(boardId==null) {
				throw new Exception("요청된 정보가 없습니다.");
			}
			boolean result = boardService.deleteBoardInfo(boardId);
			if(!result) {
				throw new Exception("Board Service 에러");
			}
			log.info(boardId+" board deleted");
			return ResponseEntity.ok().body(true);
		}
		catch(Exception e) {
	 		log.error(e.getMessage());
	 		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(false);
		}
    }
	
	@PutMapping("/boards/{boardId}")
	public ResponseEntity<Boolean> updateBoard(@PathVariable("boardId") Integer boardId, @RequestBody Board board, HttpServletRequest request) {
		try {
	 		log.info(request.getMethod()+" "+request.getRequestURI()+"");
			if(boardId==null || board==null) {
				throw new Exception("요청된 정보가 없습니다.");
			}
			board.setId(boardId);
			boolean result = boardService.updateBoardInfo(board);
			if(!result) {
				throw new Exception("Board Service 에러");
			}
	 		log.info("update board "+boardId);
			return ResponseEntity.ok().body(true);
		}
		catch(Exception e) {
	 		log.error(e.getMessage());
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(false);
		}
	}
	
}
