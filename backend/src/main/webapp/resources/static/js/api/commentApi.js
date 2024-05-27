import { convertApiDataFormat } from "../utils/convertor.js";
import requestApi from "./ajax.js";

function insertCommentInfo(commentInfo){
	const apiData = convertApiDataFormat(null, null, commentInfo, 'json');
	return requestApi('post', '/comments', apiData, 'json');
}

function deleteCommentInfo(commentId){
	const apiData = convertApiDataFormat(commentId);
	return requestApi('delete', '/comments', apiData);
}

function updateCommentInfo(content, commentId){
	const apiData = convertApiDataFormat(commentId, null, content, 'json')
	return requestApi('put', '/comments', apiData,'json')
}

function getCommentsData(boardId){
	const apiData = convertApiDataFormat(boardId);
	return requestApi('get','/comments',apiData);
}


export { insertCommentInfo, deleteCommentInfo, updateCommentInfo, getCommentsData }