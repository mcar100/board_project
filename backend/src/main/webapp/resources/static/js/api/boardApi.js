import { convertApiDataFormat } from "../utils/convertor.js";
import requestApi from "./ajax.js";

function insertBoardInfo(boardInfo){
	const apiData = convertApiDataFormat(null, null, boardInfo,'json');
	return requestApi('post','/board', apiData,'json');	
}

function updateBoardInfo(boardInfo, boardId){
	const apiData = convertApiDataFormat(boardId, null, boardInfo,'json');
	return requestApi('put', '/board/modify', apiData,'json');
}

function deleteBoardInfo(boardId){
	const apiData = convertApiDataFormat(boardId);
	return requestApi('delete', '/board/detail', apiData);
}

export { insertBoardInfo, updateBoardInfo, deleteBoardInfo }