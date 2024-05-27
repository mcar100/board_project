package com.example.demo.board.controller;

import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.demo.board.model.Comment;
import com.example.demo.board.service.CommentService;

@Controller
@RequestMapping("/comments")
public class CommentController {
	
	@Autowired
	CommentService commentService;
	
	@GetMapping("/{boardId}")
    public String getComments(@PathVariable("boardId") Integer boardId, Model model) throws Exception {
		try {
			if(boardId==null) {
				throw new Exception("요청된 정보가 없습니다.");
			}
			
			ArrayList<Comment> commentsInfo = commentService.getCommentList(boardId);
			if(commentsInfo==null) {
				throw new Exception("Comment Service 에러");
			}
			model.addAttribute("commentsData", commentsInfo);
		}
		catch(Exception e) {
			System.out.println(e.getMessage());
		}
		return "/board/comment";
    }
	
	@PostMapping
	@ResponseBody
	public boolean createComment(@RequestBody Comment comment, HttpServletRequest request) throws Exception {
		try {
			if(comment==null) {
				throw new Exception("요청된 정보가 없습니다.");
			}
			
			HttpSession session = request.getSession(false);
			Integer userId = (Integer)session.getAttribute("userId");
			if(userId==null) {
				throw new Exception("Session이 없습니다.");
			}
			comment.setUsersId(userId);
			
			 boolean result = commentService.insertCommentInfo(comment);
			 if(!result) {
				 throw new Exception("Service 에러");
			 }
			 
			return true;
		}
		catch(Exception e) {
			System.out.println(e.getMessage());
			return false;
		}	
	}
	
	@PutMapping("/{commentId}")
	@ResponseBody
	public boolean updateComment(@PathVariable("commentId") Integer commentId, @RequestBody Comment comment) {
		try {
			if(commentId==null || comment==null) {
				throw new Exception("요청된 정보가 없습니다.");
			}
			comment.setId(commentId);
			boolean result = commentService.updateCommentInfo(comment);
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
	
	@DeleteMapping("/{commentId}")
    @ResponseBody
	public boolean deleteComment(@PathVariable("commentId") Integer commentId) throws Exception {
		try {
			if(commentId==null) {
				throw new Exception("요청된 정보가 없습니다.");
			}
			boolean result = commentService.deleteCommentInfo(commentId);
			if(!result) {
				throw new Exception("Comment Service 에러");
			}
			System.out.println("삭제 성공");
			return true;
		}
		catch(Exception e) {
			System.out.println(e.getMessage());
			return false;
		}
    }
}
