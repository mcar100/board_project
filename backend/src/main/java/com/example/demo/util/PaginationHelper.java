package com.example.demo.util;

import com.example.demo.board.model.SearchDTO;

public class PaginationHelper {
	
	private PaginationHelper() {};
	
	public static int getEndPageNo(SearchDTO searchDTO) {
		int dataSize = searchDTO.getDataSize();
		int recordSize = searchDTO.getRecordSize();
		int endPageNo = (int)Math.ceil((double)dataSize/(double)recordSize);
		
		if(endPageNo==0) {
			return 1;
		}
		return (int)Math.ceil((double)dataSize/(double)recordSize);
	}
}
