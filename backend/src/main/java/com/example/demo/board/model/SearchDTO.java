package com.example.demo.board.model;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class SearchDTO {
	private int pageNo;
	private int recordSize;
	private int dataSize;
	private int startNo;
	private int endNo;
	
	public SearchDTO(int pageNo, int recordSize, int dataSize) {
		this.pageNo = pageNo;
		this.recordSize = recordSize;
		this.dataSize = dataSize;
		setStartAndEndNo();
	}
	
	public SearchDTO() {
		this.pageNo = 1;
		this.recordSize = 10;
		this.dataSize = 100;
		setStartAndEndNo();
	}
	
	public void setStartAndEndNo() {
		this.endNo = dataSize-((pageNo-1)*recordSize);
		this.startNo = dataSize-(pageNo*recordSize)+1;
		if(startNo<0) {
			this.startNo = 0;
		}
		if(endNo<0) {
			this.endNo = 0;
		}
		
	}
}
