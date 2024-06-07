package com.example.demo.board.model;

import java.util.HashMap;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class BoardDetailResponse {
	private HashMap<String,Object> boardInfo;
	private FileDTO[] filesInfo;
}
