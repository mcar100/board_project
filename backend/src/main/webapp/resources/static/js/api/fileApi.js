import { convertApiDataFormat } from "../utils/convertor.js";
import requestApi from "./ajax.js";

function insertFileInfo(fileInfo, boardId){
	const apiData = convertApiDataFormat(boardId, null, fileInfo, 'file');
	return requestApi('post','/file', apiData);
}

function deleteFileInfo(fileIdInfo, boardId){	
	const apiData = convertApiDataFormat(boardId, null, fileIdInfo, 'json');
	return requestApi('delete','/file',apiData);
}

export { insertFileInfo, deleteFileInfo }