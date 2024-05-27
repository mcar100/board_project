package com.example.demo.board.model;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class FileDTO {
	private Integer id;
	private String originalName;
	private String uploadedName;
	private Integer boardId;
}

