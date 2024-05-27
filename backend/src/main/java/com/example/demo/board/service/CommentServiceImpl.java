package com.example.demo.board.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.board.mapper.CommentMapper;
import com.example.demo.board.model.Comment;
import com.example.demo.util.CommentHelper;

@Service
public class CommentServiceImpl implements CommentService {

	@Autowired
	private CommentMapper commentMapper;
	
	@Override
	public boolean insertCommentInfo(Comment comment) throws Exception {
		try {
			int insertComment=0;
			if(comment.getParentId()==null) {
				insertComment = commentMapper.insertRootCommentData(comment);
			}
			else {
				insertComment = commentMapper.insertReplyCommentData(comment);
			}
			
			if(insertComment==0) {
				throw new Exception("Service: 댓글 삽입에 실패했습니다.");
			}
			
			return true;
		}
		catch(Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@Override
	public ArrayList<Comment> getCommentList(Integer boardId) throws Exception {
		try {
			Comment[] commentList = commentMapper.selectCommentsDataByBoardId(boardId);
			if(commentList==null) {
				throw new Exception("Service: 조회된 댓글이 없습니다.");
			}
			
			CommentHelper commentHelper = new CommentHelper();
			for(Comment comment: commentList) {
				commentHelper.addComment(comment);
			}
			ArrayList<Comment> sortedCommentList = commentHelper.getSortedComments();
			return sortedCommentList;
		}
		catch(Exception e) {
		
			return null;
		}
	}

	@Override
	public boolean updateCommentInfo(Comment comment) throws Exception {
		try {
			Integer updateComment = commentMapper.updateCommentData(comment);
			if(updateComment==null||updateComment==0) {
				throw new Exception("Service: 댓글 수정에 실패했습니다.");
			}
			return true;
		}
		catch(Exception e) {
			System.out.println(e.getMessage());
			return false;
		}
	}

	@Override
	public boolean deleteCommentInfo(Integer commentId) throws Exception {
		try {
			Integer deleteComment = commentMapper.updateCommentStatusDeletedById(commentId);
			if(deleteComment==null||deleteComment==0) {
				throw new Exception("Service: 삭제할 댓글이 없습니다.");
			}
			return true;
		}
		catch(Exception e) {
			System.out.println(e.getMessage());
			return false;
		}
	}
	
}
