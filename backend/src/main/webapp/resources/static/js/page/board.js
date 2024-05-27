import { insertBoardInfo, updateBoardInfo } from "../api/boardApi.js";
import { deleteFileInfo, insertFileInfo } from "../api/fileApi.js";
import { convertFormDataToObject, convertStringToBytes, getPathNameNumber } from "../utils/convertor.js";
import { loadOriginFiles, addFile, getUploadList, getRemovedIdList } from "../utils/fileHandler.js";
import { isNotBlank } from "../utils/validator.js";

$(document).ready(function(){
	$("#boardTitle").change(handleInputChange);
	$("#boardContent").change(handleInputChange);
	$("#boardFiles").change(handleFileInputChange);
	$("#formSubmitBtn").click(handleBtnSubmit);
	loadOriginFiles();
})

const maxByteSizeMap = {
	"title": 50,
	"content": 2147483647
}

const eventTypeMessage = {
	"create": {
		"ready": "작성하시겠습니까?",
		"complete": "저장되었습니다.",
		"error": "게시글 업로드 실패"
	},
	
	"modify": {
		"ready": "수정하시겠습니까?",
		"complete": "수정되었습니다.",
		"error": "게시글 수정 실패"
	}
}

function handleInputChange(){
	const [name,value] = [$(this).attr("name"), $(this).val()];
	const maxSize= maxByteSizeMap[name];
	
	const byteSize = convertStringToBytes(value);
	if(byteSize > maxSize){
		$(this).val(value.substr(0,maxSize));
	}
}

function handleFileInputChange(e){
	e.preventDefault();	
	try{
		addFile(this);
	}
	catch(e){
		alert(e.message);
	}
}

async function handleBtnSubmit(e){
	e.preventDefault();
	const boardForm = $('#boardForm').serializeArray();
	const boardInfo = convertFormDataToObject(boardForm);
	const eventType = $(this).data("type");
	
	try{
		if(!isNotBlank(boardInfo.title) || !isNotBlank(boardInfo.content)){
			throw new Error("제목과 본문을 모두 입력해주세요.");
		}
		
		if(!confirm(eventTypeMessage[eventType].ready)){
			return;
		}
		
		let boardId = 0;
		if(eventType==="create"){
			boardId = await insertBoardInfo(boardInfo);
			if(!boardId){
				throw new Error(eventTypeMessage[eventType].error);
			}	
		}
		else if(eventType==="modify"){
			boardId = getPathNameNumber();
			if(!boardId){
				throw new Error('no boardId');
			}

			const updateResult = await updateBoardInfo(boardInfo, boardId);
			if(!updateResult){
				throw new Error(eventTypeMessage[eventType].error);
			}			
		}
		
		await updateFiles(boardId);
		
		alert(eventTypeMessage[eventType].complete);
		location.href ="/";
	}
	catch(err){
		alert(err.message);
	}
	
}

async function updateFiles(boardId){
	const uploadList = getUploadList();
	if(uploadList.length>0){
		const uploadResult = await insertFileInfo(uploadList, boardId);
		if(!uploadResult){
			throw new Error("파일 업로드 실패 "+uploadResult);
		}	
	}
		
	const removedIdList = getRemovedIdList();
	if(removedIdList.length>0){
		const deleteResult = await deleteFileInfo(removedIdList, boardId);
		if(!deleteResult){
			throw new Error("파일 삭제 실패"+deleteResult);
		}
	}
}