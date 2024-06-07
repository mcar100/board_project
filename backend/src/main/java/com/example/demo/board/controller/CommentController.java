package com.example.demo.board.controller;

import java.util.ArrayList;

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
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.board.model.Comment;
import com.example.demo.board.service.CommentService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
public class CommentController {
	
	@Autowired
	CommentService commentService;
	
	@GetMapping("comments/{boardId}")
    public ResponseEntity<ArrayList<Comment>> getComments(@PathVariable("boardId") Integer boardId, HttpServletRequest request) throws Exception {
		log.info(request.getMethod()+" "+request.getRequestURI()+"");
		try {
			if(boardId==null) {
				throw new Exception("요청된 정보가 없습니다.");
			}
			
			ArrayList<Comment> commentsInfo = commentService.getCommentList(boardId);
			if(commentsInfo==null) {
				throw new Exception("Comment Service 에러");
			}
			log.info("get commentlist from board"+boardId);
			return ResponseEntity.ok().body(commentsInfo);
		}
		catch(Exception e) {
			log.error(e.getMessage());
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
		}

    }
	
	@PostMapping("comments")
	public ResponseEntity<Boolean> createComment(@RequestBody Comment comment, HttpServletRequest request) throws Exception {
		log.info(request.getMethod()+" "+request.getRequestURI());
		try {
			if(comment==null) {
				throw new Exception("요청된 정보가 없습니다.");
			}
			
			HttpSession session = request.getSession(false);
			if(session==null) {
				throw new Exception("Session이 없습니다.");
			}
			Integer userId = (Integer)session.getAttribute("userId");
			if(userId==null) {
				throw new Exception("Session에 userId가 없습니다.");
			}
			comment.setUsersId(userId);
			
			 boolean result = commentService.insertCommentInfo(comment);
			 if(!result) {
				 throw new Exception("Service 에러");
			 }
			 log.info("create comment successfully");
			 return ResponseEntity.ok().body(true);
		}
		catch(Exception e) {
			log.error(e.getMessage());
			e.getStackTrace();
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(false);
		}	
	}
	
	@PutMapping("comments/{commentId}")
	public ResponseEntity<Boolean> updateComment(@PathVariable("commentId") Integer commentId, @RequestBody Comment comment, HttpServletRequest request) {
		log.info(request.getMethod()+" "+request.getRequestURI());
		try {
			if(commentId==null || comment==null) {
				throw new Exception("요청된 정보가 없습니다.");
			}
			comment.setId(commentId);
			boolean result = commentService.updateCommentInfo(comment);
			if(!result) {
				throw new Exception("Board Service 에러");
			}
			log.info("update comment"+commentId);
			return ResponseEntity.ok().body(true);
		}
		catch(Exception e) {
			log.error(e.getMessage());
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(false);
		}
	}
	
	@DeleteMapping("comments/{commentId}")
	public ResponseEntity<Boolean> deleteComment(@PathVariable("commentId") Integer commentId, HttpServletRequest request) throws Exception {
		log.info(request.getMethod()+" "+request.getRequestURI());
		try {
			if(commentId==null) {
				throw new Exception("요청된 정보가 없습니다.");
			}
			boolean result = commentService.deleteCommentInfo(commentId);
			if(!result) {
				throw new Exception("Comment Service 에러");
			}
			log.info("delete comment"+commentId);
			return ResponseEntity.ok().body(true);
		}
		catch(Exception e) {
			log.error(e.getMessage());
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(false);
		}
    }
}
