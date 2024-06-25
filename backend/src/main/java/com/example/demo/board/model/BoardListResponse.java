package com.example.demo.board.model;

import java.util.ArrayList;
import java.util.HashMap;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class BoardListResponse {
	private ArrayList<HashMap<String, Object>> boardList;
	private int pageNo;
	private int lastPageNo;
	private int pageSize;
}

