package com.example.demo.board.model;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class Board {
	private Integer id;
	private String title;
	private String content;
	private String createdAt;
	private String modifyAt;
	private String deletedAt;
	private String status;
	private Integer userId;
}
