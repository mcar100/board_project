package com.example.demo.board.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.example.demo.board.model.Comment;

@Mapper
public interface CommentMapper {
	public Integer insertRootCommentData(Comment comment);
	public Integer insertReplyCommentData(Comment comment);
	public Comment[] selectCommentsDataByBoardId(Integer boardId);
	public Integer updateCommentData(Comment comment);
	public Integer updateCommentStatusDeletedById(Integer commentId);
}
