package com.example.demo.util;

import java.util.ArrayList;
import java.util.HashMap;

import com.example.demo.board.model.Comment;

public class CommentHelper {
	
	private HashMap<Integer, ArrayList<Comment>> graph;
	private ArrayList<Comment> sortedComments;
	
	public CommentHelper() {
		graph = new HashMap<>();
		// 루트 댓글
		graph.put(0, new ArrayList<>());
		
	}
	
	public void addComment(Comment comment) { 
		Integer parentId = comment.getParentId();
		if(parentId==null) {
			graph.get(0).add(comment);
			return;
		}
		if(!graph.containsKey(parentId)) {
			graph.put(parentId, new ArrayList<>());
		}
		graph.get(parentId).add(comment);
	}
	
	public ArrayList<Comment> getSortedComments(){
		sortedComments = new ArrayList<>();
		
		ArrayList<Comment> rootComments = graph.get(0);
		for(Comment comment: rootComments) {
			Integer commentId = comment.getId();
			sortedComments.add(comment);
			if(graph.containsKey(commentId)) {
				getReplyComment(commentId,0);
			}
		}
		
		return sortedComments;
	}
	
	private void getReplyComment(Integer commentId, int depth){
		if(depth > 10) {
			return;
		}
		
		ArrayList<Comment> replyComments = graph.get(commentId);
		for(Comment replyComment : replyComments) {
			Integer replyCommentId = replyComment.getId();
			sortedComments.add(replyComment);
			if(graph.containsKey(replyCommentId)) {
				getReplyComment(replyCommentId, depth+1);
			}
		}
		return;
	}
}
