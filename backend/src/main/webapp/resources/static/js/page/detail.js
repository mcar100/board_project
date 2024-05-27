import { deleteBoardInfo } from "../api/boardApi.js";
import { getPathNameNumber } from "../utils/convertor.js";
import { processFileName } from "../utils/fileHandler.js";

$(document).ready(function(){
	$("#deleteBtn").click(handleDeleteBtnClick);
	$("#fileName > a").each(function(){
		const fullName = $(this).text()
		$(this).text(processFileName(fullName));
	});
})

async function handleDeleteBtnClick(){
	try{
		if(!confirm('게시글을 삭제하시겠습니까?')){
			return;
		}
		
		const boardId = getPathNameNumber();
		if(!boardId){
			throw new Error('no boardId');
		}

		const deleteResult = await deleteBoardInfo(boardId);
		if(!deleteResult){
			throw new Error("게시글 삭제 실패")
		}
		alert('삭제되었습니다.');
		location.href = "/";
	}
	catch(e){
		alert("Err: "+e.message);
	}
}