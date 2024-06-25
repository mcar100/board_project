package com.example.demo.board.service;

import java.util.ArrayList;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.board.mapper.BoardMapper;
import com.example.demo.board.model.Board;
import com.example.demo.board.model.SearchDTO;

@Service
public class BoardServiceImpl implements BoardService {
	
	@Autowired
	private BoardMapper boardMapper;
	
	@Override
	public boolean insertBoardInfo(Board boardInfo) throws Exception {
		try {
			Integer insertBoard = boardMapper.insertBoardData(boardInfo);
			if(insertBoard==null||insertBoard==0) {
				throw new Exception("Service: 게시글 삽입에 실패했습니다.");
			}
			return true;
		}
		catch(Exception e) {
			e.printStackTrace();
			return false;
		}
	}
	
	@Override
	public int countBoardList() throws Exception {
		return boardMapper.countAllBoardData();
	}
	

	@Override
	public ArrayList<HashMap<String, Object>> getBoardListInfo(SearchDTO searchDTO) throws Exception {
		try {			
			ArrayList<HashMap<String,Object>> boardDataList = boardMapper.selectBoardDataInRange(searchDTO);
			if(boardDataList.size()==0) {
				throw new Exception("Service: 조회된 게시글이 없습니다.");
			}
			return boardDataList;
		}
		catch(Exception e) {
			System.out.println(e.getMessage());
			return null;
		}
	}

	@Override
	public HashMap<String, Object> getBoardDetailInfo(Integer boardId) throws Exception {
		try {
			HashMap<String, Object> boardDetailData = boardMapper.selectBoardDataById(boardId);
			if(boardDetailData==null) {
				throw new Exception("Service: 입력된 정보와 일치하는 게시글이 없습니다.");
			}
			return boardDetailData;
		}
		catch(Exception e) {
			System.out.println(e.getMessage());
			return null;
		}
	}
	
	@Override
	public boolean updateBoardInfo(Board board) throws Exception {
		try {
			Integer updateBoard = boardMapper.updateBoardData(board);
			if(updateBoard==null||updateBoard==0) {
				throw new Exception("Service: 게시글 수정에 실패했습니다.");
			}
			return true;
		}
		catch(Exception e) {
			System.out.println(e.getMessage());
			return false;
		}
	}
	
	@Override
	public boolean deleteBoardInfo(Integer boardId) throws Exception {
		try {
			Integer deletedBoard = boardMapper.updateBoardStatusDeletedById(boardId);
			if(deletedBoard==null||deletedBoard==0) {
				throw new Exception("Service: 삭제할 게시글이 없습니다.");
			}
			return true;
		}
		catch(Exception e) {
			System.out.println(e.getMessage());
			return false;
		}
	}

	@Override
	public boolean deleteHardBoardInfo(Integer boardId) throws Exception {
		try {
			Integer deletedBoard = boardMapper.deleteBoardDataById(boardId);
			if(deletedBoard==null||deletedBoard==0) {
				throw new Exception("Service: 삭제할 게시글이 없습니다.");
			}
			return true;
		}
		catch(Exception e) {
			System.out.println(e.getMessage());
			return false;
		}
	}
}
