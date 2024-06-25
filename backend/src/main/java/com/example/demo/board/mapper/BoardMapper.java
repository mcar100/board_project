package com.example.demo.board.mapper;

import java.util.ArrayList;
import java.util.HashMap;

import org.apache.ibatis.annotations.Mapper;

import com.example.demo.board.model.Board;
import com.example.demo.board.model.SearchDTO;

@Mapper
public interface BoardMapper {
	public Integer insertBoardData(Board board);
	public int countAllBoardData();
	public ArrayList<HashMap<String,Object>> selectBoardDataInRange(SearchDTO searchDTO);
	public HashMap<String,Object> selectBoardDataById(Integer boardId);
	public Integer updateBoardData(Board board);
	public Integer updateBoardStatusDeletedById(Integer boardId);
	public Integer deleteBoardDataById(Integer boardId);
}
