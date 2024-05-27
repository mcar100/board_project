package com.example.demo.board.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.example.demo.board.model.FileDTO;

@Mapper
public interface FileMapper {
	public Integer insertFileData(FileDTO file);
	public FileDTO selectFileDataById(Integer fileId);
	public FileDTO[] selectFileDataByBoardId(Integer boardId);
	public Integer deleteFileDataById(Integer fileId);
	public Integer deleteFileDataByBoardId(Integer boardId);
}
