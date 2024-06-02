package com.example.demo.board.controller;

import java.util.ArrayList;
import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.board.model.Board;
import com.example.demo.board.model.BoardListResponse;
import com.example.demo.board.model.Comment;
import com.example.demo.board.model.FileDTO;
import com.example.demo.board.model.SearchDTO;
import com.example.demo.board.service.BoardService;
import com.example.demo.board.service.CommentService;
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
	@Autowired
	CommentService commentService;
	
    @GetMapping("/boards")
    public ResponseEntity<BoardListResponse> getBoardList(@RequestParam(value="pageNo", required = true, defaultValue="1") int pageNo, HttpServletRequest request) throws Exception {
		try {
	 		log.info(request.getRequestURI()+"");
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
	public Integer createBoard(@RequestBody Board board, HttpServletRequest request) throws Exception{		
		try {
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
			return board.getId();
		}
		catch(Exception e) {
			System.out.println(e.getMessage());
			return null;
		}
	}
	
	@GetMapping("/boards/{boardId}")
    public String goBoardDetail(@PathVariable("boardId") Integer boardId, Model model) throws Exception {
		try {
			if(boardId==null) {
				throw new Exception("요청된 정보가 없습니다.");
			}
			
			// 게시글 정보 가져오기
			HashMap<String,Object> boardInfo = boardService.getBoardDetailInfo(boardId);

			if(boardInfo==null) {
				throw new Exception("Board Service 에러");
			}
			else if(!boardInfo.get("boardStatus").equals("PUBLIC")) {
				throw new Exception("삭제 혹은 비공개된 글입니다.");
			}
			model.addAttribute("boardData", boardInfo);
			
			// 파일정보 가져오기
			FileDTO[] filesInfo = fileService.getFileInfo(boardId);
			if(filesInfo!=null) {
				model.addAttribute("filesData",filesInfo);
			}
			
			// 댓글정보 가져오기
			ArrayList<Comment> commentsInfo = commentService.getCommentList(boardId);
			if(commentsInfo!=null) {
				model.addAttribute("commentsData", commentsInfo);
			}
		}
		catch(Exception e) {
			e.printStackTrace();
			System.out.println(e.getMessage());
			model.addAttribute("error", true);
			model.addAttribute("errorMsg", e.getMessage());
		}
    	return "/board/detail";
    }
	
	@DeleteMapping("/detail/{boardId}")
    @ResponseBody
	public boolean deleteBoard(@PathVariable("boardId") Integer boardId) throws Exception {
		try {
			if(boardId==null) {
				throw new Exception("요청된 정보가 없습니다.");
			}
			boolean result = boardService.deleteBoardInfo(boardId);
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
	
	@DeleteMapping("/detail/admin/{boardId}")
    @ResponseBody
	public boolean deleteHardBoard(@PathVariable("boardId") Integer boardId) throws Exception {
		try {
			if(boardId==null) {
				throw new Exception("요청된 정보가 없습니다.");
			}
			boolean fileResult = fileService.deleteFileInfo(boardId);
			if(!fileResult) {
				throw new Exception("File Service 에러");
			}
			boolean boardResult = boardService.deleteHardBoardInfo(boardId);
			if(!boardResult) {
				throw new Exception("Board Service 에러");
			}
			return true;
		}
		catch(Exception e) {
			System.out.println(e.getMessage());
			return false;
		}
    }
	
	@GetMapping("/modify/{boardId}")
	public String goModify(@PathVariable("boardId") Integer boardId, HttpServletRequest request, Model model) throws Exception{
		try {
			if(boardId==null) {
				throw new Exception("요청된 정보가 없습니다.");
			}
			
			HashMap<String,Object> boardInfo = boardService.getBoardDetailInfo(boardId);
			if(boardInfo==null) {
				throw new Exception("Board Service 에러");
			}
			String boardUserId = String.valueOf(boardInfo.get("userId"));
			
			HttpSession session = request.getSession(false);
			String sessionUserId = String.valueOf(session.getAttribute("userId"));
			
			if(!boardUserId.equals(sessionUserId)) {
				throw new Exception("게시물 작성자가 아닙니다.");
			}
			
			model.addAttribute("boardData", boardInfo);
			model.addAttribute("commentsData", null);
			
			// 파일정보 가져오기
			FileDTO[] filesInfo = fileService.getFileInfo(boardId);
			if(filesInfo!=null) {
				model.addAttribute("filesData",filesInfo);
			}
			
			return "/board/board";
		}
		catch(Exception e) {
			System.out.println(e.getMessage());
			return "redirect:/";
		}
	}
	
	@PutMapping("/modify/{boardId}")
	@ResponseBody
	public boolean updateBoard(@PathVariable("boardId") Integer boardId, @RequestBody Board board) {
		try {
			if(boardId==null || board==null) {
				throw new Exception("요청된 정보가 없습니다.");
			}
			board.setId(boardId);
			boolean result = boardService.updateBoardInfo(board);
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
	
}
