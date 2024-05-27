package com.example.demo.board.model;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class Comment {
	private Integer id;
	private String content;
	private Integer depth;
	private Integer parentId;
	private String createdAt;
	private String modifyAt;
	private String deletedAt;
	private String status;
	private Integer boardId;
	private Integer usersId;
	private String userName;
}